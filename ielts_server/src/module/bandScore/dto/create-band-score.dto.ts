import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { IBandScoreItem } from 'src/lib/entity/bandScore/i-bandScore-item';

export class CreateBandScoreDTO {
	@ApiProperty()
	name: string;

	@IsNotEmpty()
	@IsArray()
	@ApiProperty()
	bandsScore: IBandScoreItem[];
}
