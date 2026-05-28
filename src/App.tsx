import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import { AuthProvider } from "./controllers/contexts/AuthContext";
import { CartProvider } from "./controllers/contexts/CartContext";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          expand={false}
          richColors
          toastOptions={{
            style: {
              borderRadius: "16px",
              padding: "16px",
              fontFamily: "var(--font-secondary)",
            },
          }}
        />
      </CartProvider>
    </AuthProvider>
  );
}