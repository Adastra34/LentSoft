# 🚀 Cómo Ejecutar LentSoft en Visual Studio Code (Windows)

Este proyecto requiere Node.js para funcionar. Sigue estos pasos:

---

## ✅ Opción 1: Usar npm (Más Simple)

### **Paso 1: Verificar que tienes Node.js instalado**

Abre PowerShell y ejecuta:
```powershell
node --version
npm --version
```

Si NO tienes Node.js instalado, descárgalo desde:
👉 https://nodejs.org/ (versión LTS recomendada)

---

### **Paso 2: Instalar dependencias**

En la carpeta del proyecto, ejecuta:
```powershell
npm install
```

Esto puede tardar varios minutos (hay muchas dependencias).

---

### **Paso 3: Ejecutar el servidor de desarrollo**

```powershell
npm run dev
```

Verás algo como:
```
  VITE v6.3.5  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### **Paso 4: Abrir en el navegador**

Abre Chrome/Edge y ve a:
```
http://localhost:5173
```

✅ **¡Listo!** La aplicación debería estar corriendo.

---

## 🎯 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instalar todas las dependencias |
| `npm run dev` | Ejecutar servidor de desarrollo |
| `npm run build` | Compilar para producción |
| `npm run preview` | Vista previa de producción |

---

## ✅ Opción 2: Usar pnpm (Alternativa más rápida)

Si prefieres usar `pnpm` (gestor de paquetes más rápido):

### **Instalarlo globalmente:**
```powershell
npm install -g pnpm
```

### **Luego usar:**
```powershell
pnpm install
pnpm run dev
```

---

## 🐛 Solución de Problemas

### ❌ Error: "pnpm is not recognized"
**Solución**: Usa `npm` en lugar de `pnpm` (ver Opción 1)

### ❌ Error: "node is not recognized"
**Solución**: Instala Node.js desde https://nodejs.org/

### ❌ Puerto 5173 ya está en uso
**Solución**: Cambia el puerto:
```powershell
npm run dev -- --port 3000
```

### ❌ Error al instalar dependencias
**Solución**: Borra `node_modules` y el archivo `package-lock.json`, luego:
```powershell
npm cache clean --force
npm install
```

---

## 📂 Estructura del Proyecto

```
LentSoft/
├── src/
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Punto de entrada
│   ├── views/               # Componentes UI
│   ├── controllers/         # Lógica de negocio
│   ├── models/              # Datos y tipos
│   ├── routes/              # Configuración de rutas
│   └── styles/              # Estilos CSS
├── index.html               # HTML raíz
├── package.json             # Dependencias
└── vite.config.ts           # Configuración de Vite
```

---

## 🎨 Características del Proyecto

- ✅ **Frontend**: React 18 + TypeScript
- ✅ **Estilos**: Tailwind CSS v4
- ✅ **Routing**: React Router v7
- ✅ **UI Components**: Radix UI + Material UI
- ✅ **Iconos**: Lucide React
- ✅ **Build Tool**: Vite
- ✅ **Paleta**: Morada (LentSoft theme)

---

## 📚 Próximos Pasos

1. ✅ Ejecutar el proyecto localmente
2. 📖 Leer `MVC_STRUCTURE.md` para entender la arquitectura
3. 🔌 Ver `INTEGRATION_GUIDE.md` para integrar con backend .NET
4. 🗄️ Ver `SQLSERVER_SETUP.md` para configurar la base de datos

---

**¿Necesitas ayuda?** Revisa los archivos `.md` en la raíz del proyecto para más información.

🎉 **¡A desarrollar!**
