import { useState } from "react";
import { MessageCircle, X, Send, ChevronDown, ChevronUp } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
  category: "tienda" | "nosotros" | "ar" | "login";
}

const faqs: FAQ[] = [
  // TIENDA
  {
    question: "¿Qué productos ofrecen?",
    answer: "Ofrecemos una amplia gama de productos ópticos: gafas graduadas, gafas de sol, lentes de contacto (mensuales, diarios, tóricos, multifocales y de color), y accesorios como estuches, líquidos limpiadores y paños de microfibra.",
    category: "tienda"
  },
  {
    question: "¿Cuáles son los métodos de pago?",
    answer: "Aceptamos tarjetas de crédito, débito, PSE, efectivo contra entrega, y ofrecemos planes de financiamiento sin intereses en compras superiores a $200,000 COP.",
    category: "tienda"
  },
  {
    question: "¿Hacen envíos a todo el país?",
    answer: "Sí, realizamos envíos a nivel nacional. El envío es GRATUITO en compras superiores a $150,000 COP. Tiempo de entrega: 2-5 días hábiles según la ciudad.",
    category: "tienda"
  },
  {
    question: "¿Tienen garantía los productos?",
    answer: "Todos nuestros productos tienen garantía. Gafas: 2 años en montaje y defectos de fabricación. Lentes de contacto: garantía de satisfacción de 30 días. Ofrecemos devolución completa del dinero si no estás satisfecho.",
    category: "tienda"
  },
  // NOSOTROS
  {
    question: "¿Quiénes son LentSoft?",
    answer: "Somos la plataforma líder de e-commerce óptico en Colombia desde 2010. Contamos con 15 optometristas certificados, presencia en 32 departamentos y más de 50,000 clientes activos. Certificados ISO 9001:2015 en gestión de calidad.",
    category: "nosotros"
  },
  {
    question: "¿Dónde están ubicados?",
    answer: "Nuestra sede principal está en Bogotá (zona T), pero atendemos a todo Colombia a través de nuestra plataforma online. Contamos con servicio al cliente disponible 7 días a la semana.",
    category: "nosotros"
  },
  {
    question: "¿Qué servicios especializados ofrecen?",
    answer: "Ofrecemos: Exámenes optométricos completos ($89,900), Adaptación de lentes de contacto ($124,900), Previsualización AR de monturas (GRATIS), y Servicio express de montaje (desde $129,900). Todos con profesionales certificados.",
    category: "nosotros"
  },
  // PREVISUALIZACIÓN AR
  {
    question: "¿Cómo funciona la previsualización de marcos?",
    answer: "Nuestra tecnología de Realidad Aumentada mapea 68 puntos faciales para proyectar monturas en 3D sobre tu rostro. Solo necesitas activar tu cámara web o del celular y podrás probarte más de 800 modelos de gafas virtualmente.",
    category: "ar"
  },
  {
    question: "¿Es gratis la previsualización AR?",
    answer: "¡Sí! La previsualización con realidad aumentada es 100% gratuita y está disponible 24/7. Solo necesitas un dispositivo con cámara (computadora, celular o tablet).",
    category: "ar"
  },
  {
    question: "¿Qué tan precisa es la previsualización?",
    answer: "Nuestra tecnología tiene una precisión superior al 95%. Calcula automáticamente tu distancia interpupilar y medidas faciales con exactitud milimétrica usando detección facial biométrica.",
    category: "ar"
  },
  // LOGIN
  {
    question: "¿Cómo creo una cuenta?",
    answer: "Haz clic en el botón 'Ingresar' en la esquina superior derecha, luego selecciona 'Crear cuenta nueva'. Solo necesitas tu nombre, correo electrónico y una contraseña segura. ¡Es rápido y gratis!",
    category: "login"
  },
  {
    question: "¿Qué beneficios tengo al registrarme?",
    answer: "Al registrarte puedes: guardar productos favoritos, agendar citas con optometristas, hacer seguimiento de tus pedidos, guardar tu historial médico de citas, y acceder a descuentos exclusivos para miembros.",
    category: "login"
  },
  {
    question: "Olvidé mi contraseña, ¿qué hago?",
    answer: "En la página de inicio de sesión, haz clic en '¿Olvidaste tu contraseña?'. Te enviaremos un enlace a tu correo para restablecerla. El enlace es válido por 24 horas.",
    category: "login"
  }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! 👋 Soy el asistente virtual de LentSoft. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [showFAQs, setShowFAQs] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const handleFAQClick = (faq: FAQ) => {
    // Add user question
    const userMessage: Message = {
      id: Date.now(),
      text: faq.question,
      isUser: true,
      timestamp: new Date()
    };

    // Add bot answer
    const botMessage: Message = {
      id: Date.now() + 1,
      text: faq.answer,
      isUser: false,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, botMessage]);
    setShowFAQs(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    // Simple keyword matching for responses
    let botResponse = "Gracias por tu mensaje. Para obtener ayuda específica, por favor selecciona una de las preguntas frecuentes o contáctanos al +57 300 123 4567.";

    const lowerInput = inputValue.toLowerCase();

    if (lowerInput.includes("precio") || lowerInput.includes("costo") || lowerInput.includes("valor")) {
      botResponse = "Nuestros precios varían según el producto. Visita nuestra tienda para ver el catálogo completo con precios actualizados. También ofrecemos financiamiento sin intereses.";
    } else if (lowerInput.includes("envio") || lowerInput.includes("envío") || lowerInput.includes("entreg")) {
      botResponse = "Realizamos envíos a todo Colombia. ¡Envío GRATIS en compras superiores a $150,000 COP! Tiempo de entrega: 2-5 días hábiles.";
    } else if (lowerInput.includes("horario") || lowerInput.includes("atencion") || lowerInput.includes("atención")) {
      botResponse = "Nuestro servicio al cliente está disponible 7 días a la semana. Puedes contactarnos vía WhatsApp, chat o correo en cualquier momento.";
    }

    const botMessage: Message = {
      id: Date.now() + 1,
      text: botResponse,
      isUser: false,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, botMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const groupedFAQs = {
    tienda: faqs.filter(f => f.category === "tienda"),
    nosotros: faqs.filter(f => f.category === "nosotros"),
    ar: faqs.filter(f => f.category === "ar"),
    login: faqs.filter(f => f.category === "login")
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group"
          aria-label="Abrir chat de ayuda"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Asistente LentSoft</h3>
                <p className="text-purple-100 text-xs">En línea</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-purple-50/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                    message.isUser
                      ? "bg-purple-600 text-white rounded-br-md"
                      : "bg-white text-purple-900 shadow-md rounded-bl-md border border-purple-100"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {/* FAQs Section */}
            {showFAQs && (
              <div className="space-y-3 mt-4">
                <button
                  onClick={() => setShowFAQs(!showFAQs)}
                  className="w-full flex items-center justify-between px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-xl transition-colors text-purple-900 font-medium text-sm"
                >
                  <span>Preguntas Frecuentes</span>
                  {showFAQs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Tienda */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-purple-700 px-2">🛍️ Tienda</p>
                  {groupedFAQs.tienda.map((faq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFAQClick(faq)}
                      className="w-full text-left px-3 py-2 bg-white hover:bg-purple-50 rounded-xl transition-colors text-sm text-purple-700 border border-purple-100 hover:border-purple-300"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>

                {/* Nosotros */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-purple-700 px-2">ℹ️ Sobre Nosotros</p>
                  {groupedFAQs.nosotros.map((faq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFAQClick(faq)}
                      className="w-full text-left px-3 py-2 bg-white hover:bg-purple-50 rounded-xl transition-colors text-sm text-purple-700 border border-purple-100 hover:border-purple-300"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>

                {/* AR */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-purple-700 px-2">📱 Previsualización AR</p>
                  {groupedFAQs.ar.map((faq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFAQClick(faq)}
                      className="w-full text-left px-3 py-2 bg-white hover:bg-purple-50 rounded-xl transition-colors text-sm text-purple-700 border border-purple-100 hover:border-purple-300"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>

                {/* Login */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-purple-700 px-2">🔐 Inicio de Sesión</p>
                  {groupedFAQs.login.map((faq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFAQClick(faq)}
                      className="w-full text-left px-3 py-2 bg-white hover:bg-purple-50 rounded-xl transition-colors text-sm text-purple-700 border border-purple-100 hover:border-purple-300"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-purple-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-4 py-2.5 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
                aria-label="Enviar mensaje"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
