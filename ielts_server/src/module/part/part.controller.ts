import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Param,
	Body,
	Query,
	BadRequestException,
} from '@nestjs/common';
import { PartService } from './part.service';
import { Part } from 'src/lib/entity/part/Part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { Public } from 'src/shared/constant/meta-data';
import { UpdatePartDto } from './dto/update-part.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { publicOperation } from '../user/controller/user-answer.controller';
import { Skill } from 'src/shared/constant/enum_database';

@Controller('parts')
@ApiTags('parts')
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
@Public()
export class PartController {
	constructor(private readonly partService: PartService) {}

	@Get()
	@Public()
	async find(
		@Query('search') search = '',
		@Query('limit') limit = 10,
		@Query('page') page = 1,
		@Query('skill') skill = '',
		@Query('partnumber') partNumber = '',
		@Query('notInCode') notInCode = '',
	): Promise<any> {
		try {
			const { parts, totalPage } = await this.partService.find(
				search,
				limit,
				page,
				skill,
				partNumber,
				notInCode,
			);
			return {
				message: 'Get Parts Successfully',
				results: {
					parts,
					count: parts.length,
					totalPage,
				},
			};
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	@Get(':skill')
	@Public()
	@ApiOperation(publicOperation)
	async findBySkill(@Param('skill') skill: string): Promise<any> {
		return this.partService.findBySkill(skill as Skill);
	}

	@Get(':id')
	@Public()
	@ApiOperation(publicOperation)
	async findOne(@Param('id') id: string): Promise<Part> {
		return this.partService.findOne(id);
	}

	@Post()
	async create(@Body() part: CreatePartDto): Promise<Part> {
		return this.partService.create(part);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() part: UpdatePartDto,
	): Promise<Part> {
		return this.partService.update(id, part);
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<Part[]> {
		return this.partService.remove(id);
	}
}
