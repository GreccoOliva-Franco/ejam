import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');

  const config = app.get(ConfigService);
  const port = config.get('APP_PORT');
  await app.listen(port);
}
bootstrap();
