import { RefreshToken } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenEnt implements RefreshToken {
	@ApiProperty()
	id: number;

	@ApiProperty()
	token: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	expiresIn: Date;

	@ApiProperty()
	revokedAt: Date;

	@ApiProperty()
	userId: number;
}
