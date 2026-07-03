import { useState, useEffect, useRef } from "react";
import { X, Send, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

/* ── Stick-figure SVG mascot ─────────────────────────────── */
function StickFigure({ size = 32, color = "white", animate = false }: { size?: number; color?: string; animate?: boolean }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animate ? "animate-bounce" : ""}
      style={animate ? { animationDuration: "1.2s" } : {}}
    >
      {/* Head */}
      <circle cx="20" cy="9" r="7" stroke={color} strokeWidth="2.8" />
      {/* Eyes */}
      <circle cx="17" cy="8" r="1.2" fill={color} />
      <circle cx="23" cy="8" r="1.2" fill={color} />
      {/* Smile */}
      <path d="M16 11.5 Q20 14.5 24 11.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Body */}
      <line x1="20" y1="16" x2="20" y2="32" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
      {/* Left arm */}
      <line x1="20" y1="21" x2="11" y2="27" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Right arm */}
      <line x1="20" y1="21" x2="29" y2="27" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Left leg */}
      <line x1="20" y1="32" x2="13" y2="44" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Right leg */}
      <line x1="20" y1="32" x2="27" y2="44" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Types ───────────────────────────────────────────────── */
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

/* ── FAQ data (unchanged) ─────────────────────────────────── */
const faqs: FAQ[] = [
  { question: "¿Qué productos ofrecen?", answer: "Ofrecemos una amplia gama de productos ópticos: gafas graduadas, gafas de sol, lentes de contacto (mensuales, diarios, tóricos, multifocales y de color), y accesorios como estuches, líquidos limpiadores y paños de microfibra.", category: "tienda" },
  { question: "¿Cuáles son los métodos de pago?", answer: "Aceptamos tarjetas de crédito, débito, PSE, efectivo contra entrega, y ofrecemos planes de financiamiento sin intereses en compras superiores a $200,000 COP.", category: "tienda" },
  { question: "¿Hacen envíos a todo el país?", answer: "Sí, realizamos envíos a nivel nacional. El envío es GRATUITO en compras superiores a $150,000 COP. Tiempo de entrega: 2-5 días hábiles según la ciudad.", category: "tienda" },
  { question: "¿Tienen garantía los productos?", answer: "Todos nuestros productos tienen garantía. Gafas: 2 años en montaje y defectos de fabricación. Lentes de contacto: garantía de satisfacción de 30 días. Ofrecemos devolución completa del dinero si no estás satisfecho.", category: "tienda" },
  { question: "¿Quiénes son LentSoft?", answer: "Somos la plataforma líder de e-commerce óptico en Colombia desde 2010. Contamos con 15 optometristas certificados, presencia en 32 departamentos y más de 50,000 clientes activos. Certificados ISO 9001:2015 en gestión de calidad.", category: "nosotros" },
  { question: "¿Dónde están ubicados?", answer: "Nuestra sede principal está en Bogotá (zona T), pero atendemos a todo Colombia a través de nuestra plataforma online. Contamos con servicio al cliente disponible 7 días a la semana.", category: "nosotros" },
  { question: "¿Qué servicios especializados ofrecen?", answer: "Ofrecemos: Exámenes optométricos completos ($89,900), Adaptación de lentes de contacto ($124,900), Previsualización AR de monturas (GRATIS), y Servicio express de montaje (desde $129,900). Todos con profesionales certificados.", category: "nosotros" },
  { question: "¿Cómo funciona la previsualización de marcos?", answer: "Nuestra tecnología de Realidad Aumentada mapea 468 puntos faciales para proyectar monturas en 3D sobre tu rostro. Solo necesitas activar tu cámara y podrás probarte más de 800 modelos de gafas virtualmente.", category: "ar" },
  { question: "¿Es gratis la previsualización AR?", answer: "¡Sí! La previsualización con realidad aumentada es 100% gratuita y está disponible 24/7. Solo necesitas un dispositivo con cámara (computadora, celular o tablet).", category: "ar" },
  { question: "¿Qué tan precisa es la previsualización?", answer: "Nuestra tecnología tiene una precisión superior al 95%. Calcula automáticamente tu distancia interpupilar y medidas faciales con exactitud milimétrica usando MediaPipe Face Mesh.", category: "ar" },
  { question: "¿Cómo creo una cuenta?", answer: "Haz clic en el botón 'Ingresar' en la esquina superior derecha, luego selecciona 'Crear cuenta nueva'. Solo necesitas tu nombre, correo electrónico y una contraseña segura. ¡Es rápido y gratis!", category: "login" },
  { question: "¿Qué beneficios tengo al registrarme?", answer: "Al registrarte puedes: guardar productos favoritos, agendar citas con optometristas, hacer seguimiento de tus pedidos, guardar tu historial médico, y acceder a descuentos exclusivos para miembros.", category: "login" },
  { question: "Olvidé mi contraseña, ¿qué hago?", answer: "En la página de inicio de sesión, haz clic en '¿Olvidaste tu contraseña?'. Te enviaremos un enlace a tu correo para restablecerla. El enlace es válido por 24 horas.", category: "login" },
];

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "¡Hola! 👓 Soy Lupo, el asistente de LentSoft. ¿En qué puedo ayudarte hoy?",
  isUser: false,
  timestamp: new Date(),
};

const KEYWORDS: [string[], string][] = [
  [["precio", "costo", "valor", "cuánto"], "Nuestros precios varían según el producto. Visita nuestra tienda para ver el catálogo completo con precios actualizados. También ofrecemos financiamiento sin intereses. 🏷️"],
  [["envio", "envío", "entrega", "despacho", "demora"], "Realizamos envíos a todo Colombia. ¡Envío GRATIS en compras superiores a $150,000 COP! Tiempo de entrega: 2-5 días hábiles según la ciudad. 📦"],
  [["horario", "atencion", "atención", "contacto", "soporte"], "Nuestro servicio al cliente está disponible 7 días a la semana. Puedes contactarnos vía WhatsApp, chat o correo en cualquier momento. 📞"],
  [["garantia", "garantía", "devolucion", "devolución"], "Todos nuestros productos tienen garantía. Gafas: 2 años. Lentes de contacto: 30 días de satisfacción. Ofrecemos devolución completa si no estás satisfecho. ✅"],
  [["hola", "buenas", "hi", "buendia", "buen día"], "¡Hola! Me alegra que me escribas. 😊 ¿En qué puedo ayudarte hoy? Puedes hacer clic en una pregunta frecuente o escribirme directamente."],
  [["gracias", "thank", "perfecto", "excelente", "genial"], "¡Con mucho gusto! 😄 Estoy aquí para lo que necesites. ¿Hay algo más en lo que pueda ayudarte?"],
  [["camara", "cámara", "ar", "prueba", "virtual", "realidad aumentada"], "Nuestra tecnología AR usa MediaPipe Face Mesh con 468 puntos faciales para proyectar gafas en tiempo real sobre tu rostro. ¡Pruébalo gratis en /prueba-virtual! 👓✨"],
];

/* ── Typing indicator ─────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-purple-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm flex gap-1.5 items-center">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main Chatbot component ──────────────────────────────── */
export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [showFAQs, setShowFAQs] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mascotWave, setMascotWave] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* Scroll to bottom when new message arrives */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* Wave animation when opening */
  const handleOpen = () => {
    setIsOpen(true);
    setMascotWave(true);
    setTimeout(() => setMascotWave(false), 2000);
  };

  /* Simulated bot typing then response */
  const addBotMessage = (text: string) => {
    setIsTyping(true);
    const delay = Math.min(600 + text.length * 12, 2200);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        isUser: false,
        timestamp: new Date(),
      }]);
    }, delay);
  };

  const handleFAQClick = (faq: FAQ) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: faq.question,
      isUser: true,
      timestamp: new Date(),
    }]);
    setShowFAQs(false);
    addBotMessage(faq.answer);
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    setMessages(prev => [...prev, { id: Date.now(), text, isUser: true, timestamp: new Date() }]);
    setInputValue("");

    const lower = text.toLowerCase();
    let response = "Gracias por tu mensaje. Para obtener ayuda específica, selecciona una pregunta frecuente o contáctanos al +57 300 123 4567. 📲";

    for (const [keywords, reply] of KEYWORDS) {
      if (keywords.some(k => lower.includes(k))) {
        response = reply;
        break;
      }
    }

    setShowFAQs(false);
    addBotMessage(response);
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setShowFAQs(true);
  };

  const grouped = {
    tienda:   faqs.filter(f => f.category === "tienda"),
    nosotros: faqs.filter(f => f.category === "nosotros"),
    ar:       faqs.filter(f => f.category === "ar"),
    login:    faqs.filter(f => f.category === "login"),
  };

  return (
    <>
      {/* ── Floating trigger button ── */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full shadow-xl hover:scale-110 hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center relative"
          aria-label="Abrir asistente LentSoft"
        >
          <StickFigure size={30} color="white" />
          {/* Online dot */}
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* ── Chat window ── */}
      {isOpen && (
        <div className="w-96 max-w-[calc(100vw-3rem)] h-[580px] max-h-[calc(100vh-10rem)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-purple-100"
          style={{ animation: "slideUpFade 0.2s ease-out" }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 to-purple-800 px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Mascot in header */}
              <div className="w-11 h-11 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                <StickFigure size={28} color="white" animate={mascotWave} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm leading-tight">Lupo · Asistente LentSoft</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-purple-200 text-xs">En línea · Siempre disponible</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="p-2 hover:bg-white/15 rounded-xl transition-colors"
                aria-label="Reiniciar conversación"
                title="Nueva conversación"
              >
                <RotateCcw className="w-4 h-4 text-purple-200" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/15 rounded-xl transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-purple-50/20">

            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.isUser ? "justify-end" : "justify-start"}`}>
                {/* Bot avatar on left */}
                {!msg.isUser && (
                  <div className="w-7 h-7 bg-purple-600 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                    <StickFigure size={18} color="white" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.isUser
                      ? "bg-purple-600 text-white rounded-br-md"
                      : "bg-white text-purple-900 shadow-sm rounded-bl-md border border-purple-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 bg-purple-600 rounded-full flex-shrink-0 flex items-center justify-center">
                  <StickFigure size={18} color="white" />
                </div>
                <TypingIndicator />
              </div>
            )}

            {/* FAQs */}
            {showFAQs && !isTyping && (
              <div className="space-y-2 mt-2">
                <button
                  onClick={() => setShowFAQs(v => !v)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-purple-100 hover:bg-purple-200 rounded-xl text-purple-900 font-semibold text-xs transition-colors"
                >
                  <span>Preguntas frecuentes</span>
                  <ChevronUp className="w-4 h-4" />
                </button>

                {[
                  { key: "tienda",   emoji: "🛍️", label: "Tienda" },
                  { key: "nosotros", emoji: "ℹ️",  label: "Nosotros" },
                  { key: "ar",       emoji: "👓",  label: "Prueba Virtual AR" },
                  { key: "login",    emoji: "🔐",  label: "Cuenta" },
                ].map(({ key, emoji, label }) => (
                  <div key={key} className="space-y-1">
                    <p className="text-[11px] font-bold text-purple-500 px-1">{emoji} {label}</p>
                    {grouped[key as keyof typeof grouped].map((faq, i) => (
                      <button
                        key={i}
                        onClick={() => handleFAQClick(faq)}
                        className="w-full text-left px-3 py-2 bg-white hover:bg-purple-50 rounded-xl text-xs text-purple-800 border border-purple-100 hover:border-purple-300 transition-all leading-snug"
                      >
                        {faq.question}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {!showFAQs && !isTyping && messages.length > 1 && (
              <button
                onClick={() => setShowFAQs(true)}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded-xl text-purple-600 text-xs font-medium transition-colors border border-purple-100"
              >
                <ChevronDown className="w-3.5 h-3.5" />
                Ver preguntas frecuentes
              </button>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-purple-100 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-4 py-2.5 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-sm bg-purple-50/50 placeholder-purple-300"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center justify-center"
                aria-label="Enviar"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-purple-300 text-center mt-1.5">Lupo · Asistente Virtual LentSoft</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </>
  );
}
