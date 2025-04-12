import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SafeUser } from '../auth/user.types';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<SafeUser | null>;
    login(user: SafeUser): Promise<{
        access_token: string;
        user: SafeUser;
    }>;
}
