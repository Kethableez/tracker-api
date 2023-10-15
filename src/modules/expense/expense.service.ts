import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseFilterQueryDto } from './dto/expense-filter.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseEnt } from './entities/expense.entity';
import { Page } from 'src/core/models/page.model';
import { ExpenseQueryBuilder } from './builders/expense.builder';

@Injectable()
export class ExpenseService {
	constructor(private prisma: PrismaService) {}

	create(createExpenseDto: CreateExpenseDto, userId: number): Promise<ExpenseEnt> {
		return this.prisma.expense.create({ data: { ...createExpenseDto, userId } });
	}

	findAll(userId: number): Promise<ExpenseEnt[]> {
		return this.prisma.expense.findMany({ where: { userId: userId } });
	}

	findOne(id: number): Promise<ExpenseEnt> {
		return this.prisma.expense.findUnique({ where: { id } });
	}

	update(id: number, updateExpenseDto: UpdateExpenseDto): Promise<ExpenseEnt> {
		return this.prisma.expense.update({ where: { id }, data: updateExpenseDto });
	}

	remove(id: number): Promise<ExpenseEnt> {
		return this.prisma.expense.delete({ where: { id } });
	}

	async findByQuery(userId: number, queryDto: ExpenseFilterQueryDto): Promise<Page<ExpenseEnt>> {
		const { page, perPage, sort, direction, ...rest } = queryDto;
		const sorting = ExpenseQueryBuilder.buildSorting(sort, direction);
		const paging = ExpenseQueryBuilder.buildPaging(page, perPage);
		const filters = ExpenseQueryBuilder.buildFilters(rest);

		const [expenses, total] = await this.prisma.$transaction([
			this.prisma.expense.findMany({
				...paging,
				where: {
					AND: [...filters, { userId }]
				},
				orderBy: sorting
			}),

			this.prisma.expense.count({ where: { AND: [...filters, { userId }] } })
		]);

		return {
			page,
			perPage,
			totalItems: total,
			totalPages: Math.ceil(total / perPage),
			items: expenses
		};
	}

	// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY5NzA2MDE5NywiZXhwIjoxNjk3NjY0OTk3fQ.87kKRJotFGjrB-j7ZSGjONjufLXtlSiH3_jo9QLyU84
}
