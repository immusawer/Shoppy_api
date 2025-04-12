import { User as PrismaUser } from '@prisma/client';
export type UserWithPassword = PrismaUser;
export type SafeUser = Omit<PrismaUser, 'password'>;
