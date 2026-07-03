/**
 * RegistroPage.tsx
 * Vista de registro de nuevos usuarios en LentSoft.
 * Incluye campos para: tipo de documento, número de documento,
 * nombre, apellido, teléfono, correo, contraseña y confirmación.
 * Redirige a la página principal (catálogo) tras el registro exitoso.
 */

import { useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "../../controllers/contexts/AuthContext";
import { notify } from "../../utils/notify";

/* ── Tipos ─────────────────────────────────────────────────── */
interface OutletContext {
  textSize: number;
  highContrast: boolean;
}

/* ── Componente ────────────────────────────────────────────── */
export function RegistroPage() {
  const { textSize, highContrast } = useOutletContext<OutletContext>();
  const { register } = useAuth();
  const navigate = useNavigate();

  /* Estado del formulario */
  const [formData, setFormData] = useState({
    tipoDocumento: "CC",
    numDocumento: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* Estado de visibilidad de contraseñas */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* Estado de carga para el botón de envío */
  const [loading, setLoading] = useState(false);

  /* ── Clases reutilizables ───────────────────────────────── */
  const labelCls = `block text-sm font-semibold mb-1.5 ${
    highContrast ? "text-black" : "text-purple-800"
  }`;
  const inputCls = `w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
    highContrast
      ? "border-black bg-white text-black"
      : "border-purple-200 bg-white text-gray-900 placeholder-gray-400 hover:border-purple-300"
  }`;

  /* ── Handlers ───────────────────────────────────────────── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* Validación de contraseñas */
    if (formData.password !== formData.confirmPassword) {
      notify.error("Las contraseñas no coinciden. Por favor verifícalas.");
      return;
    }

    /* Validación de longitud mínima de contraseña */
    if (formData.password.length < 8) {
      notify.warning("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const success = await register(
        formData.email,
        formData.password,
        `${formData.nombre} ${formData.apellido}`
      );

      if (success) {
        /* Registro exitoso → ir a la página principal (catálogo) */
        notify.success(
          `¡Bienvenido/a, ${formData.nombre}! Tu cuenta ha sido creada exitosamente.`
        );
        setTimeout(() => navigate("/"), 1500);
      } else {
        notify.error(
          "No fue posible crear la cuenta. Por favor intenta nuevamente."
        );
      }
    } catch {
      notify.error("Ocurrió un error inesperado. Por favor intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    /* Contenedor principal de la página */
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Tarjeta del formulario */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Encabezado con gradiente */}
        <div className="bg-gradient-to-r from-purple-700 to-purple-900 px-8 py-8 text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <UserPlus className="w-7 h-7 text-white" aria-hidden="true" />
          </div>
          <h1
            className="text-white font-bold tracking-tight"
            style={{ fontSize: `${textSize * 1.75}rem`, fontFamily: "var(--font-primary)" }}
          >
            Crear cuenta
          </h1>
          <p className="text-purple-200 text-sm mt-1" style={{ fontFamily: "var(--font-secondary)" }}>
            Únete a LentSoft y accede a todos los beneficios
          </p>
        </div>

        {/* Formulario */}
        <div className="px-8 py-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            aria-label="Formulario de registro"
            noValidate
          >

            {/* ── Sección: Documento de identidad ── */}
            <fieldset>
              <legend className="text-purple-900 font-semibold text-sm mb-3 uppercase tracking-wide">
                Documento de identidad
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Tipo de documento */}
                <div>
                  <label htmlFor="tipoDocumento" className={labelCls}>
                    Tipo de documento <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="tipoDocumento"
                    name="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={handleChange}
                    required
                    className={inputCls}
                    style={{ fontSize: `${textSize * 0.9}rem` }}
                    aria-label="Tipo de documento de identidad"
                  >
                    <option value="CC">Cédula de ciudadanía (CC)</option>
                    <option value="TI">Tarjeta de identidad (TI)</option>
                    <option value="CE">Cédula de extranjería (CE)</option>
                    <option value="PA">Pasaporte (PA)</option>
                    <option value="NIT">NIT</option>
                  </select>
                </div>

                {/* Número de documento */}
                <div>
                  <label htmlFor="numDocumento" className={labelCls}>
                    Número de documento <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="numDocumento"
                    name="numDocumento"
                    value={formData.numDocumento}
                    onChange={handleChange}
                    placeholder="Ej: 1023456789"
                    required
                    className={inputCls}
                    style={{ fontSize: `${textSize * 0.9}rem` }}
                    aria-label="Número de documento de identidad"
                    inputMode="numeric"
                  />
                </div>
              </div>
            </fieldset>

            {/* ── Sección: Datos personales ── */}
            <fieldset>
              <legend className="text-purple-900 font-semibold text-sm mb-3 uppercase tracking-wide">
                Datos personales
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className={labelCls}>
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej: María"
                    required
                    className={inputCls}
                    style={{ fontSize: `${textSize * 0.9}rem` }}
                    aria-label="Nombre"
                    autoComplete="given-name"
                  />
                </div>

                {/* Apellido */}
                <div>
                  <label htmlFor="apellido" className={labelCls}>
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Ej: González"
                    required
                    className={inputCls}
                    style={{ fontSize: `${textSize * 0.9}rem` }}
                    aria-label="Apellido"
                    autoComplete="family-name"
                  />
                </div>
              </div>
            </fieldset>

            {/* ── Sección: Contacto ── */}
            <fieldset>
              <legend className="text-purple-900 font-semibold text-sm mb-3 uppercase tracking-wide">
                Información de contacto
              </legend>
              <div className="space-y-4">

                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className={labelCls}>
                    Número de teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ej: +57 300 000 0000"
                    required
                    className={inputCls}
                    style={{ fontSize: `${textSize * 0.9}rem` }}
                    aria-label="Número de teléfono"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>

                {/* Correo electrónico */}
                <div>
                  <label htmlFor="email" className={labelCls}>
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ej: maria@correo.com"
                    required
                    className={inputCls}
                    style={{ fontSize: `${textSize * 0.9}rem` }}
                    aria-label="Correo electrónico"
                    autoComplete="email"
                  />
                </div>
              </div>
            </fieldset>

            {/* ── Sección: Seguridad ── */}
            <fieldset>
              <legend className="text-purple-900 font-semibold text-sm mb-3 uppercase tracking-wide">
                Contraseña
              </legend>
              <div className="space-y-4">

                {/* Contraseña */}
                <div>
                  <label htmlFor="password" className={labelCls}>
                    Contraseña <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Mínimo 8 caracteres"
                      required
                      minLength={8}
                      className={`${inputCls} pr-12`}
                      style={{ fontSize: `${textSize * 0.9}rem` }}
                      aria-label="Contraseña"
                      autoComplete="new-password"
                    />
                    {/* Botón mostrar/ocultar contraseña */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword
                        ? <EyeOff className="w-5 h-5" aria-hidden="true" />
                        : <Eye className="w-5 h-5" aria-hidden="true" />}
                    </button>
                  </div>
                </div>

                {/* Confirmar contraseña */}
                <div>
                  <label htmlFor="confirmPassword" className={labelCls}>
                    Confirmar contraseña <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repite tu contraseña"
                      required
                      minLength={8}
                      className={`${inputCls} pr-12`}
                      style={{ fontSize: `${textSize * 0.9}rem` }}
                      aria-label="Confirmar contraseña"
                      autoComplete="new-password"
                    />
                    {/* Botón mostrar/ocultar confirmación */}
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1"
                      aria-label={showConfirmPassword ? "Ocultar confirmación" : "Mostrar confirmación"}
                    >
                      {showConfirmPassword
                        ? <EyeOff className="w-5 h-5" aria-hidden="true" />
                        : <Eye className="w-5 h-5" aria-hidden="true" />}
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>

            {/* ── Nota de campos obligatorios ── */}
            <p className="text-xs text-gray-500">
              <span className="text-red-500">*</span> Campos obligatorios
            </p>

            {/* ── Botón de envío ── */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-6 rounded-2xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center gap-2 ${
                loading
                  ? "bg-purple-300 cursor-not-allowed text-white"
                  : highContrast
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-purple-500/30"
              }`}
              style={{ fontSize: `${textSize}rem` }}
              aria-busy={loading}
            >
              {loading ? (
                /* Indicador de carga */
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" aria-hidden="true" />
                  Crear cuenta
                </>
              )}
            </button>

            {/* ── Enlace a inicio de sesión ── */}
            <div className="text-center pt-2">
              <p
                className="text-gray-600"
                style={{ fontSize: `${textSize * 0.9}rem` }}
              >
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  className="text-purple-700 hover:text-purple-900 font-semibold underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 transition-colors"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
