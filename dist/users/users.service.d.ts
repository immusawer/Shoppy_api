import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(createUserDto: CreateUserDto, file?: Express.Multer.File): Promise<{
        name: string | null;
        id: number;
        username: string;
        email: string;
        password: string;
        profileImage: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findUserByEmail(email: string): Promise<{
        name: string | null;
        id: number;
        username: string;
        email: string;
        password: string;
        profileImage: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findUserById(id: number): Promise<{
        name: string | null;
        id: number;
        username: string;
        email: string;
        profileImage: string | null;
        createdAt: Date;
    }>;
    updateProfileImage(id: number, profileImage: string): Promise<{
        name: string | null;
        id: number;
        username: string;
        email: string;
        profileImage: string | null;
        createdAt: Date;
    }>;
    uploadProfileImage(id: number, file: Express.Multer.File): Promise<{
        name: string | null;
        id: number;
        username: string;
        email: string;
        profileImage: string | null;
        createdAt: Date;
    }>;
}
