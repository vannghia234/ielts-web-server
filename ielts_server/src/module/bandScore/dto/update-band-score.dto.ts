import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IBandScoreItem } from 'src/lib/entity/bandScore/i-bandScore-item';

export class UpdateBandScoreDTO {
	@ApiProperty()
	name: string;

	@ApiProperty()
	title: string;

	@IsNotEmpty()
	@IsArray()
	@ApiProperty()
	bands: IBandScoreItem[];
}
