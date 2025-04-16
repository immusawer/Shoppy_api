import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, data: CreateProductDto): Promise<{
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
