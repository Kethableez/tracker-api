import { ApiProperty } from '@nestjs/swagger';
import { Account, Currency } from '@prisma/client';

export class AccountEnt implements Account {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	color: string;

	@ApiProperty()
	currency: Currency;

	@ApiProperty()
	userId: number;
}
