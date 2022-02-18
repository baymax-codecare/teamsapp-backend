import { RedisIoAdapter } from './adapter/redis.adapter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
