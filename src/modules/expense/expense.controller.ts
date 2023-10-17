import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/core/decorators/auth-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseFilterQueryDto } from './dto/expense-filter.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseEnt } from './entities/expense.entity';
import { ExpenseService } from './expense.service';
import { Page } from 'src/core/models/page.model';
import { ApiResponse } from '../../core/models/api-response.dto';

@Controller('expense')
@ApiTags('Expense')
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) {}

	@Get('by-query')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
	findByQuery(@Query() expenseQuery: ExpenseFilterQueryDto, @UserId() userId: number): Promise<Page<ExpenseEnt>> {
		return this.expenseService.findByQuery(userId, expenseQuery);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	create(@Body() createExpenseDto: CreateExpenseDto, @UserId() userId: number): Promise<ApiResponse> {
		return this.expenseService.create(createExpenseDto, userId);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: ExpenseEnt, isArray: true })
	findAll(@UserId() userId: number): Promise<ExpenseEnt[]> {
		return this.expenseService.findAll(userId);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: ExpenseEnt })
	findOne(@Param('id', ParseIntPipe) id: number): Promise<ExpenseEnt> {
		return this.expenseService.findOne(id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: ExpenseEnt })
	update(@Param('id', ParseIntPipe) id: number, @Body() updateExpenseDto: UpdateExpenseDto): Promise<ExpenseEnt> {
		return this.expenseService.update(id, updateExpenseDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: ExpenseEnt })
	remove(@Param('id', ParseIntPipe) id: number): Promise<ExpenseEnt> {
		return this.expenseService.remove(id);
	}
}
