import { ApiProperty } from '@nestjs/swagger';

export class AvailableEnt {
	@ApiProperty()
	available: boolean;
}
