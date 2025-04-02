"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(createUserDto, file) {
        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            let profileImage = null;
            if (file) {
                const uploadDir = path.join(process.cwd(), 'uploads', 'profiles');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                const fileExtension = path.extname(file.originalname);
                const fileName = `${(0, uuid_1.v4)()}${fileExtension}`;
                const filePath = path.join(uploadDir, fileName);
                fs.writeFileSync(filePath, file.buffer);
                profileImage = `/uploads/profiles/${fileName}`;
            }
            return await this.prisma.user.create({
                data: {
                    username: createUserDto.username,
                    email: createUserDto.email,
                    password: hashedPassword,
                    name: createUserDto.name,
                    profileImage,
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                if (error.meta?.target?.includes('username')) {
                    throw new common_1.BadRequestException('This username is already taken. Please choose another.');
                }
                throw new common_1.BadRequestException('This email is already registered. Please use a different email.');
            }
            throw new common_1.BadRequestException('An error occurred. Please try again.');
        }
    }
    async findUserByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async findUserById(id) {
        if (!id) {
            throw new common_1.BadRequestException('User ID is required');
        }
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    name: true,
                    profileImage: true,
                    createdAt: true,
                }
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch user details');
        }
    }
    async updateProfileImage(id, profileImage) {
        try {
            return await this.prisma.user.update({
                where: { id },
                data: { profileImage },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    name: true,
                    profileImage: true,
                    createdAt: true,
                }
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('User not found');
        }
    }
    async uploadProfileImage(id, file) {
        try {
            const uploadDir = path.join(process.cwd(), 'uploads', 'profiles');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const fileExtension = path.extname(file.originalname);
            const fileName = `${(0, uuid_1.v4)()}${fileExtension}`;
            const filePath = path.join(uploadDir, fileName);
            fs.writeFileSync(filePath, file.buffer);
            const profileImage = `/uploads/profiles/${fileName}`;
            return await this.prisma.user.update({
                where: { id },
                data: { profileImage },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    name: true,
                    profileImage: true,
                    createdAt: true,
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to upload profile image');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map