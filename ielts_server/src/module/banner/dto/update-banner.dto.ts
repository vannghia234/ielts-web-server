import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IBandScoreItem } from 'src/lib/entity/bandScore/i-bandScore-item';

export class UpdateBannerDTO {
	@ApiProperty()
	@IsString()
	type: string;

	@ApiProperty()
	@IsString()
	src: string;

	@ApiProperty()
	@IsString()
	content: string;
}
