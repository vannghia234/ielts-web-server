import { UpdateGroupQuestionDto } from './update-group-question.dto';

export class UpdateManyGroupQuestionDto {
  partId: string;
  groupQuestions: UpdateGroupQuestionDto[];
}
