# DTOs (Data Transfer Objects) para LentSoft API

## 📦 DTOs de Autenticación

### **DTOs/Auth/LoginRequestDto.cs**
```csharp
using System.ComponentModel.DataAnnotations;

namespace LentSoft.API.DTOs.Auth;

public class LoginRequestDto
{
    [Required(ErrorMessage = "El email es requerido")]
    [EmailAddress(ErrorMessage = "Email inválido")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "La contraseña es requerida")]
    [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres")]
    public string Password { get; set; } = string.Empty;
}
```

### **DTOs/Auth/RegisterRequestDto.cs**
```csharp
using System.ComponentModel.DataAnnotations;

namespace LentSoft.API.DTOs.Auth;

public class RegisterRequestDto
{
    [Required(ErrorMessage = "El nombre es requerido")]
    [MaxLength(100)]
    public string Nombre { get; set; } = string.Empty;

    [Required(ErrorMessage = "El email es requerido")]
    [EmailAddress(ErrorMessage = "Email inválido")]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "La contraseña es requerida")]
    [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres")]
    public string Password { get; set; } = string.Empty;

    [Phone(ErrorMessage = "Teléfono inválido")]
    [MaxLength(20)]
    public string? Telefono { get; set; }
}
```

### **DTOs/Auth/AuthResponseDto.cs**
```csharp
namespace LentSoft.API.DTOs.Auth;

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public UserDto User { get; set; } = null!;
}

public class UserDto
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}
```

---

## 🛍️ DTOs de Productos

### **DTOs/Products/ProductDto.cs**
```csharp
namespace LentSoft.API.DTOs.Products;

public class ProductDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public decimal Precio { get; set; }
    public decimal? PrecioDescuento { get; set; }
    public string Categoria { get; set; } = string.Empty;
    public string? Marca { get; set; }
    public int Stock { get; set; }
    public string? ImagenUrl { get; set; }
    public bool Activo { get; set; }
    public DateTime FechaCreacion { get; set; }

    // Propiedades calculadas
    public bool TieneDescuento => PrecioDescuento.HasValue && PrecioDescuento < Precio;
    public decimal PrecioFinal => TieneDescuento ? PrecioDescuento!.Value : Precio;
    public int PorcentajeDescuento => TieneDescuento 
        ? (int)((Precio - PrecioDescuento!.Value) / Precio * 100) 
        : 0;
}
```

### **DTOs/Products/CreateProductDto.cs**
```csharp
using System.ComponentModel.DataAnnotations;

namespace LentSoft.API.DTOs.Products;

public class CreateProductDto
{
    [Required(ErrorMessage = "El nombre es requerido")]
    [MaxLength(200)]
    public string Nombre { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Descripcion { get; set; }

    [Required(ErrorMessage = "El precio es requerido")]
    [Range(0.01, 999999.99, ErrorMessage = "El precio debe ser mayor a 0")]
    public decimal Precio { get; set; }

    [Range(0.01, 999999.99, ErrorMessage = "El precio de descuento debe ser mayor a 0")]
    public decimal? PrecioDescuento { get; set; }

    [Required(ErrorMessage = "La categoría es requerida")]
    [MaxLength(50)]
    public string Categoria { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? Marca { get; set; }

    [Required(ErrorMessage = "El stock es requerido")]
    [Range(0, int.MaxValue, ErrorMessage = "El stock no puede ser negativo")]
    public int Stock { get; set; }

    [MaxLength(500)]
    [Url(ErrorMessage = "La URL de la imagen es inválida")]
    public string? ImagenUrl { get; set; }

    public bool Activo { get; set; } = true;
}
```

### **DTOs/Products/UpdateProductDto.cs**
```csharp
using System.ComponentModel.DataAnnotations;

namespace LentSoft.API.DTOs.Products;

public class UpdateProductDto
{
    [MaxLength(200)]
    public string? Nombre { get; set; }

    [MaxLength(1000)]
    public string? Descripcion { get; set; }

    [Range(0.01, 999999.99)]
    public decimal? Precio { get; set; }

    [Range(0.01, 999999.99)]
    public decimal? PrecioDescuento { get; set; }

    [MaxLength(50)]
    public string? Categoria { get; set; }

    [MaxLength(50)]
    public string? Marca { get; set; }

    [Range(0, int.MaxValue)]
    public int? Stock { get; set; }

    [MaxLength(500)]
    [Url]
    public string? ImagenUrl { get; set; }

    public bool? Activo { get; set; }
}
```

---

## 📦 DTOs de Pedidos

### **DTOs/Orders/OrderDto.cs**
```csharp
namespace LentSoft.API.DTOs.Orders;

public class OrderDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string NombreUsuario { get; set; } = string.Empty;
    public decimal Total { get; set; }
    public string Estado { get; set; } = string.Empty;
    public string? DireccionEnvio { get; set; }
    public DateTime FechaPedido { get; set; }
    public DateTime? FechaEntrega { get; set; }
    public List<OrderItemDto> Items { get; set; } = new();
}

public class OrderItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string NombreProducto { get; set; } = string.Empty;
    public int Cantidad { get; set; }
    public decimal PrecioUnitario { get; set; }
    public decimal Subtotal => Cantidad * PrecioUnitario;
}
```

### **DTOs/Orders/CreateOrderDto.cs**
```csharp
using System.ComponentModel.DataAnnotations;

namespace LentSoft.API.DTOs.Orders;

public class CreateOrderDto
{
    [Required]
    public int UserId { get; set; }

    [Required]
    [MinLength(1, ErrorMessage = "Debe incluir al menos un producto")]
    public List<CreateOrderItemDto> Items { get; set; } = new();

    [MaxLength(500)]
    public string? DireccionEnvio { get; set; }
}

public class CreateOrderItemDto
{
    [Required]
    public int ProductId { get; set; }

    [Required]
    [Range(1, 999, ErrorMessage = "La cantidad debe ser mayor a 0")]
    public int Cantidad { get; set; }
}
```

---

## 👥 DTOs de Usuarios

### **DTOs/Users/UserListDto.cs**
```csharp
namespace LentSoft.API.DTOs.Users;

public class UserListDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Telefono { get; set; }
    public string Role { get; set; } = string.Empty;
    public int TotalPedidos { get; set; }
    public DateTime? UltimaCompra { get; set; }
    public DateTime FechaRegistro { get; set; }
}
```

### **DTOs/Users/UpdateUserDto.cs**
```csharp
using System.ComponentModel.DataAnnotations;

namespace LentSoft.API.DTOs.Users;

public class UpdateUserDto
{
    [MaxLength(100)]
    public string? Nombre { get; set; }

    [EmailAddress]
    [MaxLength(100)]
    public string? Email { get; set; }

    [Phone]
    [MaxLength(20)]
    public string? Telefono { get; set; }

    [MaxLength(20)]
    public string? Role { get; set; }
}
```

---

## 👨‍💼 DTOs de Empleados

### **DTOs/Employees/EmployeeDto.cs**
```csharp
namespace LentSoft.API.DTOs.Employees;

public class EmployeeDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Telefono { get; set; }
    public string Puesto { get; set; } = string.Empty;
    public string Departamento { get; set; } = string.Empty;
    public decimal Salario { get; set; }
    public DateTime FechaContratacion { get; set; }
    public bool Activo { get; set; }
}
```

### **DTOs/Employees/CreateEmployeeDto.cs**
```csharp
using System.ComponentModel.DataAnnotations;

namespace LentSoft.API.DTOs.Employees;

public class CreateEmployeeDto
{
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
    [Range(0, 999999.99)]
    public decimal Salario { get; set; }

    public DateTime FechaContratacion { get; set; } = DateTime.UtcNow;

    public bool Activo { get; set; } = true;
}
```

---

## 🧾 DTOs de Facturas

### **DTOs/Invoices/InvoiceDto.cs**
```csharp
namespace LentSoft.API.DTOs.Invoices;

public class InvoiceDto
{
    public int Id { get; set; }
    public string NumeroFactura { get; set; } = string.Empty;
    public int OrderId { get; set; }
    public int UserId { get; set; }
    public string NombreCliente { get; set; } = string.Empty;
    public decimal Subtotal { get; set; }
    public decimal Impuestos { get; set; }
    public decimal Total { get; set; }
    public string Estado { get; set; } = string.Empty;
    public DateTime FechaEmision { get; set; }
    public DateTime? FechaPago { get; set; }
    public string? MetodoPago { get; set; }
}
```

### **DTOs/Invoices/CreateInvoiceDto.cs**
```csharp
using System.ComponentModel.DataAnnotations;

namespace LentSoft.API.DTOs.Invoices;

public class CreateInvoiceDto
{
    [Required]
    public int OrderId { get; set; }

    [Required]
    [Range(0, 999999.99)]
    public decimal Subtotal { get; set; }

    [Required]
    [Range(0, 999999.99)]
    public decimal Impuestos { get; set; }

    [MaxLength(50)]
    public string? MetodoPago { get; set; }
}
```

---

## 📅 DTOs de Citas

### **DTOs/Appointments/AppointmentDto.cs**
```csharp
namespace LentSoft.API.DTOs.Appointments;

public class AppointmentDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string NombreCliente { get; set; } = string.Empty;
    public string EmailCliente { get; set; } = string.Empty;
    public string? TelefonoCliente { get; set; }
    public string Servicio { get; set; } = string.Empty;
    public DateTime FechaHora { get; set; }
    public string Estado { get; set; } = string.Empty;
    public string? Notas { get; set; }
    public DateTime FechaCreacion { get; set; }
}
```

### **DTOs/Appointments/CreateAppointmentDto.cs**
```csharp
using System.ComponentModel.DataAnnotations;

namespace LentSoft.API.DTOs.Appointments;

public class CreateAppointmentDto
{
    [Required]
    public int UserId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Servicio { get; set; } = string.Empty;

    [Required]
    public DateTime FechaHora { get; set; }

    [MaxLength(500)]
    public string? Notas { get; set; }
}
```

---

## 📄 DTOs de Paginación

### **DTOs/Common/PagedResultDto.cs**
```csharp
namespace LentSoft.API.DTOs.Common;

public class PagedResultDto<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
    public bool HasPrevious => PageNumber > 1;
    public bool HasNext => PageNumber < TotalPages;
}
```

---

## 🔧 AutoMapper Profile

### **Helpers/AutoMapperProfile.cs**
```csharp
using AutoMapper;
using LentSoft.API.Models;
using LentSoft.API.DTOs.Auth;
using LentSoft.API.DTOs.Products;
using LentSoft.API.DTOs.Orders;
using LentSoft.API.DTOs.Users;
using LentSoft.API.DTOs.Employees;
using LentSoft.API.DTOs.Invoices;
using LentSoft.API.DTOs.Appointments;

namespace LentSoft.API.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // User mappings
        CreateMap<User, UserDto>();
        CreateMap<User, UserListDto>()
            .ForMember(dest => dest.TotalPedidos, opt => opt.MapFrom(src => src.Pedidos.Count));
        CreateMap<UpdateUserDto, User>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        // Product mappings
        CreateMap<Product, ProductDto>();
        CreateMap<CreateProductDto, Product>();
        CreateMap<UpdateProductDto, Product>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        // Order mappings
        CreateMap<Order, OrderDto>()
            .ForMember(dest => dest.NombreUsuario, opt => opt.MapFrom(src => src.Usuario.Nombre));
        CreateMap<CreateOrderDto, Order>();
        CreateMap<OrderItem, OrderItemDto>()
            .ForMember(dest => dest.NombreProducto, opt => opt.MapFrom(src => src.Product.Nombre));
        CreateMap<CreateOrderItemDto, OrderItem>();

        // Employee mappings
        CreateMap<Employee, EmployeeDto>();
        CreateMap<CreateEmployeeDto, Employee>();

        // Invoice mappings
        CreateMap<Invoice, InvoiceDto>();
        CreateMap<CreateInvoiceDto, Invoice>();

        // Appointment mappings
        CreateMap<Appointment, AppointmentDto>()
            .ForMember(dest => dest.NombreCliente, opt => opt.MapFrom(src => src.User.Nombre))
            .ForMember(dest => dest.EmailCliente, opt => opt.MapFrom(src => src.User.Email))
            .ForMember(dest => dest.TelefonoCliente, opt => opt.MapFrom(src => src.User.Telefono));
        CreateMap<CreateAppointmentDto, Appointment>();
    }
}
```

---

**Nota**: Estos DTOs proporcionan una capa de abstracción entre tus modelos de base de datos y las respuestas de la API, mejorando la seguridad y flexibilidad.
