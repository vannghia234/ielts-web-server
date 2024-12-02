import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { EBannerType } from 'src/lib/entity/banner/EBannerType';

export class UpdateBannerDTO {
	@ApiProperty()
	@IsString()
	type: EBannerType;

	@ApiProperty()
	@IsString()
	src: string;

	@ApiProperty()
	@IsString()
	content: string;
}
