export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface AuthResponse {
  token: string;
}