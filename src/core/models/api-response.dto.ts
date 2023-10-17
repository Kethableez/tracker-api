import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse {
	@ApiProperty()
	header: string;

	@ApiProperty()
	message?: string;
}
