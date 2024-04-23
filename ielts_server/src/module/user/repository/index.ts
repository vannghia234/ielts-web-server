import { UserAnswerDetailRepository } from './user-answer-detail.repository';
import { UserAnswerRepository } from './user-answer.repository';
import { UsersRepository } from './user.repository';

export const userRepositories = [
  UsersRepository,
  UserAnswerDetailRepository,
  UserAnswerRepository,
];
