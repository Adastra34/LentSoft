import { RouterProvider } from "react-router";
import { router } from "../routes/routes";
import { AuthProvider } from "../controllers/contexts/AuthContext";
import { CartProvider } from "../controllers/contexts/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}