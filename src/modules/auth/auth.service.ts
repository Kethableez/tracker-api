import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { AuthEnt } from './entity/auth.entity';
import * as bc from 'bcrypt';
import * as crypto from 'crypto';
import { UserEnt } from './entity/user.entity';
import { RefreshTokenEnt } from './entity/refresh-token.entity';
import { CookieOptions, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { AvailableEnt } from './entity/available.entity';
import { ApiResponse } from '../../core/models/api-response.dto';

@Injectable()
export class AuthService {
	private readonly SALT_ROUNDS = 10;
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	) {}

	async create(createUserDto: CreateUserDto): Promise<ApiResponse> {
		const hashed = await bc.hash(createUserDto.password, this.SALT_ROUNDS);
		await this.prisma.user.create({ data: { ...createUserDto, password: hashed } });
		return { header: 'User created with success' };
	}

	async isUsernameAvailable(username: string): Promise<AvailableEnt> {
		return { available: !(await this.prisma.user.findUnique({ where: { username } })) };
	}
	async login(res: Response, username: string, password: string): Promise<AuthEnt> {
		const user: UserEnt = await this.prisma.user.findUnique({ where: { username: username } });
		if (!user) {
			throw new NotFoundException('User not found');
		}

		const isPasswordValid = await bc.compare(password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const { token, expiresIn } = await this.newRefreshToken(user.id);
		this.setCookie(res, token, expiresIn);

		return {
			userId: user.id,
			accessToken: this.jwt.sign({ userId: user.id })
		};
	}

	refresh(token: string): AuthEnt {
		const { userId } = this.getUserIdFromToken(token);

		return {
			accessToken: this.jwt.sign({ userId }),
			userId
		};
	}

	async logout(response: Response, token: string): Promise<{ revoked: boolean }> {
		const { userId } = this.getUserIdFromToken(token);

		await this.prisma.refreshToken.updateMany({ where: { AND: [{ userId }, { revokedAt: null }] }, data: { revokedAt: new Date() } });
		response.clearCookie('refreshToken');
		return { revoked: true };
	}

	private setCookie(res: Response, token: string, expires: Date): void {
		const opt: CookieOptions = {
			httpOnly: true,
			expires,
			secure: true,
			sameSite: 'none'
		};

		res.cookie('refreshToken', token, opt);
	}

	private async newRefreshToken(userId: number): Promise<RefreshTokenEnt> {
		const token = crypto.randomUUID();

		await this.prisma.refreshToken.updateMany({ where: { userId }, data: { revokedAt: new Date() } });

		return this.prisma.refreshToken.create({
			data: {
				token,
				userId,
				createdAt: new Date(),
				expiresIn: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
			}
		});
	}

	private getUserIdFromToken(token: string): { userId: number } {
		const { userId } = this.jwt.decode(token) as { [key: string]: any };
		return { userId };
	}
}
