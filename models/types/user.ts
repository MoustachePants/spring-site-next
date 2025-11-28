export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  provider: RegisterProvider;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  email: string;
  password?: string;
  name?: string;
  avatar?: string;
  provider: RegisterProvider;
  providerId?: string;
  emailVerified?: boolean;
}

export type RegisterProvider = 'email' | 'google' | 'github';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}
