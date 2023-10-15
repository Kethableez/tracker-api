import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UserId } from 'src/core/decorators/auth-user.decorator';
import { AccountEnt } from './entities/account.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('account')
@ApiTags('Account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: AccountEnt })
	create(@Body() createAccountDto: CreateAccountDto, @UserId() userId: number): Promise<AccountEnt> {
		return this.accountService.create(createAccountDto, userId);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: AccountEnt, isArray: true })
	findAll(@UserId() userId: number): Promise<AccountEnt[]> {
		return this.accountService.findAll(userId);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: AccountEnt })
	findOne(@Param('id', ParseIntPipe) id: number): Promise<AccountEnt> {
		return this.accountService.findOne(id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: AccountEnt })
	update(@Param('id', ParseIntPipe) id: number, @Body() updateAccountDto: UpdateAccountDto): Promise<AccountEnt> {
		return this.accountService.update(id, updateAccountDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: AccountEnt })
	remove(@Param('id', ParseIntPipe) id: number): Promise<AccountEnt> {
		return this.accountService.remove(id);
	}
}
