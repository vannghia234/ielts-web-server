import { BandScoreService } from '../service/banScore.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { publicOperation } from 'src/module/user/controller/user-answer.controller';
import { Public } from 'src/shared/constant/meta-data';
import { CreateBandScoreDTO } from '../dto/create-band-score.dto';
import { UpdateBandScoreDTO } from '../dto/update-band-score.dto';

@Controller('band-score')
@ApiTags('BandScore')
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
export class BandScoreController {
	constructor(private readonly bandScoreService: BandScoreService) {}

	@Get()
	@Public()
	@ApiOperation(publicOperation)
	async findAll() {
		return this.bandScoreService.findAll();
	}

	@Get(':id')
	@Public()
	@ApiOperation(publicOperation)
	async findOne(@Param('id') id: string) {
		return this.bandScoreService.findOne(id);
	}

	@Post()
	@Public()
	@ApiOperation(publicOperation)
	async create(@Body() data: CreateBandScoreDTO) {
		return this.bandScoreService.create(data);
	}

	@Patch()
	@Public()
	@ApiOperation(publicOperation)
	async update(@Param('id') id: string, @Body() data: UpdateBandScoreDTO) {
		return this.bandScoreService.update(id, data);
	}

	@Delete(':id')
	@Public()
	@ApiOperation(publicOperation)
	async delete(@Param('id') id: string) {
		return this.bandScoreService.delete(id);
	}
}
