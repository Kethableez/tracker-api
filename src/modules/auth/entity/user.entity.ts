import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEnt implements User {
	constructor(partial: Partial<UserEnt>) {
		Object.assign(this, partial);
	}

	@ApiProperty()
	id: number;

	@ApiProperty()
	username: string;

	@Exclude()
	password: string;
}
