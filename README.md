LentSoft - Plataforma E-commerce Óptico

Descripción

LentSoft es una plataforma de comercio electrónico especializada en productos ópticos, desarrollada con **HTML, CSS y JavaScript Vanilla** siguiendo el patrón de arquitectura MVC (Modelo-Vista-Controlador).


## 🗂️ Estructura del Proyecto

```
LentSoft/
├── index.html                  # Punto de entrada principal
├── README.md                   # Este archivo
│
├── Views/                      # 📄 Vistas HTML
│   ├── login.html
│   ├── registro.html
│   ├── home.html
│   ├── tienda.html
│   ├── nosotros.html
│   ├── dashboard-usuario.html
│   └── dashboard-admin.html
│
├── Controllers/                # 🎮 Controladores (Lógica de negocio)
│   ├── AuthController.js
│   ├── ProductController.js
│   ├── OrderController.js
│   └── UserController.js
│
├── Models/                     # 📊 Modelos de datos
│   ├── User.js
│   ├── Product.js
│   └── Order.js
│
├── css/                        # 🎨 Estilos
│   └── styles.css             # Estilos principales con paleta LentSoft
│
├── js/                         # ⚙️ JavaScript Principal
│   ├── router.js              # Sistema de enrutamiento SPA
│   ├── auth.js                # Autenticación y sesiones
│   └── app.js                 # Inicialización y rutas
│
├── images/                     # 🖼️ Imágenes y recursos visuales
│
└── GUIA DE APLICATIVO/         # 📚 Documentación técnica
    ├── ARQUITECTURA_MVC.md
    ├── DOTNET_API_STRUCTURE.md
    ├── database_schema.sql
    ├── package.json
    ├── vite.config.ts
    └── ... (todos los archivos de documentación)
```

---

## 🚀 Cómo Ejecutar el Proyecto

Este repositorio contiene la versión moderna en **React (Vite + TypeScript)** configurada de forma predeterminada, e incluye también los archivos de una versión en **HTML/JS Vanilla**. A continuación se detalla cómo ejecutar cada una:

### ⚡ Opción 1: Ejecutar la versión React (Recomendada)
Esta versión utiliza React 18, Vite, TypeScript y Tailwind CSS v4. Requiere **Node.js** instalado en el sistema.

#### **Paso 1: Instalar dependencias**
Abre una terminal en la raíz del proyecto y ejecuta:
```bash
pnpm install
# O si usas npm:
npm install
```
> [!IMPORTANT]
> **Nota para Windows (PowerShell):** Si te aparece un error indicando que *"la ejecución de scripts está deshabilitada en este sistema"* (`SecurityError`), puedes evadir esta restricción utilizando el comando directo con el sufijo `.cmd`:
> ```powershell
> pnpm.cmd install
> # O con npm:
> npm.cmd install
> ```

#### **Paso 2: Iniciar el servidor de desarrollo**
Ejecuta el servidor local de Vite:
```bash
pnpm run dev
# O si usas npm:
npm run dev
```
> [!IMPORTANT]
> **Nota para Windows (PowerShell):** Si se bloquea la ejecución por políticas de scripts, ejecuta:
> ```powershell
> pnpm.cmd run dev
> # O con npm:
> npm.cmd run dev
> ```

#### **Paso 3: Abrir en el navegador**
Una vez que el servidor esté listo, abre tu navegador en la URL indicada por la consola:
👉 **`http://localhost:5173`**

---

### 📄 Opción 2: Ejecutar la versión en JavaScript Vanilla (Sin Node.js)
Si prefieres ejecutar el proyecto utilizando código HTML/JS tradicional sin instalar dependencias:

1. **Modificar el archivo raíz `index.html`:** Cambia el contenido del archivo `index.html` en la raíz para que en lugar de apuntar a `/src/main.tsx`, apunte a los estilos de `css/styles.css` y cargue los archivos Javascript correspondientes en la carpeta `js/` (además de los modelos y controladores de la raíz).
2. **Iniciar el servidor local estático:**
   ```bash
   # Usando Node.js (http-server)
   npx http-server -p 8000
   
   # O usando Python 3
   python -m http.server 8000
   ```
3. Abre tu navegador en **`http://localhost:8000`**.

---

## 🔐 Usuarios de Prueba

### **Administrador**
- **Email:** admin@lentsoft.com
- **Contraseña:** admin123

### **Usuario Normal**
- **Email:** user@lentsoft.com
- **Contraseña:** user123

---

## ✨ Características Principales

### **Frontend (HTML/CSS/JS Vanilla)**
- ✅ Sistema de enrutamiento SPA (Single Page Application)
- ✅ Autenticación con LocalStorage
- ✅ Patrón MVC completo
- ✅ Diseño responsive
- ✅ Paleta de colores LentSoft (morado/purple)
- ✅ Sin dependencias de frameworks (100% Vanilla)

### **Módulos Implementados**
- 🏠 **Inicio:** Página principal con categorías y productos destacados
- 🛒 **Tienda:** Catálogo completo de productos con filtros
- 👤 **Autenticación:** Login y registro de usuarios
- 📊 **Dashboard Usuario:** Perfil, pedidos, citas
- 🔧 **Dashboard Admin:** Gestión de productos, usuarios, ventas e inventario
- ℹ️ **Nosotros:** Información de la empresa

---

## 🎨 Paleta de Colores

```css
/* Purple Palette - LentSoft */
--purple-50:  #faf5ff
--purple-100: #f3e8ff
--purple-200: #e9d5ff
--purple-300: #d8b4fe
--purple-400: #c084fc
--purple-500: #a855f7
--purple-600: #9333ea  /* Principal */
--purple-700: #7e22ce  /* Textos */
--purple-800: #6b21a8
--purple-900: #581c87  /* Títulos */
--purple-950: #3b0764
```

---

## 📂 Patrón MVC

### **Modelos (Models/)**
Clases JavaScript que representan las entidades de datos:
- `User.js` - Usuario con validaciones
- `Product.js` - Producto con cálculo de descuentos
- `Order.js` - Pedido con cálculo de totales e IVA

### **Vistas (Views/)**
Archivos HTML que representan las interfaces de usuario:
- Páginas públicas: home, tienda, nosotros
- Autenticación: login, registro
- Dashboards: usuario y administrador

### **Controladores (Controllers/)**
Lógica de negocio que conecta Modelos y Vistas:
- `AuthController.js` - Autenticación y autorización
- `ProductController.js` - Gestión de productos
- `OrderController.js` - Gestión de pedidos/ventas
- `UserController.js` - Gestión de usuarios

---

## 🔧 Sistema de Enrutamiento

El proyecto utiliza un enrutador SPA personalizado (`js/router.js`) que permite:

- Navegación sin recargar la página
- Rutas protegidas con autenticación
- Carga dinámica de vistas HTML
- Soporte para historial del navegador (back/forward)

**Rutas Disponibles:**
- `/inicio` - Página principal
- `/tienda` - Catálogo de productos
- `/nosotros` - Información de la empresa
- `/login` - Inicio de sesión
- `/registro` - Crear cuenta
- `/dashboard` - Panel de usuario (requiere autenticación)
- `/dashboard-admin` - Panel de administrador (requiere rol admin)

---

## 💾 Almacenamiento de Datos

Los datos se almacenan en **LocalStorage** del navegador:

- `lentsoft_user` - Usuario autenticado actual
- `lentsoft_token` - Token de sesión
- `lentsoft_products` - Lista de productos
- `lentsoft_orders` - Pedidos/ventas
- `lentsoft_all_users` - Todos los usuarios (solo admin)

> **Nota:** En producción, esto debe conectarse a una API backend (ver documentación en `GUIA DE APLICATIVO/`)

---

## 🔗 Integración con Backend

Para conectar con una API .NET:

1. Ver documentación en: `GUIA DE APLICATIVO/DOTNET_API_STRUCTURE.md`
2. Configurar endpoints en los controladores
3. Reemplazar llamadas a LocalStorage por fetch/axios
4. Ver esquema de base de datos en: `GUIA DE APLICATIVO/database_schema.sql`

---

## 📚 Documentación Técnica

Toda la documentación técnica, archivos de configuración y guías se encuentran en:

```
📁 GUIA DE APLICATIVO/
```

Incluye:
- Arquitectura MVC completa
- Estructura de API .NET
- Schema de base de datos SQL Server
- Guías de integración
- Archivos de configuración originales

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos (diseño personalizado, sin frameworks)
- **JavaScript (ES6+)** - Lógica de la aplicación
- **LocalStorage** - Persistencia de datos (temporal)
- **Patrón MVC** - Arquitectura de software

---

## 🎯 Próximos Pasos

1. **Conectar con API Backend** (.NET + SQL Server)
2. **Agregar validaciones de formularios** más robustas
3. **Implementar carrito de compras** funcional
4. **Agregar sistema de pagos** (integración con pasarelas)
5. **Mejorar accesibilidad** (ARIA, screen readers)
6. **Agregar tests unitarios** (opcional)

---

## 📧 Contacto

Para más información sobre LentSoft, consulta la documentación en `GUIA DE APLICATIVO/`.

---

**🎉 ¡Proyecto convertido exitosamente de React a HTML/JS Vanilla con arquitectura MVC!**
