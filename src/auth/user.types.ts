// src/auth/types/user.types.ts
import { User as PrismaUser } from '@prisma/client';

// User type with password (for internal use)
export type UserWithPassword = PrismaUser;

// User type without password (for responses)
export type SafeUser = Omit<PrismaUser, 'password'>;