import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { Module } from '@nestjs/common';
import { userRepositories } from './repository';
import { User } from 'src/lib/entity/user/user.entity';
import { UserAnswer } from 'src/lib/entity/user/user-answer.entity';
import { UserAnswerDetail } from 'src/lib/entity/user/user-answer-detail.entity';
import { BCryptService } from './service/bcrypt.service';
import { UserAnswerService } from './service/user-answer.service';
import { UserAnswerController } from './controller/user-answer.controller';
import { userServices } from './service';
import { UserAnswerDetailController } from './controller/user-answer-detail.controller';
import { ExamModule } from '../exam/exam.module';
import { ApiResponse } from '@nestjs/swagger';

@Module({
  imports: [
    ExamModule,
    TypeOrmModule.forFeature([User, UserAnswer, UserAnswerDetail]),
  ],
  controllers: [
    UserController,
    UserAnswerController,
    UserAnswerDetailController,
  ],
  providers: [...userServices, BCryptService, ...userRepositories],
  exports: [...userServices, BCryptService, ...userRepositories],
})
export class UserModule {}
