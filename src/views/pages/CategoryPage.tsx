import { useParams, useOutletContext, Link } from "react-router";
import { Star, ArrowLeft } from "lucide-react";
import { products, formatPrice } from "../../models/data/products";

interface OutletContext {
  textSize: number;
}

const categoryNames: Record<string, string> = {
  "gafas-sol": "Gafas de Sol",
  "gafas-oftalmicas": "Gafas Oftálmicas",
  "lentes": "Lentes de Contacto",
  "sale": "Ofertas y Descuentos"
};

export function CategoryPage() {
  const { textSize } = useOutletContext<OutletContext>();
  const { category } = useParams();
  
  const categoryName = categoryNames[category || ""] || "Productos";
  
  // Filter products based on category
  let filteredProducts = products;
  
  if (category === "gafas-sol" || category === "gafas-oftalmicas") {
    filteredProducts = products.filter(p => p.category === "gafas");
  } else if (category === "lentes") {
    filteredProducts = products.filter(p => p.category === "lentes");
  } else if (category === "sale") {
    filteredProducts = products.filter(p => p.originalPrice);
  }
  
  // Sort by rating (best sellers first) or by discount
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (category === "sale") {
      // Sort by discount percentage
      const discountA = a.originalPrice ? (1 - a.price / a.originalPrice) : 0;
      const discountB = b.originalPrice ? (1 - b.price / b.originalPrice) : 0;
      return discountB - discountA;
    }
    // Sort by rating and reviews
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    return b.reviews - a.reviews;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="container mx-auto px-6 py-12">
        {/* Back button */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-8 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg px-2 py-1"
          style={{ fontSize: `${textSize * 0.875}rem` }}
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 
            className="text-purple-900 mb-4"
            style={{ fontSize: `${textSize * 3}rem` }}
          >
            {categoryName}
          </h1>
          <p 
            className="text-purple-600"
            style={{ fontSize: `${textSize * 1.125}rem` }}
          >
            {sortedProducts.length} productos disponibles
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/producto/${product.id}`}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}
                {product.isBestSeller && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-purple-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-purple-900" />
                    Recomendado
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <p className="text-purple-600 text-sm mb-2">{product.brand || "LentSoft"}</p>
                <h3 
                  className="text-purple-900 mb-3 hover:text-purple-600 transition-colors line-clamp-2"
                  style={{ fontSize: `${textSize * 1.125}rem` }}
                >
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-purple-700 text-sm">({product.reviews})</span>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span 
                    className="text-purple-900 font-bold"
                    style={{ fontSize: `${textSize * 1.25}rem` }}
                  >
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-purple-400 line-through text-sm">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p 
              className="text-purple-600"
              style={{ fontSize: `${textSize * 1.25}rem` }}
            >
              No hay productos disponibles en esta categoría
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
