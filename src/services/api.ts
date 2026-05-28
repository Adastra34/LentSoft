import axios, { AxiosError } from 'axios';

// Configuración de la URL base de la API
// En desarrollo local .NET corre en https://localhost:7001
// En producción cambiar a tu dominio
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7001/api';

// Crear instancia de axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para agregar token JWT a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lentsoft_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Token expirado o inválido
    if (error.response?.status === 401) {
      localStorage.removeItem('lentsoft_token');
      localStorage.removeItem('lentsoft_user');

      // Redirigir al login si no estamos ya ahí
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // Error de servidor
    if (error.response?.status === 500) {
      console.error('Error del servidor:', error.response.data);
    }

    return Promise.reject(error);
  }
);

// Tipos para respuestas de error
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Helper para extraer mensaje de error
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;
    return apiError?.message || 'Error de conexión con el servidor';
  }
  return 'Error desconocido';
};
