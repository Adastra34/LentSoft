import { useState } from "react";
import { Link, useOutletContext } from "react-router";
import { ArrowLeft, Mail } from "lucide-react";

interface OutletContext {
  textSize: number;
  highContrast: boolean;
}

export function RecuperarContrasenaPage() {
  const { textSize, highContrast } = useOutletContext<OutletContext>();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock password recovery logic
    console.log("Password recovery request for:", email);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="mb-8">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1"
              style={{ fontSize: `${textSize * 0.875}rem` }}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Volver al inicio de sesión
            </Link>
          </div>

          <h1 
            className="text-center mb-4 tracking-tight text-purple-900"
            style={{ fontSize: `${textSize * 1.875}rem` }}
          >
            Recuperar Contraseña
          </h1>

          {!submitted ? (
            <>
              <p 
                className="text-center text-gray-600 mb-8"
                style={{ fontSize: `${textSize}rem` }}
              >
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulario de recuperación de contraseña">
                <div>
                  <label 
                    htmlFor="email" 
                    className="sr-only"
                  >
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Correo electrónico"
                      required
                      className={`w-full pl-12 pr-5 py-3 rounded-xl border ${
                        highContrast 
                          ? "border-black bg-white text-black" 
                          : "border-gray-300 bg-white text-gray-900"
                      } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      style={{ fontSize: `${textSize}rem` }}
                      aria-label="Correo electrónico"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 px-6 rounded-xl ${
                    highContrast
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  } transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-medium`}
                  style={{ fontSize: `${textSize}rem` }}
                >
                  Enviar enlace de recuperación
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-green-600" aria-hidden="true" />
                </div>
              </div>
              <h2 
                className="text-green-600 mb-4"
                style={{ fontSize: `${textSize * 1.5}rem` }}
              >
                ¡Correo enviado!
              </h2>
              <p 
                className="text-gray-600 mb-6"
                style={{ fontSize: `${textSize}rem` }}
              >
                Hemos enviado un enlace de recuperación a <strong>{email}</strong>. 
                Por favor revisa tu bandeja de entrada.
              </p>
              <Link
                to="/login"
                className={`inline-block py-3 px-6 rounded-xl ${
                  highContrast
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                } transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-medium`}
                style={{ fontSize: `${textSize}rem` }}
              >
                Volver al inicio de sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
