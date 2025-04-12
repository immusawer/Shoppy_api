// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

import serverlessExpress from '@vendia/serverless-express';
import { Handler, Context, Callback } from 'aws-lambda';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Static files
  const uploadPath = join(__dirname, '..', 'uploads');
  app.useStaticAssets(uploadPath, {
    prefix: '/uploads/',
  });

  // CORS settings
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Initialize without starting a listener
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  server = serverlessExpress({ app: expressApp });
}

bootstrap();

export const handler: Handler = (event: any, context: Context, callback: Callback) => {
  return server(event, context, callback);
};
