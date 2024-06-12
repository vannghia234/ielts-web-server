export interface IRoom {
	id: string;
	userAnswer?: {
		id: string;
		timer: NodeJS.Timer;
	};
}

export class Room implements IRoom {
	id: string;
	userAnswer?: { id: string; timer: NodeJS.Timer };
	constructor(data: IRoom) {
		this.id = data.id;
		this.userAnswer = data.userAnswer;
	}
}
