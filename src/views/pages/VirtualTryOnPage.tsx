import { useState, useEffect, useRef } from "react";
import { useOutletContext, Navigate } from "react-router";
import { Camera, X, Check, Info, DollarSign, Ruler, Sparkles, CameraOff } from "lucide-react";
import { useAuth } from "../../controllers/contexts/AuthContext";
import { formatPrice } from "../../models/data/products";

interface OutletContext {
  textSize: number;
}

interface Frame {
  id: number;
  nombre: string;
  estilo: string;
  precio: number;
  tamaño: string;
  imagen: string;
  descripcion?: string;
}

const mockFrames: Frame[] = [
  {
    id: 1,
    nombre: "Classic Aviator",
    estilo: "Aviador",
    precio: 289900,
    tamaño: "54-18-140",
    imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop",
    descripcion: "Marco clásico de aviador con diseño atemporal"
  },
  {
    id: 2,
    nombre: "Modern Wayfarer",
    estilo: "Wayfarer",
    precio: 249900,
    tamaño: "52-20-145",
    imagen: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=300&fit=crop",
    descripcion: "Estilo moderno con líneas definidas"
  },
  {
    id: 3,
    nombre: "Round Vintage",
    estilo: "Redondo",
    precio: 199900,
    tamaño: "48-22-140",
    imagen: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
    descripcion: "Diseño vintage de inspiración retro"
  },
  {
    id: 4,
    nombre: "Cat Eye Elegance",
    estilo: "Cat Eye",
    precio: 329900,
    tamaño: "53-16-140",
    imagen: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=400&h=300&fit=crop",
    descripcion: "Elegante marco estilo ojo de gato"
  },
  {
    id: 5,
    nombre: "Sport Pro",
    estilo: "Deportivo",
    precio: 349900,
    tamaño: "56-15-135",
    imagen: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop",
    descripcion: "Marco deportivo de alto rendimiento"
  },
  {
    id: 6,
    nombre: "Minimalist Square",
    estilo: "Cuadrado",
    precio: 279900,
    tamaño: "51-19-145",
    imagen: "https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=400&h=300&fit=crop",
    descripcion: "Diseño minimalista con forma cuadrada"
  },
  {
    id: 7,
    nombre: "Oval Classic",
    estilo: "Oval",
    precio: 219900,
    tamaño: "50-20-142",
    imagen: "https://images.unsplash.com/photo-1622506636454-c4d65e0d4b9c?w=400&h=300&fit=crop",
    descripcion: "Marco ovalado clásico y versátil"
  },
  {
    id: 8,
    nombre: "Browline Retro",
    estilo: "Browline",
    precio: 269900,
    tamaño: "52-18-145",
    imagen: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop",
    descripcion: "Estilo retro con línea de cejas pronunciada"
  }
];

export function VirtualTryOnPage() {
  const { textSize } = useOutletContext<OutletContext>();
  const { user } = useAuth();
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(mockFrames[0]);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Redirigir si no está autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
      setCameraError("No se pudo acceder a la cámara. Por favor, verifica los permisos.");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const toggleCamera = () => {
    if (cameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 pb-20 md:pb-12">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-purple-900 mb-2" style={{ fontSize: `${textSize * 2}rem` }}>
            Catálogo y Vista de Marcos
          </h1>
          <p className="text-purple-600" style={{ fontSize: `${textSize * 0.875}rem` }}>
            Prueba virtual con realidad aumentada - Encuentra el marco perfecto para ti
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vista Previa Interactiva - Lado Izquierdo */}
          <div className="bg-white rounded-3xl shadow-lg p-6 order-2 lg:order-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.5}rem` }}>
                Vista Previa Interactiva
              </h2>
              <button
                onClick={toggleCamera}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all ${
                  cameraActive
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {cameraActive ? (
                  <>
                    <CameraOff className="w-5 h-5" />
                    <span className="hidden sm:inline">Detener Cámara</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    <span className="hidden sm:inline">Activar Cámara</span>
                  </>
                )}
              </button>
            </div>

            {/* Camera Preview Area */}
            <div className="relative bg-purple-900 rounded-2xl overflow-hidden aspect-[4/3]">
              {cameraActive ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />

                  {/* AR Frame Overlay */}
                  {selectedFrame && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative w-3/4 max-w-md">
                        {/* Frame overlay simulation */}
                        <div className="bg-black/20 backdrop-blur-sm rounded-full px-6 py-2 text-white text-sm font-medium mb-2 text-center">
                          {selectedFrame.nombre}
                        </div>
                        <div className="border-4 border-purple-600 rounded-3xl shadow-2xl" style={{ aspectRatio: "16/9" }}>
                          <div className="w-full h-full flex items-center justify-center">
                            <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AR Indicator */}
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AR Activo
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
                  <Camera className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-center mb-2 font-semibold" style={{ fontSize: `${textSize * 1.125}rem` }}>
                    Activa la cámara para probar los marcos
                  </p>
                  <p className="text-center text-sm opacity-75">
                    Visualiza en tiempo real cómo te quedan los diferentes estilos
                  </p>
                </div>
              )}

              {cameraError && (
                <div className="absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center text-white p-8">
                  <CameraOff className="w-16 h-16 mb-4" />
                  <p className="text-center font-semibold mb-2">{cameraError}</p>
                  <p className="text-center text-sm opacity-90">
                    Verifica que tu navegador tenga permisos de cámara habilitados
                  </p>
                </div>
              )}
            </div>

            {/* Selected Frame Info Card */}
            {selectedFrame && (
              <div className="mt-6 bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-purple-900 font-bold mb-4 flex items-center gap-2" style={{ fontSize: `${textSize * 1.25}rem` }}>
                  <Info className="w-5 h-5" />
                  Marco Seleccionado
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide">Nombre</p>
                      <p className="text-purple-900 font-semibold" style={{ fontSize: `${textSize * 1}rem` }}>
                        {selectedFrame.nombre}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide">Estilo</p>
                      <p className="text-purple-900 font-semibold">{selectedFrame.estilo}</p>
                    </div>
                    <div>
                      <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide flex items-center gap-1">
                        <Ruler className="w-3 h-3" />
                        Tamaño
                      </p>
                      <p className="text-purple-900 font-semibold text-sm">{selectedFrame.tamaño}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-200">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-600 text-sm font-medium flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Precio
                      </span>
                      <span className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.5}rem` }}>
                        {formatPrice(selectedFrame.precio)}
                      </span>
                    </div>
                  </div>

                  {selectedFrame.descripcion && (
                    <div className="pt-3 border-t border-purple-200">
                      <p className="text-purple-700 text-sm">{selectedFrame.descripcion}</p>
                    </div>
                  )}
                </div>

                <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  Agregar al Carrito
                </button>
              </div>
            )}
          </div>

          {/* Galería de Marcos - Lado Derecho */}
          <div className="bg-white rounded-3xl shadow-lg p-6 order-1 lg:order-2">
            <h2 className="text-purple-900 font-bold mb-6" style={{ fontSize: `${textSize * 1.5}rem` }}>
              Galería de Marcos
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[800px] overflow-y-auto pr-2">
              {mockFrames.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrame(frame)}
                  className={`relative bg-white rounded-2xl border-2 overflow-hidden transition-all text-left ${
                    selectedFrame?.id === frame.id
                      ? "border-purple-600 shadow-lg scale-105"
                      : "border-purple-100 hover:border-purple-300 hover:shadow-md"
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-purple-50">
                    <img
                      src={frame.imagen}
                      alt={frame.nombre}
                      className="w-full h-full object-cover"
                    />
                    {selectedFrame?.id === frame.id && (
                      <div className="absolute top-2 right-2 bg-purple-600 text-white p-1.5 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-purple-900 font-bold mb-1" style={{ fontSize: `${textSize * 1}rem` }}>
                      {frame.nombre}
                    </h3>
                    <p className="text-purple-600 text-sm mb-2">{frame.estilo}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.125}rem` }}>
                        {formatPrice(frame.precio)}
                      </span>
                      <span className="text-purple-600 text-xs flex items-center gap-1">
                        <Ruler className="w-3 h-3" />
                        {frame.tamaño}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
          <h3 className="text-purple-900 font-bold mb-4 flex items-center gap-2" style={{ fontSize: `${textSize * 1.25}rem` }}>
            <Info className="w-5 h-5" />
            Cómo Usar la Prueba Virtual
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="text-purple-900 font-semibold mb-1">Selecciona un marco</p>
                <p className="text-purple-700 text-sm">Elige el estilo que te guste de la galería</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="text-purple-900 font-semibold mb-1">Activa la cámara</p>
                <p className="text-purple-700 text-sm">Permite el acceso para ver la previsualización</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="text-purple-900 font-semibold mb-1">Prueba en tiempo real</p>
                <p className="text-purple-700 text-sm">Visualiza cómo te queda el marco seleccionado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
