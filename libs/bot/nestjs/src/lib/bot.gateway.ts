import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Socket,Server } from 'socket.io';

@WebSocketGateway(3001)

export class BotGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    afterInit(server: Server) {
        console.log('initialized')
    }

    handleConnection(client: Socket, ...args: any[]){
        console.log(`New client connected...: ${client.id}`);
        client.emit('connected', 'Successfully connected to the server.');
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client:Socket, text:string):WsResponse<string> {
        console.log(`got new event`);
        return {event: 'msgToClient', 'data': text};
    }
}