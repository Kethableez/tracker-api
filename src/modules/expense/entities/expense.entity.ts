import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Expense } from '@prisma/client';

export class ExpenseEnt implements Expense {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	amount: number;

	@ApiProperty()
	accountId: number;

	@ApiProperty({ enum: ['INCOME', 'OUTCOME'] })
	type: $Enums.Type;

	@ApiProperty()
	date: Date;

	@ApiProperty()
	hasDefaultCurrency: boolean;

	@ApiProperty({
		required: false,
		nullable: true,
		enum: ['USD', 'EUR', 'PLN']
	})
	currency: $Enums.Currency | null;

	@ApiProperty()
	categoryId: number;

	@ApiProperty()
	userId: number;
}
