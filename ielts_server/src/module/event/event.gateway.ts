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

@WebSocketGateway(8001, { transports: ['websocket'] })
export class EventGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(EventGateWay.name);

  @WebSocketServer()
  server: Server;

  //handle connection
  async handleConnection(socket: Socket, ...args: any[]) {
    console.log(`client connected [${socket.id}]`);
    const authHeader = socket.handshake.headers.token;
    if (authHeader) {
      try {
        const userId = await this.authService.authenticate(authHeader);
        this.logger.log('userId ' + `[${userId}]`);
        socket.join(userId);
        socket.data.userId = userId;
      } catch (error) {
        socket.disconnect();
      }
    } else {
      socket.disconnect();
    }
  }

  //handle disconnection
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`client disconnected ${socket.data.userId}`);
  }

  @SubscribeMessage('onStartExam')
  handleStartExam(@MessageBody() body, @ConnectedSocket() socket: Socket) {
    console.log('listening ' + socket.data.userId);
    this.startCountDown(socket, 30);
  }

  startCountDown(socket: Socket, countDownTimer: number) {
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
  }

  handleEmitSocket(data: any, to: string, event: string) {
    if (to) {
      this.server.to(to).emit(event, data);
    } else {
      this.server.emit(event, data);
    }
  }
}
