import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ImageService } from './image.service';
import { Request } from 'express';
import { JwtPayload } from '../auth/jwt-payload.type';
export declare class ProductsController {
    private readonly productsService;
    private readonly imageService;
    constructor(productsService: ProductsService, imageService: ImageService);
    createProduct(userId: number, request: Request & {
        user: JwtPayload;
    }, createProductDto: CreateProductDto, file: Express.Multer.File): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        detail: string;
        price: number;
        imageUrl: string | null;
        categoryId: number;
        userId: number;
    }>;
    getAllProducts(): Promise<{
        category: {
            name: string;
            id: number;
        };
        name: string;
        id: number;
        detail: string;
        price: number;
        imageUrl: string | null;
    }[]>;
}
