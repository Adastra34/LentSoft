# 🏗️ Arquitectura MVC - LentSoft

## 📋 Resumen Ejecutivo

El proyecto **LentSoft** ha sido reorganizado siguiendo el patrón arquitectónico **Modelo-Vista-Controlador (MVC)** para mejorar la mantenibilidad, escalabilidad y colaboración del equipo.

---

## 🎯 Estructura del Proyecto

```
src/
│
├── 📱 App.tsx                          # Punto de entrada de la aplicación
│
├── 📊 models/                          # CAPA DE MODELOS
│   ├── data/
│   │   └── products.ts                # Catálogo de productos
│   └── interfaces/                    # (Preparado para interfaces TypeScript)
│
├── 🎨 views/                           # CAPA DE VISTAS
│   ├── components/                    # Componentes reutilizables
│   │   ├── ui/                        # Sistema de diseño base
│   │   ├── figma/                     # Componentes de Figma
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Categories.tsx
│   │   ├── BestSellers.tsx
│   │   ├── DiscountedProducts.tsx
│   │   ├── ContactLensCategory.tsx
│   │   ├── CustomizationSteps.tsx
│   │   └── AccessibilityPanel.tsx
│   │
│   ├── pages/                         # Páginas de la aplicación
│   │   ├── RootLayout.tsx
│   │   ├── HomePage.tsx
│   │   ├── TiendaPage.tsx
│   │   ├── ProductoPage.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── NosotrosPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegistroPage.tsx
│   │   ├── RecuperarContrasenaPage.tsx
│   │   ├── DashboardUsuarioPage.tsx
│   │   └── DashboardAdminPage.tsx
│   │
│   └── layouts/                       # (Preparado para layouts adicionales)
│
├── 🎮 controllers/                     # CAPA DE CONTROLADORES
│   ├── contexts/
│   │   └── AuthContext.tsx           # Gestión de autenticación
│   └── hooks/                         # (Preparado para custom hooks)
│
├── 🛤️ routes/
│   └── routes.ts                      # Configuración de rutas
│
└── 🎨 styles/                          # Estilos globales
    ├── globals.css
    ├── theme.css
    ├── fonts.css
    ├── tailwind.css
    └── index.css
```

---

## 🔄 Diagrama de Flujo MVC

```
┌─────────────────────────────────────────────────────────────────┐
│                          USUARIO                                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────────┐
        │         🎨 VISTAS (Views)                │
        │  • Componentes UI (Header, Footer, etc)  │
        │  • Páginas (HomePage, TiendaPage, etc)   │
        │  • Solo presentación y eventos           │
        └──────────────┬───────────────────────────┘
                       │
                       │ (Eventos del usuario)
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │     🎮 CONTROLADORES (Controllers)       │
        │  • Contextos (AuthContext)               │
        │  • Hooks personalizados                  │
        │  • Lógica de negocio                     │
        └──────────────┬───────────────────────────┘
                       │
                       │ (Manipula/Lee)
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │        📊 MODELOS (Models)               │
        │  • Datos (products.ts)                   │
        │  • Interfaces TypeScript                 │
        │  • Servicios de datos                    │
        └──────────────┬───────────────────────────┘
                       │
                       │ (Actualiza)
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │         🎨 VISTAS (Views)                │
        │  Re-renderiza con nuevos datos           │
        └──────────────────────────────────────────┘
```

---

## 📦 Mapeo de Archivos: Antes vs Después

### Antes (Estructura Flat)
```
src/app/
├── components/
├── pages/
├── context/
├── data/
├── routes.ts
└── App.tsx
```

### Después (Estructura MVC)
```
src/
├── models/          # data/
├── views/           # components/ + pages/
├── controllers/     # context/
├── routes/          # routes.ts
└── App.tsx
```

---

## 🔗 Guía de Importaciones

### ✅ Desde `/src/App.tsx`
```typescript
import { router } from "./routes/routes";
import { AuthProvider } from "./controllers/contexts/AuthContext";
```

### ✅ Desde `/src/views/pages/*.tsx`
```typescript
// Componentes (mismo nivel de views)
import { Header } from "../components/Header";

// Datos (2 niveles arriba → models)
import { products } from "../../models/data/products";

// Contextos (2 niveles arriba → controllers)
import { useAuth } from "../../controllers/contexts/AuthContext";
```

### ✅ Desde `/src/views/components/*.tsx`
```typescript
// Datos
import { products } from "../../models/data/products";

// Contextos
import { useAuth } from "../../controllers/contexts/AuthContext";

// Componentes UI (mismo nivel)
import { Button } from "./ui/button";
```

### ✅ Desde `/src/routes/routes.ts`
```typescript
import { HomePage } from "../views/pages/HomePage";
import { LoginPage } from "../views/pages/LoginPage";
```

---

## 📂 Descripción de Cada Capa

### 📊 MODELOS (`models/`)
**Responsabilidad**: Gestión de datos y estructuras

- **`data/`**: Datos estáticos, mock data, configuraciones
  - `products.ts`: Catálogo de productos con ~65 productos
  - Función `formatPrice()` para formato de moneda colombiana

- **`interfaces/`** (futuro): Definiciones TypeScript
  - Interfaces de entidades (User, Order, Product, etc.)
  - Types compartidos

**Principio**: Los modelos no conocen las vistas ni los controladores.

---

### 🎨 VISTAS (`views/`)
**Responsabilidad**: Presentación e interfaz de usuario

#### **`components/`**: Componentes reutilizables
- **Header.tsx**: Navegación principal con menú responsive
- **Footer.tsx**: Pie de página con enlaces
- **Hero.tsx**: Banner principal de la home
- **Categories.tsx**: Grid de categorías de productos
- **BestSellers.tsx**: Carrusel de productos más vendidos
- **DiscountedProducts.tsx**: Productos en oferta
- **ContactLensCategory.tsx**: Sección de lentes de contacto
- **CustomizationSteps.tsx**: Pasos de personalización
- **AccessibilityPanel.tsx**: Panel de accesibilidad (WCAG 2.1)
- **ui/**: 40+ componentes base de shadcn/ui
- **figma/**: Componentes importados de Figma

#### **`pages/`**: Páginas completas
- **RootLayout.tsx**: Layout principal con Header/Footer
- **HomePage.tsx**: Página de inicio
- **TiendaPage.tsx**: Catálogo de productos
- **ProductoPage.tsx**: Detalle de producto
- **CategoryPage.tsx**: Filtrado por categoría
- **NosotrosPage.tsx**: Información de la empresa
- **LoginPage.tsx**: Autenticación
- **RegistroPage.tsx**: Registro de usuarios
- **RecuperarContrasenaPage.tsx**: Recuperación de contraseña
- **DashboardUsuarioPage.tsx**: Panel de usuario con:
  - Gestión de citas
  - Seguimiento de pedidos
  - Productos favoritos
  - Perfil y historial médico
- **DashboardAdminPage.tsx**: Panel de administrador con:
  - Gestión de inventario
  - Gestión de citas
  - Gestión de usuarios
  - Gestión de trabajadores
  - Gestión de facturas

**Principio**: Las vistas son "tontas" - solo muestran datos y emiten eventos.

---

### 🎮 CONTROLADORES (`controllers/`)
**Responsabilidad**: Lógica de negocio y estado

#### **`contexts/`**: Contextos de React
- **AuthContext.tsx**: 
  - Estado de autenticación
  - Funciones `login()`, `logout()`
  - Usuario actual
  - Rol de usuario (admin/usuario)

#### **`hooks/`** (futuro):
- Custom hooks para lógica reutilizable
- Hooks de formularios
- Hooks de datos/fetch

**Principio**: Los controladores coordinan entre modelos y vistas.

---

### 🛤️ RUTAS (`routes/`)
**Responsabilidad**: Configuración de navegación

- **routes.ts**:
  - 11 rutas configuradas
  - Layout anidado con RootLayout
  - Rutas públicas y protegidas
  - Parámetros dinámicos (`:id`, `:category`)

---

## ✨ Características de Diseño

### 🎨 Sistema de Diseño
- **Paleta de colores**: Morado (purple-50 a purple-900)
- **Degradados**: `from-purple-50 via-white to-purple-100`
- **Border radius**: 16-24px (redondeados)
- **Fuentes**: 
  - Principal: Bricolage Grotesque
  - Secundaria: Montserrat
- **Framework**: Tailwind CSS v4

### ♿ Accesibilidad (WCAG 2.1)
- Navegación por teclado
- Estados de foco visibles
- HTML semántico
- Contraste de colores
- Tamaño de texto ajustable
- Modo de alto contraste
- Panel de accesibilidad integrado

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Componentes adaptables
- Menú hamburguesa en móvil

---

## 🚀 Beneficios de la Reorganización

1. **✅ Separación de Responsabilidades**
   - Cada carpeta tiene un propósito único
   - Fácil ubicar archivos

2. **✅ Escalabilidad**
   - Agregar nuevas features es simple
   - Estructura clara para nuevos desarrolladores

3. **✅ Mantenibilidad**
   - Cambios localizados
   - Menos conflictos en Git
   - Código más limpio

4. **✅ Testabilidad**
   - Componentes aislados
   - Lógica separada de la presentación
   - Fácil crear mocks

5. **✅ Reutilización**
   - Componentes desacoplados
   - Hooks compartidos
   - Modelos reutilizables

6. **✅ Convención**
   - Estructura estándar en la industria
   - Patrón reconocido por todos

---

## 📈 Próximos Pasos Sugeridos

### Fase 1: Tipos e Interfaces
- [ ] Crear interfaces en `models/interfaces/`
  - `IUser.ts`
  - `IProduct.ts`
  - `IOrder.ts`
  - `IAppointment.ts`

### Fase 2: Custom Hooks
- [ ] Crear hooks en `controllers/hooks/`
  - `useProducts.ts`
  - `useCart.ts`
  - `useOrders.ts`
  - `useAppointments.ts`

### Fase 3: Servicios
- [ ] Crear servicios en `models/services/`
  - `api.ts` (cliente HTTP)
  - `productService.ts`
  - `authService.ts`
  - `orderService.ts`

### Fase 4: Estado Global
- [ ] Implementar Zustand o Redux
  - Store de carrito
  - Store de usuario
  - Store de filtros

### Fase 5: Testing
- [ ] Tests unitarios por capa
  - Componentes (Vitest + Testing Library)
  - Hooks (Vitest)
  - Servicios (Vitest)

---

## 📚 Referencias

- **Patrón MVC**: https://es.wikipedia.org/wiki/Modelo–vista–controlador
- **React Best Practices**: https://react.dev/learn
- **TypeScript**: https://www.typescriptlang.org/
- **Tailwind CSS**: https://tailwindcss.com/

---

## 👥 Equipo

**Desarrollado por**: LentSoft Team  
**Fecha de reorganización**: 29 de abril, 2026  
**Versión**: 2.0 (Arquitectura MVC)

---

## 📝 Notas Importantes

⚠️ **No se modificó ninguna funcionalidad** - Solo se reorganizaron los archivos.  
✅ **Todas las importaciones fueron actualizadas** automáticamente.  
📂 **La carpeta `app/` antigua fue eliminada** después de la migración.  
📖 **Consulta `MVC_STRUCTURE.md`** en `src/` para detalles técnicos.

---

**¡La aplicación está lista para escalar! 🚀**
