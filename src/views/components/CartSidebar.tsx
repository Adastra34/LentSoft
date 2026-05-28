import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../../controllers/contexts/CartContext";
import { formatPrice } from "../../models/data/products";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router";

interface CartSidebarProps {
  textSize: number;
}

export function CartSidebar({ textSize }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-100">
          <h2 className="text-2xl text-purple-900" style={{ fontSize: `${textSize * 1.5}rem` }}>
            Carrito de Compras
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-purple-900 hover:bg-purple-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Cerrar carrito"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-purple-300 mb-4" />
              <p className="text-purple-600" style={{ fontSize: `${textSize}rem` }}>
                Tu carrito está vacío
              </p>
              <p className="text-purple-400 text-sm mt-2">
                Agrega productos para comenzar
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100"
                >
                  {/* Image */}
                  <div className="flex-shrink-0 w-20 h-20 bg-white rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-purple-900 font-medium truncate"
                      style={{ fontSize: `${textSize * 0.9}rem` }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-purple-600 mt-1"
                      style={{ fontSize: `${textSize * 0.85}rem` }}
                    >
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span
                        className="w-8 text-center text-purple-900"
                        style={{ fontSize: `${textSize * 0.85}rem` }}
                      >
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-purple-100 p-6 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span
                className="text-purple-700"
                style={{ fontSize: `${textSize * 1.1}rem` }}
              >
                Total:
              </span>
              <span
                className="text-purple-900 font-semibold"
                style={{ fontSize: `${textSize * 1.3}rem` }}
              >
                {formatPrice(getTotalPrice())}
              </span>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3 bg-purple-600 text-white text-center rounded-2xl hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              style={{ fontSize: `${textSize}rem` }}
            >
              Proceder al Pago
            </Link>

            <Link
              to="/tienda"
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3 bg-purple-100 text-purple-700 text-center rounded-2xl hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ fontSize: `${textSize * 0.9}rem` }}
            >
              Seguir Comprando
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
