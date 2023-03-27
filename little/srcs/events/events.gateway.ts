import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventUserDto } from 'srcs/user/dto/event-user.dto';
import { UserService } from 'srcs/user/user.service';

@WebSocketGateway()
export class EventsGateway {
  constructor(private readonly userService: UserService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newUser')
  alertToAllUsers(@MessageBody() payload: EventUserDto): void {
    console.log('newUser', payload);
    this.server.emit('alertNewUser', payload);
  }
}
