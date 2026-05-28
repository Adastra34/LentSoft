# Estructura MVC del Proyecto LentSoft

Este proyecto sigue el patrón arquitectónico **Modelo-Vista-Controlador (MVC)** para una mejor organización y mantenibilidad del código.

## 📁 Estructura de Carpetas

```
src/
├── models/                          # MODELOS - Datos e Interfaces
│   ├── data/                        # Datos mock y configuraciones
│   │   └── products.ts             # Catálogo de productos
│   └── interfaces/                  # Interfaces TypeScript (futuro)
│
├── views/                           # VISTAS - Componentes UI
│   ├── components/                  # Componentes reutilizables
│   │   ├── ui/                     # Componentes UI base (shadcn)
│   │   ├── figma/                  # Componentes de Figma
│   │   ├── Header.tsx              # Encabezado principal
│   │   ├── Footer.tsx              # Pie de página
│   │   ├── Hero.tsx                # Sección hero
│   │   ├── Categories.tsx          # Categorías de productos
│   │   ├── BestSellers.tsx         # Productos más vendidos
│   │   ├── DiscountedProducts.tsx  # Productos en descuento
│   │   ├── ContactLensCategory.tsx # Categoría de lentes
│   │   ├── CustomizationSteps.tsx  # Pasos de personalización
│   │   └── AccessibilityPanel.tsx  # Panel de accesibilidad
│   │
│   └── pages/                       # Páginas de la aplicación
│       ├── RootLayout.tsx          # Layout principal
│       ├── HomePage.tsx            # Página de inicio
│       ├── TiendaPage.tsx          # Página de tienda
│       ├── ProductoPage.tsx        # Detalle de producto
│       ├── CategoryPage.tsx        # Página de categoría
│       ├── NosotrosPage.tsx        # Página sobre nosotros
│       ├── LoginPage.tsx           # Inicio de sesión
│       ├── RegistroPage.tsx        # Registro de usuario
│       ├── RecuperarContrasenaPage.tsx  # Recuperar contraseña
│       ├── DashboardUsuarioPage.tsx     # Dashboard de usuario
│       └── DashboardAdminPage.tsx       # Dashboard de administrador
│
├── controllers/                     # CONTROLADORES - Lógica de Negocio
│   ├── contexts/                    # Contextos de React
│   │   └── AuthContext.tsx         # Contexto de autenticación
│   └── hooks/                       # Custom Hooks (futuro)
│
├── routes/                          # CONFIGURACIÓN DE RUTAS
│   └── routes.ts                    # Definición de rutas
│
├── styles/                          # ESTILOS GLOBALES
│   ├── globals.css                 # Estilos globales
│   ├── theme.css                   # Tokens de diseño
│   ├── fonts.css                   # Fuentes personalizadas
│   ├── tailwind.css                # Configuración Tailwind
│   └── index.css                   # Punto de entrada de estilos
│
└── App.tsx                          # Componente raíz de la aplicación
```

## 🎯 Responsabilidades por Capa

### 📊 MODELOS (`models/`)
Responsables de la **estructura de datos** y **lógica de datos**.

- **data/**: Contiene datos estáticos, configuraciones y datos mock
  - `products.ts`: Catálogo de productos con interfaz Product
  - Funciones utilitarias como `formatPrice()`

- **interfaces/** (futuro): Definiciones de tipos TypeScript
  - Interfaces de entidades
  - Types compartidos

**Ejemplo de uso:**
```typescript
import { products, formatPrice } from "../../models/data/products";
```

---

### 🎨 VISTAS (`views/`)
Responsables de la **presentación** y **UI**.

#### **components/**: Componentes reutilizables
- Componentes funcionales de React
- Solo lógica de presentación
- Reciben datos por props
- No manejan estado global directamente

#### **pages/**: Páginas completas de la aplicación
- Composición de componentes
- Integración con contextos
- Manejo de estado local de página
- Uso de hooks de routing

**Ejemplo de uso:**
```typescript
import { Header } from "../components/Header";
import { products } from "../../models/data/products";
```

---

### 🎮 CONTROLADORES (`controllers/`)
Responsables de la **lógica de negocio** y **estado global**.

#### **contexts/**: Contextos de React
- `AuthContext.tsx`: Manejo de autenticación
  - Login/Logout
  - Estado de usuario
  - Protección de rutas

#### **hooks/** (futuro): Custom Hooks
- Lógica reutilizable
- Efectos secundarios
- Interacciones con APIs

**Ejemplo de uso:**
```typescript
import { useAuth } from "../../controllers/contexts/AuthContext";
```

---

### 🛤️ RUTAS (`routes/`)
Configuración de navegación de la aplicación.

- `routes.ts`: Definición de todas las rutas usando React Router
  - Rutas públicas
  - Rutas protegidas
  - Layouts anidados

**Ejemplo de uso:**
```typescript
import { router } from "./routes/routes";
```

---

## 🔄 Flujo de Datos

```
Usuario interactúa con → VISTAS
                           ↓
                    Llaman a → CONTROLADORES
                                     ↓
                              Manipulan → MODELOS
                                           ↓
                                    Actualizan → VISTAS
```

## 📝 Convenciones de Importación

### Desde Páginas (`views/pages/`)
```typescript
// Componentes
import { Header } from "../components/Header";

// Modelos/Datos
import { products } from "../../models/data/products";

// Contextos
import { useAuth } from "../../controllers/contexts/AuthContext";
```

### Desde Componentes (`views/components/`)
```typescript
// Modelos/Datos
import { products } from "../../models/data/products";

// Contextos
import { useAuth } from "../../controllers/contexts/AuthContext";

// Otros componentes (mismo nivel)
import { Button } from "./ui/button";
```

### Desde Raíz (`src/`)
```typescript
// Rutas
import { router } from "./routes/routes";

// Contextos
import { AuthProvider } from "./controllers/contexts/AuthContext";
```

---

## ✅ Beneficios de esta Estructura

1. **Separación de Responsabilidades**: Cada capa tiene un propósito claro
2. **Escalabilidad**: Fácil agregar nuevas funcionalidades
3. **Mantenibilidad**: Código organizado y predecible
4. **Testabilidad**: Componentes y lógica fáciles de probar
5. **Colaboración**: Estructura estándar que todo el equipo entiende
6. **Reutilización**: Componentes y lógica desacoplados

---

## 🚀 Próximos Pasos

- [ ] Crear interfaces TypeScript en `models/interfaces/`
- [ ] Implementar custom hooks en `controllers/hooks/`
- [ ] Agregar servicios de API en `models/services/`
- [ ] Implementar estado global con Context API o Zustand
- [ ] Agregar tests unitarios por capa

---

**Fecha de implementación**: 29 de abril, 2026  
**Proyecto**: LentSoft - Plataforma E-commerce Óptico
