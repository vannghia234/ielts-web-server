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

@Controller('parts')
@Public()
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Get()
  async findAll(): Promise<Part[]> {
    return this.partService.findAll();
  }

  @Get(':id')
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
  async remove(@Param('id') id: string): Promise<void> {
    return this.partService.remove(id);
  }
}
