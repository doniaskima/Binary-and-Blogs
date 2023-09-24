import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as Dotenv from 'dotenv';

Dotenv.config({ path: '.env' });
const PORT = process.env.PORT;
const PREFIX = process.env.PREFIX;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  await app.listen(PORT, () => {
    Logger.log(
      `Server has started, access the API at: http://localhost:${PORT}`,
    );
  });
}

bootstrap();
