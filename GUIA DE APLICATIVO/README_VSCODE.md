# Ejecutar LentSoft en Visual Studio Code

Este proyecto fue originalmente creado para **Figma Make**, pero ahora está configurado para ejecutarse también en VS Code local.

## 🚀 Pasos para Ejecutar

### **1. Instalar Dependencias**

```bash
pnpm install
```

### **2. Ejecutar el Servidor de Desarrollo**

```bash
pnpm run dev
```

### **3. Abrir en el Navegador**

El proyecto se ejecutará en: `http://localhost:5173`

---

## 📁 Archivos Creados para VS Code

Los siguientes archivos se agregaron para que el proyecto funcione fuera de Figma Make:

- ✅ **`src/main.tsx`** - Punto de entrada principal
- ✅ **`index.html`** - Archivo HTML raíz
- ✅ **Scripts en `package.json`**:
  - `pnpm run dev` - Iniciar servidor de desarrollo
  - `pnpm run build` - Compilar para producción
  - `pnpm run preview` - Vista previa de la build

---

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm install` | Instalar dependencias |
| `pnpm run dev` | Servidor de desarrollo (hot reload) |
| `pnpm run build` | Compilar para producción |
| `pnpm run preview` | Vista previa de producción |

---

## ⚠️ Nota Importante

Este proyecto usa:
- **React 18** + **TypeScript**
- **Vite** como bundler
- **pnpm** como gestor de paquetes (NO npm)
- **Tailwind CSS v4**
- **React Router v7**

---

## 🐛 Solución de Problemas

### Error: "Cannot find module './app/App.tsx'"
✅ **Solucionado**: El archivo `main.tsx` ya importa correctamente desde `./App.tsx`

### Error: "npm: command not found"
❌ **Usar pnpm**: Este proyecto usa `pnpm`, no `npm`
```bash
pnpm run dev  # ✅ Correcto
npm run dev   # ❌ Incorrecto
```

### Puerto 5173 ocupado
```bash
# Cambiar puerto (opcional)
pnpm run dev -- --port 3000
```

---

## 📚 Documentación Adicional

- Ver `MVC_STRUCTURE.md` para entender la arquitectura
- Ver `DOTNET_API_STRUCTURE.md` para integración con backend .NET
- Ver `SQLSERVER_SETUP.md` para configuración de base de datos

---

**¡Listo!** Ahora puedes desarrollar LentSoft en VS Code. 🎉
