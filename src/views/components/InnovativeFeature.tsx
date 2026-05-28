import { Scan, Smartphone, Check, Sparkles } from "lucide-react";

interface InnovativeFeatureProps {
  textSize: number;
}

export function InnovativeFeature({ textSize }: InnovativeFeatureProps) {
  return (
    <section className="container mx-auto px-6 py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute -bottom-8 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span
              className="text-purple-700 font-semibold uppercase tracking-wide"
              style={{ fontSize: `${textSize * 0.875}rem` }}
            >
              Tecnología Innovadora
            </span>
          </div>

          <h2
            className="text-purple-900 mb-4"
            style={{ fontSize: `${textSize * 2.5}rem` }}
          >
            Previsualización de Marcos con Realidad Aumentada
          </h2>

          <p
            className="text-purple-600 max-w-3xl mx-auto"
            style={{ fontSize: `${textSize * 1.125}rem` }}
          >
            Nuestra plataforma integra un sistema de visión por computadora con tecnología AR
            que permite visualizar cómo lucen diferentes monturas en tiempo real
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Technical Specs */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-purple-100">
              <h3
                className="text-purple-900 mb-6 flex items-center gap-3"
                style={{ fontSize: `${textSize * 1.5}rem` }}
              >
                <div className="p-3 bg-purple-100 rounded-2xl">
                  <Scan className="w-6 h-6 text-purple-600" />
                </div>
                Especificaciones Técnicas
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-green-100 rounded-lg">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4
                      className="text-purple-900 font-semibold mb-1"
                      style={{ fontSize: `${textSize * 1.125}rem` }}
                    >
                      Detección Facial Biométrica
                    </h4>
                    <p
                      className="text-purple-600"
                      style={{ fontSize: `${textSize * 0.875}rem` }}
                    >
                      Algoritmo de reconocimiento facial basado en 68 puntos de referencia
                      para mapeo preciso de la geometría facial
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-green-100 rounded-lg">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4
                      className="text-purple-900 font-semibold mb-1"
                      style={{ fontSize: `${textSize * 1.125}rem` }}
                    >
                      Renderizado 3D en Tiempo Real
                    </h4>
                    <p
                      className="text-purple-600"
                      style={{ fontSize: `${textSize * 0.875}rem` }}
                    >
                      Motor WebGL para proyección tridimensional de monturas con
                      adaptación dinámica al movimiento facial
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-green-100 rounded-lg">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4
                      className="text-purple-900 font-semibold mb-1"
                      style={{ fontSize: `${textSize * 1.125}rem` }}
                    >
                      Cálculo de Medidas Antropométricas
                    </h4>
                    <p
                      className="text-purple-600"
                      style={{ fontSize: `${textSize * 0.875}rem` }}
                    >
                      Sistema de medición automática de distancia interpupilar,
                      ancho facial y altura de puente nasal con precisión milimétrica
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-green-100 rounded-lg">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4
                      className="text-purple-900 font-semibold mb-1"
                      style={{ fontSize: `${textSize * 1.125}rem` }}
                    >
                      Compatibilidad Multi-Dispositivo
                    </h4>
                    <p
                      className="text-purple-600"
                      style={{ fontSize: `${textSize * 0.875}rem` }}
                    >
                      Funciona en navegadores modernos con acceso a cámara web o
                      dispositivos móviles iOS/Android
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Visual Demo Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-2xl p-8 border-2 border-purple-200">
              <div className="aspect-[4/5] bg-white rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Mock Phone Interface */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-300 opacity-50" />
                <div className="relative z-10 text-center p-8">
                  <Smartphone className="w-24 h-24 mx-auto text-purple-600 mb-6" />
                  <p
                    className="text-purple-900 font-semibold mb-2"
                    style={{ fontSize: `${textSize * 1.25}rem` }}
                  >
                    Vista Previa Interactiva
                  </p>
                  <p
                    className="text-purple-700"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    Activa tu cámara para probar monturas virtualmente
                  </p>
                </div>

                {/* Decorative Scan Lines */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span
                  className="text-purple-700 font-medium"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  Sistema AR disponible • Precisión {">"} 95%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
