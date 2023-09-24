import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as Dotenv from 'dotenv';
import { join } from 'path';
import { AuthGuard } from './guard/auth.guard';
import { createSwagger } from './swaggar';

Dotenv.config({ path: '.env' });
const PORT = process.env.PORT;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard());
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  createSwagger(app);
  app.enableCors();
  await app.listen(PORT, () => {
    Logger.log(
      `Server has started, access the API at: http://localhost:${PORT}`,
    );
  });
}

bootstrap();
