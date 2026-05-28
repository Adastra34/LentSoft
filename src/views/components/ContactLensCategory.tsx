import { Link } from "react-router";
import { Star, Eye } from "lucide-react";
import { products, formatPrice } from "../../models/data/products";

interface ContactLensCategoryProps {
  textSize: number;
}

export function ContactLensCategory({ textSize }: ContactLensCategoryProps) {
  const contactLenses = products.filter(p => p.category === "lentes").slice(0, 4);

  return (
    <section className="container mx-auto px-6 py-16 bg-gradient-to-br from-purple-50/50 to-transparent rounded-3xl">
      <div className="flex items-center justify-center gap-3 mb-10">
        <Eye className="w-8 h-8 text-purple-600" />
        <h2 
          className="text-3xl md:text-4xl text-purple-900 text-center"
          style={{ fontSize: `${textSize * 2.25}rem` }}
        >
          Lentes de Contacto
        </h2>
      </div>

      <p 
        className="text-center text-purple-700 mb-10 max-w-2xl mx-auto"
        style={{ fontSize: `${textSize * 1.125}rem` }}
      >
        Descubre nuestra amplia selección de lentes de contacto para todo tipo de necesidades
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactLenses.map((product) => (
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
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>
              )}
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

      <div className="text-center mt-8">
        <Link
          to="/categoria/lentes"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          style={{ fontSize: `${textSize * 1}rem` }}
        >
          Ver todos los lentes de contacto
        </Link>
      </div>
    </section>
  );
}
