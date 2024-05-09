import {
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

@WebSocketGateway(8001)
export class EventGateWay
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(EventGateWay.name);

  @WebSocketServer()
  server: Server;

  //handle connection
  async handleConnection(socket: Socket, ...args: any[]) {
    console.log(`client ${socket.id} connected`);
    const authHeader = socket.handshake.headers.token;
    console.log('header socket ' + authHeader);
    if (authHeader) {
      try {
        const userId = await this.authService.authenticate(authHeader);
        console.log(
          'userId of socket ' + userId + ' with client Id ',
          socket.id,
        );
        socket.data.userId = userId;
      } catch (error) {
        socket.disconnect();
      }
    } else {
      socket.disconnect();
    }
  }

  afterInit(server: any) {}

  //handle disconnection
  handleDisconnect(socket: Socket) {
    console.log(socket.id, socket.data.userId, ' disconnect');
  }

  @SubscribeMessage('mess')
  handleEvent(@MessageBody() data: string) {
    console.log(data);
    this.server.emit('onMess', 'hi ag');
    return 'hi mày';
  }
  //
}
