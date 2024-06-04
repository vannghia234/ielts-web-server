import { BCryptService } from './bcrypt.service';
import { HandleCreateUserAnswersDetail } from './handle-create-user-answers-detail.manager';
import { TasksService } from './task.service';
import { UserAnswerDetailService } from './user-answer-detail.service';
import { UserAnswerService } from './user-answer.service';
import { UserExamProcessService } from './user-exam-process.service';
import { UserService } from './user.service';

export const userServices = [
	UserAnswerService,
	UserService,
	UserAnswerDetailService,
	TasksService,
	UserExamProcessService,
	BCryptService,
	HandleCreateUserAnswersDetail,
];
