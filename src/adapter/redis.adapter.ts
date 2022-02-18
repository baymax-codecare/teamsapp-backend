import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number): Promise<any> {
    const server = super.createIOServer(port, { cors: true });

    const pubClient = createClient({
      url: 'redis://localhost:6379',
    });
    pubClient.connect();
    const subClient = pubClient.duplicate();
    subClient.connect();
    const redisAdapter = createAdapter(pubClient, subClient);
    server.adapter(redisAdapter);
    return server;
  }
}
