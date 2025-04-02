// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...data,
        userId, // Ensure userId is saved in the database
      },
    });
    console.log(data)
  }

  async getAllProducts() {
    const products = await this.prisma.product.findMany({
      select: {    
        id: true,
        name: true,
        detail: true,
        price: true,
        imageUrl: true,
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    console.log("Products from database:", JSON.stringify(products, null, 2));
    return products;
  }
}
