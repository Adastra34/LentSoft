import { useState } from "react";
import { notify } from "../../utils/notify";
import { useParams, useOutletContext, Link, useNavigate } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  Star,
  ShoppingCart,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Glasses,
  Eye,
  Ruler,
  Heart,
  Camera
} from "lucide-react";
import { products, formatPrice } from "../../models/data/products";
import { useCart } from "../../controllers/contexts/CartContext";
import { useAuth } from "../../controllers/contexts/AuthContext";

interface OutletContext {
  textSize: number;
}

// Accordion section component
interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  textSize: number;
}

function AccordionSection({ title, icon, children, defaultOpen = false, textSize }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-purple-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-purple-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="text-purple-600">{icon}</span>
          <h3 
            className="text-purple-900 font-medium text-left"
            style={{ fontSize: `${textSize * 1.125}rem` }}
          >
            {title}
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-purple-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-purple-600" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 animate-in slide-in-from-top duration-300">
          {children}
        </div>
      )}
    </div>
  );
}

export function ProductoPage() {
  const { textSize } = useOutletContext<OutletContext>();
  const { id } = useParams();
  const { addToCart, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const productId = parseInt(id || "1");
  const product = products.find(p => p.id === productId) || products[0];

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    addToCart(product);
    setIsCartOpen(true);
  };
  
  // Create multiple images array from single image
  const images = [product.image, product.image, product.image];
  
  // Get similar products (same category, different id)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCameraToggle = async () => {
    if (!isCameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setIsCameraActive(true);
        // Store stream for later cleanup
        (window as any).cameraStream = stream;
      } catch (error) {
        notify.error("No se pudo acceder a la cámara. Por favor, verifica los permisos en tu navegador.");
      }
    } else {
      // Stop camera
      const stream = (window as any).cameraStream;
      if (stream) {
        stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
      setIsCameraActive(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-purple-600">
            <li>
              <Link 
                to="/" 
                className="hover:text-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1"
                style={{ fontSize: `${textSize * 0.875}rem` }}
              >
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link 
                to="/tienda" 
                className="hover:text-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1"
                style={{ fontSize: `${textSize * 0.875}rem` }}
              >
                Tienda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li 
              className="text-purple-900 font-medium" 
              aria-current="page"
              style={{ fontSize: `${textSize * 0.875}rem` }}
            >
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl group">
              <img
                src={images[currentImageIndex]}
                alt={`${product.name} - vista ${currentImageIndex + 1}`}
                className="w-full h-[500px] object-cover"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:opacity-100"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:opacity-100"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      index === currentImageIndex
                        ? "bg-purple-600 w-8"
                        : "bg-purple-300 hover:bg-purple-400"
                    }`}
                    aria-label={`Ver imagen ${index + 1}`}
                    aria-current={index === currentImageIndex}
                  />
                ))}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`bg-white rounded-2xl overflow-hidden shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    index === currentImageIndex
                      ? "ring-2 ring-purple-600"
                      : "hover:shadow-lg"
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} - miniatura ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <p 
                className="text-purple-600 mb-2"
                style={{ fontSize: `${textSize * 0.875}rem` }}
              >
                {product.brand || "LentSoft"}
              </p>
              <h1 
                className="text-purple-900 mb-4"
                style={{ fontSize: `${textSize * 2.25}rem` }}
              >
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span 
                  className="text-purple-700"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-purple-50 rounded-2xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span 
                  className="text-purple-900 font-bold"
                  style={{ fontSize: `${textSize * 2.5}rem` }}
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span 
                      className="text-purple-400 line-through"
                      style={{ fontSize: `${textSize * 1.25}rem` }}
                    >
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 
                className="text-purple-900 mb-3"
                style={{ fontSize: `${textSize * 1.25}rem` }}
              >
                Descripción
              </h2>
              <p 
                className="text-purple-700"
                style={{ fontSize: `${textSize}rem` }}
              >
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p 
                    className="text-purple-900 font-medium"
                    style={{ fontSize: `${textSize}rem` }}
                  >
                    Garantía incluida
                  </p>
                  <p 
                    className="text-purple-600"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    Limpieza y ajuste gratis en todas nuestras tiendas
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl">
                <Truck className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p 
                    className="text-purple-900 font-medium"
                    style={{ fontSize: `${textSize}rem` }}
                  >
                    Envío gratis
                  </p>
                  <p 
                    className="text-purple-600"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    Entrega en 3-5 días hábiles
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl">
                <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p 
                    className="text-purple-900 font-medium"
                    style={{ fontSize: `${textSize}rem` }}
                  >
                    Calidad garantizada
                  </p>
                  <p 
                    className="text-purple-600"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    Productos 100% auténticos
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                  style={{ fontSize: `${textSize * 1.125}rem` }}
                  aria-label={`Añadir ${product.name} al carrito`}
                >
                  <ShoppingCart className="w-6 h-6" aria-hidden="true" />
                  Añadir al Carrito
                </button>
                
                <button
                  className="bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 p-4 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Añadir a favoritos"
                >
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              {/* Only show camera button for glasses, not for contact lenses */}
              {product.category === "gafas" && (
                <Link
                  to="/prueba-virtual"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 duration-300"
                  style={{ fontSize: `${textSize * 1}rem` }}
                  aria-label="Probar montura con cámara virtual"
                >
                  <Glasses className="w-5 h-5" aria-hidden="true" />
                  <span className="uppercase tracking-wide font-medium">
                    MUESTRA DE MONTURA
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Camera View */}
        {isCameraActive && (
          <div className="mb-16 bg-white rounded-3xl shadow-lg overflow-hidden p-8">
            <h2 
              className="text-purple-900 mb-6 text-center"
              style={{ fontSize: `${textSize * 1.5}rem` }}
            >
              Vista previa con cámara
            </h2>
            <div className="relative bg-purple-50 rounded-2xl overflow-hidden aspect-video max-w-2xl mx-auto">
              <video 
                autoPlay 
                playsInline
                ref={(video) => {
                  if (video && isCameraActive) {
                    const stream = (window as any).cameraStream;
                    if (stream) video.srcObject = stream;
                  }
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-white bg-purple-900/70 px-4 py-2 rounded-full text-sm">
                  Posiciona tu rostro para probar la montura
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Accordion Sections */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-16">
          <AccordionSection
            title="Detalles de la Montura"
            icon={<Glasses className="w-5 h-5" />}
            textSize={textSize}
            defaultOpen={true}
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-purple-600 text-sm mb-1">Material</p>
                  <p className="text-purple-900">{product.material || "Acetato premium"}</p>
                </div>
                <div>
                  <p className="text-purple-600 text-sm mb-1">Color</p>
                  <p className="text-purple-900">{product.color || "Negro"}</p>
                </div>
                <div>
                  <p className="text-purple-600 text-sm mb-1">Categoría</p>
                  <p className="text-purple-900">{product.category === "gafas" ? "Gafas" : "Lentes de contacto"}</p>
                </div>
                <div>
                  <p className="text-purple-600 text-sm mb-1">Protección</p>
                  <p className="text-purple-900">UV400</p>
                </div>
              </div>
            </div>
          </AccordionSection>

          <AccordionSection
            title="Medidas"
            icon={<Ruler className="w-5 h-5" />}
            textSize={textSize}
          >
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-purple-600 text-sm mb-2">Ancho del lente</p>
                <p className="text-purple-900 text-2xl font-bold">52mm</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-purple-600 text-sm mb-2">Puente</p>
                <p className="text-purple-900 text-2xl font-bold">18mm</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-purple-600 text-sm mb-2">Longitud varilla</p>
                <p className="text-purple-900 text-2xl font-bold">140mm</p>
              </div>
            </div>
          </AccordionSection>

          <AccordionSection
            title="Características de los Lentes"
            icon={<Eye className="w-5 h-5" />}
            textSize={textSize}
          >
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-purple-900">Protección UV400 - 100% UVA/UVB</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-purple-900">Lentes polarizadas anti-reflejo</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-purple-900">Tratamiento anti-rayas</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-purple-900">Recubrimiento hidrofóbico</span>
              </li>
            </ul>
          </AccordionSection>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section>
            <h2 
              className="text-purple-900 mb-8"
              style={{ fontSize: `${textSize * 2.25}rem` }}
            >
              También te puede interesar
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/producto/${item.id}`}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {item.originalPrice && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <p className="text-purple-600 text-sm mb-2">{item.brand || "LentSoft"}</p>
                    <h3 
                      className="text-purple-900 mb-3 hover:text-purple-600 transition-colors"
                      style={{ fontSize: `${textSize * 1.125}rem` }}
                    >
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="text-purple-700 text-sm">({item.reviews})</span>
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                      <span 
                        className="text-purple-900 font-bold"
                        style={{ fontSize: `${textSize * 1.25}rem` }}
                      >
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span 
                          className="text-purple-400 line-through text-sm"
                        >
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}