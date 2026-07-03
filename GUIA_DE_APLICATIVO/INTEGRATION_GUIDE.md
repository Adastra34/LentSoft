# Guía de Integración React + .NET API

## 📋 Pasos para Integrar el Frontend React con la API .NET

### **1. Configurar Variables de Entorno**

Crear archivo `.env.local` en la raíz del proyecto React:

```bash
# Copiar el ejemplo
cp .env.example .env.local

# Editar con la URL de tu API
VITE_API_URL=https://localhost:7001/api
```

---

### **2. Instalar Dependencias Necesarias**

```bash
# Axios ya está instalado, verificar package.json
pnpm install
```

---

### **3. Actualizar AuthContext para Usar API Real**

Modificar `/src/controllers/contexts/AuthContext.tsx`:

```typescript
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { authService, UserDto } from "../../services/authService";
import { getErrorMessage } from "../../services/api";

export type UserRole = "usuario" | "admin";

export interface User {
  id: string;
  email: string;
  nombre: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, nombre: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay sesión activa al cargar
  useEffect(() => {
    const verifySession = async () => {
      if (authService.hasToken()) {
        try {
          const userData = await authService.verify();
          setUser({
            id: userData.id.toString(),
            email: userData.email,
            nombre: userData.nombre,
            role: userData.role as UserRole
          });
        } catch (error) {
          console.error('Sesión inválida:', error);
          authService.logout();
        }
      }
      setIsLoading(false);
    };

    verifySession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, password });
      setUser({
        id: response.user.id.toString(),
        email: response.user.email,
        nombre: response.user.nombre,
        role: response.user.role as UserRole
      });
      return true;
    } catch (error) {
      console.error('Error en login:', getErrorMessage(error));
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const register = async (
    email: string,
    password: string,
    nombre: string
  ): Promise<boolean> => {
    try {
      const response = await authService.register({ email, password, nombre });
      setUser({
        id: response.user.id.toString(),
        email: response.user.email,
        nombre: response.user.nombre,
        role: response.user.role as UserRole
      });
      return true;
    } catch (error) {
      console.error('Error en registro:', getErrorMessage(error));
      return false;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        logout, 
        register,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
```

---

### **4. Ejemplo de Uso en Componentes**

#### **Listar Productos desde la API**

```typescript
import { useEffect, useState } from 'react';
import { productService, ProductDto } from '../services/productService';
import { getErrorMessage } from '../services/api';

export function ProductList() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await productService.getAll({ page, pageSize: 10 });
        setProducts(result.items);
        setTotalPages(result.totalPages);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h3>{product.nombre}</h3>
            <p>${product.precioFinal}</p>
            {product.tieneDescuento && (
              <span className="text-red-600">-{product.porcentajeDescuento}%</span>
            )}
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
```

#### **Crear Producto (Admin)**

```typescript
import { useState } from 'react';
import { productService, CreateProductDto } from '../services/productService';
import { getErrorMessage } from '../services/api';

export function CreateProductForm() {
  const [formData, setFormData] = useState<CreateProductDto>({
    nombre: '',
    precio: 0,
    categoria: '',
    stock: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      const newProduct = await productService.create(formData);
      console.log('Producto creado:', newProduct);
      // Redirigir o mostrar mensaje de éxito
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      
      <input
        type="text"
        placeholder="Nombre del producto"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="number"
        placeholder="Precio"
        value={formData.precio}
        onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
        className="border p-2 w-full rounded"
        required
      />

      <select
        value={formData.categoria}
        onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
        className="border p-2 w-full rounded"
        required
      >
        <option value="">Seleccionar categoría</option>
        <option value="lentes">Lentes</option>
        <option value="monturas">Monturas</option>
        <option value="accesorios">Accesorios</option>
      </select>

      <input
        type="number"
        placeholder="Stock"
        value={formData.stock}
        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
        className="border p-2 w-full rounded"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Creando...' : 'Crear Producto'}
      </button>
    </form>
  );
}
```

---

### **5. Configurar CORS en la API .NET**

Ya está configurado en `Program.cs`, pero verifica que incluya tu puerto de desarrollo:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
            "http://localhost:5173",  // Vite default
            "http://localhost:3000"   // Create React App default
          )
          .AllowAnyHeader()
          .AllowAnyMethod()
          .AllowCredentials();
    });
});
```

---

### **6. Manejar Certificados SSL en Desarrollo**

Si la API .NET usa HTTPS autofirmado en desarrollo local:

**Opción 1: Confiar en el certificado** (Recomendado)

```bash
# Windows
dotnet dev-certs https --trust

# macOS
dotnet dev-certs https --trust

# Linux
dotnet dev-certs https
# Luego importar manualmente en el navegador
```

**Opción 2: Deshabilitar SSL en desarrollo** (No recomendado)

Cambiar en `.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

Y en `launchSettings.json` de .NET usar solo HTTP.

---

### **7. Testing de la Integración**

#### **Test con datos mock (sin API)**

Mantener el código actual funcionando con datos mock.

#### **Test con API real**

1. Iniciar la API .NET:
   ```bash
   cd LentSoft.API
   dotnet run
   ```

2. Iniciar el frontend React (ya corriendo en Figma Make)

3. Probar flujo completo:
   - ✅ Registro de usuario
   - ✅ Login
   - ✅ Ver productos
   - ✅ Crear pedido
   - ✅ Dashboard admin

---

### **8. Variables de Entorno por Ambiente**

```bash
# .env.local (desarrollo)
VITE_API_URL=https://localhost:7001/api

# .env.production (producción)
VITE_API_URL=https://api.lentsoft.com/api
```

---

## 🔄 Migración Progresiva

Puedes migrar componente por componente:

1. **Fase 1**: Login/Registro usa API real
2. **Fase 2**: Productos usan API real
3. **Fase 3**: Pedidos usan API real
4. **Fase 4**: Dashboard admin usa API real

Mantén los datos mock como fallback durante la migración.

---

## 🐛 Debugging

### **Verificar conexión a la API**

```typescript
// Agregar en consola del navegador
fetch('https://localhost:7001/api/products')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

### **Inspeccionar requests en DevTools**

1. Abrir DevTools (F12)
2. Pestaña "Network"
3. Filtrar por "XHR" o "Fetch"
4. Ver headers, payload y respuestas

### **Logs de Axios**

```typescript
// En api.ts, agregar logging
api.interceptors.request.use((config) => {
  console.log('🚀 Request:', config.method?.toUpperCase(), config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Error:', error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);
```

---

## 📚 Recursos

- [Axios Documentation](https://axios-http.com/)
- [ASP.NET Core Web API](https://learn.microsoft.com/en-us/aspnet/core/web-api/)
- [React Query](https://tanstack.com/query/latest) (opcional, para caché y refetch automático)

---

**¡Listo!** Ahora tu frontend React puede comunicarse con la API .NET.
