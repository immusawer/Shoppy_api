import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, response: Response): Promise<{
        success: boolean;
        message: string;
        user: import("./user.types").SafeUser;
        access_token: string;
    }>;
}
