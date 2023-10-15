import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { AccountEnt } from './entities/account.entity';

@Injectable()
export class AccountService {
	constructor(private prisma: PrismaService) {}

	create(createAccountDto: CreateAccountDto, userId: number): Promise<AccountEnt> {
		return this.prisma.account.create({ data: { ...createAccountDto, userId } });
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
