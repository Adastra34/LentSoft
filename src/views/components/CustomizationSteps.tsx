import { Search, Palette, Settings, ShoppingBag } from "lucide-react";

interface CustomizationStepsProps {
  textSize: number;
}

export function CustomizationSteps({ textSize }: CustomizationStepsProps) {
  const steps = [
    {
      id: 1,
      title: "ENCONTRAR",
      description: "Explora nuestra amplia colección de monturas y encuentra el estilo perfecto para ti",
      icon: <Search className="w-16 h-16" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 2,
      title: "ELEGIR",
      description: "Selecciona el diseño, material y color que mejor se adapte a tu personalidad",
      icon: <Palette className="w-16 h-16" />,
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 3,
      title: "PERSONALIZAR",
      description: "Ajusta cada detalle: medidas, lentes, tratamientos y opciones especiales",
      icon: <Settings className="w-16 h-16" />,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: 4,
      title: "COMPRAR",
      description: "Completa tu pedido y recibe tus gafas personalizadas en la comodidad de tu hogar",
      icon: <ShoppingBag className="w-16 h-16" />,
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-20 my-12">
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-[32px] shadow-2xl overflow-hidden">
        <div className="p-8 md:p-16">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl text-white text-center mb-4 tracking-wide"
            style={{ fontSize: `${textSize * 3.5}rem` }}
          >
            PERSONALIZAR TUS GAFAS
          </h2>
          <h3 
            className="text-3xl md:text-4xl text-yellow-300 text-center mb-12"
            style={{ fontSize: `${textSize * 2.5}rem` }}
          >
            NUNCA FUE TAN FÁCIL
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Step number */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {step.id}
                  </div>
                </div>

                {/* Icon */}
                <div className={`flex justify-center mb-6 mt-4 text-transparent bg-gradient-to-br ${step.color} bg-clip-text`}>
                  {step.icon}
                </div>

                {/* Title */}
                <h4 
                  className="text-purple-900 text-center mb-4 font-bold tracking-wide"
                  style={{ fontSize: `${textSize * 1.5}rem` }}
                >
                  {step.title}
                </h4>

                {/* Description */}
                <p 
                  className="text-purple-700 text-center leading-relaxed"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  {step.description}
                </p>

                {/* Connector arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 text-white opacity-50">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M8 16H24M24 16L18 10M24 16L18 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-10 py-5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              style={{ fontSize: `${textSize * 1.25}rem` }}
            >
              COMENZAR AHORA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
