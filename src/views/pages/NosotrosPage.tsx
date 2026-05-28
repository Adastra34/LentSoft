import { Heart, Award, Users, Eye, ShieldCheck, Microscope, Globe, Clock } from "lucide-react";
import { useOutletContext } from "react-router";

interface OutletContext {
  textSize: number;
}

export function NosotrosPage() {
  const { textSize } = useOutletContext<OutletContext>();
  
  return (
    <main id="nosotros" className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 
          className="text-purple-900 mb-6"
          style={{ fontSize: `${textSize * 3}rem` }}
        >
          Sobre LentSoft
        </h1>
        <p
          className="text-purple-700 max-w-3xl mx-auto mb-4"
          style={{ fontSize: `${textSize * 1.25}rem` }}
        >
          Somos tu tienda de confianza especializada en productos ópticos de alta calidad.
          Desde 2010, ayudamos a miles de personas a ver el mundo con mayor claridad y estilo.
        </p>
        <p
          className="text-purple-600 max-w-2xl mx-auto"
          style={{ fontSize: `${textSize}rem` }}
        >
          Pioneros en tecnología de realidad aumentada para previsualización de monturas en Colombia,
          con certificación ISO 9001:2015 en gestión de calidad y equipo de 15 optometristas certificados.
        </p>
      </section>

      {/* Values Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-100 rounded-2xl">
              <Eye className="w-8 h-8 text-purple-600" aria-hidden="true" />
            </div>
          </div>
          <h3 
            className="text-purple-900 mb-3"
            style={{ fontSize: `${textSize * 1.25}rem` }}
          >
            Calidad
          </h3>
          <p 
            className="text-purple-700"
            style={{ fontSize: `${textSize}rem` }}
          >
            Solo trabajamos con las mejores marcas y productos certificados
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-100 rounded-2xl">
              <Heart className="w-8 h-8 text-purple-600" aria-hidden="true" />
            </div>
          </div>
          <h3 
            className="text-purple-900 mb-3"
            style={{ fontSize: `${textSize * 1.25}rem` }}
          >
            Pasión
          </h3>
          <p 
            className="text-purple-700"
            style={{ fontSize: `${textSize}rem` }}
          >
            Amamos lo que hacemos y nos esforzamos por tu satisfacción
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-100 rounded-2xl">
              <Award className="w-8 h-8 text-purple-600" aria-hidden="true" />
            </div>
          </div>
          <h3 
            className="text-purple-900 mb-3"
            style={{ fontSize: `${textSize * 1.25}rem` }}
          >
            Excelencia
          </h3>
          <p 
            className="text-purple-700"
            style={{ fontSize: `${textSize}rem` }}
          >
            Premiados por nuestro servicio al cliente excepcional
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-100 rounded-2xl">
              <Users className="w-8 h-8 text-purple-600" aria-hidden="true" />
            </div>
          </div>
          <h3 
            className="text-purple-900 mb-3"
            style={{ fontSize: `${textSize * 1.25}rem` }}
          >
            Comunidad
          </h3>
          <p 
            className="text-purple-700"
            style={{ fontSize: `${textSize}rem` }}
          >
            Más de 50,000 clientes satisfechos en toda España
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white rounded-3xl p-12 shadow-lg mb-16">
        <h2
          className="text-purple-900 mb-6"
          style={{ fontSize: `${textSize * 2.25}rem` }}
        >
          Nuestra Historia
        </h2>
        <div className="space-y-4">
          <p
            className="text-purple-700"
            style={{ fontSize: `${textSize * 1.125}rem` }}
          >
            LentSoft nació en 2010 en Bogotá con una visión clara: democratizar el acceso a productos
            ópticos de alta calidad mediante tecnología innovadora. Lo que comenzó como una pequeña
            óptica en la zona T se ha convertido en la plataforma líder de e-commerce óptico en Colombia,
            con presencia en 32 departamentos y más de 50,000 clientes activos.
          </p>
          <p
            className="text-purple-700"
            style={{ fontSize: `${textSize * 1.125}rem` }}
          >
            En 2024, fuimos pioneros en implementar tecnología de previsualización de marcos mediante
            realidad aumentada en Latinoamérica, permitiendo a nuestros clientes probarse virtualmente
            más de 800 modelos de monturas desde la comodidad de su hogar. Esta innovación redujo las
            devoluciones en un 67% y aumentó la satisfacción del cliente al 96%.
          </p>
          <p
            className="text-purple-700"
            style={{ fontSize: `${textSize * 1.125}rem` }}
          >
            Nuestro equipo multidisciplinario incluye 15 optometristas certificados por el Consejo
            Colombiano de Optometría, 8 especialistas en contactología, 5 ingenieros de software
            especializados en visión por computadora, y un equipo de atención al cliente disponible
            7 días a la semana. Todos comprometidos con tu salud visual.
          </p>
          <p
            className="text-purple-700"
            style={{ fontSize: `${textSize * 1.125}rem` }}
          >
            Creemos firmemente que todos merecen ver el mundo con claridad y estilo. Por eso ofrecemos
            planes de financiamiento sin intereses, envío gratuito a nivel nacional en compras superiores
            a $150,000 COP, y una garantía de satisfacción de 30 días con devolución completa del dinero.
          </p>
        </div>
      </section>

      {/* Services & Technology Section */}
      <section className="mb-16">
        <h2
          className="text-purple-900 mb-8 text-center"
          style={{ fontSize: `${textSize * 2.25}rem` }}
        >
          Nuestros Servicios Especializados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 border-2 border-purple-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-2xl flex-shrink-0">
                <Microscope className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3
                  className="text-purple-900 mb-2"
                  style={{ fontSize: `${textSize * 1.25}rem` }}
                >
                  Exámenes Optométricos Completos
                </h3>
                <p
                  className="text-purple-700 mb-3"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  Valoración integral con tecnología de última generación: autorrefractómetro digital,
                  topógrafo corneal, y tonómetro de no contacto para detección temprana de glaucoma.
                  Resultados en 45 minutos.
                </p>
                <p
                  className="text-purple-600 font-semibold"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  Precio: $89,900 COP • Duración: 45 min • Incluye fórmula digital
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 border-2 border-purple-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-2xl flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3
                  className="text-purple-900 mb-2"
                  style={{ fontSize: `${textSize * 1.25}rem` }}
                >
                  Adaptación de Lentes de Contacto
                </h3>
                <p
                  className="text-purple-700 mb-3"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  Proceso personalizado de ajuste y adaptación con seguimiento durante 30 días.
                  Trabajamos con las principales marcas: Acuvue, Air Optix, Biofinity, y FreshLook.
                  Garantía de confort visual.
                </p>
                <p
                  className="text-purple-600 font-semibold"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  Precio: $124,900 COP • Incluye: examen + lentes de prueba + seguimiento
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 border-2 border-purple-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-2xl flex-shrink-0">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3
                  className="text-purple-900 mb-2"
                  style={{ fontSize: `${textSize * 1.25}rem` }}
                >
                  Previsualización AR de Monturas
                </h3>
                <p
                  className="text-purple-700 mb-3"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  Tecnología exclusiva de realidad aumentada que mapea 68 puntos faciales para proyección
                  precisa de monturas en 3D. Sistema de medición automática de distancia interpupilar con
                  precisión milimétrica. Compatible con cualquier dispositivo con cámara.
                </p>
                <p
                  className="text-purple-600 font-semibold"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  100% Gratuito • Disponible 24/7 • Más de 800 modelos virtualizados
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 border-2 border-purple-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-2xl flex-shrink-0">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3
                  className="text-purple-900 mb-2"
                  style={{ fontSize: `${textSize * 1.25}rem` }}
                >
                  Servicio Express de Montaje
                </h3>
                <p
                  className="text-purple-700 mb-3"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  Laboratorio propio con tecnología de tallado digital y montaje en 48 horas para lentes
                  monofocales, 5 días para progresivos. Tratamientos disponibles: antirreflex, fotocromático,
                  transitions, polarizado, y blue block para pantallas.
                </p>
                <p
                  className="text-purple-600 font-semibold"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  Desde $129,900 COP • Garantía de 2 años en montaje
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-12 shadow-2xl mb-16 text-white">
        <h2
          className="mb-8 text-center"
          style={{ fontSize: `${textSize * 2.25}rem` }}
        >
          Certificaciones y Reconocimientos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-white/10 rounded-2xl">
                <ShieldCheck className="w-10 h-10" />
              </div>
            </div>
            <h4 className="mb-2" style={{ fontSize: `${textSize * 1.125}rem` }}>
              ISO 9001:2015
            </h4>
            <p className="text-purple-100" style={{ fontSize: `${textSize * 0.875}rem` }}>
              Certificación internacional en sistemas de gestión de calidad otorgada por ICONTEC en 2022
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-white/10 rounded-2xl">
                <Award className="w-10 h-10" />
              </div>
            </div>
            <h4 className="mb-2" style={{ fontSize: `${textSize * 1.125}rem` }}>
              Consejo Colombiano de Optometría
            </h4>
            <p className="text-purple-100" style={{ fontSize: `${textSize * 0.875}rem` }}>
              Registro profesional vigente de todos nuestros optometristas con CPCO desde 2010
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-white/10 rounded-2xl">
                <Heart className="w-10 h-10" />
              </div>
            </div>
            <h4 className="mb-2" style={{ fontSize: `${textSize * 1.125}rem` }}>
              Premio Nacional E-Commerce
            </h4>
            <p className="text-purple-100" style={{ fontSize: `${textSize * 0.875}rem` }}>
              Mejor plataforma de salud y bienestar 2025 por la Cámara Colombiana de Comercio Electrónico
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-8 text-white text-center">
          <div
            className="mb-2"
            style={{ fontSize: `${textSize * 3}rem` }}
          >
            16+
          </div>
          <p
            style={{ fontSize: `${textSize * 1.125}rem` }}
          >
            Años de Experiencia
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-8 text-white text-center">
          <div
            className="mb-2"
            style={{ fontSize: `${textSize * 3}rem` }}
          >
            50K+
          </div>
          <p
            style={{ fontSize: `${textSize * 1.125}rem` }}
          >
            Clientes Activos
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-8 text-white text-center">
          <div
            className="mb-2"
            style={{ fontSize: `${textSize * 3}rem` }}
          >
            15
          </div>
          <p
            style={{ fontSize: `${textSize * 1.125}rem` }}
          >
            Optometristas Certificados
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-8 text-white text-center">
          <div
            className="mb-2"
            style={{ fontSize: `${textSize * 3}rem` }}
          >
            96%
          </div>
          <p
            style={{ fontSize: `${textSize * 1.125}rem` }}
          >
            Satisfacción del Cliente
          </p>
        </div>
      </section>
    </main>
  );
}