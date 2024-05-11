import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Param,
	Body,
} from '@nestjs/common';
import { PartService } from './part.service';
import { Part } from 'src/lib/entity/part/Part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { Public } from 'src/shared/constant/meta-data';
import { UpdatePartDto } from './dto/update-part.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { publicOperation } from '../user/controller/user-answer.controller';

@Controller('part')
@Controller('group-questions')
@Controller('auth')
@ApiTags('part')
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
	@ApiOperation(publicOperation)

	async findAll(): Promise<Part[]> {
		return this.partService.findAll();
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
