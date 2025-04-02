import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const secret = configService.get('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException("JWT payload is missing required fields");
    }
  
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
  
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
  
    // Return both id and sub fields for compatibility
    return { 
      id: user.id,
      sub: user.id,
      email: user.email 
    };
  }
}
