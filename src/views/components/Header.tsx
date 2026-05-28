import { Search, User, LogOut, LayoutDashboard, Menu, X, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../../controllers/contexts/AuthContext";
import { useCart } from "../../controllers/contexts/CartContext";
import { useState } from "react";

interface HeaderProps {
  textSize: number;
}

export function Header({ textSize }: HeaderProps) {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const categories = [
    { name: "Gafas", path: "/categoria/gafas" },
    { name: "Gafas de Sol", path: "/categoria/gafas-de-sol" },
    { name: "Lentes de Contacto", path: "/categoria/lentes-de-contacto" },
    { name: "Accesorios", path: "/categoria/accesorios" },
  ];

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-purple-900 hover:bg-purple-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 
                  className="text-3xl tracking-tight text-purple-900"
                  style={{ fontSize: `${textSize * 1.875}rem` }}
                >
                  LentSoft
                </h1>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  location.pathname === "/" 
                    ? "text-purple-900 bg-purple-100" 
                    : "text-purple-700 hover:text-purple-900"
                }`}
                style={{ fontSize: `${textSize}rem` }}
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                Inicio
              </Link>
              <Link 
                to="/tienda" 
                className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  location.pathname === "/tienda" 
                    ? "text-purple-900 bg-purple-100" 
                    : "text-purple-700 hover:text-purple-900"
                }`}
                style={{ fontSize: `${textSize}rem` }}
                aria-current={location.pathname === "/tienda" ? "page" : undefined}
              >
                Tienda
              </Link>
              <Link 
                to="/nosotros" 
                className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  location.pathname === "/nosotros" 
                    ? "text-purple-900 bg-purple-100" 
                    : "text-purple-700 hover:text-purple-900"
                }`}
                style={{ fontSize: `${textSize}rem` }}
                aria-current={location.pathname === "/nosotros" ? "page" : undefined}
              >
                Nosotros
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-md hidden lg:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Buscar gafas, lentes..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  style={{ fontSize: `${textSize}rem` }}
                  aria-label="Buscar productos"
                />
              </div>
            </div>

            {/* Shopping Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-purple-700 hover:text-purple-900 hover:bg-purple-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link
                  to={user.role === "admin" ? "/dashboard-admin" : "/dashboard"}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-purple-700 hover:text-purple-900 hover:bg-purple-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                style={{ fontSize: `${textSize}rem` }}
                aria-label="Iniciar sesión"
              >
                <User className="w-5 h-5" aria-hidden="true" />
                <span className="hidden sm:inline">Ingresar</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Mobile Menu Sidebar */}
          <div 
            className="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-100">
              <h2 className="text-xl font-semibold text-purple-900">Menú</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-purple-900 hover:bg-purple-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Cerrar menú"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Bar Mobile */}
            <div className="p-6 border-b border-purple-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Buscar productos..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  aria-label="Buscar productos"
                />
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-6 space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl transition-colors ${
                  location.pathname === "/"
                    ? "bg-purple-100 text-purple-900 font-medium"
                    : "text-purple-700 hover:bg-purple-50"
                }`}
              >
                Inicio
              </Link>
              <Link
                to="/tienda"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl transition-colors ${
                  location.pathname === "/tienda"
                    ? "bg-purple-100 text-purple-900 font-medium"
                    : "text-purple-700 hover:bg-purple-50"
                }`}
              >
                Tienda
              </Link>
              <Link
                to="/nosotros"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl transition-colors ${
                  location.pathname === "/nosotros"
                    ? "bg-purple-100 text-purple-900 font-medium"
                    : "text-purple-700 hover:bg-purple-50"
                }`}
              >
                Nosotros
              </Link>
            </nav>

            {/* Categories */}
            <div className="p-6 border-t border-purple-100">
              <h3 className="text-sm font-semibold text-purple-900 mb-3 px-4">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.path}
                    to={category.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* User Section */}
            <div className="p-6 border-t border-purple-100">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <Link
                    to={user.role === "admin" ? "/dashboard-admin" : "/dashboard"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors"
                >
                  <User className="w-5 h-5" />
                  Ingresar
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}