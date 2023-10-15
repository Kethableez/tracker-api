import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNumber, IsString, IsOptional } from 'class-validator';
export class ExpenseFilterQueryDto {
	@ApiProperty()
	@IsNumber()
	@Type(() => Number)
	page: number;

	@ApiProperty()
	@IsNumber()
	@Type(() => Number)
	perPage: number;

	@ApiProperty({ required: false, type: String })
	@IsString()
	@IsOptional()
	@Type(() => String)
	name?: string;

	@ApiProperty({ required: false, type: Number })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	amountFrom?: number;

	@ApiProperty({ required: false, type: Number })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	amountTo?: number;

	@ApiProperty({ required: false, type: Date })
	@IsOptional()
	@Type(() => Date)
	dateFrom?: Date;

	@ApiProperty({ required: false, type: Date })
	@IsOptional()
	@Type(() => Date)
	dateTo?: Date;

	@ApiProperty({ required: false, enum: [$Enums.Type.INCOME, $Enums.Type.OUTCOME] })
	@IsString()
	@IsOptional()
	@Type(() => String)
	type?: $Enums.Type;

	@ApiProperty({ required: false, type: Number })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	categoryId?: number;

	@ApiProperty({ required: false, type: Number })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	accountId?: number;

	@ApiProperty({ required: false, type: String })
	@IsString()
	@IsOptional()
	@Type(() => String)
	sort?: string;

	@ApiProperty({ required: false, enum: ['asc', 'desc'] })
	@IsString()
	@IsOptional()
	@Type(() => String)
	direction?: 'asc' | 'desc';
}
