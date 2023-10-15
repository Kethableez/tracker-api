import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		PrismaModule,
		PassportModule,
		JwtModule.register({
			secret: '124643g2',
			signOptions: { expiresIn: '60s' }
		})
	],
	controllers: [AuthController],
	providers: [AuthService, JWTStrategy]
})
export class AuthModule {}
