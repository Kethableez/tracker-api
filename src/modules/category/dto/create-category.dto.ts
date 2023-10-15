import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(25)
	@ApiProperty()
	name: string;

	@IsNumber({ maxDecimalPlaces: 2 })
	@IsOptional()
	@IsPositive()
	@IsNotEmpty()
	@ApiProperty({ required: false })
	limit?: number;

	@IsEnum(Type)
	@IsNotEmpty()
	@ApiProperty({ enum: ['INCOME', 'OUTCOME'] })
	type: Type;

	@IsString()
	@Length(7)
	@IsNotEmpty()
	@ApiProperty()
	color: string;
}
