# 🚀 Quick Start - LentSoft (React + .NET + SQL Server)

## ⚡ Guía Rápida de 5 Pasos

### **Paso 1: Instalar SQL Server** (5 minutos)

#### Windows:
```bash
# Descargar SQL Server Express
# https://www.microsoft.com/es-es/sql-server/sql-server-downloads
# Ejecutar instalador → Seleccionar "Basic" → Instalar
```

#### macOS/Linux (Docker):
```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=TuPassword123!" \
   -p 1433:1433 --name sqlserver \
   -d mcr.microsoft.com/mssql/server:2022-latest
```

---

### **Paso 2: Crear Proyecto .NET API** (10 minutos)

```bash
# Crear solución y proyecto
dotnet new sln -n LentSoft
dotnet new webapi -n LentSoft.API -f net8.0
dotnet sln add LentSoft.API/LentSoft.API.csproj

# Entrar al proyecto
cd LentSoft.API

# Instalar paquetes necesarios
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.0
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.0
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection --version 12.0.1
dotnet add package BCrypt.Net-Next --version 4.0.3
dotnet add package Swashbuckle.AspNetCore --version 6.5.0

# Instalar herramienta de migraciones
dotnet tool install --global dotnet-ef --version 8.0.0
```

---

### **Paso 3: Copiar Código Base** (2 minutos)

Usar los archivos de ejemplo en:
- `DOTNET_API_STRUCTURE.md` → Copiar código de:
  - `Program.cs`
  - `appsettings.json`
  - `Models/*.cs`
  - `Data/AppDbContext.cs`
  - `Controllers/AuthController.cs`
  - `Controllers/ProductsController.cs`
  - `Services/AuthService.cs`
  - `DTOs/*.cs`

**O usar el script SQL directo:**
```bash
# Opción alternativa: Ejecutar script SQL manualmente
# Ver archivo: database_schema.sql
```

---

### **Paso 4: Crear Base de Datos** (2 minutos)

```bash
# Desde la carpeta LentSoft.API

# Crear migración inicial
dotnet ef migrations add InitialCreate

# Aplicar a la base de datos
dotnet ef database update

# ✅ Esto crea:
# - Base de datos "LentSoftDB"
# - 7 tablas (Users, Products, Orders, OrderItems, Employees, Invoices, Appointments)
# - Índices y constraints
# - Datos de prueba (admin, productos de ejemplo)
```

**Verificar en SSMS o Azure Data Studio:**
- Servidor: `localhost\SQLEXPRESS`
- Base de datos: `LentSoftDB`

---

### **Paso 5: Ejecutar API** (1 minuto)

```bash
# Ejecutar la API
dotnet run

# Debería mostrar:
# info: Microsoft.Hosting.Lifetime[14]
#       Now listening on: https://localhost:7001
#       Now listening on: http://localhost:5000

# Abrir Swagger en el navegador:
# https://localhost:7001/swagger
```

**Probar endpoints:**
```bash
# Login (obtener token JWT)
curl -X POST https://localhost:7001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lentsoft.com","password":"admin123"}'

# Listar productos
curl https://localhost:7001/api/products
```

---

## 🔌 Integrar con React (Frontend)

### **En tu proyecto React (ya está listo en Figma Make):**

1. **Configurar variables de entorno:**
```bash
# Crear archivo .env.local
echo "VITE_API_URL=https://localhost:7001/api" > .env.local
```

2. **Los servicios ya están creados en:**
   - `src/services/api.ts`
   - `src/services/authService.ts`
   - `src/services/productService.ts`
   - `src/services/orderService.ts`
   - `src/services/userService.ts`

3. **Actualizar AuthContext:**
   Ver ejemplo completo en `INTEGRATION_GUIDE.md`

---

## 📊 Endpoints Disponibles

| Método | Endpoint | Requiere Auth | Descripción |
|--------|----------|---------------|-------------|
| POST | `/api/auth/login` | ❌ | Login de usuario |
| POST | `/api/auth/register` | ❌ | Registro de usuario |
| GET | `/api/auth/verify` | ✅ | Verificar token |
| GET | `/api/products` | ❌ | Listar productos |
| GET | `/api/products/{id}` | ❌ | Obtener producto |
| POST | `/api/products` | ✅ Admin | Crear producto |
| PUT | `/api/products/{id}` | ✅ Admin | Actualizar producto |
| DELETE | `/api/products/{id}` | ✅ Admin | Eliminar producto |
| GET | `/api/orders` | ✅ | Listar pedidos |
| POST | `/api/orders` | ✅ | Crear pedido |
| GET | `/api/users` | ✅ Admin | Listar usuarios |

---

## 🧪 Probar la Integración Completa

### **1. Backend (API .NET):**
```bash
# Terminal 1: Ejecutar API
cd LentSoft.API
dotnet run
```

### **2. Frontend (React en Figma Make):**
Ya está corriendo. Solo configura `.env.local` y prueba:

```typescript
// En la consola del navegador
fetch('https://localhost:7001/api/products')
  .then(r => r.json())
  .then(console.log);
```

### **3. Flujo completo:**
1. Abrir aplicación React
2. Ir a página de Login
3. Iniciar sesión con:
   - Email: `admin@lentsoft.com`
   - Password: `admin123`
4. Navegar al dashboard de administrador
5. Ver productos desde la BD real

---

## 🛠️ Comandos Útiles

### **Base de Datos:**
```bash
# Ver migraciones
dotnet ef migrations list

# Crear nueva migración
dotnet ef migrations add NombreMigracion

# Aplicar migraciones
dotnet ef database update

# Revertir migración
dotnet ef database update MigracionAnterior

# Eliminar BD
dotnet ef database drop

# Ver SQL de migración
dotnet ef migrations script
```

### **Desarrollo:**
```bash
# Ejecutar con hot reload
dotnet watch run

# Compilar
dotnet build

# Ejecutar tests (cuando los crees)
dotnet test

# Publicar para producción
dotnet publish -c Release
```

---

## 📁 Estructura Final del Proyecto

```
LentSoft/
├── LentSoft.API/                    # Backend .NET
│   ├── Controllers/
│   ├── Models/
│   ├── DTOs/
│   ├── Services/
│   ├── Data/
│   ├── Migrations/
│   ├── Program.cs
│   └── appsettings.json
│
├── frontend/ (React en Figma Make)  # Frontend React
│   ├── src/
│   │   ├── services/               # Servicios API
│   │   ├── controllers/contexts/   # Contextos
│   │   ├── views/                  # Componentes UI
│   │   └── models/                 # Modelos de datos
│   ├── .env.local
│   └── package.json
│
└── database_schema.sql              # Script SQL opcional
```

---

## ✅ Checklist Completo

- [ ] SQL Server instalado y corriendo
- [ ] Proyecto .NET creado
- [ ] Paquetes NuGet instalados
- [ ] Modelos y DbContext creados
- [ ] Migración inicial ejecutada
- [ ] BD verificada en SSMS
- [ ] API ejecutándose en `https://localhost:7001`
- [ ] Swagger accesible
- [ ] Login de prueba funciona
- [ ] `.env.local` configurado en React
- [ ] Servicios de API creados en React
- [ ] AuthContext actualizado
- [ ] Integración frontend/backend funcionando

---

## 🐛 Troubleshooting Rápido

### API no inicia:
```bash
# Ver logs detallados
dotnet run --verbosity detailed
```

### No conecta a SQL Server:
```bash
# Verificar connection string en appsettings.json
# Verificar que SQL Server esté corriendo
# Windows: Servicios → SQL Server (SQLEXPRESS)
# Docker: docker ps
```

### Error de CORS en React:
```csharp
// Verificar en Program.cs que incluya tu puerto:
.WithOrigins("http://localhost:5173")
```

### Error de certificado SSL:
```bash
# Confiar en el certificado de desarrollo
dotnet dev-certs https --trust
```

---

## 📚 Recursos

- **Documentación completa:** Ver archivos `.md` en el proyecto
  - `DOTNET_API_STRUCTURE.md` - Estructura de la API
  - `DOTNET_DTOS_EXAMPLES.md` - DTOs y mapeos
  - `SQLSERVER_SETUP.md` - Configuración de SQL Server
  - `INTEGRATION_GUIDE.md` - Integración React/API
  - `DATABASE_DIAGRAM.md` - Diagrama de la BD

- **Sitios oficiales:**
  - [ASP.NET Core Docs](https://learn.microsoft.com/aspnet/core)
  - [Entity Framework Core](https://learn.microsoft.com/ef/core)
  - [React Documentation](https://react.dev)

---

## 🎯 Próximos Pasos Sugeridos

1. **Implementar más controladores** (UsersController, OrdersController)
2. **Agregar autenticación real** en React (actualizar AuthContext)
3. **Implementar manejo de errores** robusto
4. **Agregar validaciones** en formularios
5. **Crear tests unitarios** (xUnit + Jest)
6. **Configurar CI/CD** (GitHub Actions, Azure DevOps)
7. **Deploy a producción** (Azure App Service, SQL Azure)

---

**Tiempo total estimado**: 20-30 minutos para tener todo funcionando ✅
