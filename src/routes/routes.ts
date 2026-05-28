import { createHashRouter } from "react-router";
import { RootLayout } from "../views/pages/RootLayout";
import { HomePage } from "../views/pages/HomePage";
import { TiendaPage } from "../views/pages/TiendaPage";
import { NosotrosPage } from "../views/pages/NosotrosPage";
import { LoginPage } from "../views/pages/LoginPage";
import { RegistroPage } from "../views/pages/RegistroPage";
import { RecuperarContrasenaPage } from "../views/pages/RecuperarContrasenaPage";
import { ProductoPage } from "../views/pages/ProductoPage";
import { DashboardUsuarioPage } from "../views/pages/DashboardUsuarioPage";
import { DashboardAdminPage } from "../views/pages/DashboardAdminPage";
import { CategoryPage } from "../views/pages/CategoryPage";
import { CheckoutPage } from "../views/pages/CheckoutPage";
import { VirtualTryOnPage } from "../views/pages/VirtualTryOnPage";

export const router = createHashRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { 
        index: true, 
        Component: HomePage
      },
      { 
        path: "tienda", 
        Component: TiendaPage
      },
      { 
        path: "nosotros", 
        Component: NosotrosPage
      },
      { 
        path: "producto/:id", 
        Component: ProductoPage
      },
      {
        path: "categoria/:category",
        Component: CategoryPage
      },
      {
        path: "checkout",
        Component: CheckoutPage
      },
      {
        path: "prueba-virtual",
        Component: VirtualTryOnPage
      },
      {
        path: "dashboard",
        Component: DashboardUsuarioPage
      },
      { 
        path: "dashboard-admin", 
        Component: DashboardAdminPage
      },
      { 
        path: "login", 
        Component: LoginPage
      },
      { 
        path: "registro", 
        Component: RegistroPage
      },
      { 
        path: "recuperar-contrasena", 
        Component: RecuperarContrasenaPage
      },
    ],
  },
]);