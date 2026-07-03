# API .NET para LentSoft

## 🏗️ Arquitectura Frontend/Backend

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                         │
│  • Vite + React 18 + TypeScript                             │
│  • Tailwind CSS                                             │
│  • React Router                                             │
│  • Axios/Fetch para consumir API                           │
└─────────────────┬───────────────────────────────────────────┘
                  │ HTTP/HTTPS
                  │ REST API (JSON)
┌─────────────────▼───────────────────────────────────────────┐
│                    BACKEND (.NET 8)                          │
│  • ASP.NET Core Web API                                     │
│  • Entity Framework Core                                    │
│  • SQL Server / PostgreSQL                                  │
│  • JWT Authentication                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto .NET

```
LentSoft.API/
├── LentSoft.API/                    # Proyecto Web API
│   ├── Controllers/                 # Controladores REST
│   │   ├── AuthController.cs
│   │   ├── ProductsController.cs
│   │   ├── OrdersController.cs
│   │   ├── UsersController.cs
│   │   ├── EmployeesController.cs
│   │   ├── InvoicesController.cs
│   │   └── AppointmentsController.cs
│   │
│   ├── Models/                      # Modelos de dominio
│   │   ├── User.cs
│   │   ├── Product.cs
│   │   ├── Order.cs
│   │   ├── OrderItem.cs
│   │   ├── Employee.cs
│   │   ├── Invoice.cs
│   │   └── Appointment.cs
│   │
│   ├── DTOs/                        # Data Transfer Objects
│   │   ├── Auth/
│   │   │   ├── LoginRequestDto.cs
│   │   │   ├── RegisterRequestDto.cs
│   │   │   └── AuthResponseDto.cs
│   │   ├── Products/
│   │   │   ├── ProductDto.cs
│   │   │   └── CreateProductDto.cs
│   │   └── Orders/
│   │       ├── OrderDto.cs
│   │       └── CreateOrderDto.cs
│   │
│   ├── Services/                    # Lógica de negocio
│   │   ├── Interfaces/
│   │   │   ├── IAuthService.cs
│   │   │   ├── IProductService.cs
│   │   │   └── IOrderService.cs
│   │   ├── AuthService.cs
│   │   ├── ProductService.cs
│   │   └── OrderService.cs
│   │
│   ├── Data/                        # Acceso a datos
│   │   ├── AppDbContext.cs
│   │   ├── Repositories/
│   │   │   ├── IRepository.cs
│   │   │   └── Repository.cs
│   │   └── Migrations/
│   │
│   ├── Middleware/                  # Middleware personalizado
│   │   ├── ErrorHandlerMiddleware.cs
│   │   └── JwtMiddleware.cs
│   │
│   ├── Helpers/                     # Utilidades
│   │   ├── AutoMapperProfile.cs
│   │   └── JwtHelper.cs
│   │
│   ├── Program.cs                   # Punto de entrada
│   └── appsettings.json            # Configuración
│
└── LentSoft.Tests/                  # Proyecto de tests
    └── Controllers/
```

---

## 🔧 Configuración Inicial

### **1. Crear el proyecto .NET**

```bash
# Crear solución
dotnet new sln -n LentSoft

# Crear proyecto Web API
dotnet new webapi -n LentSoft.API -f net8.0

# Agregar proyecto a la solución
dotnet sln add LentSoft.API/LentSoft.API.csproj

# Instalar paquetes NuGet necesarios
cd LentSoft.API
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.0
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.0
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection --version 12.0.1
dotnet add package BCrypt.Net-Next --version 4.0.3
dotnet add package Swashbuckle.AspNetCore --version 6.5.0
```

---

## 📝 Ejemplos de Código

### **Program.cs** (Configuración principal)

```csharp
using LentSoft.API.Data;
using LentSoft.API.Services;
using LentSoft.API.Services.Interfaces;
using LentSoft.API.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// CORS para permitir requests desde React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Database context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Dependency Injection
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

// JWT Authentication
var jwtSecret = builder.Configuration["JwtSettings:Secret"];
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

---

### **appsettings.json**

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=LentSoftDB;Trusted_Connection=true;TrustServerCertificate=true;"
  },
  "JwtSettings": {
    "Secret": "TuClaveSecretaSuperSeguraDeAlMenos32Caracteres",
    "ExpirationInHours": 24
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

---

### **Models/User.cs**

```csharp
using System.ComponentModel.DataAnnotations;

namespace LentSoft.API.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Phone]
    [MaxLength(20)]
    public string? Telefono { get; set; }

    [Required]
    [MaxLength(20)]
    public string Role { get; set; } = "usuario"; // "usuario" o "admin"

    public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;

    public DateTime? UltimaCompra { get; set; }

    // Relaciones
    public virtual ICollection<Order> Pedidos { get; set; } = new List<Order>();
}
```

---

### **Models/Product.cs**

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LentSoft.API.Models;

public class Product
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Nombre { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Descripcion { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal Precio { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    public decimal? PrecioDescuento { get; set; }

    [Required]
    [MaxLength(50)]
    public string Categoria { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? Marca { get; set; }

    [Required]
    public int Stock { get; set; }

    [MaxLength(500)]
    public string? ImagenUrl { get; set; }

    public bool Activo { get; set; } = true;

    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

    // Relaciones
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
```

---

### **Models/Order.cs**

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LentSoft.API.Models;

public class Order
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal Total { get; set; }

    [Required]
    [MaxLength(20)]
    public string Estado { get; set; } = "pendiente"; // pendiente, procesando, enviado, entregado, cancelado

    [MaxLength(500)]
    public string? DireccionEnvio { get; set; }

    public DateTime FechaPedido { get; set; } = DateTime.UtcNow;

    public DateTime? FechaEntrega { get; set; }

    // Relaciones
    [ForeignKey("UserId")]
    public virtual User Usuario { get; set; } = null!;

    public virtual ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
```

---

### **Controllers/AuthController.cs**

```csharp
using Microsoft.AspNetCore.Mvc;
using LentSoft.API.DTOs.Auth;
using LentSoft.API.Services.Interfaces;

namespace LentSoft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Login de usuario
    /// </summary>
    /// <param name="request">Email y contraseña</param>
    /// <returns>Token JWT y datos de usuario</returns>
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginRequestDto request)
    {
        var response = await _authService.LoginAsync(request);
        
        if (response == null)
            return Unauthorized(new { message = "Email o contraseña incorrectos" });

        return Ok(response);
    }

    /// <summary>
    /// Registro de nuevo usuario
    /// </summary>
    /// <param name="request">Datos de registro</param>
    /// <returns>Token JWT y datos de usuario</returns>
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterRequestDto request)
    {
        var response = await _authService.RegisterAsync(request);
        
        if (response == null)
            return BadRequest(new { message = "El email ya está registrado" });

        return Ok(response);
    }

    /// <summary>
    /// Verificar si el token es válido
    /// </summary>
    [HttpGet("verify")]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public IActionResult Verify()
    {
        var userId = User.FindFirst("id")?.Value;
        var email = User.FindFirst("email")?.Value;
        var role = User.FindFirst("role")?.Value;

        return Ok(new { userId, email, role });
    }
}
```

---

### **Controllers/ProductsController.cs**

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LentSoft.API.DTOs.Products;
using LentSoft.API.Services.Interfaces;

namespace LentSoft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    /// <summary>
    /// Obtener todos los productos (con paginación)
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? categoria = null,
        [FromQuery] string? search = null)
    {
        var products = await _productService.GetAllAsync(page, pageSize, categoria, search);
        return Ok(products);
    }

    /// <summary>
    /// Obtener producto por ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetById(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        
        if (product == null)
            return NotFound(new { message = "Producto no encontrado" });

        return Ok(product);
    }

    /// <summary>
    /// Crear nuevo producto (solo admin)
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductDto dto)
    {
        var product = await _productService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    /// <summary>
    /// Actualizar producto (solo admin)
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ProductDto>> Update(int id, [FromBody] UpdateProductDto dto)
    {
        var product = await _productService.UpdateAsync(id, dto);
        
        if (product == null)
            return NotFound(new { message = "Producto no encontrado" });

        return Ok(product);
    }

    /// <summary>
    /// Eliminar producto (solo admin)
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _productService.DeleteAsync(id);
        
        if (!result)
            return NotFound(new { message = "Producto no encontrado" });

        return NoContent();
    }
}
```

---

### **Services/AuthService.cs**

```csharp
using LentSoft.API.DTOs.Auth;
using LentSoft.API.Models;
using LentSoft.API.Data;
using LentSoft.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

namespace LentSoft.API.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginRequestDto request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return null;

        var token = GenerateJwtToken(user);

        return new AuthResponseDto
        {
            Token = token,
            User = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Nombre = user.Nombre,
                Role = user.Role
            }
        };
    }

    public async Task<AuthResponseDto?> RegisterAsync(RegisterRequestDto request)
    {
        // Verificar si el email ya existe
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            return null;

        var user = new User
        {
            Email = request.Email,
            Nombre = request.Nombre,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Telefono = request.Telefono,
            Role = "usuario"
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = GenerateJwtToken(user);

        return new AuthResponseDto
        {
            Token = token,
            User = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Nombre = user.Nombre,
                Role = user.Role
            }
        };
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim("id", user.Id.ToString()),
            new Claim("email", user.Email),
            new Claim("role", user.Role),
            new Claim(ClaimTypes.Name, user.Nombre)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(
                int.Parse(_configuration["JwtSettings:ExpirationInHours"]!)),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```

---

### **Data/AppDbContext.cs**

```csharp
using Microsoft.EntityFrameworkCore;
using LentSoft.API.Models;

namespace LentSoft.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Invoice> Invoices { get; set; }
    public DbSet<Appointment> Appointments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurar índices
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Product>()
            .HasIndex(p => p.Categoria);

        // Seed data inicial
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Email = "admin@lentsoft.com",
                Nombre = "Administrador",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                Role = "admin",
                FechaRegistro = DateTime.UtcNow
            }
        );
    }
}
```

---

## 🔌 Integración con React

### **1. Instalar Axios en el proyecto React**

```bash
pnpm add axios
```

### **2. Crear servicio de API** (`src/services/api.ts`)

```typescript
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### **3. Servicios por entidad** (`src/services/authService.ts`)

```typescript
import { api } from './api';

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

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    nombre: string;
    role: string;
  };
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  async verify(): Promise<any> {
    const response = await api.get('/auth/verify');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },
};
```

### **4. Actualizar AuthContext** para usar API real

```typescript
// En src/controllers/contexts/AuthContext.tsx
import { authService } from '../../services/authService';

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
    console.error('Login error:', error);
    return false;
  }
};
```

---

## 🚀 Comandos para Ejecutar

### **Backend (.NET)**
```bash
# Restaurar paquetes
dotnet restore

# Crear migración inicial
dotnet ef migrations add InitialCreate

# Aplicar migración a la BD
dotnet ef database update

# Ejecutar API
dotnet run
```

### **Frontend (React)**
```bash
# Ya está corriendo en Figma Make
# Solo necesitas configurar la URL de la API
```

---

## 📊 Endpoints de la API

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Login | No |
| POST | `/api/auth/register` | Registro | No |
| GET | `/api/auth/verify` | Verificar token | Sí |
| GET | `/api/products` | Listar productos | No |
| GET | `/api/products/{id}` | Obtener producto | No |
| POST | `/api/products` | Crear producto | Admin |
| PUT | `/api/products/{id}` | Actualizar producto | Admin |
| DELETE | `/api/products/{id}` | Eliminar producto | Admin |
| GET | `/api/orders` | Listar pedidos | Sí |
| POST | `/api/orders` | Crear pedido | Sí |
| GET | `/api/users` | Listar usuarios | Admin |
| GET | `/api/employees` | Listar trabajadores | Admin |
| GET | `/api/invoices` | Listar facturas | Admin |
| GET | `/api/appointments` | Listar citas | Sí |

---

## ✅ Próximos Pasos

1. ✅ Crear proyecto .NET Web API
2. ✅ Configurar Entity Framework + SQL Server
3. ✅ Implementar autenticación JWT
4. ✅ Crear controladores REST
5. ⏳ Configurar CORS para React
6. ⏳ Implementar servicios en React para consumir API
7. ⏳ Probar integración frontend/backend

---

**Fecha de creación**: 14 de mayo, 2026  
**Proyecto**: LentSoft - API Backend .NET 8
