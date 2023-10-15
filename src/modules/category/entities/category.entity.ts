import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Category } from '@prisma/client';

export class CategoryEnt implements Category {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty({ required: false, nullable: true })
	limit: number | null;

	@ApiProperty()
	color: string;

	@ApiProperty({ enum: ['INCOME', 'OUTCOME'] })
	type: $Enums.Type;

	@ApiProperty()
	forAll: boolean;

	@ApiProperty({ required: false, nullable: true })
	userId: number | null;
}
