import { UserRole } from '@prisma/client';

export { UserRole };

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    organizationId: string | null;
    departmentId: string | null;
    managerId: string | null;
  };
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
} 