// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Configure static file serving with a direct path for Windows
  const uploadPath = join(__dirname, '..', 'uploads');
  console.log('Static files path:', uploadPath);
  app.useStaticAssets(uploadPath, {
    prefix: '/uploads/',
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  // main.ts
  app.enableCors({
    origin: 'http://localhost:3000', // Your Next.js origin
    credentials: true,
  });

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();