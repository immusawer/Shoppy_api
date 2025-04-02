// src/auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from './jwt-payload.type';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromRequest(request);
    
    if (!token) {
      console.log('No token found in request');
      throw new UnauthorizedException('No token provided');
    }

    try {
      console.log('Attempting to verify token');
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      console.log('Token verified successfully:', payload);
      
      if (!payload.sub) {
        console.log('Token payload missing sub field');
        throw new UnauthorizedException('Invalid token payload');
      }

      // Set both id and sub in the user object
      request.user = { 
        id: payload.sub,
        sub: payload.sub,
        email: payload.email 
      };
      console.log('User object set in request:', request.user);
      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    // First try to get token from Authorization header
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Then try to get token from cookie
    return request.cookies?.access_token;
  }
}