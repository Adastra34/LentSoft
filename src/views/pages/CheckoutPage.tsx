import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import { useCart } from "../../controllers/contexts/CartContext";
import { useAuth } from "../../controllers/contexts/AuthContext";
import { formatPrice } from "../../models/data/products";
import { CreditCard, Wallet, Smartphone, CheckCircle, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface OutletContext {
  textSize: number;
}

export function CheckoutPage() {
  const { textSize } = useOutletContext<OutletContext>();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "tarjeta"
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const subtotal = getTotalPrice();
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);

    setTimeout(() => {
      clearCart();
      setShowSuccessModal(false);
      navigate("/");
    }, 3000);
  };

  if (cart.length === 0 && !showSuccessModal) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6">
        <div className="text-center">
          <h1
            className="text-purple-900 mb-4"
            style={{ fontSize: `${textSize * 2}rem` }}
          >
            Tu carrito está vacío
          </h1>
          <p className="text-purple-600 mb-6">
            Agrega productos para proceder con el pago
          </p>
          <button
            onClick={() => navigate("/tienda")}
            className="px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors"
          >
            Ir a la Tienda
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-700 hover:text-purple-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-purple-900 mb-2"
            style={{ fontSize: `${textSize * 2.5}rem` }}
          >
            Finalizar Compra
          </h1>
          <p className="text-purple-600">
            Completa tu información para procesar el pago
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                <h2
                  className="text-purple-900 mb-6"
                  style={{ fontSize: `${textSize * 1.5}rem` }}
                >
                  Información Personal
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-purple-900 mb-2 font-medium">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 bg-purple-50 focus:border-purple-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-purple-900 mb-2 font-medium">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 bg-purple-50 focus:border-purple-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-purple-900 mb-2 font-medium">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 bg-purple-50 focus:border-purple-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-purple-900 mb-2 font-medium">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 bg-purple-50 focus:border-purple-600 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-purple-900 mb-2 font-medium">
                    Dirección de Entrega
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 bg-purple-50 focus:border-purple-600 focus:outline-none resize-none"
                    rows={3}
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                <h2
                  className="text-purple-900 mb-6"
                  style={{ fontSize: `${textSize * 1.5}rem` }}
                >
                  Método de Pago
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 border-2 border-purple-200 rounded-2xl cursor-pointer hover:border-purple-400 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="tarjeta"
                      checked={formData.paymentMethod === "tarjeta"}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-5 h-5 text-purple-600"
                    />
                    <CreditCard className="w-6 h-6 text-purple-600" />
                    <span className="text-purple-900 font-medium">Tarjeta de Crédito/Débito</span>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-purple-200 rounded-2xl cursor-pointer hover:border-purple-400 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pse"
                      checked={formData.paymentMethod === "pse"}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-5 h-5 text-purple-600"
                    />
                    <Wallet className="w-6 h-6 text-purple-600" />
                    <span className="text-purple-900 font-medium">PSE</span>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-purple-200 rounded-2xl cursor-pointer hover:border-purple-400 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="efectivo"
                      checked={formData.paymentMethod === "efectivo"}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-5 h-5 text-purple-600"
                    />
                    <Smartphone className="w-6 h-6 text-purple-600" />
                    <span className="text-purple-900 font-medium">Efectivo contra entrega</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors font-semibold text-lg"
              >
                Realizar Pago
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-6">
              <h2
                className="text-purple-900 mb-6"
                style={{ fontSize: `${textSize * 1.5}rem` }}
              >
                Resumen del Pedido
              </h2>

              {/* Products */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-purple-50 rounded-xl overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-purple-900 text-sm font-medium truncate">
                        {item.name}
                      </h3>
                      <p className="text-purple-600 text-sm">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="text-purple-900 font-semibold text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t-2 border-purple-100 pt-4 space-y-2">
                <div className="flex justify-between text-purple-700">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-purple-700">
                  <span>IVA (19%):</span>
                  <span>{formatPrice(iva)}</span>
                </div>
                <div className="flex justify-between text-purple-900 font-bold text-lg pt-2 border-t border-purple-100">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2
              className="text-purple-900 mb-4"
              style={{ fontSize: `${textSize * 1.75}rem` }}
            >
              ¡Pago en Proceso!
            </h2>
            <p className="text-purple-700 mb-6">
              Tu pago está siendo procesado. Recibirás un correo de confirmación en breve.
            </p>
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />
          </div>
        </div>
      )}
    </main>
  );
}
