import { Moon, Sun, Eye, Type, Settings } from "lucide-react";
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
  setTextSize
}: AccessibilityPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const increaseTextSize = () => {
    if (textSize < 1.5) {
      setTextSize(Math.min(textSize + 0.125, 1.5));
    }
  };

  const decreaseTextSize = () => {
    if (textSize > 0.75) {
      setTextSize(Math.max(textSize - 0.125, 0.75));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Panel */}
      <div 
        className={`
          mb-4 bg-white rounded-3xl shadow-2xl p-4 md:p-6 transition-all duration-300 border-2 border-purple-200 max-w-[calc(100vw-2rem)] md:max-w-sm
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
        `}
        role="region"
        aria-label="Panel de accesibilidad"
      >
        <h3 className="text-base md:text-lg text-purple-900 mb-4 font-semibold">Accesibilidad</h3>
        
        <div className="space-y-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="dark-mode-toggle" className="text-purple-700 flex items-center gap-2 text-sm md:text-base">
              {darkMode ? <Moon className="w-5 h-5" aria-hidden="true" /> : <Sun className="w-5 h-5" aria-hidden="true" />}
              <span>Modo oscuro</span>
            </label>
            <button
              id="dark-mode-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setDarkMode(!darkMode);
              }}
              className={`
                relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex-shrink-0
                ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}
              `}
              role="switch"
              aria-checked={darkMode}
              aria-label="Alternar modo oscuro"
            >
              <span 
                className={`
                  absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300
                  ${darkMode ? 'translate-x-6' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="high-contrast-toggle" className="text-purple-700 flex items-center gap-2 text-sm md:text-base">
              <Eye className="w-5 h-5" aria-hidden="true" />
              <span>Alto contraste</span>
            </label>
            <button
              id="high-contrast-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setHighContrast(!highContrast);
              }}
              className={`
                relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex-shrink-0
                ${highContrast ? 'bg-purple-600' : 'bg-purple-300'}
              `}
              role="switch"
              aria-checked={highContrast}
              aria-label="Alternar alto contraste"
            >
              <span 
                className={`
                  absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300
                  ${highContrast ? 'translate-x-6' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          {/* Text Size Controls */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-purple-700 flex items-center gap-2 text-sm md:text-base">
              <Type className="w-5 h-5" aria-hidden="true" />
              <span>Tamaño de texto</span>
            </label>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseTextSize();
                }}
                className="px-3 py-2 bg-purple-100 text-purple-900 rounded-xl hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={textSize <= 0.75}
                aria-label="Disminuir tamaño de texto"
              >
                A-
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  increaseTextSize();
                }}
                className="px-3 py-2 bg-purple-100 text-purple-900 rounded-xl hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={textSize >= 1.5}
                aria-label="Aumentar tamaño de texto"
              >
                A+
              </button>
            </div>
          </div>

          {/* Reset Button */}
          {(darkMode || highContrast || textSize !== 1) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDarkMode(false);
                setHighContrast(false);
                setTextSize(1);
              }}
              className="w-full py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-sm md:text-base"
              aria-label="Restablecer configuración de accesibilidad"
            >
              Restablecer
            </button>
          )}
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 bg-purple-600 text-white rounded-full shadow-2xl hover:bg-purple-700 hover:scale-110 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2"
        aria-label={isOpen ? "Cerrar panel de accesibilidad" : "Abrir panel de accesibilidad"}
        aria-expanded={isOpen}
      >
        <Settings className="w-7 h-7 md:w-8 md:h-8" aria-hidden="true" />
      </button>
    </div>
  );
}