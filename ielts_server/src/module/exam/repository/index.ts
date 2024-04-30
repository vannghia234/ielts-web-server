import { Skill } from 'src/shared/constant/enum_database';
import { ExamSkillDetailRepository } from './exam-skill-detail.repository';
import { ExamRepository } from './exam.repository';
import { PartOfExamRepository } from './part-of-exam.repository';
import { SkillExamRepository } from './skill-exam.repository';

export const examRepositories = [
  ExamRepository,
  ExamSkillDetailRepository,
  PartOfExamRepository,
  SkillExamRepository,
];
