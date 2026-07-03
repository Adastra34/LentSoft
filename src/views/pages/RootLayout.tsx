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
      className={[
        "min-h-screen transition-colors duration-300",
        darkMode
          ? "dark bg-gray-950"
          : "bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200",
        highContrast && !darkMode ? "contrast-125" : "",
        highContrast && darkMode ? "!bg-black" : "",
      ].join(" ")}
    >
      <Header textSize={textSize} darkMode={darkMode} />

      <Outlet context={{ textSize, highContrast, darkMode }} />

      <Footer textSize={textSize} />

      {/* Stacked FAB group — accessibility bottom, chatbot above */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col-reverse items-end gap-3">
        <AccessibilityPanel
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          textSize={textSize}
          setTextSize={setTextSize}
        />
        <Chatbot />
      </div>

      <CartSidebar textSize={textSize} />
    </div>
  );
}
