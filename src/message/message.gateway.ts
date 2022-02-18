import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: '*:*',
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('MessageGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: any): void {
    console.log('/////////////////////////');
    console.log('MSG TO SERVER CALLED');
    // return this.server.emit('msgToClient', payload);
    this.server.to(payload.room).emit('msgToClient', payload);
  }

  @SubscribeMessage('joinRoom')
  public joinRoom(client: Socket, room: string): void {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  public leaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  afterInit(server: Server) {
    this.logger.log('init');
    console.log('Socket init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.logger.log('init');
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    console.log(`Client connected: ${client.id}`);
  }
}
