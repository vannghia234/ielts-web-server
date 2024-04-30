import { ExamSkillDetailService } from './exam-skill-detail.service';
import { ExamService } from './exam.service';
import { SkillExamService } from './skill-exam.service';
import { PartOfExamService } from './part-of-exam.service';

export const examServices = [
  ExamService,
  SkillExamService,
  ExamSkillDetailService,
  PartOfExamService,
];
