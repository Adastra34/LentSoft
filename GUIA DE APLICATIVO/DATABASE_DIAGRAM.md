# Diagrama de Base de Datos - LentSoft

## 📊 Esquema Visual de la Base de Datos

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          LentSoftDB                                      │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│       Users          │
├──────────────────────┤
│ PK  Id              │─┐
│     Nombre          │ │
│ UQ  Email           │ │
│     PasswordHash    │ │
│     Telefono        │ │
│     Role            │ │
│     FechaRegistro   │ │
│     UltimaCompra    │ │
└──────────────────────┘ │
                         │
                         │ 1:N (Un usuario puede tener muchos pedidos)
                         │
                    ┌────▼─────────────────┐
                    │      Orders          │
                    ├──────────────────────┤
                    │ PK  Id              │─┐
                    │ FK  UserId          │ │
                    │     Total           │ │
                    │     Estado          │ │
                    │     DireccionEnvio  │ │
                    │     FechaPedido     │ │
                    │     FechaEntrega    │ │
                    └──────────────────────┘ │
                                             │
                   ┌─────────────────────────┤
                   │                         │
                   │ 1:N                     │ 1:1
                   │ (Un pedido              │ (Un pedido
                   │  tiene items)           │  tiene factura)
                   │                         │
        ┌──────────▼──────────┐    ┌────────▼──────────┐
        │    OrderItems       │    │     Invoices      │
        ├─────────────────────┤    ├───────────────────┤
        │ PK  Id             │    │ PK  Id            │
        │ FK  OrderId        │    │ UQ  NumeroFactura │
        │ FK  ProductId      │─┐  │ FK  OrderId       │
        │     Cantidad       │ │  │     Subtotal      │
        │     PrecioUnitario │ │  │     Impuestos     │
        └─────────────────────┘ │  │     Total         │
                                │  │     Estado        │
                                │  │     FechaEmision  │
                                │  │     FechaPago     │
                                │  │     MetodoPago    │
                                │  └───────────────────┘
                                │
                                │ N:1 (Muchos items
                                │      apuntan a un producto)
                                │
                      ┌─────────▼──────────┐
                      │     Products       │
                      ├────────────────────┤
                      │ PK  Id            │
                      │     Nombre        │
                      │     Descripcion   │
                      │     Precio        │
                      │     PrecioDesc... │
                      │     Categoria     │
                      │     Marca         │
                      │     Stock         │
                      │     ImagenUrl     │
                      │     Activo        │
                      │     FechaCreacion │
                      └────────────────────┘


┌──────────────────────┐
│     Employees        │
├──────────────────────┤
│ PK  Id              │
│     Nombre          │
│ UQ  Email           │
│     Telefono        │
│     Puesto          │
│     Departamento    │
│     Salario         │
│     FechaContrat... │
│     Activo          │
└──────────────────────┘


┌──────────────────────┐
│    Appointments      │
├──────────────────────┤
│ PK  Id              │
│ FK  UserId          │──┐
│     Servicio        │  │
│     FechaHora       │  │
│     Estado          │  │
│     Notas           │  │
│     FechaCreacion   │  │
└──────────────────────┘  │
                          │
                          │ N:1 (Muchas citas
                          │      de un usuario)
                          │
        ┌─────────────────▼─────┐
        │  (Referencia a Users) │
        └───────────────────────┘
```

---

## 🔗 Relaciones Detalladas

### **1. Users → Orders (1:N)**
- Un usuario puede tener **muchos pedidos**
- Un pedido pertenece a **un usuario**
- FK: `Orders.UserId` → `Users.Id`
- Delete: `NO ACTION` (no se pueden eliminar usuarios con pedidos)

### **2. Users → Appointments (1:N)**
- Un usuario puede tener **muchas citas**
- Una cita pertenece a **un usuario**
- FK: `Appointments.UserId` → `Users.Id`
- Delete: `CASCADE` (al eliminar usuario se eliminan sus citas)

### **3. Orders → OrderItems (1:N)**
- Un pedido contiene **muchos items**
- Un item pertenece a **un pedido**
- FK: `OrderItems.OrderId` → `Orders.Id`
- Delete: `CASCADE` (al eliminar pedido se eliminan sus items)

### **4. Products → OrderItems (1:N)**
- Un producto puede estar en **muchos items de pedido**
- Un item de pedido referencia a **un producto**
- FK: `OrderItems.ProductId` → `Products.Id`
- Delete: `NO ACTION` (no se pueden eliminar productos con pedidos históricos)

### **5. Orders → Invoices (1:1)**
- Un pedido tiene **una factura**
- Una factura pertenece a **un pedido**
- FK: `Invoices.OrderId` → `Orders.Id`
- Delete: `CASCADE` (al eliminar pedido se elimina su factura)

---

## 📋 Tablas Independientes

### **Employees**
- Tabla independiente sin relaciones FK
- Gestión de personal interno
- No se relaciona directamente con pedidos o usuarios

---

## 🔑 Índices y Constraints

### **Índices Únicos (UNIQUE)**
```sql
Users.Email          → UQ_Users_Email
Employees.Email      → UQ_Employees_Email
Invoices.NumeroFactura → UQ_Invoices_NumeroFactura
```

### **Índices de Búsqueda**
```sql
Products.Categoria   → IX_Products_Categoria
Products.Nombre      → IX_Products_Nombre
Orders.Estado        → IX_Orders_Estado
Orders.FechaPedido   → IX_Orders_FechaPedido
```

### **Índices de Foreign Keys**
```sql
Orders.UserId        → IX_Orders_UserId
OrderItems.OrderId   → IX_OrderItems_OrderId
OrderItems.ProductId → IX_OrderItems_ProductId
Appointments.UserId  → IX_Appointments_UserId
```

---

## ✅ Constraints de Validación

### **Users**
```sql
CK_Users_Role: Role IN ('usuario', 'admin')
```

### **Products**
```sql
CK_Products_Precio: Precio >= 0
CK_Products_Stock: Stock >= 0
CK_Products_PrecioDescuento: PrecioDescuento < Precio
```

### **Orders**
```sql
CK_Orders_Total: Total >= 0
CK_Orders_Estado: Estado IN ('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado')
```

### **OrderItems**
```sql
CK_OrderItems_Cantidad: Cantidad > 0
CK_OrderItems_PrecioUnitario: PrecioUnitario >= 0
```

### **Invoices**
```sql
CK_Invoices_Estado: Estado IN ('pendiente', 'pagada', 'cancelada')
CK_Invoices_Subtotal: Subtotal >= 0
CK_Invoices_Impuestos: Impuestos >= 0
CK_Invoices_Total: Total >= 0
```

---

## 📊 Tipos de Datos Principales

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Id | `INT IDENTITY(1,1)` | Clave primaria autoincremental |
| Nombre | `NVARCHAR(100)` | Nombres de personas |
| Email | `NVARCHAR(100)` | Direcciones de correo |
| Precio | `DECIMAL(10,2)` | Valores monetarios |
| Fecha | `DATETIME2` | Fechas y horas (UTC) |
| Booleano | `BIT` | Valores true/false |
| Descripción | `NVARCHAR(1000)` | Textos largos |

---

## 🎯 Vistas Creadas

### **1. vw_ProductosConDescuento**
Productos que tienen descuento activo con porcentaje calculado

### **2. vw_PedidosCompletos**
Pedidos con información del usuario y conteo de items

### **3. vw_EstadisticasVentas**
Resumen de ventas por mes y año

---

## 🔄 Stored Procedures

### **1. sp_CrearPedido**
```sql
EXEC sp_CrearPedido 
    @UserId = 1,
    @DireccionEnvio = 'Calle Principal 123',
    @Items = '[{"productId": 1, "cantidad": 2}, {"productId": 3, "cantidad": 1}]'
```

### **2. sp_DashboardAdmin**
```sql
EXEC sp_DashboardAdmin
-- Retorna: TotalUsuarios, TotalProductos, VentasTotales, etc.
```

---

## ⚡ Triggers

### **1. trg_UpdateUltimaCompra**
- Se ejecuta al INSERT/UPDATE en Orders
- Actualiza `Users.UltimaCompra` cuando un pedido es entregado

### **2. trg_GenerateInvoiceNumber**
- Se ejecuta en INSERT de Invoices
- Genera automáticamente número de factura: `2026-000001`

---

## 📈 Cardinalidad Resumen

```
Users (1) ──────< (N) Orders
Users (1) ──────< (N) Appointments
Orders (1) ──────< (N) OrderItems
Products (1) ────< (N) OrderItems
Orders (1) ────── (1) Invoices
Employees (independiente)
```

---

## 🛡️ Consideraciones de Seguridad

1. **PasswordHash**: Nunca se almacena contraseña en texto plano
2. **Índices únicos**: Previenen duplicados de emails
3. **Constraints**: Validan datos a nivel de BD
4. **Foreign Keys**: Mantienen integridad referencial
5. **Triggers**: Automatizan lógica de negocio crítica

---

## 📦 Tamaño Estimado

Para 1000 registros por tabla:

| Tabla | Rows | Tamaño Aprox. |
|-------|------|---------------|
| Users | 1,000 | ~500 KB |
| Products | 1,000 | ~800 KB |
| Orders | 5,000 | ~1 MB |
| OrderItems | 15,000 | ~2 MB |
| Invoices | 5,000 | ~1 MB |
| Employees | 50 | ~20 KB |
| Appointments | 2,000 | ~400 KB |
| **Total** | **29,050** | **~6 MB** |

*Nota: No incluye índices ni logs de transacciones*

---

## 🔍 Queries Útiles

### Ver todas las tablas
```sql
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
```

### Ver relaciones FK
```sql
SELECT 
    fk.name AS ForeignKey,
    OBJECT_NAME(fk.parent_object_id) AS TableName,
    COL_NAME(fc.parent_object_id, fc.parent_column_id) AS ColumnName,
    OBJECT_NAME(fk.referenced_object_id) AS ReferencedTable,
    COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS ReferencedColumn
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fc ON fk.object_id = fc.constraint_object_id
ORDER BY TableName;
```

### Ver índices
```sql
SELECT 
    t.name AS TableName,
    i.name AS IndexName,
    i.type_desc AS IndexType,
    i.is_unique AS IsUnique
FROM sys.indexes i
INNER JOIN sys.tables t ON i.object_id = t.object_id
WHERE i.name IS NOT NULL
ORDER BY t.name, i.name;
```

---

**Base de datos diseñada para**: Alta concurrencia, integridad referencial, y escalabilidad
