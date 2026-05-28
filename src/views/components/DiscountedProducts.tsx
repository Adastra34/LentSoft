import { Link, useNavigate } from "react-router";
import { Star, Tag, ShoppingCart } from "lucide-react";
import { products, formatPrice } from "../../models/data/products";
import { useCart } from "../../controllers/contexts/CartContext";
import { useAuth } from "../../controllers/contexts/AuthContext";

interface DiscountedProductsProps {
  textSize: number;
}

export function DiscountedProducts({ textSize }: DiscountedProductsProps) {
  const discountedProducts = products.filter(p => p.originalPrice).slice(0, 4);
  const { addToCart, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="flex items-center justify-center gap-3 mb-10">
        <Tag className="w-8 h-8 text-purple-600" />
        <h2 
          className="text-3xl md:text-4xl text-purple-900 text-center"
          style={{ fontSize: `${textSize * 2.25}rem` }}
        >
          Productos con Descuento
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {discountedProducts.map((product) => (
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
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                {Math.round((1 - product.price / product.originalPrice!) * 100)}% OFF
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-purple-600 text-sm mb-2">{product.brand || "LentSoft"}</p>
              <h3 
                className="text-purple-900 mb-3 hover:text-purple-600 transition-colors"
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
              
              <div className="flex items-baseline gap-2 mb-4">
                <span
                  className="text-purple-900 font-bold"
                  style={{ fontSize: `${textSize * 1.25}rem` }}
                >
                  {formatPrice(product.price)}
                </span>
                <span className="text-purple-400 line-through text-sm">
                  {formatPrice(product.originalPrice!)}
                </span>
              </div>

              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="w-full py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{ fontSize: `${textSize * 0.9}rem` }}
              >
                <ShoppingCart className="w-4 h-4" />
                Agregar al Carrito
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
