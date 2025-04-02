// src/auth/types.ts
import { User } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user: User; // The `user` property will have the structure of the `User` model
}