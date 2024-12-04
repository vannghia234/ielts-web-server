import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { EBannerType } from 'src/lib/entity/banner/EBannerType';

export class FilterQueryBannerDTO {
	@ApiProperty()
	@IsString()
	type?: EBannerType[];
    
}
