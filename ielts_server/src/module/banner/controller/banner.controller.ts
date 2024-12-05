import { BannerService } from '../service/banner.service';
import { Body, Controller, Delete, Get, Headers, NotFoundException, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { publicOperation } from 'src/module/user/controller/user-answer.controller';
import { Public } from 'src/shared/constant/meta-data';
import { CreateBannerDTO } from '../dto/create-banner.dto';
import { UpdateBannerDTO } from '../dto/update-banner.dto';
import { EBannerType } from 'src/lib/entity/banner/EBannerType';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';

import * as fs from 'fs';

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

	// @Patch(':id')
	// @Public()
	// @ApiOperation(publicOperation)
	// async update(@Param('id') id: string, @Body() data: UpdateBannerDTO) {
	// 	const banner = await this.bannerService.findOne(id);
	// 	if (!banner) throw new NotFoundException(`Data with id ${id} not found`);
	// 	return this.bannerService.update(banner, data);
	// }

	@Patch(':id')
	@Public()
	@ApiOperation(publicOperation)
	@UseInterceptors(FileInterceptor('image'))
	async uploadWithFile(@Param('id') id: string, @Body() data: UpdateBannerDTO, @UploadedFile() file?: Express.Multer.File) {
		const banner = await this.bannerService.findOne(id);
		if (!banner) throw new NotFoundException(`Data with id ${id} not found`);
		return this.bannerService.updateWithFile(banner, data, file)
	}

	@Delete(':id')
	@Public()
	@ApiOperation(publicOperation)
	async delete(@Param('id') id: string) {
		return this.bannerService.delete(id);
	}
}
