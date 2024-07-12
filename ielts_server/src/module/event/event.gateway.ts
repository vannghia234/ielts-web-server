import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/service/auth.service';
import { Logger } from '@nestjs/common';
import { IRoom, Room } from './interface/IRoom';
import { UserAnswerService } from '../user/service/user-answer.service';
import { ExamService } from '../exam/service/exam.service';

@WebSocketGateway(8001, { transports: ['websocket'] })
export class EventGateWay implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(
		private readonly authService: AuthService,
		private readonly userAnswerService: UserAnswerService,
		private readonly examService: ExamService,
	) {}
	private readonly logger = new Logger(EventGateWay.name);

	@WebSocketServer()
	server: Server;
	// rooms: IRoom[] = [];

	//handle connection
	async handleConnection(socket: Socket, ...args: any[]) {
		this.logger.log(`[client connected] ${socket.id}`);
		const authHeader = socket.handshake.auth.headers.token;
		if (!authHeader) {
			socket.disconnect();
			return;
		}
		try {
			const userId = await this.authService.authenticate(authHeader);
			this.logger.log(`[USER ID] => ${userId}`);
			// const room = this.rooms.find((room) => room.id === userId);
			// if (!room) {
			// 	const room = new Room({ id: userId });
			// 	this.rooms.push(room);
			// }
			await socket.join(userId);

			socket.data.userId = userId;
		} catch (error) {
			console.log(error);
			socket.disconnect();
		}
	}

	//handle disconnection
	handleDisconnect(@ConnectedSocket() socket: Socket) {
		try {
			this.logger.log(`[Client disconnected] ${socket.data.userId}`);
			clearInterval(this.getTimer(socket));
			return;
		} catch (error) {
			console.log(error);
		}
	}

	@SubscribeMessage('onStartExam')
	async handleStartExam(
		@MessageBody() body: { userAnswerId: string; codeExam: string },
		@ConnectedSocket() socket: Socket,
	) {
		try {
			const userId = socket.data.userId;
			this.logger.log(`[UserID ${userId}] Start exam`);
			const userAnswer = await this.userAnswerService.findOne(
				body.userAnswerId,
			);
			const exam = await this.examService.findOneBase(body.codeExam);

			const start_dateTime = new Date(userAnswer.timeStart).getTime();
			const [h, m, s] = exam.time.split(':').map((t) => Number.parseInt(t));
			const end_dataTime = (h * 3600 + m * 60 + s) * 1000;
			const current_dateTime = new Date().getTime();
			const subTime = end_dataTime - (current_dateTime - start_dateTime);
			this.startCountDown(socket, subTime / 1000);
		} catch (error) {
			console.log(error);
		}
	}

	@SubscribeMessage('onSubmitExam')
	async handleSubmitExam(@ConnectedSocket() socket: Socket) {
		try {
			if (socket.data?.countDownTimer) {
				clearInterval(socket.data?.countDownTimer);
			}
		} catch (error) {
			console.log(error)
		}
	}

	startCountDown(socket: Socket, countDownTimer: number) {
		try {
			if (socket.data?.countDownTimer) {
				clearInterval(socket.data?.countDownTimer);
			}
			const countdownInterval = setInterval(() => {
				this.handleEmitSocket(
					countDownTimer,
					socket.data.userId,
					'onCountDownExamTimer',
				);
				countDownTimer--;
				if (countDownTimer < 0) {
					clearInterval(countdownInterval);
				}
			}, 1000);
			socket.data.countDownTimer = countdownInterval;
		} catch (error) {
			console.log(error);
		}
	}

	handleEmitSocket(data: any, to: string, event: string) {
		if (to) {
			this.server.to(to).emit(event, data);
		} else {
			this.server.emit(event, data);
		}
	}

	getTimer(socket: Socket): NodeJS.Timer {
		return socket.data.countDownTimer;
	}
}
