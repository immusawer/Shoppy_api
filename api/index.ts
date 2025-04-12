// api/index.ts
import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Static files setup if necessary
  // const uploadPath = join(__dirname, '..', 'uploads');
  // app.useStaticAssets(uploadPath, {
  //   prefix: '/uploads/',
  // });

  // CORS setup if necessary
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your actual frontend origin
    credentials: true,
  });

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  server = serverlessExpress({ app: expressApp });
}

bootstrap();

export const handler: Handler = (event, context, callback) => {
  return server(event, context, callback);
};
