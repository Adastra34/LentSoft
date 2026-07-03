/**
 * LoginPage.tsx
 * Vista de inicio de sesión de LentSoft.
 * Redirige según el rol:
 *  - admin     → /dashboard-admin
 *  - optometra → /dashboard-optometra
 *  - usuario   → / (catálogo principal)
 */
import { useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../controllers/contexts/AuthContext";
import { notify } from "../../utils/notify";

const loginImage = "https://images.unsplash.com/photo-1776890948428-5cb3e62cc680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxlbGVnYW50JTIwZXllZ2xhc3NlcyUyMGNvbGxlY3Rpb24lMjBvcHRpY2FsJTIwc3RvcmV8ZW58MXx8fHwxNzc5OTE2MDM0fDA&ixlib=rb-4.1.0&q=80&w=1080";

interface OutletContext {
  textSize: number;
  highContrast: boolean;
}

export function LoginPage() {
  const { textSize, highContrast } = useOutletContext<OutletContext>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);

    if (success) {
      /* Redirigir según el rol del usuario */
      if (email === "admin@lentsoft.com") {
        navigate("/dashboard-admin");
      } else if (email === "optometra@gmail.com") {
        navigate("/dashboard-optometra");
      } else {
        /* Usuarios regulares van al catálogo principal */
        notify.success("¡Bienvenido/a! Has iniciado sesión correctamente.");
        navigate("/");
      }
    } else {
      const msg = "Credenciales inválidas. Por favor verifica tu correo y contraseña.";
      setError(msg);
      notify.error(msg);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="hidden md:block relative h-full min-h-[600px]">
            <img
              src={loginImage}
              alt="Colección de gafas elegantes de diferentes marcas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-transparent"></div>
          </div>

          {/* Form Section */}
          <div className="flex items-center justify-center p-8 md:p-12 lg:p-16">
            <div className="w-full max-w-md">
              <h1 
                className="text-center mb-8 tracking-tight text-purple-900"
                style={{ fontSize: `${textSize * 2}rem` }}
              >
                INICIO DE SESIÓN
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulario de inicio de sesión">
                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="sr-only"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    required
                    className={`w-full px-5 py-3 rounded-xl border ${
                      highContrast 
                        ? "border-black bg-white text-black" 
                        : "border-gray-300 bg-white text-gray-900"
                    } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                    style={{ fontSize: `${textSize}rem` }}
                    aria-label="Correo electrónico"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label 
                    htmlFor="password" 
                    className="sr-only"
                  >
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                      required
                      className={`w-full px-5 py-3 rounded-xl border ${
                        highContrast 
                          ? "border-black bg-white text-black" 
                          : "border-gray-300 bg-white text-gray-900"
                      } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12`}
                      style={{ fontSize: `${textSize}rem` }}
                      aria-label="Contraseña"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" aria-hidden="true" />
                      ) : (
                        <Eye className="w-5 h-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-left">
                  <Link
                    to="/recuperar-contrasena"
                    className="text-purple-700 hover:text-purple-900 underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-3 px-6 rounded-xl ${
                    highContrast
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-slate-700 text-white hover:bg-slate-800"
                  } transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-medium`}
                  style={{ fontSize: `${textSize}rem` }}
                >
                  Iniciar sesión
                </button>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl" role="alert">
                    <p style={{ fontSize: `${textSize * 0.875}rem` }}>{error}</p>
                  </div>
                )}

                {/* Create Account Link */}
                <div className="text-center pt-4">
                  <Link
                    to="/registro"
                    className="text-purple-700 hover:text-purple-900 underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1"
                    style={{ fontSize: `${textSize}rem` }}
                  >
                    Crear cuenta
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}