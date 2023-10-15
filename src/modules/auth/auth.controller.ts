import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthEnt } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AuthToken } from '../../core/decorators/auth-token.decorator';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { AvailableEnt } from './entity/available.entity';
import { ApiResponse } from '../../core/models/api-response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	@ApiCreatedResponse({ type: ApiResponse })
	async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse> {
		return this.authService.create(createUserDto);
	}

	@Get('available')
	@ApiQuery({ name: 'username', type: 'string' })
	isUsernameAvailable(@Query() query: { username: string }): Promise<AvailableEnt> {
		return this.authService.isUsernameAvailable(query.username);
	}
	@Post('login')
	@ApiOkResponse({ type: AuthEnt })
	login(@Res({ passthrough: true }) res, @Body() { username, password }: LoginDto): Promise<AuthEnt> {
		return this.authService.login(res, username, password);
	}

	@Get('refresh')
	@UseGuards(RefreshTokenGuard)
	@ApiOkResponse({ type: AuthEnt })
	refresh(@AuthToken() token: string): AuthEnt {
		return this.authService.refresh(token);
	}

	@Get('logout')
	logout(@Res({ passthrough: true }) response: Response, @AuthToken() token: string): Promise<{ revoked: boolean }> {
		return this.authService.logout(response, token);
	}
}
