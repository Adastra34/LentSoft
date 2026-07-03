/**
 * HomePage.tsx
 * Página principal de LentSoft.
 * Muestra el catálogo completo: hero, características, categorías,
 * más vendidos, productos con descuento, lentes de contacto y un
 * banner de llamada a la acción para nuevos usuarios.
 */

import { useOutletContext, Link } from "react-router";
import { Hero } from "../components/Hero";
import { InnovativeFeature } from "../components/InnovativeFeature";
import { Categories } from "../components/Categories";
import { BestSellers } from "../components/BestSellers";
import { DiscountedProducts } from "../components/DiscountedProducts";
import { ContactLensCategory } from "../components/ContactLensCategory";
import { UserPlus, ArrowRight } from "lucide-react";

/* ── Tipo del contexto del Outlet ─────────────────────────── */
interface OutletContext {
  textSize: number;
}

/* ── Componente principal ─────────────────────────────────── */
export function HomePage() {
  const { textSize } = useOutletContext<OutletContext>();

  return (
    /* Contenedor principal de la página de inicio */
    <main id="inicio">

      {/* ── Sección Hero ── */}
      <Hero textSize={textSize} />

      {/* ── Banner de registro para nuevos usuarios ── */}
      <section
        className="bg-gradient-to-r from-purple-800 via-purple-700 to-purple-900 py-10 px-6"
        aria-label="Registro de nuevos usuarios"
      >
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Texto informativo */}
          <div className="text-center sm:text-left">
            <p
              className="text-purple-200 text-sm mb-1"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              ¿Nuevo en LentSoft?
            </p>
            <h2
              className="text-white font-bold leading-tight"
              style={{
                fontSize: `${textSize * 1.5}rem`,
                fontFamily: "var(--font-primary)",
              }}
            >
              Si no tienes cuenta,{" "}
              <span className="text-yellow-300">regístrate aquí</span>
            </h2>
            <p
              className="text-purple-300 text-sm mt-1"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Accede a descuentos exclusivos, historial de citas y mucho más.
            </p>
          </div>

          {/* Botón de registro */}
          <Link
            to="/registro"
            className="flex-shrink-0 flex items-center gap-2 px-8 py-4 bg-white text-purple-800 font-bold rounded-2xl shadow-lg hover:bg-purple-50 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/50 group"
            style={{
              fontSize: `${textSize}rem`,
              fontFamily: "var(--font-secondary)",
            }}
            aria-label="Ir a la página de registro"
          >
            <UserPlus className="w-5 h-5" aria-hidden="true" />
            Registrarse
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>

      {/* ── Sección de características innovadoras ── */}
      <InnovativeFeature textSize={textSize} />

      {/* ── Sección de categorías de productos ── */}
      <Categories textSize={textSize} />

      {/* ── Sección de productos más vendidos ── */}
      <BestSellers textSize={textSize} />

      {/* ── Sección de productos con descuento ── */}
      <DiscountedProducts textSize={textSize} />

      {/* ── Sección de lentes de contacto ── */}
      <ContactLensCategory textSize={textSize} />

    </main>
  );
}
