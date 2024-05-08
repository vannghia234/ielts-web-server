import {
  multipleAnswer,
  questionMultiAnswer,
  questionMultiChoiceObj,
} from './interface';

//1. đọc bảng tuyên ngôn độc lập                    a. 2/9/1945, b. 2/2/1999, c......, d... => dư đáp án, dữ liệu dư lưu thì questionContent = null
//2. cách mạng tháng 8                              a. 2/9/1945, b. 2/2/1999, c......, d... => dư đáp án, dữ liệu dư lưu thì questionContent = null
//3. giải phóng
export type questionDragAndDropObj = {
  id: string;
  questionContent: string;
  answer: string;
};

export class ShortAnswer {
  content: string;
  answerList: multipleAnswer[];
}
// ["Color", "colour"] => một câu hỏi có danh sách câu trả lời chỉ cần trả lời đúng một câu trong answer list
export class MultipleAnswer {
  questionList: questionMultiAnswer;
}

export class MultipleChoice {
  questionList: questionMultiChoiceObj[];
}
export class DragAndDrop {
  questionList: questionDragAndDropObj[];
}
