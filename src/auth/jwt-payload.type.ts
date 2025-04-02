// src/auth/types/jwt-payload.type.ts
export interface JwtPayload {
    sub: number;  // User ID
    email: string;
    // Add any other claims you include in your JWT
  }