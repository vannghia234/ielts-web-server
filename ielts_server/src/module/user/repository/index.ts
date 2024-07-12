import { UserAnswerDetailRepository } from './user-answer-detail.repository';
import { UserAnswerRepository } from './user-answer.repository';
import { UserExamProcessRepository } from './user-exam-process.repository';
import { UsersRepository } from './user.repository';

export const userRepositories = [
	UsersRepository,
	UserAnswerDetailRepository,
	UserAnswerRepository,
	UserExamProcessRepository,
];
