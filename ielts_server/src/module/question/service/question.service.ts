// /*
// https://docs.nestjs.com/providers#services
// */

// import { Injectable } from '@nestjs/common';
// import { QuestionRepository } from '../repository/question.repository';
// import { Question } from 'src/lib/entity/question/question.entity';

// @Injectable()
// export class QuestionService {
//   constructor(private readonly questionRepo: QuestionRepository) {}

//   async findAll(): Promise<Question[]> {
//     return this.questionRepo.findAll();
//   }

//   async findOne(id: string): Promise<Question> {
//     const Question = await this.questionRepo.findOne(id);
//     return Question;
//   }

//   async create(Question: Partial<Question>): Promise<Question> {
//     return this.questionRepo.create(Question);
//   }

//   async update(
//     id: string,
//     updateQuestion: Partial<Question>,
//   ): Promise<Question> {
//     return this.questionRepo.update(id, updateQuestion);
//   }

//   async remove(id: string): Promise<void> {
//     await this.questionRepo.remove(id);
//   }
// }
