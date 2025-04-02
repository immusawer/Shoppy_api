// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards, Request, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('profileImage'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.usersService.createUser(createUserDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    console.log('User from request:', req.user); // Debug log
    if (!req.user?.id) {
      throw new Error('User ID not found in request');
    }
    return this.usersService.findUserById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!req.user?.id) {
      throw new Error('User ID not found in request');
    }
    return this.usersService.uploadProfileImage(req.user.id, file);
  }
}