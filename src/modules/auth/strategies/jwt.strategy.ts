import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: '124643g2'
		});
	}

	async validate(payload: { userId: number }): Promise<{ userId: number }> {
		const user = await this.prisma.user.findUnique({ where: { id: payload.userId } });
		if (!user) {
			throw new UnauthorizedException();
		}

		return { userId: user.id };
	}
}
