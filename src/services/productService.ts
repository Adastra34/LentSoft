import { api } from './api';

// Interfaces
export interface ProductDto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  precioDescuento?: number;
  categoria: string;
  marca?: string;
  stock: number;
  imagenUrl?: string;
  activo: boolean;
  fechaCreacion: string;
  tieneDescuento: boolean;
  precioFinal: number;
  porcentajeDescuento: number;
}

export interface CreateProductDto {
  nombre: string;
  descripcion?: string;
  precio: number;
  precioDescuento?: number;
  categoria: string;
  marca?: string;
  stock: number;
  imagenUrl?: string;
  activo?: boolean;
}

export interface UpdateProductDto {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  precioDescuento?: number;
  categoria?: string;
  marca?: string;
  stock?: number;
  imagenUrl?: string;
  activo?: boolean;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

// Servicio de productos
export const productService = {
  /**
   * Obtener todos los productos con paginación
   */
  async getAll(params?: {
    page?: number;
    pageSize?: number;
    categoria?: string;
    search?: string;
  }): Promise<PagedResult<ProductDto>> {
    const response = await api.get<PagedResult<ProductDto>>('/products', { params });
    return response.data;
  },

  /**
   * Obtener producto por ID
   */
  async getById(id: number): Promise<ProductDto> {
    const response = await api.get<ProductDto>(`/products/${id}`);
    return response.data;
  },

  /**
   * Crear nuevo producto (solo admin)
   */
  async create(data: CreateProductDto): Promise<ProductDto> {
    const response = await api.post<ProductDto>('/products', data);
    return response.data;
  },

  /**
   * Actualizar producto (solo admin)
   */
  async update(id: number, data: UpdateProductDto): Promise<ProductDto> {
    const response = await api.put<ProductDto>(`/products/${id}`, data);
    return response.data;
  },

  /**
   * Eliminar producto (solo admin)
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },

  /**
   * Obtener productos por categoría
   */
  async getByCategory(categoria: string, page = 1, pageSize = 10): Promise<PagedResult<ProductDto>> {
    return this.getAll({ page, pageSize, categoria });
  },

  /**
   * Buscar productos
   */
  async search(query: string, page = 1, pageSize = 10): Promise<PagedResult<ProductDto>> {
    return this.getAll({ page, pageSize, search: query });
  },
};
