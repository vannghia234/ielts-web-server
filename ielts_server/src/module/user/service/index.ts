import { UserAnswerDetailRepository } from '../repository/user-answer-detail.repository';
import { TasksService } from './task.service';
import { UserAnswerDetailService } from './user-answer-detail.service';
import { UserAnswerService } from './user-answer.service';
import { UserService } from './user.service';

export const userServices = [
  UserAnswerService,
  UserService,
  UserAnswerDetailService,
  TasksService
];
