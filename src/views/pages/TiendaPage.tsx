import { ShoppingCart, Star, TrendingUp, Heart } from "lucide-react";
import { useState } from "react";
import { useOutletContext, Link, useNavigate } from "react-router";
import { products, formatPrice } from "../../models/data/products";
import { useAuth } from "../../controllers/contexts/AuthContext";
import { useCart } from "../../controllers/contexts/CartContext";

interface OutletContext {
  textSize: number;
}

export function TiendaPage() {
  const { textSize } = useOutletContext<OutletContext>();
  const { isAuthenticated } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "gafas" | "lentes">("all");
  const [favorites, setFavorites] = useState<number[]>([]);

  const bestSellers = products.filter(p => p.isBestSeller);
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (productId: number) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      setIsCartOpen(true);
    }
  };

  const handleToggleFavorite = (productId: number) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <main id="tienda" className="container mx-auto px-6 py-12">
      {/* Best Sellers Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-8 h-8 text-purple-600" aria-hidden="true" />
          <h2 
            className="text-purple-900"
            style={{ fontSize: `${textSize * 2.25}rem` }}
          >
            Más Vendidos
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product) => (
            <article 
              key={product.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <Link to={`/producto/${product.id}`} className="block">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-40 sm:h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-purple-600 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold">
                    Top
                  </div>
                  {/* Favorite Button - Positioned on Image */}
                  <button
                    className={`absolute top-2 left-2 md:top-4 md:left-4 p-2 rounded-full transition-all ${
                      favorites.includes(product.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 text-purple-600 hover:bg-white'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleFavorite(product.id);
                    }}
                    aria-label={favorites.includes(product.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
                  >
                    <Heart 
                      className={`w-4 h-4 md:w-5 md:h-5 ${favorites.includes(product.id) ? 'fill-white' : ''}`} 
                      aria-hidden="true" 
                    />
                  </button>
                </div>
              </Link>
              
              <div className="p-3 md:p-6">
                <Link to={`/producto/${product.id}`}>
                  <h3 
                    className="text-purple-900 mb-1 md:mb-2 hover:text-purple-600 transition-colors line-clamp-2 min-h-[2.5rem] md:min-h-0"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    {product.name}
                  </h3>
                </Link>
                
                <p 
                  className="text-purple-600 mb-2 md:mb-3 line-clamp-2 hidden md:block"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  {product.description}
                </p>

                <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span 
                    className="text-purple-700 text-xs md:text-sm"
                    style={{ fontSize: `${textSize * 0.75}rem` }}
                  >
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div>
                    <span 
                      className="text-purple-900 font-bold block"
                      style={{ fontSize: `${textSize * 1}rem` }}
                    >
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span 
                        className="text-purple-400 line-through text-xs md:text-sm"
                        style={{ fontSize: `${textSize * 0.75}rem` }}
                      >
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 md:py-3 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center gap-1 md:gap-2"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                  aria-label={`Añadir ${product.name} al carrito`}
                  onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                  <span className="hidden sm:inline">Añadir al Carrito</span>
                  <span className="sm:hidden">Añadir</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* All Products Section */}
      <section>
        <div className="mb-8">
          <h2 
            className="text-purple-900 mb-6"
            style={{ fontSize: `${textSize * 2.25}rem` }}
          >
            Todos los Productos
          </h2>

          {/* Category Filter */}
          <div className="flex gap-4 mb-8" role="tablist" aria-label="Filtros de categoría">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                selectedCategory === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-700 hover:bg-purple-100"
              }`}
              style={{ fontSize: `${textSize}rem` }}
              role="tab"
              aria-selected={selectedCategory === "all"}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedCategory("gafas")}
              className={`px-6 py-3 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                selectedCategory === "gafas"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-700 hover:bg-purple-100"
              }`}
              style={{ fontSize: `${textSize}rem` }}
              role="tab"
              aria-selected={selectedCategory === "gafas"}
            >
              Gafas
            </button>
            <button
              onClick={() => setSelectedCategory("lentes")}
              className={`px-6 py-3 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                selectedCategory === "lentes"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-700 hover:bg-purple-100"
              }`}
              style={{ fontSize: `${textSize}rem` }}
              role="tab"
              aria-selected={selectedCategory === "lentes"}
            >
              Lentes de Contacto
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <article 
              key={product.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <Link to={`/producto/${product.id}`} className="block">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-40 sm:h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.isBestSeller && (
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-purple-600 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold">
                      Top
                    </div>
                  )}
                  {/* Favorite Button - Positioned on Image */}
                  <button
                    className={`absolute top-2 left-2 md:top-4 md:left-4 p-2 rounded-full transition-all ${
                      favorites.includes(product.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 text-purple-600 hover:bg-white'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleFavorite(product.id);
                    }}
                    aria-label={favorites.includes(product.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
                  >
                    <Heart 
                      className={`w-4 h-4 md:w-5 md:h-5 ${favorites.includes(product.id) ? 'fill-white' : ''}`} 
                      aria-hidden="true" 
                    />
                  </button>
                </div>
              </Link>
              
              <div className="p-3 md:p-6">
                <span 
                  className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-purple-100 text-purple-700 rounded-full text-xs mb-2 md:mb-3"
                  style={{ fontSize: `${textSize * 0.7}rem` }}
                >
                  {product.category === "gafas" ? "Gafas" : "Lentes"}
                </span>

                <Link to={`/producto/${product.id}`}>
                  <h3 
                    className="text-purple-900 mb-1 md:mb-2 hover:text-purple-600 transition-colors line-clamp-2 min-h-[2.5rem] md:min-h-0"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    {product.name}
                  </h3>
                </Link>
                
                <p 
                  className="text-purple-600 mb-2 md:mb-3 line-clamp-2 hidden md:block"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  {product.description}
                </p>

                <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span 
                    className="text-purple-700 text-xs md:text-sm"
                    style={{ fontSize: `${textSize * 0.75}rem` }}
                  >
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div>
                    <span 
                      className="text-purple-900 font-bold block"
                      style={{ fontSize: `${textSize * 1}rem` }}
                    >
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span 
                        className="text-purple-400 line-through text-xs md:text-sm"
                        style={{ fontSize: `${textSize * 0.75}rem` }}
                      >
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 md:py-3 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center gap-1 md:gap-2"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                  aria-label={`Añadir ${product.name} al carrito`}
                  onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                  <span className="hidden sm:inline">Añadir al Carrito</span>
                  <span className="sm:hidden">Añadir</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}