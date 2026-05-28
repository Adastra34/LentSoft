import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AccessibilityPanel } from "../components/AccessibilityPanel";
import { CartSidebar } from "../components/CartSidebar";
import { Chatbot } from "../components/Chatbot";

export function RootLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState(1);

  return (
    <div 
      className={`
        min-h-screen transition-colors duration-300
        ${darkMode 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200'
        }
        ${highContrast && !darkMode ? 'contrast-125' : ''}
        ${highContrast && darkMode ? 'bg-black' : ''}
      `}
    >
      <Header textSize={textSize} />
      
      <Outlet context={{ textSize, highContrast }} />

      <Footer textSize={textSize} />

      <AccessibilityPanel
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        textSize={textSize}
        setTextSize={setTextSize}
      />

      <CartSidebar textSize={textSize} />

      <Chatbot />
    </div>
  );
}