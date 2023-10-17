import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateAccountDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(25)
	@ApiProperty()
	name: string;

	@IsEnum(Currency)
	@IsNotEmpty()
	@ApiProperty({ enum: ['EUR', 'USD', 'PLN'] })
	currency: Currency;

	@IsString()
	@Length(7)
	@IsNotEmpty()
	@ApiProperty()
	color: string;

	@IsNumber()
	@IsPositive()
	@IsNotEmpty()
	@ApiProperty()
	balance: number;
}
