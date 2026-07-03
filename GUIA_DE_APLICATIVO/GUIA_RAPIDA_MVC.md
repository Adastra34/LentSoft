# ⚡ Guía Rápida MVC - LentSoft

## 🎯 ¿Dónde pongo mi código?

### 🤔 ¿Estoy creando datos o interfaces?
→ **`src/models/`**

```typescript
// src/models/data/categories.ts
export const categories = [
  { id: 1, name: "Gafas" },
  { id: 2, name: "Lentes" }
];

// src/models/interfaces/IUser.ts
export interface IUser {
  id: number;
  name: string;
  email: string;
}
```

---

### 🤔 ¿Estoy creando un componente visual?
→ **`src/views/components/`**

```typescript
// src/views/components/ProductCard.tsx
import { formatPrice } from "../../models/data/products";

export function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{formatPrice(product.price)}</p>
    </div>
  );
}
```

---

### 🤔 ¿Estoy creando una página completa?
→ **`src/views/pages/`**

```typescript
// src/views/pages/ContactoPage.tsx
import { Header } from "../components/Header";
import { useAuth } from "../../controllers/contexts/AuthContext";

export function ContactoPage() {
  const { user } = useAuth();
  
  return (
    <main>
      <Header />
      <h1>Contacto</h1>
    </main>
  );
}
```

---

### 🤔 ¿Estoy creando lógica de negocio o estado?
→ **`src/controllers/`**

```typescript
// src/controllers/contexts/CartContext.tsx
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// src/controllers/hooks/useProducts.ts
export function useProducts() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch products
  }, []);
  
  return { products };
}
```

---

## 📦 Patrones de Importación

### Desde una PÁGINA (`views/pages/*.tsx`)

```typescript
// ✅ Importar componentes
import { Header } from "../components/Header";
import { Button } from "../components/ui/button";

// ✅ Importar datos
import { products } from "../../models/data/products";

// ✅ Importar contextos
import { useAuth } from "../../controllers/contexts/AuthContext";

// ✅ Importar hooks
import { useProducts } from "../../controllers/hooks/useProducts";
```

---

### Desde un COMPONENTE (`views/components/*.tsx`)

```typescript
// ✅ Importar otros componentes
import { Button } from "./ui/button";

// ✅ Importar datos
import { categories } from "../../models/data/categories";

// ✅ Importar contextos
import { useAuth } from "../../controllers/contexts/AuthContext";
```

---

### Desde App.tsx

```typescript
// ✅ Importar rutas
import { router } from "./routes/routes";

// ✅ Importar providers
import { AuthProvider } from "./controllers/contexts/AuthContext";
```

---

## 🔍 ¿Dónde encuentro...?

| ¿Qué busco? | ¿Dónde está? |
|------------|-------------|
| Catálogo de productos | `models/data/products.ts` |
| Componente de Header | `views/components/Header.tsx` |
| Página de inicio | `views/pages/HomePage.tsx` |
| Autenticación | `controllers/contexts/AuthContext.tsx` |
| Configuración de rutas | `routes/routes.ts` |
| Estilos globales | `styles/globals.css` |
| Tema de colores | `styles/theme.css` |
| Componentes UI base | `views/components/ui/` |

---

## 🚫 Errores Comunes

### ❌ NO hacer esto:
```typescript
// ❌ Importación incorrecta desde página
import { products } from "../data/products"; // NO EXISTE

// ❌ Lógica de negocio en componente
export function ProductCard() {
  const [user, setUser] = useState(null);
  const login = () => { /* lógica aquí */ }; // ❌ Va en controller
}

// ❌ Componente en carpeta models
// models/components/Button.tsx  // ❌ Ubicación incorrecta
```

### ✅ SÍ hacer esto:
```typescript
// ✅ Importación correcta desde página
import { products } from "../../models/data/products";

// ✅ Usar contexto para lógica
import { useAuth } from "../../controllers/contexts/AuthContext";

export function ProductCard() {
  const { login } = useAuth(); // ✅
}

// ✅ Componente en carpeta correcta
// views/components/Button.tsx  // ✅
```

---

## 📝 Checklist para Nuevo Código

Antes de crear un archivo, pregúntate:

- [ ] **¿Es solo presentación?** → `views/components/`
- [ ] **¿Es una página completa?** → `views/pages/`
- [ ] **¿Son datos o interfaces?** → `models/`
- [ ] **¿Es lógica de negocio?** → `controllers/`
- [ ] **¿Actualicé las importaciones correctamente?**
- [ ] **¿Seguí la convención de nombres?** (PascalCase para componentes)

---

## 🎨 Convenciones de Nombres

```
✅ Componentes: PascalCase
   ProductCard.tsx
   UserProfile.tsx

✅ Hooks: camelCase con "use"
   useProducts.ts
   useAuth.ts

✅ Datos: camelCase
   products.ts
   categories.ts

✅ Interfaces: PascalCase con "I"
   IUser.ts
   IProduct.ts

✅ Contextos: PascalCase con "Context"
   AuthContext.tsx
   CartContext.tsx
```

---

## 🆘 Ayuda Rápida

**¿Perdido?** Consulta:
- 📖 `ARQUITECTURA_MVC.md` - Documentación completa
- 📖 `src/MVC_STRUCTURE.md` - Estructura detallada
- 🌳 `tree src/` - Ver estructura de carpetas

**¿Errores de importación?**
```bash
# Verifica la ruta relativa
# Desde: src/views/pages/HomePage.tsx
# Hasta: src/models/data/products.ts
# Ruta: ../../models/data/products
```

---

## 🚀 Comandos Útiles

```bash
# Ver estructura del proyecto
tree src/ -L 3

# Buscar un archivo
find src/ -name "NombreArchivo.tsx"

# Buscar imports de un módulo
grep -r "from.*products" src/

# Listar todos los componentes
ls src/views/components/
```

---

**Última actualización**: 29 de abril, 2026  
**Versión**: 1.0
