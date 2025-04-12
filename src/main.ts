import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';  // Import serverless-express for serverless deployment

let server: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Configure static file serving
  const uploadPath = join(__dirname, '..', 'uploads');
  console.log('Static files path:', uploadPath);
  app.useStaticAssets(uploadPath, {
    prefix: '/uploads/',
  });

  // Enable CORS
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  app.enableCors({
    origin: 'http://localhost:3000', // Your Next.js origin
    credentials: true,
  });

  // Initialize without starting a listener
  await app.init();
  
  // Convert the NestJS app to a serverless handler
  const expressApp = app.getHttpAdapter().getInstance();
  server = serverlessExpress({ app: expressApp });
}

// Bootstrap the NestJS app
bootstrap();

export const handler = async (event: any, context: any) => {
  return server(event, context);
};
