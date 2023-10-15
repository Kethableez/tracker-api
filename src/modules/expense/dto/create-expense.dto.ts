import { ApiProperty } from '@nestjs/swagger';
import { Currency, Type } from '@prisma/client';
import {
	IsString,
	IsNotEmpty,
	MinLength,
	MaxLength,
	IsNumber,
	IsPositive,
	IsInt,
	IsEnum,
	IsDateString,
	IsBoolean,
	IsOptional
} from 'class-validator';

export class CreateExpenseDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(25)
	@ApiProperty()
	name: string;

	@IsNumber({ maxDecimalPlaces: 2 })
	@IsPositive()
	@IsNotEmpty()
	@ApiProperty()
	amount: number;

	@IsEnum(Type)
	@IsNotEmpty()
	@ApiProperty({ enum: ['INCOME', 'OUTCOME'] })
	type: Type;

	@IsDateString()
	@IsNotEmpty()
	@ApiProperty()
	date: Date;

	@IsBoolean()
	@IsNotEmpty()
	@ApiProperty({ default: true })
	hasDefaultCurrency: boolean;

	@IsOptional()
	@IsEnum(Currency)
	@ApiProperty({ enum: ['USD', 'EUR', 'PLN'] })
	currency?: Currency;

	@IsNumber()
	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	accountId: number;

	@IsNumber()
	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	categoryId: number;
}
