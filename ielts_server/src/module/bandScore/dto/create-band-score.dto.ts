import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IBandScoreItem } from 'src/lib/entity/bandScore/i-bandScore-item';

export class CreateBandScoreDTO {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsArray()
	@ApiProperty()
	bands: IBandScoreItem[];
}
