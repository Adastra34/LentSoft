import { api } from './api';

// Interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
  telefono?: string;
}

export interface UserDto {
  id: number;
  email: string;
  nombre: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}

// Servicio de autenticación
export const authService = {
  /**
   * Login de usuario
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);

    // Guardar token y usuario en localStorage
    localStorage.setItem('lentsoft_token', response.data.token);
    localStorage.setItem('lentsoft_user', JSON.stringify(response.data.user));

    return response.data;
  },

  /**
   * Registro de nuevo usuario
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);

    // Guardar token y usuario en localStorage
    localStorage.setItem('lentsoft_token', response.data.token);
    localStorage.setItem('lentsoft_user', JSON.stringify(response.data.user));

    return response.data;
  },

  /**
   * Verificar si el token es válido
   */
  async verify(): Promise<UserDto> {
    const response = await api.get<UserDto>('/auth/verify');
    return response.data;
  },

  /**
   * Logout (limpiar localStorage)
   */
  logout(): void {
    localStorage.removeItem('lentsoft_token');
    localStorage.removeItem('lentsoft_user');
  },

  /**
   * Obtener usuario actual del localStorage
   */
  getCurrentUser(): UserDto | null {
    const userStr = localStorage.getItem('lentsoft_user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as UserDto;
    } catch {
      return null;
    }
  },

  /**
   * Verificar si hay un token guardado
   */
  hasToken(): boolean {
    return !!localStorage.getItem('lentsoft_token');
  },
};
