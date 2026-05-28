import { api } from './api';
import { PagedResult } from './productService';

// Interfaces
export interface OrderItemDto {
  id: number;
  productId: number;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface OrderDto {
  id: number;
  userId: number;
  nombreUsuario: string;
  total: number;
  estado: string;
  direccionEnvio?: string;
  fechaPedido: string;
  fechaEntrega?: string;
  items: OrderItemDto[];
}

export interface CreateOrderItemDto {
  productId: number;
  cantidad: number;
}

export interface CreateOrderDto {
  userId: number;
  items: CreateOrderItemDto[];
  direccionEnvio?: string;
}

// Servicio de pedidos
export const orderService = {
  /**
   * Obtener todos los pedidos (con paginación)
   */
  async getAll(params?: {
    page?: number;
    pageSize?: number;
    estado?: string;
    userId?: number;
  }): Promise<PagedResult<OrderDto>> {
    const response = await api.get<PagedResult<OrderDto>>('/orders', { params });
    return response.data;
  },

  /**
   * Obtener pedido por ID
   */
  async getById(id: number): Promise<OrderDto> {
    const response = await api.get<OrderDto>(`/orders/${id}`);
    return response.data;
  },

  /**
   * Crear nuevo pedido
   */
  async create(data: CreateOrderDto): Promise<OrderDto> {
    const response = await api.post<OrderDto>('/orders', data);
    return response.data;
  },

  /**
   * Actualizar estado del pedido (solo admin)
   */
  async updateStatus(id: number, estado: string): Promise<OrderDto> {
    const response = await api.patch<OrderDto>(`/orders/${id}/status`, { estado });
    return response.data;
  },

  /**
   * Cancelar pedido
   */
  async cancel(id: number): Promise<OrderDto> {
    return this.updateStatus(id, 'cancelado');
  },

  /**
   * Obtener pedidos del usuario actual
   */
  async getMyOrders(page = 1, pageSize = 10): Promise<PagedResult<OrderDto>> {
    const response = await api.get<PagedResult<OrderDto>>('/orders/my-orders', {
      params: { page, pageSize }
    });
    return response.data;
  },
};
