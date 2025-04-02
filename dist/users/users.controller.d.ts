import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, file?: Express.Multer.File): Promise<{
        name: string | null;
        id: number;
        username: string;
        email: string;
        password: string;
        profileImage: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProfile(req: any): Promise<{
        name: string | null;
        id: number;
        username: string;
        email: string;
        profileImage: string | null;
        createdAt: Date;
    }>;
    uploadProfileImage(req: any, file: Express.Multer.File): Promise<{
        name: string | null;
        id: number;
        username: string;
        email: string;
        profileImage: string | null;
        createdAt: Date;
    }>;
}
