import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/lib/entity/question/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async findOne(id: string): Promise<Question | null> {
    const question = await this.questionRepository.findOne({
      where: { id: id },
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  async create(question: Partial<Question>): Promise<Question> {
    const newQuestion = this.questionRepository.create(question);
    return this.questionRepository.save(newQuestion);
  }

  async update(
    id: string,
    updateQuestion: Partial<Question>,
  ): Promise<Question> {
    await this.findOne(id); // Ensure question exists
    await this.questionRepository.update(id, updateQuestion);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.questionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Question not found');
    }
  }
}
