import { GroupQuestion } from 'src/lib/entity/groupQuestion/GroupQuestion.entity';
import { CreateGroupQuestionDto } from './create-group-question.dto';
import { QuestionType } from 'src/shared/constant/enum_database';
import {
  Dropdown,
  FillTheBlank,
  Matching,
  MatchingFillBlank,
  MatchingHeading,
  MultipleChoice,
  MultipleResponse,
} from 'src/lib/entity/groupQuestion/QuestionType';
import { Part } from 'src/lib/entity/part/Part.entity';
import { UpdateGroupQuestionDto } from './update-group-question.dto';

export class GroupQuestionMapper {
  static createGroupQuestion(
    dto: CreateGroupQuestionDto | UpdateGroupQuestionDto,
    part: Part,
  ): GroupQuestion {
    const groupQuestion = new GroupQuestion();
    // Set properties from DTO
    groupQuestion.instruction = dto.instruction;
    groupQuestion.questionType = dto.questionType;
    groupQuestion.part = part;

    // Map 'data' based on 'questionType'
    switch (dto.questionType) {
      case QuestionType.MultipleChoice:
        groupQuestion.data = dto.data as MultipleChoice[];
        break;
      case QuestionType.MultipleResponse:
        groupQuestion.data = dto.data as MultipleResponse[];
        break;
      case QuestionType.Dropdown:
        groupQuestion.data = dto.data as Dropdown[];
        break;
      case QuestionType.Matching:
        groupQuestion.data = dto.data as Matching[];
        break;
      case QuestionType.MatchingHeading:
        groupQuestion.data = dto.data as MatchingHeading[];
        break;
      case QuestionType.FillInTheBlank:
        groupQuestion.data = dto.data as FillTheBlank[];
        break;
      case QuestionType.MatchingFillInTheBlanks:
        groupQuestion.data = dto.data as MatchingFillBlank[];
        break;
      default:
        throw new Error(`Unsupported question type: ${dto.questionType}`);
    }

    return groupQuestion;
  }
}
