// Authentication Types

export interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  avatar?: string; // Base64 or URL
  createdAt: string;
}

// User without password (for auth state)
export interface AuthenticatedUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  avatar?: string; // Base64 or URL
  createdAt: string;
}

export interface AuthState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export interface UpdateProfileData {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

