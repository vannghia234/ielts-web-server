import { CreateGroupQuestionDto } from './create-group-question.dto';

export class CreateManyGroupQuestionDto {
  partId: string;
  groupQuestions: CreateGroupQuestionDto[];
}
