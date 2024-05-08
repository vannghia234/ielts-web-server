import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from 'src/lib/entity/part/Part.entity';
import { Repository } from 'typeorm';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Injectable()
export class PartService {
  constructor(
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
  ) {}
  async findAll(): Promise<Part[]> {
    return this.partRepository.find();
  }

  async findOne(id: string): Promise<Part> {
    return this.partRepository.findOne({
      where: { id },
      relations: ['groupQuestions'],
    });
  }

  async create(partCreate: CreatePartDto): Promise<Part> {
    const part = new Part();
    part.title = partCreate.title;
    part.partNumber = partCreate.partNumber;
    part.skill = partCreate.skill;
    return this.partRepository.save(part);
  }

  async update(id: string, partUpdate: UpdatePartDto): Promise<Part> {
    const existingPart = await this.partRepository.findOne({ where: { id } });
    if (!existingPart) {
      throw new Error(`Part with id ${id} not found`);
    }
    const part = new Part();
    part.title = partUpdate.title;
    part.partNumber = partUpdate.partNumber;
    part.skill = partUpdate.skill;
    await this.partRepository.update(id, part);
    return this.partRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.partRepository.delete(id);
  }
}
