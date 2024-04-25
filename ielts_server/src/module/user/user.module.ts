import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { Module } from '@nestjs/common';
import { userRepositories } from './repository';
import { User } from 'src/lib/entity/user/user.entity';
import { UserAnswer } from 'src/lib/entity/user/user-answer.entity';
import { UserAnswerDetail } from 'src/lib/entity/user/user-answer-detail.entity';
import { BCryptService } from './service/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAnswer, UserAnswerDetail])],
  controllers: [UserController],
  providers: [UserService, BCryptService, ...userRepositories],
  exports: [UserService, BCryptService, ...userRepositories],
})
export class UserModule {}
