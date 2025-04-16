import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto'; // Import CreateUserDto
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      
      let profileImage: string | null = null;
      
      if (file) {
        // Create uploads directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), 'uploads', 'profiles');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Generate unique filename
        const fileExtension = path.extname(file.originalname);
        const fileName = `${uuidv4()}${fileExtension}`;
        const filePath = path.join(uploadDir, fileName);

        // Save file
        fs.writeFileSync(filePath, file.buffer);
        profileImage = `/uploads/profiles/${fileName}` as string;
      }

      return await this.prisma.user.create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email.toLowerCase(),
          password: hashedPassword,
          name: createUserDto.name,
          profileImage,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('username')) {
          throw new BadRequestException('This username is already taken. Please choose another.');
        }
        throw new BadRequestException('This email is already registered. Please use a different email.');
      }
      throw new BadRequestException('An error occurred. Please try again.');
    }
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: number) {
    if (!id) {
      throw new BadRequestException('User ID is required');
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
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch user details');
    }
  }

  async updateProfileImage(id: number, profileImage: string) {
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
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async uploadProfileImage(id: number, file: Express.Multer.File) {
    try {
      // Create uploads directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'uploads', 'profiles');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate unique filename
      const fileExtension = path.extname(file.originalname);
      const fileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);

      // Save file
      fs.writeFileSync(filePath, file.buffer);

      // Update user profile image in database
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
    } catch (error) {
      throw new BadRequestException('Failed to upload profile image');
    }
  }
}
