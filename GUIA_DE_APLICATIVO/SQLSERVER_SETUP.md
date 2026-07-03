# Configuración de SQL Server para LentSoft API

## 📦 Instalación de SQL Server

### **Opción 1: SQL Server Express (Gratis, Recomendado para Desarrollo)**

#### **Windows:**
1. Descargar SQL Server Express:
   - Ir a: https://www.microsoft.com/es-es/sql-server/sql-server-downloads
   - Descargar **SQL Server 2022 Express**
   - Ejecutar el instalador

2. Durante la instalación:
   - Seleccionar **"Basic"** (instalación básica)
   - Aceptar términos de licencia
   - Seleccionar ubicación de instalación
   - Esperar a que complete

3. Instalar SQL Server Management Studio (SSMS) - Opcional pero recomendado:
   - Descargar desde: https://aka.ms/ssmsfullsetup
   - Ejecutar instalador
   - SSMS permite administrar la BD visualmente

#### **macOS / Linux:**
SQL Server Express no está disponible nativamente, usar Docker:

```bash
# Descargar imagen de SQL Server para Linux
docker pull mcr.microsoft.com/mssql/server:2022-latest

# Ejecutar contenedor
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=TuPassword123!" \
   -p 1433:1433 --name sqlserver \
   -d mcr.microsoft.com/mssql/server:2022-latest

# Verificar que esté corriendo
docker ps
```

**Nota**: La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas y números.

---

### **Opción 2: Azure SQL Database (Nube, para Producción)**

1. Crear cuenta en Azure
2. Crear recurso "SQL Database"
3. Obtener connection string del portal

---

## 🔧 Configuración en el Proyecto .NET

### **1. Instalar Paquetes NuGet**

En la carpeta del proyecto API:

```bash
cd LentSoft.API

# Entity Framework Core para SQL Server
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 8.0.0

# Herramientas de diseño para migraciones
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.0

# Herramientas de línea de comandos (global)
dotnet tool install --global dotnet-ef --version 8.0.0
```

---

### **2. Configurar Connection String**

Editar `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=LentSoftDB;Trusted_Connection=true;TrustServerCertificate=true;",
    
    // Alternativas según tu entorno:
    
    // SQL Server con autenticación de usuario/contraseña:
    // "DefaultConnection": "Server=localhost;Database=LentSoftDB;User Id=sa;Password=TuPassword123!;TrustServerCertificate=true;",
    
    // Docker en macOS/Linux:
    // "DefaultConnection": "Server=localhost,1433;Database=LentSoftDB;User Id=sa;Password=TuPassword123!;TrustServerCertificate=true;",
    
    // Azure SQL:
    // "DefaultConnection": "Server=tcp:tuservidor.database.windows.net,1433;Database=LentSoftDB;User ID=tuusuario@tuservidor;Password=tupassword;Encrypt=true;"
  },
  "JwtSettings": {
    "Secret": "TuClaveSecretaSuperSeguraDeAlMenos32Caracteres123",
    "ExpirationInHours": 24
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

**Componentes del Connection String:**
- `Server`: Nombre del servidor (localhost, IP, o Azure URL)
- `Database`: Nombre de la base de datos
- `Trusted_Connection=true`: Usa autenticación de Windows
- `User Id` + `Password`: Autenticación SQL Server
- `TrustServerCertificate=true`: Acepta certificados autofirmados

---

### **3. Crear Modelos Completos**

#### **Models/User.cs**
```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LentSoft.API.Models;

[Table("Users")]
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
    [MaxLength(255)]
    public string PasswordHash { get; set; } = string.Empty;

    [Phone]
    [MaxLength(20)]
    public string? Telefono { get; set; }

    [Required]
    [MaxLength(20)]
    public string Role { get; set; } = "usuario"; // usuario, admin

    [Column(TypeName = "datetime2")]
    public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;

    [Column(TypeName = "datetime2")]
    public DateTime? UltimaCompra { get; set; }

    // Navegación
    public virtual ICollection<Order> Pedidos { get; set; } = new List<Order>();
    public virtual ICollection<Appointment> Citas { get; set; } = new List<Appointment>();
}
```

#### **Models/Product.cs**
```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LentSoft.API.Models;

[Table("Products")]
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
    public int Stock { get; set; } = 0;

    [MaxLength(500)]
    public string? ImagenUrl { get; set; }

    public bool Activo { get; set; } = true;

    [Column(TypeName = "datetime2")]
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

    // Navegación
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
```

#### **Models/Order.cs**
```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LentSoft.API.Models;

[Table("Orders")]
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
    public string Estado { get; set; } = "pendiente";

    [MaxLength(500)]
    public string? DireccionEnvio { get; set; }

    [Column(TypeName = "datetime2")]
    public DateTime FechaPedido { get; set; } = DateTime.UtcNow;

    [Column(TypeName = "datetime2")]
    public DateTime? FechaEntrega { get; set; }

    // Navegación
    [ForeignKey("UserId")]
    public virtual User Usuario { get; set; } = null!;

    public virtual ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    public virtual Invoice? Factura { get; set; }
}
```

#### **Models/OrderItem.cs**
```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LentSoft.API.Models;

[Table("OrderItems")]
public class OrderItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int OrderId { get; set; }

    [Required]
    public int ProductId { get; set; }

    [Required]
    public int Cantidad { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal PrecioUnitario { get; set; }

    // Navegación
    [ForeignKey("OrderId")]
    public virtual Order Order { get; set; } = null!;

    [ForeignKey("ProductId")]
    public virtual Product Product { get; set; } = null!;
}
```

#### **Models/Employee.cs**
```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LentSoft.API.Models;

[Table("Employees")]
public class Employee
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

    [Phone]
    [MaxLength(20)]
    public string? Telefono { get; set; }

    [Required]
    [MaxLength(50)]
    public string Puesto { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Departamento { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal Salario { get; set; }

    [Column(TypeName = "datetime2")]
    public DateTime FechaContratacion { get; set; } = DateTime.UtcNow;

    public bool Activo { get; set; } = true;
}
```

#### **Models/Invoice.cs**
```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LentSoft.API.Models;

[Table("Invoices")]
public class Invoice
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string NumeroFactura { get; set; } = string.Empty;

    [Required]
    public int OrderId { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal Subtotal { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal Impuestos { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal Total { get; set; }

    [Required]
    [MaxLength(20)]
    public string Estado { get; set; } = "pendiente";

    [Column(TypeName = "datetime2")]
    public DateTime FechaEmision { get; set; } = DateTime.UtcNow;

    [Column(TypeName = "datetime2")]
    public DateTime? FechaPago { get; set; }

    [MaxLength(50)]
    public string? MetodoPago { get; set; }

    // Navegación
    [ForeignKey("OrderId")]
    public virtual Order Pedido { get; set; } = null!;
}
```

#### **Models/Appointment.cs**
```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LentSoft.API.Models;

[Table("Appointments")]
public class Appointment
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Servicio { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "datetime2")]
    public DateTime FechaHora { get; set; }

    [Required]
    [MaxLength(20)]
    public string Estado { get; set; } = "pendiente";

    [MaxLength(500)]
    public string? Notas { get; set; }

    [Column(TypeName = "datetime2")]
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

    // Navegación
    [ForeignKey("UserId")]
    public virtual User User { get; set; } = null!;
}
```

---

### **4. Crear DbContext**

#### **Data/AppDbContext.cs**
```csharp
using Microsoft.EntityFrameworkCore;
using LentSoft.API.Models;

namespace LentSoft.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // DbSets
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

        // ÍNDICES ÚNICOS
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Employee>()
            .HasIndex(e => e.Email)
            .IsUnique();

        modelBuilder.Entity<Invoice>()
            .HasIndex(i => i.NumeroFactura)
            .IsUnique();

        // ÍNDICES PARA BÚSQUEDAS
        modelBuilder.Entity<Product>()
            .HasIndex(p => p.Categoria);

        modelBuilder.Entity<Product>()
            .HasIndex(p => p.Nombre);

        modelBuilder.Entity<Order>()
            .HasIndex(o => o.Estado);

        modelBuilder.Entity<Order>()
            .HasIndex(o => o.FechaPedido);

        // RELACIONES
        modelBuilder.Entity<Order>()
            .HasOne(o => o.Usuario)
            .WithMany(u => u.Pedidos)
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Order)
            .WithMany(o => o.Items)
            .HasForeignKey(oi => oi.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Product)
            .WithMany(p => p.OrderItems)
            .HasForeignKey(oi => oi.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Invoice>()
            .HasOne(i => i.Pedido)
            .WithOne(o => o.Factura)
            .HasForeignKey<Invoice>(i => i.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.User)
            .WithMany(u => u.Citas)
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // SEED DATA INICIAL
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        // Usuario administrador
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Email = "admin@lentsoft.com",
                Nombre = "Administrador",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                Role = "admin",
                FechaRegistro = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        // Productos de ejemplo
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Nombre = "Lentes Ray-Ban Aviator",
                Descripcion = "Lentes de sol clásicos estilo aviador",
                Precio = 2500.00m,
                Categoria = "lentes-sol",
                Marca = "Ray-Ban",
                Stock = 50,
                ImagenUrl = "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
                Activo = true,
                FechaCreacion = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new Product
            {
                Id = 2,
                Nombre = "Lentes de Contacto Acuvue",
                Descripcion = "Lentes de contacto mensuales",
                Precio = 450.00m,
                PrecioDescuento = 399.00m,
                Categoria = "lentes-contacto",
                Marca = "Acuvue",
                Stock = 100,
                Activo = true,
                FechaCreacion = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new Product
            {
                Id = 3,
                Nombre = "Montura Oakley Sport",
                Descripcion = "Montura deportiva ultraligera",
                Precio = 1800.00m,
                Categoria = "monturas",
                Marca = "Oakley",
                Stock = 30,
                Activo = true,
                FechaCreacion = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        // Empleados de ejemplo
        modelBuilder.Entity<Employee>().HasData(
            new Employee
            {
                Id = 1,
                Nombre = "María García",
                Email = "maria.garcia@lentsoft.com",
                Telefono = "555-0101",
                Puesto = "Optometrista",
                Departamento = "Atención al Cliente",
                Salario = 25000.00m,
                FechaContratacion = new DateTime(2025, 6, 1, 0, 0, 0, DateTimeKind.Utc),
                Activo = true
            },
            new Employee
            {
                Id = 2,
                Nombre = "Juan Pérez",
                Email = "juan.perez@lentsoft.com",
                Telefono = "555-0102",
                Puesto = "Vendedor",
                Departamento = "Ventas",
                Salario = 18000.00m,
                FechaContratacion = new DateTime(2025, 8, 15, 0, 0, 0, DateTimeKind.Utc),
                Activo = true
            }
        );
    }
}
```

---

### **5. Registrar DbContext en Program.cs**

```csharp
using LentSoft.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configurar DbContext con SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null
        )
    )
);

// ... resto de la configuración
```

---

## 🚀 Crear y Aplicar Migraciones

### **1. Crear migración inicial**

```bash
# Asegurarte de estar en la carpeta del proyecto
cd LentSoft.API

# Crear migración
dotnet ef migrations add InitialCreate

# Esto crea una carpeta Migrations/ con el código de la migración
```

### **2. Aplicar migración a la base de datos**

```bash
# Ejecutar migración (crea la BD y tablas)
dotnet ef database update

# Esto:
# - Crea la base de datos "LentSoftDB" si no existe
# - Crea todas las tablas
# - Inserta los datos seed
```

### **3. Verificar que se creó correctamente**

**Con SSMS (SQL Server Management Studio):**
1. Abrir SSMS
2. Conectar a `localhost\SQLEXPRESS`
3. Expandir "Databases"
4. Ver "LentSoftDB"
5. Expandir "Tables" para ver todas las tablas

**Con comandos:**
```bash
# Listar migraciones aplicadas
dotnet ef migrations list

# Ver SQL que se ejecutará
dotnet ef migrations script

# Revertir última migración
dotnet ef database update PreviousMigrationName

# Eliminar migración no aplicada
dotnet ef migrations remove
```

---

## 🔄 Comandos Útiles

### **Gestión de Migraciones**

```bash
# Crear nueva migración después de cambios en modelos
dotnet ef migrations add NombreDeLaMigracion

# Aplicar migraciones pendientes
dotnet ef database update

# Revertir a migración específica
dotnet ef database update NombreMigracion

# Eliminar última migración (solo si no está aplicada)
dotnet ef migrations remove

# Ver SQL de la migración
dotnet ef migrations script

# Eliminar base de datos completa
dotnet ef database drop
```

### **Seed Data Adicional**

Si necesitas agregar más datos iniciales después:

```bash
# Crear nueva migración con seed data
dotnet ef migrations add SeedProductos

# Aplicar
dotnet ef database update
```

---

## 🧪 Probar la Conexión

### **Crear endpoint de prueba**

En un controlador:

```csharp
[HttpGet("test-db")]
public async Task<IActionResult> TestDatabase()
{
    try
    {
        var canConnect = await _context.Database.CanConnectAsync();
        var productCount = await _context.Products.CountAsync();
        var userCount = await _context.Users.CountAsync();

        return Ok(new
        {
            canConnect,
            message = "Conexión exitosa a SQL Server",
            products = productCount,
            users = userCount
        });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { error = ex.Message });
    }
}
```

---

## ⚠️ Solución de Problemas

### **Error: Cannot connect to server**

```bash
# Verificar que SQL Server esté corriendo
# Windows: Servicios → SQL Server (SQLEXPRESS)

# Docker:
docker ps
docker start sqlserver
```

### **Error: Login failed for user**

Revisar:
- Usuario y contraseña correctos en connection string
- SQL Server acepta autenticación SQL
- Firewall no bloquea puerto 1433

### **Error: Database already exists**

```bash
# Eliminar y recrear
dotnet ef database drop
dotnet ef database update
```

### **Error: No migrations found**

```bash
# Crear migración inicial
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

## 📊 Estructura Final de la Base de Datos

```
LentSoftDB
├── Tables
│   ├── Users
│   ├── Products
│   ├── Orders
│   ├── OrderItems
│   ├── Employees
│   ├── Invoices
│   ├── Appointments
│   └── __EFMigrationsHistory (control de migraciones)
│
├── Indexes
│   ├── IX_Users_Email (UNIQUE)
│   ├── IX_Products_Categoria
│   ├── IX_Orders_Estado
│   └── ...
│
└── Foreign Keys
    ├── FK_Orders_Users_UserId
    ├── FK_OrderItems_Orders_OrderId
    ├── FK_OrderItems_Products_ProductId
    └── ...
```

---

## ✅ Checklist de Configuración

- [ ] SQL Server instalado y corriendo
- [ ] Paquetes NuGet instalados (EntityFrameworkCore.SqlServer, Design)
- [ ] dotnet-ef tool instalado
- [ ] Connection string configurado en appsettings.json
- [ ] Modelos creados con Data Annotations
- [ ] AppDbContext configurado
- [ ] DbContext registrado en Program.cs
- [ ] Migración inicial creada (`dotnet ef migrations add InitialCreate`)
- [ ] Migración aplicada (`dotnet ef database update`)
- [ ] Base de datos verificada en SSMS o Azure Data Studio
- [ ] Endpoint de prueba funcionando

---

**¡Listo!** Tu API .NET ahora está conectada a SQL Server con todas las tablas creadas y datos de prueba.
