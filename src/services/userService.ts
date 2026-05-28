import { api } from './api';
import { PagedResult } from './productService';

// Interfaces
export interface UserListDto {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  role: string;
  totalPedidos: number;
  ultimaCompra?: string;
  fechaRegistro: string;
}

export interface UpdateUserDto {
  nombre?: string;
  email?: string;
  telefono?: string;
  role?: string;
}

// Servicio de usuarios (solo para admin)
export const userService = {
  /**
   * Obtener todos los usuarios (admin)
   */
  async getAll(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    role?: string;
  }): Promise<PagedResult<UserListDto>> {
    const response = await api.get<PagedResult<UserListDto>>('/users', { params });
    return response.data;
  },

  /**
   * Obtener usuario por ID (admin)
   */
  async getById(id: number): Promise<UserListDto> {
    const response = await api.get<UserListDto>(`/users/${id}`);
    return response.data;
  },

  /**
   * Actualizar usuario (admin)
   */
  async update(id: number, data: UpdateUserDto): Promise<UserListDto> {
    const response = await api.put<UserListDto>(`/users/${id}`, data);
    return response.data;
  },

  /**
   * Eliminar usuario (admin)
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  /**
   * Cambiar rol de usuario (admin)
   */
  async changeRole(id: number, role: string): Promise<UserListDto> {
    return this.update(id, { role });
  },
};
