import { Moon, Sun, Eye, Type, Settings, X } from "lucide-react";
import { useState } from "react";

interface AccessibilityPanelProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  textSize: number;
  setTextSize: (value: number) => void;
}

export function AccessibilityPanel({
  darkMode,
  setDarkMode,
  highContrast,
  setHighContrast,
  textSize,
  setTextSize,
}: AccessibilityPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const increaseTextSize = () => setTextSize(Math.min(textSize + 0.125, 1.5));
  const decreaseTextSize = () => setTextSize(Math.max(textSize - 0.125, 0.75));

  const dm = darkMode;

  return (
    <div className="relative flex flex-col items-end">
      {/* Floating Panel — opens upward */}
      <div
        className={[
          "mb-3 w-72 rounded-3xl shadow-2xl p-5 border-2 transition-all duration-300",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none",
          dm
            ? "bg-gray-900 border-gray-700 text-white"
            : "bg-white border-purple-200 text-purple-900",
        ].join(" ")}
        role="region"
        aria-label="Panel de accesibilidad"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold text-base ${dm ? "text-white" : "text-purple-900"}`}>
            Accesibilidad
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-1 rounded-lg transition-colors ${dm ? "hover:bg-gray-700 text-gray-400" : "hover:bg-purple-100 text-purple-400"}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="dark-mode-toggle"
              className={`flex items-center gap-2 text-sm cursor-pointer ${dm ? "text-gray-200" : "text-purple-700"}`}
            >
              {dm ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>Modo oscuro</span>
            </label>
            <button
              id="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex-shrink-0 ${dm ? "bg-purple-600" : "bg-purple-300"}`}
              role="switch"
              aria-checked={dm}
              aria-label="Alternar modo oscuro"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${dm ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="high-contrast-toggle"
              className={`flex items-center gap-2 text-sm cursor-pointer ${dm ? "text-gray-200" : "text-purple-700"}`}
            >
              <Eye className="w-4 h-4" />
              <span>Alto contraste</span>
            </label>
            <button
              id="high-contrast-toggle"
              onClick={() => setHighContrast(!highContrast)}
              className={`relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex-shrink-0 ${highContrast ? "bg-purple-600" : dm ? "bg-gray-600" : "bg-purple-300"}`}
              role="switch"
              aria-checked={highContrast}
              aria-label="Alternar alto contraste"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${highContrast ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>

          {/* Text Size */}
          <div className="flex items-center justify-between gap-4">
            <span className={`flex items-center gap-2 text-sm ${dm ? "text-gray-200" : "text-purple-700"}`}>
              <Type className="w-4 h-4" />
              Tamaño de texto
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseTextSize}
                disabled={textSize <= 0.75}
                className={`px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-40 disabled:cursor-not-allowed ${dm ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-purple-100 text-purple-900 hover:bg-purple-200"}`}
                aria-label="Disminuir texto"
              >
                A−
              </button>
              <span className={`text-xs font-mono w-8 text-center ${dm ? "text-gray-300" : "text-purple-600"}`}>
                {Math.round(textSize * 100)}%
              </span>
              <button
                onClick={increaseTextSize}
                disabled={textSize >= 1.5}
                className={`px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-40 disabled:cursor-not-allowed ${dm ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-purple-100 text-purple-900 hover:bg-purple-200"}`}
                aria-label="Aumentar texto"
              >
                A+
              </button>
            </div>
          </div>

          {/* Reset */}
          {(darkMode || highContrast || textSize !== 1) && (
            <button
              onClick={() => { setDarkMode(false); setHighContrast(false); setTextSize(1); }}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Restablecer
            </button>
          )}
        </div>
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 ${
          isOpen
            ? "bg-purple-700 scale-95"
            : "bg-purple-600 hover:bg-purple-700 hover:scale-110"
        } ${dm ? "shadow-purple-900/50" : "shadow-purple-500/30"}`}
        aria-label={isOpen ? "Cerrar accesibilidad" : "Abrir accesibilidad"}
        aria-expanded={isOpen}
      >
        <Settings className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
