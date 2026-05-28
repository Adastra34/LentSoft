import { Calendar, Glasses } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  textSize: number;
}

export function Hero({ textSize }: HeroProps) {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Promotional Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1769414259128-bf8a66a41701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY3JpcHRpb24lMjBleWVnbGFzc2VzJTIwbW9kZXJuJTIwZGlzcGxheXxlbnwxfHx8fDE3NzM4Njk2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Gafas formuladas - Promoción 40% de descuento"
            className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-purple-600/70 flex flex-col items-center justify-center text-white p-8">
            <h2 
              className="text-4xl md:text-5xl mb-4 text-center tracking-tight"
              style={{ fontSize: `${textSize * 3}rem` }}
            >
              GAFAS FORMULADAS
            </h2>
            <div 
              className="text-7xl md:text-8xl text-yellow-300 drop-shadow-lg"
              style={{ fontSize: `${textSize * 5}rem` }}
            >
              40% OFF
            </div>
          </div>
        </div>

        {/* Right side - Main CTA */}
        <div className="flex flex-col justify-center space-y-6 lg:pl-8">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl text-purple-900 leading-tight"
            style={{ fontSize: `${textSize * 3.75}rem` }}
          >
            PROGRAMA TU EXAMEN VISUAL
          </h2>
          <p 
            className="text-2xl md:text-3xl text-purple-700"
            style={{ fontSize: `${textSize * 1.875}rem` }}
          >
            PARA TI Y TU FAMILIA
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-green-600 text-white rounded-2xl shadow-lg hover:bg-green-700 hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2"
              style={{ fontSize: `${textSize * 1.25}rem` }}
              aria-label="Agendar cita para examen visual"
            >
              <Calendar className="w-6 h-6" aria-hidden="true" />
              <span>Agendar cita ahora</span>
            </Link>

            <Link
              to="/prueba-virtual"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-purple-600 text-white rounded-2xl shadow-lg hover:bg-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2"
              style={{ fontSize: `${textSize * 1.25}rem` }}
              aria-label="Prueba virtual de marcos"
            >
              <Glasses className="w-6 h-6" aria-hidden="true" />
              <span>Muestra de montura</span>
            </Link>
          </div>

          <p
            className="text-purple-600 mt-4"
            style={{ fontSize: `${textSize * 0.875}rem` }}
          >
            Atención personalizada • Equipos modernos • Profesionales certificados
          </p>
        </div>
      </div>
    </section>
  );
}