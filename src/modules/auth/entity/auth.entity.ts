import { ApiProperty } from '@nestjs/swagger';

export class AuthEnt {
	@ApiProperty()
	accessToken: string;

	@ApiProperty()
	userId: number;
}
