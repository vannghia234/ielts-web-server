import { Exam } from 'src/lib/entity/exam/exam.entity';
import { Skill, TestStatus } from 'src/shared/constant/enum_database';

export class ResBaseExam {
	id: string;
	code: string;
	name: string;
	title: string;
	src: string;
	description: string;
	havePassword: boolean;
	time: string;
	status: TestStatus;
	skillsExam: {
		id: string;
		name: Skill;
	}[];

	constructor(data: Exam) {
		this.id = data.id;
		this.code = data.code;
		this.name = data.name;
		this.title = data.title;
		this.src = data.src;
		this.description = data.description;
		this.havePassword = !!data.password;
		this.time = data.time;
		this.status = data.status;
		this.skillsExam = data.skillExam.map((skill) => {
			return {
				id: skill.id,
				name: skill.name,
			};
		});
	}
}
