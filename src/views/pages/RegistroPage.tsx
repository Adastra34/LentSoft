import { useState } from "react";
import { Link, useOutletContext } from "react-router";
import { Eye, EyeOff } from "lucide-react";

interface OutletContext {
  textSize: number;
  highContrast: boolean;
}

export function RegistroPage() {
  const { textSize, highContrast } = useOutletContext<OutletContext>();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration logic
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Registration attempt:", formData);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <h1 
          className="text-center mb-8 tracking-tight text-purple-900"
          style={{ fontSize: `${textSize * 2}rem` }}
        >
          CREAR CUENTA
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulario de registro">
          {/* Nombre y Apellido */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="nombre" 
                className="sr-only"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
                className={`w-full px-5 py-3 rounded-xl border ${
                  highContrast 
                    ? "border-black bg-white text-black" 
                    : "border-gray-300 bg-white text-gray-900"
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                style={{ fontSize: `${textSize}rem` }}
                aria-label="Nombre"
              />
            </div>

            <div>
              <label 
                htmlFor="apellido" 
                className="sr-only"
              >
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Apellido"
                required
                className={`w-full px-5 py-3 rounded-xl border ${
                  highContrast 
                    ? "border-black bg-white text-black" 
                    : "border-gray-300 bg-white text-gray-900"
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                style={{ fontSize: `${textSize}rem` }}
                aria-label="Apellido"
              />
            </div>
          </div>

          {/* Email */}
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
              value={formData.email}
              onChange={handleChange}
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

          {/* Password */}
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
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
                minLength={8}
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

          {/* Confirm Password */}
          <div>
            <label 
              htmlFor="confirmPassword" 
              className="sr-only"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmar contraseña"
                required
                minLength={8}
                className={`w-full px-5 py-3 rounded-xl border ${
                  highContrast 
                    ? "border-black bg-white text-black" 
                    : "border-gray-300 bg-white text-gray-900"
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12`}
                style={{ fontSize: `${textSize}rem` }}
                aria-label="Confirmar contraseña"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1"
                aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Eye className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
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
            Crear cuenta
          </button>

          {/* Login Link */}
          <div className="text-center pt-4">
            <p 
              className="text-gray-600"
              style={{ fontSize: `${textSize}rem` }}
            >
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-purple-700 hover:text-purple-900 underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
