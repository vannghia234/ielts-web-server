export enum Skill {
	READING = 'Reading',
	LISTENING = 'Listening',
	WRITING = 'Writing',
	SPEAKING = 'Speaking',
}
export enum TestStatus {
	DRAFT = 'DRAFT',
	PUBLISHED = 'PUBLISHED',
	LOCK = 'LOCK',
}
export enum UserRole {
	ADMIN = 'ADMIN',
	LECTURE = 'LECTURE',
	USER = 'USER',
	TEMP_USER = 'TEMPUSER',
}

export enum QuestionType {
	MultipleChoice = 'MultipleChoice',
	MultipleResponse = 'MultipleResponse',
	Dropdown = 'DropDown',
	DragAndDrop = 'DragAndDrop',
	FillInTheBlank = 'FillInTheBlank',
}

export enum PartNumber {
	Part1 = 'Part 1',
	Part2 = 'Part 2',
	Part3 = 'Part 3',
	Part4 = 'Part 4',
}
export interface SkillPart {
	skill: Skill;
	parts: PartNumber[];
}
