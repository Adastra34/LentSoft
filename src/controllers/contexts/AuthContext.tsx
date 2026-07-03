import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "usuario" | "admin" | "optometra";

export interface User {
  id: string;
  email: string;
  nombre: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, nombre: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de login - en producción esto se conectaría a un backend
    // Admin user: admin@lentsoft.com / admin123
    // Normal user: cualquier otro email
    
    if (email === "admin@lentsoft.com" && password === "admin123") {
      setUser({
        id: "admin-001",
        email,
        nombre: "Administrador",
        role: "admin"
      });
      return true;
    } else if (email === "optometra@gmail.com" && password === "12345") {
      setUser({
        id: "optometra-001",
        email,
        nombre: "Ana Gómez Torres",
        role: "optometra"
      });
      return true;
    } else if (email && password) {
      setUser({
        id: "user-" + Date.now(),
        email,
        nombre: email.split("@")[0],
        role: "usuario"
      });
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (email: string, password: string, nombre: string): Promise<boolean> => {
    // Simulación de registro
    if (email && password && nombre) {
      setUser({
        id: "user-" + Date.now(),
        email,
        nombre,
        role: "usuario"
      });
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        logout, 
        register 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
