import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { AccountEnt } from './entities/account.entity';
import { ApiResponse } from '../../core/models/api-response.dto';
import { Type } from '@prisma/client';

@Injectable()
export class AccountService {
	constructor(private prisma: PrismaService) {}

	async create(createAccountDto: CreateAccountDto, userId: number): Promise<ApiResponse> {
		const { balance, ...account } = createAccountDto;

		const acc = await this.prisma.account.create({ data: { ...account, userId } });
		await this.prisma.expense.create({
			data: {
				userId,
				name: 'INITIAL_BALANCE',
				amount: balance,
				accountId: acc.id,
				type: 'REBALANCE',
				date: new Date(),
				currency: account.currency,
				categoryId: 1
			}
		});
		return { header: 'Account was created' };
	}

	findAll(userId: number): Promise<AccountEnt[]> {
		return this.prisma.account.findMany({ where: { userId: userId } });
	}

	findOne(id: number): Promise<AccountEnt> {
		return this.prisma.account.findUnique({ where: { id } });
	}

	update(id: number, updateAccountDto: UpdateAccountDto): Promise<AccountEnt> {
		return this.prisma.account.update({ where: { id }, data: updateAccountDto });
	}

	remove(id: number): Promise<AccountEnt> {
		return this.prisma.account.delete({ where: { id } });
	}
}
