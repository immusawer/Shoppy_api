// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ImageService } from './image.service';
import { AuthModule } from '../auth/auth.module'; // Add this import

@Module({
  imports: [
    PrismaModule,
    AuthModule, // Import AuthModule to get access to JwtAuthGuard
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ImageService],
  // Remove PrismaService from providers since it's already provided by PrismaModule
})
export class ProductsModule {}