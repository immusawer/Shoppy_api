// src/products/products.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';
import { ImageService } from './image.service';
import * as fs from 'fs';
import { Request } from 'express';
import { JwtPayload } from '../auth/jwt-payload.type';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createProduct(
    @User('sub') userId: number, 
    @Req() request: Request & { user: JwtPayload }, // Typed request with user
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
    
  ) {
   
    console.log("User ID:", userId);
    // const userId = request.user.sub; // Now properly typed
    
    if (!userId) {
      throw new UnauthorizedException('User ID is missing from JWT');
    }

    console.log("Extracted userId from JWT:", userId);

    if (file) {
      const originalImagePath = `./uploads/${file.filename}`;
      const compressedImagePath = `./uploads/compressed-${file.filename}`;

      if (!fs.existsSync(originalImagePath)) {
        throw new Error(`Image file not found: ${originalImagePath}`);
      }

      await this.imageService.compressImage(originalImagePath, compressedImagePath);
      fs.unlinkSync(originalImagePath);

      createProductDto.imageUrl = `/uploads/compressed-${file.filename}`;
    }

    return this.productsService.create(userId, createProductDto);
  }

  @Get('all')
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }
}