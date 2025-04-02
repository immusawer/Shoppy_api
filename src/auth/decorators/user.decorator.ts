// src/auth/decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../jwt-payload.type';

export const User = createParamDecorator(
  <K extends keyof JwtPayload>(data: K | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    if (!user) {
      throw new Error('User not found in request - make sure JwtAuthGuard is applied');
    }

    return data ? user[data] : user;
  },
);