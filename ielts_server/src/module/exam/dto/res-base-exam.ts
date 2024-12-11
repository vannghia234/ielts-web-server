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

		details: ({
			id: string;
			part: {
				id: string
				publicId: string
				title: string
				content: string
				resource: string
				partNumber: string
				createdAt: string
				updatedAt: string
			}
		})[]
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

				details: skill.details.map(detail => {
					return {
						id: detail.id,
						part: {
							id: detail.part.id,
							publicId: detail.part.publicId.toString(),
							title: detail.part.title,
							content: detail.part.content,
							resource: detail.part.resource,
							partNumber: detail.part.partNumber,
							createdAt: detail.part.createdAt.toISOString(),
							updatedAt: detail.part.updatedAt.toISOString(),
						}
					}
				})
			};
		});
	}
}
