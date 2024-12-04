import { BannerService } from '../service/banner.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { publicOperation } from 'src/module/user/controller/user-answer.controller';
import { Public } from 'src/shared/constant/meta-data';
import { CreateBannerDTO } from '../dto/create-banner.dto';
import { UpdateBannerDTO } from '../dto/update-banner.dto';
import { EBannerType } from 'src/lib/entity/banner/EBannerType';

@Controller('banners')
@ApiTags('banner')
@ApiResponse({
	status: 200,
	description: 'OK',
	content: {
		ApiResponse: {
			example: 'OK ',
		},
	},
})
@ApiResponse({ status: 404, description: 'Not Found' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class BannerController {
	constructor(private readonly bannerService: BannerService) {}

	@Get()
	@Public()
	@ApiOperation(publicOperation)
	async findAll() {
		return this.bannerService.findAll();
	}

	@Get(':id')
	@Public()
	@ApiOperation(publicOperation)
	async findOne(@Param('id') id: string) {
		return this.bannerService.findOne(id);
	}

	@Post()
	@Public()
	@ApiOperation(publicOperation)
	async create(@Body() data: CreateBannerDTO) {
		return this.bannerService.create(data);
	}

	@Patch(':id')
	@Public()
	@ApiOperation(publicOperation)
	async update(@Param('id') id: string, @Body() data: UpdateBannerDTO) {
		return this.bannerService.update(id, data);
	}

	@Delete(':id')
	@Public()
	@ApiOperation(publicOperation)
	async delete(@Param('id') id: string) {
		return this.bannerService.delete(id);
	}
}
