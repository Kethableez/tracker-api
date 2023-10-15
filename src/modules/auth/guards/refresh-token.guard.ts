import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
	constructor(
		private prismaService: PrismaService,
		private jwtService: JwtService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const oldToken = req.headers['authorization'];
		const { refreshToken } = req.cookies;

		console.log(oldToken, refreshToken);
		if (!refreshToken || !oldToken) {
			throw new UnauthorizedException('No refresh token were found');
		}

		const { userId } = this.jwtService.decode(oldToken.replace('Bearer ', '')) as { [key: string]: any };

		console.log(userId, refreshToken);

		const rt = await this.prismaService.refreshToken.findUnique({ where: { userId: userId, token: refreshToken } });

		console.log(rt);
		if (!rt) {
			throw new UnauthorizedException('No refresh token were found');
		}

		if (rt.expiresIn.getTime() <= new Date().getTime() || rt.revokedAt) {
			throw new UnauthorizedException('Invalid or expired refresh token');
		}

		return true;
	}
}
