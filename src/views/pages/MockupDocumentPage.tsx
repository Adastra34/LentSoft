import { Printer, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import logoLentSoft from "@/imports/Logo_LentSoft.png";

// ─── Design tokens (from the actual project) ────────────────────────────────
const PALETTE = {
  primarios: [
    { name: "Primario Principal", hex: "#7C3AED", label: "purple-600" },
    { name: "Primario Oscuro",    hex: "#5B21B6", label: "purple-800" },
    { name: "Primario Profundo",  hex: "#3B0764", label: "purple-950" },
    { name: "Primario Medio",     hex: "#9333EA", label: "purple-700" },
  ],
  degradados: [
    { name: "Fondo Suave",    hex: "#FAF5FF", label: "purple-50" },
    { name: "Fondo Claro",   hex: "#F3E8FF", label: "purple-100" },
    { name: "Superficie",    hex: "#E9D5FF", label: "purple-200" },
    { name: "Acento Claro",  hex: "#D8B4FE", label: "purple-300" },
  ],
  semanticos: [
    { name: "Éxito",        hex: "#22C55E", label: "green-500" },
    { name: "Advertencia",  hex: "#F59E0B", label: "amber-500" },
    { name: "Error",        hex: "#D4183D", label: "destructive" },
    { name: "Información",  hex: "#3B82F6", label: "blue-500" },
  ],
  negativos: [
    { name: "Texto Principal", hex: "#1F1F2E", label: "gray-900" },
    { name: "Texto Muted",     hex: "#717182", label: "muted-fg" },
    { name: "Borde",           hex: "#ECECF0", label: "muted" },
    { name: "Fondo Base",      hex: "#FFFFFF", label: "white" },
  ],
};

// ─── Mini screen mockups ─────────────────────────────────────────────────────
function MiniNav({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-3 py-1.5 ${light ? "bg-white border-b border-purple-100" : "bg-purple-900"}`}>
      <span className={`text-[7px] font-bold ${light ? "text-purple-900" : "text-white"}`}>LentSoft</span>
      <div className="flex gap-1.5">
        {["Inicio","Tienda","Nosotros"].map(l => (
          <span key={l} className={`text-[5px] ${light ? "text-purple-700" : "text-purple-200"}`}>{l}</span>
        ))}
      </div>
      <div className={`w-4 h-1.5 rounded-full ${light ? "bg-purple-600" : "bg-purple-400"}`} />
    </div>
  );
}

function MiniFooter() {
  return (
    <div className="bg-purple-950 px-3 py-1.5 flex justify-between items-center mt-auto">
      <span className="text-[5px] text-purple-300">LentSoft © 2026</span>
      <div className="flex gap-2">
        {["Tienda","Contacto","Política"].map(l => (
          <span key={l} className="text-[4px] text-purple-400">{l}</span>
        ))}
      </div>
    </div>
  );
}

function ScreenShell({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className="flex flex-col">
      <div className="bg-gray-200 rounded-t-lg px-3 py-1 flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <div className="flex-1 bg-white rounded text-[5px] text-gray-400 px-2 py-0.5 ml-2 text-center">lentsoft.com/{title.toLowerCase().replace(/ /g, "-")}</div>
      </div>
      <div className={`border border-gray-200 rounded-b-lg overflow-hidden flex flex-col ${className}`} style={{ minHeight: 160 }}>
        {children}
      </div>
    </div>
  );
}

// Individual page mockups
function MockupHome() {
  return (
    <ScreenShell title="inicio">
      <MiniNav />
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 px-4 py-4 text-white">
        <div className="text-[9px] font-bold mb-1">Encuentra los lentes perfectos para ti</div>
        <div className="text-[6px] text-purple-200 mb-2">Tecnología AR para probar marcos virtuales</div>
        <div className="flex gap-2">
          <div className="bg-white text-purple-700 text-[5px] font-bold px-2 py-0.5 rounded-full">Ver Tienda</div>
          <div className="border border-white text-white text-[5px] px-2 py-0.5 rounded-full">Prueba Virtual</div>
        </div>
      </div>
      {/* Categories row */}
      <div className="bg-purple-50 px-3 py-2">
        <div className="text-[6px] font-semibold text-purple-900 mb-1.5">Categorías</div>
        <div className="flex gap-1.5">
          {["Monturas","Lentes Sol","Lentes Contacto","Accesorios"].map(c => (
            <div key={c} className="bg-white rounded-lg px-2 py-1 text-[5px] text-purple-700 shadow-sm border border-purple-100">{c}</div>
          ))}
        </div>
      </div>
      {/* Products row */}
      <div className="bg-white px-3 py-2 flex-1">
        <div className="text-[6px] font-semibold text-purple-900 mb-1.5">Más Vendidos</div>
        <div className="flex gap-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex-1 bg-purple-50 rounded-lg p-1.5 border border-purple-100">
              <div className="w-full h-6 bg-purple-200 rounded mb-1" />
              <div className="h-1.5 bg-purple-300 rounded mb-0.5 w-3/4" />
              <div className="h-1 bg-purple-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
      <MiniFooter />
    </ScreenShell>
  );
}

function MockupTienda() {
  return (
    <ScreenShell title="tienda">
      <MiniNav />
      <div className="flex flex-1 bg-gray-50">
        {/* Sidebar filters */}
        <div className="w-16 bg-white border-r border-purple-100 p-2 flex-shrink-0">
          <div className="text-[6px] font-bold text-purple-900 mb-1.5">Filtros</div>
          {["Monturas","Precio","Marca","Material"].map(f => (
            <div key={f} className="mb-1.5">
              <div className="text-[5px] font-semibold text-purple-700 mb-0.5">{f}</div>
              <div className="w-full h-1 bg-purple-100 rounded" />
            </div>
          ))}
        </div>
        {/* Grid */}
        <div className="flex-1 p-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[6px] font-semibold text-purple-900">48 productos</div>
            <div className="bg-purple-100 text-purple-700 text-[5px] px-1.5 py-0.5 rounded">Ordenar ▾</div>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-lg border border-purple-100 p-1">
                <div className="w-full h-8 bg-purple-100 rounded mb-1" />
                <div className="h-1.5 bg-purple-200 rounded mb-0.5 w-3/4" />
                <div className="h-1 bg-purple-100 rounded w-1/2 mb-0.5" />
                <div className="h-1 bg-purple-600 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <MiniFooter />
    </ScreenShell>
  );
}

function MockupProducto() {
  return (
    <ScreenShell title="producto/:id">
      <MiniNav />
      <div className="flex-1 bg-white p-3 flex gap-3">
        {/* Image gallery */}
        <div className="w-24 flex-shrink-0">
          <div className="w-full h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl mb-1.5" />
          <div className="flex gap-1">
            {[1,2,3].map(i => <div key={i} className="flex-1 h-6 bg-purple-100 rounded" />)}
          </div>
        </div>
        {/* Details */}
        <div className="flex-1">
          <div className="h-2.5 bg-purple-900 rounded w-3/4 mb-1" />
          <div className="h-1.5 bg-purple-300 rounded w-1/2 mb-2" />
          <div className="flex gap-2 mb-2">
            <div className="h-2 bg-purple-700 rounded w-16" />
            <div className="h-2 bg-green-200 rounded w-10" />
          </div>
          <div className="space-y-1 mb-2">
            {["Estilo","Tamaño","Material","Garantía"].map(a => (
              <div key={a} className="flex gap-2">
                <div className="text-[5px] text-purple-600 w-10">{a}:</div>
                <div className="h-1 bg-purple-100 rounded flex-1 mt-0.5" />
              </div>
            ))}
          </div>
          <div className="flex gap-1.5">
            <div className="bg-purple-600 text-white text-[5px] px-2 py-1 rounded-lg">Añadir al carrito</div>
            <div className="border border-purple-300 text-purple-700 text-[5px] px-2 py-1 rounded-lg">Prueba Virtual</div>
          </div>
        </div>
      </div>
      <MiniFooter />
    </ScreenShell>
  );
}

function MockupCheckout() {
  return (
    <ScreenShell title="checkout">
      <MiniNav />
      <div className="flex-1 bg-purple-50 p-3 flex gap-3">
        {/* Form */}
        <div className="flex-1 bg-white rounded-xl p-2 border border-purple-100">
          <div className="text-[7px] font-bold text-purple-900 mb-2">Datos de Entrega</div>
          {["Nombre completo","Correo electrónico","Teléfono","Dirección"].map(f => (
            <div key={f} className="mb-1.5">
              <div className="text-[5px] text-purple-700 mb-0.5">{f}</div>
              <div className="w-full h-2.5 bg-purple-50 border border-purple-200 rounded" />
            </div>
          ))}
          <div className="text-[7px] font-bold text-purple-900 mt-2 mb-1.5">Método de Pago</div>
          <div className="flex gap-1.5">
            {["Tarjeta","PSE","Efecty"].map(m => (
              <div key={m} className="flex-1 border-2 border-purple-200 rounded-lg p-1 text-center text-[5px] text-purple-700">{m}</div>
            ))}
          </div>
        </div>
        {/* Summary */}
        <div className="w-24 flex-shrink-0 bg-white rounded-xl p-2 border border-purple-100">
          <div className="text-[7px] font-bold text-purple-900 mb-2">Resumen</div>
          {[1,2].map(i => (
            <div key={i} className="flex gap-1 mb-1">
              <div className="w-6 h-4 bg-purple-100 rounded flex-shrink-0" />
              <div className="flex-1"><div className="h-1 bg-purple-200 rounded mb-0.5" /><div className="h-1 bg-purple-100 rounded w-2/3" /></div>
            </div>
          ))}
          <div className="border-t border-purple-100 mt-1 pt-1">
            <div className="flex justify-between text-[5px] text-purple-700"><span>Subtotal</span><span>$xxx</span></div>
            <div className="flex justify-between text-[5px] text-purple-700"><span>IVA 19%</span><span>$xxx</span></div>
            <div className="flex justify-between text-[6px] font-bold text-purple-900 mt-0.5"><span>Total</span><span>$xxx</span></div>
          </div>
          <div className="mt-1.5 w-full bg-purple-600 text-white text-[5px] text-center py-1 rounded-lg">Confirmar Pedido</div>
        </div>
      </div>
      <MiniFooter />
    </ScreenShell>
  );
}

function MockupLogin() {
  return (
    <ScreenShell title="login">
      <div className="flex-1 bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 w-36">
          <div className="text-center mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full mx-auto mb-1.5" />
            <div className="text-[7px] font-bold text-purple-900">LentSoft</div>
            <div className="text-[5px] text-purple-600">Iniciar Sesión</div>
          </div>
          {["Correo electrónico","Contraseña"].map(f => (
            <div key={f} className="mb-1.5">
              <div className="text-[5px] text-purple-700 mb-0.5">{f}</div>
              <div className="w-full h-2.5 bg-purple-50 border border-purple-200 rounded" />
            </div>
          ))}
          <div className="w-full bg-purple-600 text-white text-[5px] text-center py-1 rounded-lg mt-2">Ingresar</div>
          <div className="text-[4px] text-purple-500 text-center mt-1.5">¿No tienes cuenta? <span className="font-bold">Regístrate</span></div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MockupRegistro() {
  return (
    <ScreenShell title="registro">
      <div className="flex-1 bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 w-44">
          <div className="text-center mb-3">
            <div className="text-[7px] font-bold text-purple-900">Crear Cuenta</div>
            <div className="text-[5px] text-purple-600">Únete a LentSoft</div>
          </div>
          <div className="grid grid-cols-2 gap-1 mb-1">
            {["Nombre","Apellido"].map(f => (
              <div key={f}>
                <div className="text-[4px] text-purple-700 mb-0.5">{f}</div>
                <div className="w-full h-2.5 bg-purple-50 border border-purple-200 rounded" />
              </div>
            ))}
          </div>
          {["Correo electrónico","Contraseña","Confirmar Contraseña"].map(f => (
            <div key={f} className="mb-1">
              <div className="text-[4px] text-purple-700 mb-0.5">{f}</div>
              <div className="w-full h-2.5 bg-purple-50 border border-purple-200 rounded" />
            </div>
          ))}
          <div className="w-full bg-purple-600 text-white text-[5px] text-center py-1 rounded-lg mt-1.5">Registrarse</div>
          <div className="text-[4px] text-purple-500 text-center mt-1">¿Ya tienes cuenta? <span className="font-bold">Inicia sesión</span></div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MockupRecuperar() {
  return (
    <ScreenShell title="recuperar-contrasena">
      <div className="flex-1 bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 w-36 text-center">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <div className="w-4 h-4 bg-purple-600 rounded" />
          </div>
          <div className="text-[7px] font-bold text-purple-900 mb-0.5">Recuperar Contraseña</div>
          <div className="text-[4px] text-purple-600 mb-2">Te enviaremos un enlace a tu correo</div>
          <div className="text-[4px] text-purple-700 mb-0.5 text-left">Correo electrónico</div>
          <div className="w-full h-2.5 bg-purple-50 border border-purple-200 rounded mb-2" />
          <div className="w-full bg-purple-600 text-white text-[5px] py-1 rounded-lg">Enviar enlace</div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MockupNosotros() {
  return (
    <ScreenShell title="nosotros">
      <MiniNav />
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 px-4 py-3 text-white">
        <div className="text-[8px] font-bold mb-0.5">Sobre LentSoft</div>
        <div className="text-[5px] text-purple-200">Innovación en salud visual desde 2020</div>
      </div>
      <div className="flex-1 bg-white p-3">
        <div className="grid grid-cols-3 gap-2 mb-2">
          {[["🏆","Excelencia"],["👁️","Visión"],["💜","Cuidado"]].map(([ic, t]) => (
            <div key={t} className="bg-purple-50 rounded-xl p-1.5 text-center">
              <div className="text-[10px] mb-0.5">{ic}</div>
              <div className="text-[5px] font-semibold text-purple-900">{t}</div>
            </div>
          ))}
        </div>
        <div className="text-[6px] font-bold text-purple-900 mb-1">Nuestra Historia</div>
        <div className="space-y-0.5 mb-2">
          {[1,2,3].map(i => <div key={i} className="h-1 bg-purple-100 rounded" />)}
        </div>
        <div className="flex gap-2">
          {[["500+","Clientes"],["98%","Satisfacción"],["10+","Marcas"]].map(([n, l]) => (
            <div key={l} className="flex-1 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-1.5 text-center text-white">
              <div className="text-[8px] font-bold">{n}</div>
              <div className="text-[4px] text-purple-200">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <MiniFooter />
    </ScreenShell>
  );
}

function MockupVirtualTryOn() {
  return (
    <ScreenShell title="prueba-virtual">
      <MiniNav />
      <div className="flex-1 bg-gradient-to-br from-purple-50 to-white p-3">
        <div className="text-[7px] font-bold text-purple-900 mb-2">Catálogo y Vista de Marcos</div>
        <div className="flex gap-2">
          {/* Camera panel */}
          <div className="flex-1 bg-white rounded-xl border border-purple-100 p-2">
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[6px] font-bold text-purple-900">Vista Previa AR</div>
              <div className="bg-purple-600 text-white text-[4px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                ✦ AR Activo
              </div>
            </div>
            <div className="w-full h-20 bg-purple-900 rounded-xl relative overflow-hidden">
              {/* Simulated face */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-12 rounded-full bg-purple-700/40" />
              </div>
              {/* Frame overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-1" style={{ marginTop: -8 }}>
                  <div className="w-7 h-4 border-2 border-purple-300 rounded-lg bg-purple-400/20" />
                  <div className="w-2 h-0.5 bg-purple-300" />
                  <div className="w-7 h-4 border-2 border-purple-300 rounded-lg bg-purple-400/20" />
                </div>
              </div>
              <div className="absolute top-1 left-1 bg-purple-500 text-white text-[4px] px-1 py-0.5 rounded-full">Modo Demo</div>
            </div>
          </div>
          {/* Catalog */}
          <div className="w-28 flex-shrink-0 bg-white rounded-xl border border-purple-100 p-1.5">
            <div className="text-[6px] font-bold text-purple-900 mb-1">Marcos</div>
            <div className="grid grid-cols-2 gap-1">
              {["Aviador","Wayfarer","Redondo","Cat Eye","Deportivo","Cuadrado"].map(f => (
                <div key={f} className="bg-purple-50 rounded-lg p-1 text-center border border-purple-100">
                  <div className="w-full h-5 bg-purple-200 rounded mb-0.5" />
                  <div className="text-[4px] text-purple-800">{f}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MiniFooter />
    </ScreenShell>
  );
}

function MockupDashboardUsuario() {
  return (
    <ScreenShell title="dashboard">
      <MiniNav />
      <div className="flex-1 bg-gradient-to-br from-purple-50 to-white p-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full" />
          <div>
            <div className="text-[7px] font-bold text-purple-900">Bienvenido, Usuario</div>
            <div className="text-[5px] text-purple-600">Mi Panel Personal</div>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 mb-2 border-b border-purple-100 pb-1">
          {["Citas","Pedidos","Favoritos","Recetas","Perfil"].map((t, i) => (
            <div key={t} className={`text-[5px] px-1.5 py-0.5 rounded-t ${i === 0 ? "bg-purple-600 text-white" : "text-purple-600"}`}>{t}</div>
          ))}
        </div>
        {/* Appointment cards */}
        <div className="space-y-1.5">
          {[["Revisión anual","10 Jul 2026","10:00 AM"],["Control de lentes","24 Jul 2026","3:00 PM"]].map(([desc, date, time]) => (
            <div key={desc} className="bg-white rounded-xl p-2 border border-purple-100 flex items-center gap-2 shadow-sm">
              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center text-[8px]">📅</div>
              <div className="flex-1">
                <div className="text-[6px] font-semibold text-purple-900">{desc}</div>
                <div className="text-[4px] text-purple-600">{date} — {time}</div>
              </div>
              <div className="text-[4px] text-green-600 bg-green-50 px-1 py-0.5 rounded-full">Confirmada</div>
            </div>
          ))}
        </div>
      </div>
      <MiniFooter />
    </ScreenShell>
  );
}

function MockupDashboardAdmin() {
  return (
    <ScreenShell title="dashboard-admin" className="min-h-[200px]">
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-20 bg-purple-900 flex flex-col flex-shrink-0">
          <div className="px-2 py-2 border-b border-purple-700">
            <div className="text-[6px] font-bold text-white">LentSoft</div>
            <div className="text-[4px] text-purple-300">Panel Admin</div>
          </div>
          <nav className="flex-1 p-1.5 space-y-0.5">
            {["General","Inventario","Ventas","Citas","Usuarios","Trabajadores","Facturas"].map((m, i) => (
              <div key={m} className={`text-[5px] px-1.5 py-1 rounded-md flex items-center gap-1 ${i === 1 ? "bg-purple-600 text-white" : "text-purple-300 hover:text-white"}`}>
                <div className="w-1.5 h-1.5 rounded-sm bg-current opacity-70" />
                {m}
              </div>
            ))}
          </nav>
        </div>
        {/* Main */}
        <div className="flex-1 bg-gray-50 overflow-hidden">
          {/* Sub-nav */}
          <div className="bg-white border-b border-purple-100 px-3 py-1.5 flex items-center gap-2">
            <div className="text-[7px] font-bold text-purple-900">Inventario</div>
            <div className="flex gap-1 ml-2">
              {["Productos","Proveedores","Historial"].map((s, i) => (
                <div key={s} className={`text-[5px] px-1.5 py-0.5 rounded-full ${i === 0 ? "bg-purple-600 text-white" : "text-purple-600 border border-purple-200"}`}>{s}</div>
              ))}
            </div>
            <div className="ml-auto bg-purple-600 text-white text-[5px] px-2 py-0.5 rounded-lg">+ Nuevo</div>
          </div>
          {/* Table */}
          <div className="p-2">
            <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
              <div className="flex gap-0 border-b border-purple-100">
                {["Producto","Categoría","Stock","Precio","Acciones"].map(h => (
                  <div key={h} className={`flex-1 text-[5px] text-purple-700 font-semibold px-1.5 py-1 bg-purple-50 ${h === "Acciones" ? "w-12 flex-none" : ""}`}>{h}</div>
                ))}
              </div>
              {[1,2,3,4,5].map(i => (
                <div key={i} className="flex gap-0 border-b border-purple-50">
                  <div className="flex-1 flex items-center gap-1 px-1.5 py-1">
                    <div className="w-4 h-3 bg-purple-100 rounded flex-shrink-0" />
                    <div className="h-1.5 bg-purple-100 rounded w-3/4" />
                  </div>
                  <div className="flex-1 px-1.5 py-1 flex items-center"><div className="h-1.5 bg-purple-100 rounded w-2/3" /></div>
                  <div className="flex-1 px-1.5 py-1 flex items-center"><div className="h-1.5 bg-green-100 rounded w-1/2" /></div>
                  <div className="flex-1 px-1.5 py-1 flex items-center"><div className="h-1.5 bg-purple-200 rounded w-2/3" /></div>
                  <div className="w-12 flex-none px-1.5 py-1 flex items-center gap-0.5">
                    <div className="w-3 h-2 bg-blue-100 rounded" />
                    <div className="w-3 h-2 bg-red-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MockupAdminVentas() {
  return (
    <ScreenShell title="dashboard-admin/ventas" className="min-h-[200px]">
      <div className="flex flex-1 min-h-0">
        <div className="w-20 bg-purple-900 flex-shrink-0 p-1.5">
          <div className="text-[6px] font-bold text-white mb-1.5">LentSoft</div>
          {["General","Inventario","Ventas","Citas","Usuarios","Trabajadores","Facturas"].map((m, i) => (
            <div key={m} className={`text-[5px] px-1 py-0.5 rounded mb-0.5 ${i === 2 ? "bg-purple-600 text-white" : "text-purple-300"}`}>{m}</div>
          ))}
        </div>
        <div className="flex-1 bg-gray-50">
          <div className="bg-white border-b border-purple-100 px-3 py-1.5">
            <div className="text-[7px] font-bold text-purple-900">Módulo de Ventas</div>
          </div>
          <div className="p-2">
            {/* Stats row */}
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {[["$12.5M","Ventas Hoy"],["47","Transacciones"],["$266k","Ticket Prom."],["98%","Aprobadas"]].map(([v, l]) => (
                <div key={l} className="bg-white rounded-xl p-1.5 border border-purple-100 text-center">
                  <div className="text-[7px] font-bold text-purple-900">{v}</div>
                  <div className="text-[4px] text-purple-600">{l}</div>
                </div>
              ))}
            </div>
            {/* Table */}
            <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
              <div className="flex border-b border-purple-100 bg-purple-50">
                {["#","Cliente","Producto","Total","Estado"].map(h => (
                  <div key={h} className="flex-1 text-[5px] text-purple-700 font-semibold px-1.5 py-1">{h}</div>
                ))}
              </div>
              {[1,2,3,4].map(i => (
                <div key={i} className="flex border-b border-purple-50">
                  {[1,2,3,4].map(j => (
                    <div key={j} className="flex-1 px-1.5 py-1"><div className="h-1.5 bg-purple-100 rounded" /></div>
                  ))}
                  <div className="flex-1 px-1.5 py-1"><div className="h-1.5 bg-green-100 rounded w-2/3" /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MockupAdminCitas() {
  return (
    <ScreenShell title="dashboard-admin/citas" className="min-h-[200px]">
      <div className="flex flex-1 min-h-0">
        <div className="w-20 bg-purple-900 flex-shrink-0 p-1.5">
          <div className="text-[6px] font-bold text-white mb-1.5">LentSoft</div>
          {["General","Inventario","Ventas","Citas","Usuarios","Trabajadores","Facturas"].map((m, i) => (
            <div key={m} className={`text-[5px] px-1 py-0.5 rounded mb-0.5 ${i === 3 ? "bg-purple-600 text-white" : "text-purple-300"}`}>{m}</div>
          ))}
        </div>
        <div className="flex-1 bg-gray-50">
          <div className="bg-white border-b border-purple-100 px-3 py-1.5 flex items-center justify-between">
            <div className="text-[7px] font-bold text-purple-900">Gestión de Citas — Julio 2026</div>
            <div className="flex gap-1">
              {["Año","Mes","Semana","Día"].map(v => (
                <div key={v} className="text-[4px] px-1 py-0.5 border border-purple-200 rounded text-purple-600">{v}</div>
              ))}
            </div>
          </div>
          <div className="p-2 flex gap-2">
            {/* Calendar grid */}
            <div className="flex-1 bg-white rounded-xl border border-purple-100 p-1.5">
              <div className="grid grid-cols-7 gap-0.5 mb-1">
                {["L","M","M","J","V","S","D"].map((d, i) => (
                  <div key={i} className="text-center text-[4px] text-purple-400 font-semibold">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                  <div key={d} className={`text-center text-[4px] py-0.5 rounded ${
                    [3,8,15,22,24].includes(d) ? "bg-purple-600 text-white font-bold" :
                    [10,17].includes(d) ? "bg-purple-200 text-purple-800" :
                    "text-gray-500"
                  }`}>{d}</div>
                ))}
              </div>
            </div>
            {/* Detail panel */}
            <div className="w-24 flex-shrink-0 bg-white rounded-xl border border-purple-100 p-1.5">
              <div className="text-[5px] font-bold text-purple-900 mb-1">Citas — 15 Jul</div>
              {[["9:00","García, J."],["11:00","López, M."],["3:00","Pérez, A."]].map(([h, n]) => (
                <div key={h} className="bg-purple-50 rounded-lg p-1 mb-1 border-l-2 border-purple-600">
                  <div className="text-[4px] font-bold text-purple-900">{h} AM</div>
                  <div className="text-[4px] text-purple-700">{n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MockupAdminUsuarios() {
  return (
    <ScreenShell title="dashboard-admin/usuarios" className="min-h-[200px]">
      <div className="flex flex-1 min-h-0">
        <div className="w-20 bg-purple-900 flex-shrink-0 p-1.5">
          <div className="text-[6px] font-bold text-white mb-1.5">LentSoft</div>
          {["General","Inventario","Ventas","Citas","Usuarios","Trabajadores","Facturas"].map((m, i) => (
            <div key={m} className={`text-[5px] px-1 py-0.5 rounded mb-0.5 ${i === 4 ? "bg-purple-600 text-white" : "text-purple-300"}`}>{m}</div>
          ))}
        </div>
        <div className="flex-1 bg-gray-50">
          <div className="bg-white border-b border-purple-100 px-3 py-1.5">
            <div className="text-[7px] font-bold text-purple-900">Gestión de Usuarios y Permisos</div>
          </div>
          <div className="p-2">
            <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
              <div className="flex border-b border-purple-100 bg-purple-50">
                {["Usuario","Email","Rol","Permisos","Estado"].map(h => (
                  <div key={h} className="flex-1 text-[5px] text-purple-700 font-semibold px-1.5 py-1">{h}</div>
                ))}
              </div>
              {[["Administrador","bg-purple-600"],["Vendedor","bg-blue-500"],["Trabajador","bg-green-500"],["Solo Lectura","bg-gray-400"]].map(([role, color]) => (
                <div key={role} className="flex border-b border-purple-50 items-center">
                  <div className="flex-1 flex items-center gap-1 px-1.5 py-1">
                    <div className="w-3 h-3 bg-purple-200 rounded-full flex-shrink-0" />
                    <div className="h-1.5 bg-purple-100 rounded flex-1" />
                  </div>
                  <div className="flex-1 px-1.5 py-1"><div className="h-1.5 bg-purple-100 rounded w-3/4" /></div>
                  <div className="flex-1 px-1.5 py-1">
                    <div className={`text-[4px] text-white ${color} px-1.5 py-0.5 rounded-full inline-block`}>{role}</div>
                  </div>
                  <div className="flex-1 px-1.5 py-1 flex gap-0.5">
                    {[1,2,3].map(p => <div key={p} className="w-2 h-1 bg-purple-200 rounded" />)}
                  </div>
                  <div className="flex-1 px-1.5 py-1"><div className="h-1.5 bg-green-100 rounded w-1/2" /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MockupAdminGeneral() {
  return (
    <ScreenShell title="dashboard-admin/general" className="min-h-[200px]">
      <div className="flex flex-1 min-h-0">
        <div className="w-20 bg-purple-900 flex-shrink-0 p-1.5">
          <div className="text-[6px] font-bold text-white mb-1.5">LentSoft</div>
          {["General","Inventario","Ventas","Citas","Usuarios","Trabajadores","Facturas"].map((m, i) => (
            <div key={m} className={`text-[5px] px-1 py-0.5 rounded mb-0.5 ${i === 0 ? "bg-purple-600 text-white" : "text-purple-300"}`}>{m}</div>
          ))}
        </div>
        <div className="flex-1 bg-gray-50 p-2">
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {[["$45.2M","Ventas Mes"],["234","Clientes"],["89","Citas"],["97%","Satisfacción"]].map(([v, l]) => (
              <div key={l} className="bg-white rounded-xl p-1.5 border border-purple-100 text-center shadow-sm">
                <div className="text-[8px] font-bold text-purple-900">{v}</div>
                <div className="text-[4px] text-purple-600">{l}</div>
              </div>
            ))}
          </div>
          {/* Chart placeholder */}
          <div className="bg-white rounded-xl border border-purple-100 p-2 mb-1.5">
            <div className="text-[6px] font-bold text-purple-900 mb-1">Ventas por Mes</div>
            <div className="flex items-end gap-1 h-12">
              {[40,65,45,80,60,90,55,75,85,70,95,100].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-purple-700 to-purple-400 rounded-t opacity-80" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-0.5">
              {["Ene","Mar","May","Jul","Sep","Nov"].map(m => (
                <span key={m} className="text-[4px] text-purple-400">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

// ─── NEW: Mockup Registro Actualizado ───────────────────────────────────────
function MockupRegistroNuevo() {
  return (
    <ScreenShell title="registro">
      <div className="flex-1 bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-3">
        <div className="bg-white rounded-2xl shadow-lg w-56 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-700 to-purple-900 px-4 py-3 text-center">
            <div className="text-[8px] font-bold text-white">Crear cuenta</div>
            <div className="text-[5px] text-purple-200">Únete a LentSoft</div>
          </div>
          <div className="p-3 space-y-1.5">
            {/* Documento */}
            <div className="text-[5px] font-semibold text-purple-800 uppercase">Documento</div>
            <div className="grid grid-cols-2 gap-1">
              <div><div className="text-[4px] text-purple-700 mb-0.5">Tipo doc. *</div><div className="h-3 bg-purple-50 border border-purple-200 rounded text-[4px] text-purple-400 flex items-center px-1">CC ▾</div></div>
              <div><div className="text-[4px] text-purple-700 mb-0.5">Número *</div><div className="h-3 bg-purple-50 border border-purple-200 rounded" /></div>
            </div>
            {/* Personales */}
            <div className="text-[5px] font-semibold text-purple-800 uppercase mt-1">Datos personales</div>
            <div className="grid grid-cols-2 gap-1">
              <div><div className="text-[4px] text-purple-700 mb-0.5">Nombre *</div><div className="h-3 bg-purple-50 border border-purple-200 rounded" /></div>
              <div><div className="text-[4px] text-purple-700 mb-0.5">Apellido *</div><div className="h-3 bg-purple-50 border border-purple-200 rounded" /></div>
            </div>
            {/* Contacto */}
            <div className="text-[5px] font-semibold text-purple-800 uppercase mt-1">Contacto</div>
            <div><div className="text-[4px] text-purple-700 mb-0.5">Teléfono *</div><div className="h-3 bg-purple-50 border border-purple-200 rounded" /></div>
            <div><div className="text-[4px] text-purple-700 mb-0.5">Correo electrónico *</div><div className="h-3 bg-purple-50 border border-purple-200 rounded" /></div>
            {/* Contraseña */}
            <div className="text-[5px] font-semibold text-purple-800 uppercase mt-1">Contraseña</div>
            <div><div className="text-[4px] text-purple-700 mb-0.5">Contraseña *</div><div className="h-3 bg-purple-50 border border-purple-200 rounded" /></div>
            <div><div className="text-[4px] text-purple-700 mb-0.5">Confirmar contraseña *</div><div className="h-3 bg-purple-50 border border-purple-200 rounded" /></div>
            <div className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white text-[5px] text-center py-1.5 rounded-xl mt-1">Crear cuenta</div>
            <div className="text-center text-[4px] text-purple-500">¿Ya tienes cuenta? <span className="font-bold">Iniciar sesión</span></div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

// ─── NEW: Home con banner de registro ───────────────────────────────────────
function MockupHomeConBanner() {
  return (
    <ScreenShell title="inicio">
      <MiniNav />
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 px-3 py-3 text-white">
        <div className="text-[8px] font-bold mb-0.5">Encuentra los lentes perfectos para ti</div>
        <div className="text-[5px] text-purple-200 mb-1.5">Tecnología AR para probar marcos virtuales</div>
        <div className="flex gap-1.5">
          <div className="bg-white text-purple-700 text-[4px] font-bold px-2 py-0.5 rounded-full">Ver Tienda</div>
          <div className="border border-white text-white text-[4px] px-2 py-0.5 rounded-full">Prueba Virtual</div>
        </div>
      </div>
      {/* Banner registro */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 px-3 py-2 flex items-center justify-between">
        <div>
          <div className="text-[5px] text-purple-200">¿Nuevo en LentSoft?</div>
          <div className="text-[6px] font-bold text-white">Si no tienes cuenta, <span className="text-yellow-300">regístrate aquí</span></div>
        </div>
        <div className="bg-white text-purple-800 text-[4px] font-bold px-2 py-1 rounded-lg">Registrarse →</div>
      </div>
      {/* Categories */}
      <div className="bg-purple-50 px-2 py-1.5">
        <div className="flex gap-1">
          {["Monturas","Lentes Sol","Contacto","Accesorios"].map(c => (
            <div key={c} className="bg-white rounded text-[4px] text-purple-700 px-1.5 py-0.5 shadow-sm">{c}</div>
          ))}
        </div>
      </div>
      {/* Products */}
      <div className="bg-white px-2 py-1.5 flex-1">
        <div className="flex gap-1.5">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex-1 bg-purple-50 rounded p-1 border border-purple-100">
              <div className="w-full h-5 bg-purple-200 rounded mb-0.5" />
              <div className="h-1 bg-purple-300 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
      <MiniFooter />
    </ScreenShell>
  );
}

// ─── NEW: Virtual Try-On con MediaPipe AR ────────────────────────────────────
function MockupVirtualTryOnAR() {
  return (
    <ScreenShell title="prueba-virtual">
      <MiniNav />
      <div className="flex-1 bg-gradient-to-br from-purple-50 to-white p-2">
        <div className="text-[6px] font-bold text-purple-900 mb-1.5">Catálogo y Vista de Marcos — AR con MediaPipe</div>
        <div className="flex gap-2">
          {/* Camera AR panel */}
          <div className="flex-1 bg-white rounded-xl border border-purple-100 p-1.5">
            <div className="w-full h-24 bg-purple-900 rounded-lg relative overflow-hidden">
              {/* Video feed */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-800 via-purple-700 to-purple-900">
                {/* Face outline */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-12 rounded-full border border-white/20 opacity-30" />
                </div>
                {/* Canvas glasses overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-0.5" style={{ marginTop: -6 }}>
                    <div className="w-6 h-3.5 border-[1.5px] border-yellow-400 rounded-md bg-yellow-400/10" />
                    <div className="w-1.5 h-0.5 bg-yellow-400" />
                    <div className="w-6 h-3.5 border-[1.5px] border-yellow-400 rounded-md bg-yellow-400/10" />
                  </div>
                </div>
              </div>
              {/* Badges */}
              <div className="absolute top-1 left-1 bg-green-500 text-white text-[4px] px-1 py-0.5 rounded-full flex items-center gap-0.5">● MediaPipe AR Activo</div>
              <div className="absolute top-1 right-1 bg-black/50 text-white text-[4px] px-1 py-0.5 rounded">Face Mesh · Three.js</div>
              <div className="absolute bottom-1 left-0 right-0 text-center text-[4px] text-purple-300">✓ Cara detectada — Classic Aviator</div>
            </div>
          </div>
          {/* Catalog */}
          <div className="w-24 flex-shrink-0 bg-white rounded-xl border border-purple-100 p-1.5">
            <div className="text-[5px] font-bold text-purple-900 mb-1">Marcos</div>
            <div className="grid grid-cols-2 gap-0.5">
              {["Aviador","Wayfarer","Redondo","Cat Eye"].map(f => (
                <div key={f} className="bg-purple-50 rounded p-0.5 text-center border border-purple-100">
                  <div className="w-full h-4 bg-purple-200 rounded mb-0.5" />
                  <div className="text-[3px] text-purple-800">{f}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MiniFooter />
    </ScreenShell>
  );
}

// ─── NEW: Admin Inventario DataTable ────────────────────────────────────────
function MockupAdminInventarioDataTable() {
  return (
    <ScreenShell title="dashboard-admin/inventario" className="min-h-[200px]">
      <div className="flex flex-1 min-h-0">
        <div className="w-16 bg-purple-900 flex-shrink-0 p-1.5">
          <div className="text-[5px] font-bold text-white mb-1">LentSoft</div>
          {["General","Inventario","Ventas","Citas","Usuarios","Facturas"].map((m, i) => (
            <div key={m} className={`text-[4px] px-1 py-0.5 rounded mb-0.5 ${i === 1 ? "bg-purple-600 text-white" : "text-purple-300"}`}>{m}</div>
          ))}
        </div>
        <div className="flex-1 bg-gray-50">
          {/* Sub-nav pills */}
          <div className="flex gap-1 px-2 py-1 bg-white border-b border-purple-100">
            <div className="bg-purple-600 text-white text-[4px] px-1.5 py-0.5 rounded-full">Productos</div>
            <div className="text-purple-600 border border-purple-200 text-[4px] px-1.5 py-0.5 rounded-full">Proveedor</div>
            <div className="text-purple-600 border border-purple-200 text-[4px] px-1.5 py-0.5 rounded-full">Historial</div>
          </div>
          <div className="p-1.5">
            {/* DataTable */}
            <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
              {/* Header gradient */}
              <div className="grid grid-cols-7 bg-gradient-to-r from-purple-700 to-purple-800">
                {["Foto","Producto","Cat.","Bodega","Local","Total","Acciones"].map(h => (
                  <div key={h} className="text-[4px] text-white font-semibold px-1 py-1 text-center">{h}</div>
                ))}
              </div>
              {/* Rows with images */}
              {[
                ["bg-yellow-200","Ray-Ban Aviador","Gafas","27","18","45"],
                ["bg-blue-200","Acuvue Mens.","Lentes","80","40","120"],
                ["bg-purple-200","Oakley Sport","Gafas","16","12","28"],
                ["bg-green-200","Estuche Prem.","Acces.","95","55","150"],
              ].map(([imgBg, nombre, cat, bod, loc, tot], i) => (
                <div key={i} className="grid grid-cols-7 border-t border-purple-50 hover:bg-purple-50/50">
                  <div className="px-1 py-1 flex justify-center"><div className={`w-5 h-5 ${imgBg} rounded`} /></div>
                  <div className="px-1 py-1"><div className="text-[4px] font-semibold text-purple-900">{nombre}</div></div>
                  <div className="px-1 py-1 flex items-center"><span className="text-[4px] bg-purple-100 text-purple-700 px-1 rounded-full">{cat}</span></div>
                  <div className="px-1 py-1 text-center text-[4px] font-semibold text-blue-700">{bod}</div>
                  <div className="px-1 py-1 text-center text-[4px] font-semibold text-green-700">{loc}</div>
                  <div className="px-1 py-1 text-center"><span className="text-[4px] bg-green-100 text-green-700 font-bold px-0.5 rounded">{tot}</span></div>
                  <div className="px-1 py-1 flex gap-0.5 items-center justify-center">
                    <div className="w-3 h-2 bg-blue-100 rounded" /><div className="w-3 h-2 bg-red-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
            {/* Legend */}
            <div className="flex gap-2 mt-1">
              <div className="flex items-center gap-0.5 text-[4px] text-blue-600">🏭 Bodega</div>
              <div className="flex items-center gap-0.5 text-[4px] text-green-600">🏪 Local</div>
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

// ─── NEW: Chatbot Lupo mascot ────────────────────────────────────────────────
function MockupChatbotLupo() {
  return (
    <ScreenShell title="chatbot-lupo">
      <MiniNav />
      <div className="flex-1 relative bg-gray-50">
        {/* Page content placeholder */}
        <div className="p-4 space-y-2">
          {[1,2].map(i => <div key={i} className="h-3 bg-purple-100 rounded w-full" />)}
        </div>
        {/* FAB group */}
        <div className="absolute bottom-2 right-2 flex flex-col-reverse gap-1.5 items-end">
          {/* Accesibilidad */}
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 text-white text-[6px] flex items-center justify-center">⚙</div>
          </div>
          {/* Lupo chatbot */}
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg relative">
            {/* Stick figure */}
            <svg viewBox="0 0 40 48" className="w-5 h-5" fill="none">
              <circle cx="20" cy="9" r="7" stroke="white" strokeWidth="2.8" />
              <circle cx="17" cy="8" r="1.2" fill="white" />
              <circle cx="23" cy="8" r="1.2" fill="white" />
              <path d="M16 11.5 Q20 14.5 24 11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <line x1="20" y1="16" x2="20" y2="32" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="20" y1="21" x2="11" y2="27" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="20" y1="21" x2="29" y2="27" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="20" y1="32" x2="13" y2="44" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="20" y1="32" x2="27" y2="44" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white" />
          </div>
        </div>
        {/* Chat window preview */}
        <div className="absolute bottom-2 right-12 w-36 bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-700 to-purple-800 px-2 py-1.5 flex items-center gap-1.5">
            <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 40 48" className="w-3 h-3" fill="none">
                <circle cx="20" cy="9" r="7" stroke="white" strokeWidth="3" />
                <line x1="20" y1="16" x2="20" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <line x1="20" y1="21" x2="11" y2="27" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="20" y1="21" x2="29" y2="27" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-[5px] font-bold text-white">Lupo · Asistente</div>
              <div className="text-[4px] text-purple-200">● En línea</div>
            </div>
          </div>
          <div className="p-1.5 space-y-1">
            <div className="flex gap-1 items-start">
              <div className="w-4 h-4 bg-purple-600 rounded-full flex-shrink-0" />
              <div className="bg-white border border-purple-100 rounded-xl rounded-bl-sm p-1 text-[4px] text-purple-900 shadow-sm max-w-[80%]">
                ¡Hola! 👓 Soy Lupo. ¿En qué puedo ayudarte?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-purple-600 text-white rounded-xl rounded-br-sm p-1 text-[4px] max-w-[80%]">¿Cuáles son los métodos de pago?</div>
            </div>
          </div>
          <div className="p-1.5 border-t border-purple-100 flex gap-1">
            <div className="flex-1 h-3 bg-purple-50 border border-purple-200 rounded-lg" />
            <div className="w-5 h-3 bg-purple-600 rounded-lg" />
          </div>
        </div>
      </div>
      <MiniFooter />
    </ScreenShell>
  );
}

// ─── NEW: Dashboard Optómetra ────────────────────────────────────────────────
function SidebarOptometra({ active = "Dashboard" }: { active?: string }) {
  return (
    <div className="w-20 bg-purple-900 flex-shrink-0 p-1.5 flex flex-col">
      <div className="flex items-center gap-1 mb-2 border-b border-purple-700 pb-1.5">
        <div className="w-4 h-4 bg-purple-400/20 rounded flex items-center justify-center">
          <span className="text-[6px] text-white">👁</span>
        </div>
        <div>
          <div className="text-[5px] font-bold text-white">LentSoft</div>
          <div className="text-[3px] text-purple-400">Optómetra</div>
        </div>
      </div>
      {["Dashboard","Pacientes","Citas","Historial Médico","Examen Visual","Fórmulas Ópticas","Perfil"].map(m => (
        <div key={m} className={`text-[4px] px-1 py-0.5 rounded mb-0.5 flex items-center gap-0.5 ${m === active ? "bg-purple-600 text-white" : "text-purple-300"}`}>
          <div className="w-1 h-1 rounded-sm bg-current opacity-60 flex-shrink-0" />{m}
        </div>
      ))}
      <div className="mt-auto pt-2 border-t border-purple-700">
        <div className="text-[4px] text-white truncate font-semibold">Dra. Ana Gómez</div>
        <div className="text-[3px] text-purple-400">Optometría Clínica</div>
      </div>
    </div>
  );
}

function MockupOptometraDashboard() {
  return (
    <ScreenShell title="dashboard-optometra" className="min-h-[200px]">
      <div className="flex flex-1 min-h-0">
        <SidebarOptometra active="Dashboard" />
        <div className="flex-1 bg-gray-50 p-2">
          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            {[["7","Pacientes hoy"],["3","Citas pendientes"],["12","Exámenes"],].map(([v,l]) => (
              <div key={l} className="bg-white rounded-xl p-1.5 border border-purple-100 text-center">
                <div className="text-[8px] font-bold text-purple-900">{v}</div>
                <div className="text-[4px] text-purple-500">{l}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {/* Calendario mini */}
            <div className="bg-white rounded-xl border border-purple-100 p-1.5">
              <div className="text-[5px] font-bold text-purple-900 mb-1">Calendario</div>
              <div className="grid grid-cols-7 gap-0.5">
                {Array.from({length:28},(_,i)=>i+1).map(d=>(
                  <div key={d} className={`text-center text-[3px] py-0.5 rounded ${[3,8,15,22].includes(d)?"bg-purple-600 text-white":d===10?"bg-purple-200 text-purple-800":"text-gray-400"}`}>{d}</div>
                ))}
              </div>
            </div>
            {/* Accesos rápidos */}
            <div className="bg-white rounded-xl border border-purple-100 p-1.5">
              <div className="text-[5px] font-bold text-purple-900 mb-1">Accesos rápidos</div>
              {["+ Registrar paciente","+ Nueva cita","+ Examen visual","+ Crear fórmula"].map(a => (
                <div key={a} className="text-[4px] bg-purple-50 hover:bg-purple-100 text-purple-700 px-1.5 py-1 rounded-lg mb-0.5">{a}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MockupOptometraPacientes() {
  return (
    <ScreenShell title="dashboard-optometra/pacientes" className="min-h-[200px]">
      <div className="flex flex-1 min-h-0">
        <SidebarOptometra active="Pacientes" />
        <div className="flex-1 bg-gray-50 p-1.5">
          <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-700 to-purple-800 grid grid-cols-6">
              {["Documento","Nombre","Teléfono","EPS","Estado","Acciones"].map(h => (
                <div key={h} className="text-[4px] text-white font-semibold px-1 py-1">{h}</div>
              ))}
            </div>
            {[
              ["CC 1023456789","Valentina R.","310 456 7890","Sura","Activo"],
              ["CC 1098765432","Santiago M.","320 987 6543","Nueva EPS","Activo"],
              ["TI 10234561","Sofía H.","311 223 3445","Compensar","Activo"],
              ["CC 79456123","Andrés D.","300 112 2334","Sanitas","Activo"],
            ].map(([doc,nom,tel,eps,est],i) => (
              <div key={i} className="grid grid-cols-6 border-t border-purple-50">
                <div className="px-1 py-1 text-[4px] text-purple-600 font-mono">{doc}</div>
                <div className="px-1 py-1 text-[4px] font-semibold text-purple-900">{nom}</div>
                <div className="px-1 py-1 text-[4px] text-purple-600">{tel}</div>
                <div className="px-1 py-1 text-[4px] text-purple-600">{eps}</div>
                <div className="px-1 py-1"><span className="text-[4px] bg-green-100 text-green-700 px-1 rounded-full">{est}</span></div>
                <div className="px-1 py-1 flex gap-0.5"><div className="w-3 h-2 bg-purple-100 rounded" /><div className="w-3 h-2 bg-blue-100 rounded" /><div className="w-3 h-2 bg-red-100 rounded" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MockupOptometraCitas() {
  return (
    <ScreenShell title="dashboard-optometra/citas" className="min-h-[200px]">
      <div className="flex flex-1 min-h-0">
        <SidebarOptometra active="Citas" />
        <div className="flex-1 bg-gray-50 p-1.5 flex gap-1.5">
          {/* Calendario */}
          <div className="flex-1 bg-white rounded-xl border border-purple-100 p-1.5">
            <div className="text-[5px] font-bold text-purple-900 mb-1">Julio 2026</div>
            <div className="grid grid-cols-7 gap-0.5">
              {["L","M","M","J","V","S","D"].map((d,i) => <div key={i} className="text-[3px] text-purple-400 text-center">{d}</div>)}
              {Array.from({length:31},(_,i)=>i+1).map(d => (
                <div key={d} className={`text-center text-[3px] py-0.5 rounded relative ${[3,8,15,22].includes(d)?"bg-purple-600 text-white":[10,17].includes(d)?"bg-purple-200 text-purple-800":"text-gray-400"}`}>
                  {d}
                  {[3,8,15,22].includes(d) && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-white rounded-full" />}
                </div>
              ))}
            </div>
          </div>
          {/* Lista citas */}
          <div className="w-28 bg-white rounded-xl border border-purple-100 p-1.5">
            <div className="text-[5px] font-bold text-purple-900 mb-1">Citas del día</div>
            {[["9:00","Valentina R.","Examen visual"],["10:30","Santiago M.","Control lentes"],["14:00","Sofía H.","Primera consulta"]].map(([h,n,t]) => (
              <div key={h} className="border-l-2 border-purple-600 pl-1 mb-1 bg-purple-50 rounded-r-lg py-0.5">
                <div className="text-[4px] font-bold text-purple-900">{h}</div>
                <div className="text-[4px] text-purple-700">{n}</div>
                <div className="text-[3px] text-purple-500">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MockupOptometraExamen() {
  return (
    <ScreenShell title="dashboard-optometra/examen-visual" className="min-h-[200px]">
      <div className="flex flex-1 min-h-0">
        <SidebarOptometra active="Examen Visual" />
        <div className="flex-1 bg-gray-50 p-1.5 overflow-y-auto">
          <div className="space-y-1.5">
            {/* Agudeza */}
            <div className="bg-blue-50 rounded-xl p-1.5 border border-blue-100">
              <div className="text-[4px] font-bold text-blue-800 mb-1">Agudeza Visual</div>
              <div className="grid grid-cols-2 gap-1">
                <div><div className="text-[3px] text-blue-600 mb-0.5">OD</div><div className="h-2.5 bg-white border border-blue-200 rounded" /></div>
                <div><div className="text-[3px] text-blue-600 mb-0.5">OI</div><div className="h-2.5 bg-white border border-blue-200 rounded" /></div>
              </div>
            </div>
            {/* Refracción */}
            <div className="bg-green-50 rounded-xl p-1.5 border border-green-100">
              <div className="text-[4px] font-bold text-green-800 mb-1">Refracción</div>
              <table className="w-full">
                <thead><tr>{["Ojo","Esfera","Cilindro","Eje","Adición"].map(h=><th key={h} className="text-[3px] text-green-700 text-center">{h}</th>)}</tr></thead>
                <tbody>
                  {["OD","OI"].map(o=><tr key={o}><td className="text-[3px] font-bold text-purple-900 text-center">{o}</td>{[1,2,3,4].map(i=><td key={i} className="px-0.5 py-0.5"><div className="h-2 bg-white border border-green-200 rounded" /></td>)}</tr>)}
                </tbody>
              </table>
            </div>
            {/* Diagnóstico */}
            <div className="bg-purple-50 rounded-xl p-1.5 border border-purple-100">
              <div className="text-[4px] font-bold text-purple-800 mb-1">Diagnóstico y Tratamiento</div>
              <div className="h-4 bg-white border border-purple-200 rounded mb-1" />
              <div className="h-4 bg-white border border-purple-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MockupOptometraFormulas() {
  return (
    <ScreenShell title="dashboard-optometra/formulas" className="min-h-[200px]">
      <div className="flex flex-1 min-h-0">
        <SidebarOptometra active="Fórmulas Ópticas" />
        <div className="flex-1 bg-gray-50 p-1.5">
          <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-700 to-purple-800 grid grid-cols-5">
              {["Paciente","Fecha","Tipo lente","Estado","Acciones"].map(h => (
                <div key={h} className="text-[4px] text-white font-semibold px-1 py-1">{h}</div>
              ))}
            </div>
            {[
              ["Valentina R.","10 May 2026","Monofocal AR","Vigente"],
              ["Santiago M.","15 Mar 2026","Bifocal","Vigente"],
              ["María L.","20 Ago 2025","Monofocal","Vencida"],
            ].map(([p,f,t,e],i) => (
              <div key={i} className="grid grid-cols-5 border-t border-purple-50">
                <div className="px-1 py-1 text-[4px] font-semibold text-purple-900">{p}</div>
                <div className="px-1 py-1 text-[4px] text-purple-600">{f}</div>
                <div className="px-1 py-1 text-[4px] text-purple-600">{t}</div>
                <div className="px-1 py-1"><span className={`text-[4px] px-1 rounded-full ${e==="Vigente"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>{e}</span></div>
                <div className="px-1 py-1 flex gap-0.5">
                  {["👁","✏","🖨","⬇","🗑"].map((ic,j)=><span key={j} className="text-[5px]">{ic}</span>)}
                </div>
              </div>
            ))}
          </div>
          {/* Preview fórmula */}
          <div className="mt-1.5 bg-white rounded-xl border border-purple-200 p-1.5">
            <div className="text-center bg-purple-600 text-white text-[4px] font-bold rounded-lg py-0.5 mb-1">Prescripción Óptica</div>
            <table className="w-full">
              <thead><tr>{["","Esfera","Cilindro","Eje","Adición"].map(h=><th key={h} className="text-[3px] text-purple-600 text-center">{h}</th>)}</tr></thead>
              <tbody>
                {[["OD","-3.25","-0.75","180",""],["OI","-3.00","-0.50","175",""]].map(([o,...v])=>(
                  <tr key={o}><td className="text-[4px] font-bold text-purple-900 text-center">{o}</td>{v.map((val,i)=><td key={i} className="text-[4px] text-center text-purple-900">{val||"—"}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MockupAlertify() {
  return (
    <ScreenShell title="sistema-notificaciones">
      <MiniNav />
      <div className="flex-1 bg-gray-50 p-3 relative">
        <div className="text-[6px] font-bold text-purple-900 mb-2">Sistema de notificaciones — AlertifyJS</div>
        {/* Toast notifications */}
        <div className="absolute top-6 right-2 space-y-1 w-36">
          <div className="bg-green-500 text-white text-[5px] px-2 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
            <span className="text-[8px]">✓</span>¡Producto guardado correctamente!
          </div>
          <div className="bg-red-500 text-white text-[5px] px-2 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
            <span className="text-[8px]">✕</span>Credenciales inválidas
          </div>
          <div className="bg-amber-500 text-white text-[5px] px-2 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
            <span className="text-[8px]">⚠</span>Horario ya está ocupado
          </div>
        </div>
        {/* Confirm dialog */}
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 w-44 mx-auto mt-8">
          <div className="bg-gradient-to-r from-purple-700 to-purple-800 text-white text-[5px] font-bold px-3 py-2 rounded-t-2xl">LentSoft</div>
          <div className="px-3 py-2 text-[5px] text-purple-900">¿Está seguro de eliminar este producto del inventario?</div>
          <div className="flex gap-2 px-3 pb-3">
            <div className="flex-1 bg-gray-100 text-gray-700 text-[4px] text-center py-1 rounded-xl">Cancelar</div>
            <div className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-[4px] text-center py-1 rounded-xl font-bold">Eliminar</div>
          </div>
        </div>
        {/* Sources */}
        <div className="mt-2 text-center text-[4px] text-purple-400">Reemplaza alert() · confirm() · prompt() nativos del navegador</div>
      </div>
      <MiniFooter />
    </ScreenShell>
  );
}

// ─── Color swatch component ──────────────────────────────────────────────────
function Swatch({ name, hex, label }: { name: string; hex: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-full rounded-xl shadow-sm border border-black/5"
        style={{ backgroundColor: hex, aspectRatio: "16/9" }}
      />
      <div className="text-center">
        <div className="text-[10px] font-mono font-bold text-gray-800 uppercase tracking-wide">{hex}</div>
        <div className="text-[9px] text-gray-500">{name}</div>
        <div className="text-[8px] text-purple-400 font-mono">{label}</div>
        <div className="text-[8px] text-gray-400">100%</div>
      </div>
    </div>
  );
}

// ─── Typography sample ───────────────────────────────────────────────────────
function TypeRow({ weight, label, sample }: { weight: number; label: string; sample: string }) {
  return (
    <div className="flex gap-4 items-baseline border-b border-gray-100 pb-2 mb-2">
      <div className="w-24 flex-shrink-0">
        <div className="text-[10px] text-purple-700 font-semibold">{label}</div>
        <div className="text-[9px] text-gray-400 font-mono">weight {weight}</div>
      </div>
      <div style={{ fontWeight: weight, fontSize: 13, lineHeight: 1.35 }} className="text-gray-800 flex-1">
        {sample}
      </div>
    </div>
  );
}

// ─── Section heading (matches reference style) ───────────────────────────────
function DocSectionHeader({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <div className="mb-3">
      <div className="text-lg font-bold text-gray-900 leading-none">{primary}</div>
      <div className="text-lg font-bold text-purple-600 leading-none">{secondary}</div>
    </div>
  );
}

// ─── A4-proportion page wrapper ───────────────────────────────────────────────
function DocPage({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`doc-page relative bg-white shadow-xl rounded-sm mx-auto ${className}`}
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "15mm 18mm",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}

function DocPageHeader({ module }: { module?: string }) {
  return (
    <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-purple-100">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-purple-900 rounded-lg" />
        <span className="text-sm font-bold text-purple-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>LentSoft</span>
        {module && <span className="text-xs text-purple-400 ml-1">/ {module}</span>}
      </div>
      <span className="text-xs text-purple-300 font-mono">Guía de Diseño · 2026</span>
    </div>
  );
}

// ─── Main exported component ─────────────────────────────────────────────────
export function MockupDocumentPage() {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      {/* Toolbar — hidden in print */}
      <div className="print:hidden sticky top-0 z-50 bg-purple-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-sm">📋</span>
          </div>
          <div>
            <div className="text-sm font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>LentSoft — Guía de Diseño y Mockups</div>
            <div className="text-xs text-purple-300">Documentación de la plataforma e-commerce óptico</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuide(v => !v)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs transition-colors"
          >
            {showGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showGuide ? "Ocultar guía" : "Mostrar guía"}
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-purple-500 hover:bg-purple-400 px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Exportar PDF
          </button>
        </div>
      </div>

      <div className="py-10 px-4 space-y-8 print:py-0 print:px-0 print:space-y-0">

        {/* ── PAGE 1: Cover ─────────────────────────────────────────── */}
        <DocPage className="flex flex-col items-center justify-center text-center ">
          <div className="mb-10">
            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl border-4 border-purple-100">
              <img src={logoLentSoft} alt="Logo LentSoft" className="w-28 h-28 object-contain" />
            </div>
            <h1 className="text-5xl font-bold text-purple-900 mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              LentSoft
            </h1>
            <p className="text-xl text-purple-500 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Plataforma E-Commerce Óptico</p>
            <p className="text-sm text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>Guía de Diseño · Sistema Visual · Mockups de Módulos</p>
          </div>

          <div className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mb-10" />

          <div className="grid grid-cols-3 gap-6 w-full max-w-lg mb-10">
            {[["22+","Módulos"],["2","Tipografías"],["16","Colores"]].map(([n, l]) => (
              <div key={l} className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                <div className="text-3xl font-bold text-purple-700 mb-1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{n}</div>
                <div className="text-xs text-purple-500">{l}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-lg text-left">
            {[
              ["🎨","Paleta cromática completa","Colores primarios, degradados y semánticos"],
              ["🔤","Anatomía tipográfica","Bricolage Grotesque + Montserrat"],
              ["🖥️","Mockups de módulos","Todas las vistas del sistema"],
              ["♿","WCAG 2.1","Navegación accesible y semántica"],
              ["👁","AR MediaPipe + Three.js","Face Mesh con 468 puntos faciales"],
              ["🔔","AlertifyJS integrado","Notificaciones modernas en toda la app"],
              ["👤","Módulo Optómetra completo","Dashboard + 6 sub-módulos clínicos"],
              ["🤖","Chatbot Lupo","Asistente virtual con muñeco de palo"],
            ].map(([ic, t, d]) => (
              <div key={t} className="bg-white rounded-xl p-3 border border-purple-100 shadow-sm flex gap-2">
                <span className="text-lg flex-shrink-0">{ic}</span>
                <div>
                  <div className="text-xs font-semibold text-purple-900">{t}</div>
                  <div className="text-[10px] text-purple-500">{d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-12 left-0 right-0 text-center">
            <p className="text-xs text-gray-300">Versión 1.0 · Junio 2026</p>
          </div>
        </DocPage>

        {/* ── PAGE 2: Color Palette (Primarios + Degradados) ────────── */}
        {showGuide && (
          <DocPage className="">
            <DocPageHeader module="Paleta de Colores — Parte 1 de 2" />

            <div className="space-y-6">
              {/* Primarios */}
              <section>
                <DocSectionHeader primary="COLORES" secondary="PRIMARIOS" />
                <div className="grid grid-cols-4 gap-5">
                  {PALETTE.primarios.map(s => <Swatch key={s.hex} {...s} />)}
                </div>
                <div className="mt-4 border-b border-dashed border-gray-200" />
              </section>

              {/* Degradados */}
              <section>
                <DocSectionHeader primary="COLORES" secondary="DEGRADADO" />
                <div className="grid grid-cols-4 gap-5">
                  {PALETTE.degradados.map(s => <Swatch key={s.hex} {...s} />)}
                </div>
                <div className="mt-4 flex gap-3">
                  <div className="flex-1 h-8 rounded-xl shadow-sm" style={{ background: "linear-gradient(135deg, #7C3AED, #3B0764)" }} />
                  <div className="flex-1 h-8 rounded-xl shadow-sm" style={{ background: "linear-gradient(135deg, #FAF5FF, #E9D5FF)" }} />
                </div>
                <div className="mt-4 border-b border-dashed border-gray-200" />
              </section>

              {/* Semánticos */}
              <section>
                <DocSectionHeader primary="COLORES" secondary="SEMÁNTICOS" />
                <div className="grid grid-cols-4 gap-5">
                  {PALETTE.semanticos.map(s => <Swatch key={s.hex} {...s} />)}
                </div>
                <div className="mt-4 border-b border-dashed border-gray-200" />
              </section>

              {/* Negativos */}
              <section>
                <DocSectionHeader primary="COLORES" secondary="NEGATIVOS" />
                <div className="grid grid-cols-4 gap-5">
                  {PALETTE.negativos.map(s => <Swatch key={s.hex} {...s} />)}
                </div>
              </section>
            </div>
          </DocPage>
        )}

        {/* ── PAGE 3: Typography ────────────────────────────────────── */}
        {showGuide && (
          <DocPage className="">
            <DocPageHeader module="Tipografía y Componentes" />

            <div className="space-y-5">
              <section>
                <DocSectionHeader primary="ANATOMÍA" secondary="TIPOGRÁFICA" />

                {/* Bricolage Grotesque */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Principal</div>
                    <span className="text-xs font-bold text-gray-800" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Bricolage Grotesque</span>
                    <span className="text-[10px] text-gray-400">— Títulos, headings, UI labels</span>
                  </div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    <TypeRow weight={400} label="Light 400" sample="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz 1234567890 !?@#$%" />
                    <TypeRow weight={500} label="Medium 500" sample="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz 1234567890 !?@#$%" />
                    <TypeRow weight={600} label="Semi-bold 600" sample="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz 1234567890" />
                    <TypeRow weight={700} label="Bold 700" sample="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz 1234567890" />
                  </div>
                </div>

                {/* Montserrat */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-purple-200 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Secundaria</div>
                    <span className="text-xs font-bold text-gray-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Montserrat</span>
                    <span className="text-[10px] text-gray-400">— Body, párrafos, botones, inputs</span>
                  </div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    <TypeRow weight={400} label="Regular 400" sample="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz 1234567890 !?@#$%" />
                    <TypeRow weight={500} label="Medium 500" sample="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz 1234567890 !?@#$%" />
                    <TypeRow weight={600} label="Semi-bold 600" sample="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz 1234567890" />
                    <TypeRow weight={700} label="Bold 700" sample="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz 1234567890" />
                  </div>
                </div>
              </section>

              {/* Buttons */}
              <section>
                <DocSectionHeader primary="ANATOMÍA" secondary="BOTONES" />
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {[
                    { label: "Primario", bg: "bg-purple-600", text: "text-white", border: "" },
                    { label: "Secundario", bg: "bg-purple-100", text: "text-purple-700", border: "" },
                    { label: "Outline", bg: "bg-white", text: "text-purple-700", border: "border-2 border-purple-600" },
                    { label: "Ghost", bg: "bg-transparent", text: "text-purple-700", border: "" },
                    { label: "Destructivo", bg: "bg-red-500", text: "text-white", border: "" },
                    { label: "Éxito", bg: "bg-green-500", text: "text-white", border: "" },
                  ].map(({ label, bg, text, border }) => (
                    <button key={label} className={`px-3 py-1.5 rounded-xl text-xs font-medium ${bg} ${text} ${border}`}
                      style={{ fontFamily: "'Montserrat', sans-serif", pointerEvents: "none" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Type scale */}
              <section>
                <DocSectionHeader primary="ESCALA" secondary="TIPOGRÁFICA" />
                <div className="border-l-4 border-purple-200 pl-4 space-y-0.5">
                  {[
                    { size: "1.875rem", weight: 600, label: "H1 · 1.875rem · Semi-bold", text: "Título Principal" },
                    { size: "1.375rem", weight: 600, label: "H2 · 1.375rem · Semi-bold", text: "Sección Importante" },
                    { size: "1.1rem",   weight: 500, label: "H3 · 1.1rem · Medium",      text: "Subtítulo o tarjeta" },
                    { size: "0.9rem",   weight: 400, label: "Body · 0.9rem · Regular",    text: "Texto de párrafo y contenido de la interfaz" },
                    { size: "0.8rem",   weight: 400, label: "Small · 0.8rem",              text: "Texto secundario, etiquetas, metadatos del sistema" },
                    { size: "0.7rem",   weight: 400, label: "XS · 0.7rem",                text: "Captions, hints, tooltips de ayuda contextual" },
                  ].map(({ size, weight, label, text }) => (
                    <div key={label} className="flex items-baseline gap-3">
                      <span className="text-[9px] text-purple-400 font-mono w-40 flex-shrink-0">{label}</span>
                      <span style={{ fontSize: size, fontWeight: weight, fontFamily: "'Bricolage Grotesque', sans-serif" }} className="text-gray-800">{text}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </DocPage>
        )}

        {/* ── PAGES 4+: Module Mockups ───────────────────────────────── */}
        {[
          /* ── Páginas públicas ── */
          { key: "home",           title: "Inicio (Home)",              subtitle: "Página de aterrizaje con hero, banner de registro para nuevos usuarios, categorías y productos destacados", route: "/",                              component: <MockupHomeConBanner /> },
          { key: "tienda",         title: "Tienda",                     subtitle: "Catálogo completo de productos con filtros por categoría, búsqueda en tiempo real y paginación", route: "/tienda",                         component: <MockupTienda /> },
          { key: "producto",       title: "Detalle de Producto",        subtitle: "Vista individual con galería, especificaciones, stock por Bodega/Local y enlace a prueba virtual AR", route: "/producto/:id",                  component: <MockupProducto /> },
          { key: "checkout",       title: "Checkout",                   subtitle: "Proceso de compra completo: formulario de envío, métodos de pago y resumen con IVA", route: "/checkout",                       component: <MockupCheckout /> },
          { key: "virtual",        title: "Prueba Virtual AR",          subtitle: "AR en tiempo real con MediaPipe Face Mesh (468 puntos) + Three.js 3D glasses. Fallback a modo demo sin cámara", route: "/prueba-virtual",                component: <MockupVirtualTryOnAR /> },
          /* ── Autenticación ── */
          { key: "login",          title: "Inicio de Sesión",           subtitle: "Autenticación con redirección por rol: Admin → dashboard-admin, Optómetra → dashboard-optometra, Usuario → catálogo", route: "/login",                         component: <MockupLogin /> },
          { key: "registro",       title: "Registro de Usuario",        subtitle: "Formulario completo con: tipo/número de documento, nombre, apellido, teléfono, correo y contraseña. Redirige al catálogo tras registrarse", route: "/registro",                      component: <MockupRegistroNuevo /> },
          { key: "recuperar",      title: "Recuperar Contraseña",       subtitle: "Flujo de dos pasos para recuperar acceso mediante enlace seguro al correo", route: "/recuperar-contrasena",          component: <MockupRecuperar /> },
          /* ── Información ── */
          { key: "nosotros",       title: "Nosotros",                   subtitle: "Historia, valores corporativos, estadísticas de impacto, certificaciones y equipo", route: "/nosotros",                       component: <MockupNosotros /> },
          /* ── Sistema de notificaciones ── */
          { key: "alertify",       title: "Sistema de Notificaciones — AlertifyJS", subtitle: "Reemplaza alert()/confirm() nativos. Toast success/error/warning + diálogos modales con diseño LentSoft", route: "global (todos los módulos)",    component: <MockupAlertify /> },
          /* ── Chatbot Lupo ── */
          { key: "lupo",           title: "Chatbot Lupo",               subtitle: "Asistente virtual con muñeco de palo morado animado, indicador de escritura, FAQs por categoría y respuestas con delay realista", route: "global (floating button)",    component: <MockupChatbotLupo /> },
          /* ── Dashboard Usuario ── */
          { key: "dashboard-user", title: "Dashboard — Usuario",        subtitle: "Panel personal con sidebar: Citas (calendario), Pedidos, Favoritos y Perfil con recetas ópticas", route: "/dashboard",                     component: <MockupDashboardUsuario /> },
          /* ── Dashboard Admin ── */
          { key: "admin-general",  title: "Dashboard Admin — General",  subtitle: "Vista general con KPIs en tiempo real, gráfica de ventas por mes y accesos rápidos a todos los módulos", route: "/dashboard-admin",              component: <MockupAdminGeneral /> },
          { key: "admin-inventario-dt", title: "Dashboard Admin — Inventario (DataTable)", subtitle: "DataTable con foto del producto, stock separado Bodega/Local/Total, ordenamiento por columnas y CRUD completo con gestión de imágenes", route: "/dashboard-admin → Inventario", component: <MockupAdminInventarioDataTable /> },
          { key: "admin-ventas",   title: "Dashboard Admin — Ventas",   subtitle: "Registro de ventas con cálculo automático de IVA, descuentos y múltiples métodos de pago. Alertify para validaciones", route: "/dashboard-admin → Ventas",   component: <MockupAdminVentas /> },
          { key: "admin-citas",    title: "Dashboard Admin — Citas",    subtitle: "Calendario interactivo con vistas Año/Mes/Semana/Día, panel lateral de detalles y modal de reagendamiento", route: "/dashboard-admin → Citas",    component: <MockupAdminCitas /> },
          { key: "admin-usuarios", title: "Dashboard Admin — Usuarios", subtitle: "Gestión separada: sub-tab Clientes (pedidos, última compra) y sub-tab Trabajadores (rol, especialidad). Roles granulares", route: "/dashboard-admin → Usuarios", component: <MockupAdminUsuarios /> },
          /* ── Dashboard Optómetra ── */
          { key: "opto-dashboard", title: "Optómetra — Dashboard",      subtitle: "Panel principal del optómetra: KPIs clínicos, calendario mensual con citas marcadas y accesos rápidos a todos los módulos", route: "/dashboard-optometra",         component: <MockupOptometraDashboard /> },
          { key: "opto-pacientes", title: "Optómetra — Pacientes",      subtitle: "CRUD completo de pacientes: tipo/num documento, datos personales, EPS, estados. Búsqueda reactiva y paginación", route: "/dashboard-optometra → Pacientes", component: <MockupOptometraPacientes /> },
          { key: "opto-citas",     title: "Optómetra — Citas",          subtitle: "Vista calendario mensual con días marcados + panel lateral de citas del día. CRUD: crear, editar, reagendar, iniciar consulta", route: "/dashboard-optometra → Citas", component: <MockupOptometraCitas /> },
          { key: "opto-examen",    title: "Optómetra — Examen Visual",  subtitle: "Formulario clínico por secciones: Agudeza Visual, Tonometría, Refracción (OD/OI tabla), Segmentos y Diagnóstico. Sin eliminar", route: "/dashboard-optometra → Examen Visual", component: <MockupOptometraExamen /> },
          { key: "opto-formulas",  title: "Optómetra — Fórmulas Ópticas", subtitle: "CRUD de fórmulas: tabla prescripción OD/OI, tipo de lente, Imprimir y Descargar PDF. Vista detalle con prescripción formateada", route: "/dashboard-optometra → Fórmulas", component: <MockupOptometraFormulas /> },
        ].map((page, idx) => (
          <DocPage key={page.key} className="">
            <DocPageHeader module={page.title} />

            {/* Module header */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-5 bg-purple-600 rounded-full" />
                  <h2 className="text-lg font-bold text-purple-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {page.title}
                  </h2>
                </div>
                <p className="text-xs text-gray-500 ml-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {page.subtitle}
                </p>
              </div>
              <div className="flex-shrink-0 bg-purple-50 border border-purple-100 rounded-lg px-3 py-1.5 text-right">
                <div className="text-[9px] text-purple-400 font-mono mb-0.5">RUTA</div>
                <div className="text-[10px] text-purple-700 font-mono font-bold">{page.route}</div>
              </div>
            </div>

            {/* Mockup */}
            <div className="mb-6">
              {page.component}
            </div>

            {/* Feature bullets */}
            <div className="bg-purple-50 rounded-xl p-3 border border-purple-100 mt-4">
              <div className="text-[10px] font-bold text-purple-800 mb-1.5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Características del módulo
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {getModuleFeatures(page.key).map(f => (
                  <div key={f} className="flex items-start gap-1">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0 mt-0.5" />
                    <span className="text-[9px] text-purple-700 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Page number */}
            <div className="absolute bottom-6 right-12 text-[9px] text-gray-300 font-mono">{idx + 4}</div>
          </DocPage>
        ))}
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          .doc-page {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            overflow: hidden !important;
            padding: 15mm 18mm !important;
            box-sizing: border-box !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
          }
          .doc-page:last-of-type {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}

function getModuleFeatures(key: string): string[] {
  const features: Record<string, string[]> = {
    /* ── Públicas ── */
    home:             ["Banner '¿No tienes cuenta?' con CTA de registro","Hero con promociones y CTA","Categorías de productos","Más vendidos","Productos en descuento","Chatbot Lupo flotante"],
    tienda:           ["Filtros por categoría/precio","Búsqueda en tiempo real","Ordenamiento múltiple","Vista de cuadrícula","Añadir al carrito","Paginación de resultados"],
    producto:         ["Galería de imágenes","Stock Bodega + Local separado","Especificaciones técnicas","Enlace a prueba virtual AR","Botón añadir al carrito","Alertify para errores cámara"],
    checkout:         ["Formulario de datos personales","Métodos: tarjeta/PSE/efectivo","Resumen del pedido","Cálculo de IVA automático","Validación en tiempo real","Confirmación de compra"],
    virtual:          ["MediaPipe Face Mesh (468 puntos)","Three.js 3D glasses overlay","Canvas 2D por estilo (aviador/wayfarer/etc.)","Modo demo sin cámara","8+ marcos con info","Detección de cara en tiempo real"],
    /* ── Autenticación ── */
    login:            ["Autenticación segura","Toggle de contraseña","Admin → /dashboard-admin","Optómetra → /dashboard-optometra","Usuario → / (catálogo)","Notify.success al ingresar"],
    registro:         ["Tipo de documento (CC/TI/CE/PA/NIT)","Número de documento","Nombre + Apellido con labels","Número de teléfono","Correo + contraseña confirmada","Redirige al catálogo tras registro"],
    recuperar:        ["Input de correo electrónico","Envío de enlace seguro","Pantalla de confirmación","Manejo de errores","Flujo de 2 pasos","Vínculo de retorno"],
    /* ── Info ── */
    nosotros:         ["Historia de la empresa","Valores corporativos","Estadísticas de impacto","Servicios especializados","Certificaciones ISO","Equipo de trabajo"],
    /* ── Sistema notificaciones ── */
    alertify:         ["notify.success() — notificación verde","notify.error() — notificación roja","notify.warning() — notificación ámbar","notify.confirm() — diálogo modal","Estilos personalizados paleta morada","Reemplaza alert()/confirm() nativos"],
    /* ── Chatbot ── */
    lupo:             ["Muñeco de palo morado SVG animado","Indicador de escritura (3 puntos)","Saludo automático al abrir","FAQs por 4 categorías","Respuestas con delay realista","Botón reiniciar conversación"],
    /* ── Dashboard Usuario ── */
    "dashboard-user": ["Sidebar purple-900 con 4 secciones","Citas con calendario AppointmentCalendar","Historial de pedidos con tracking","Lista de favoritos con precios","Recetas ópticas detalladas","Edición de perfil"],
    /* ── Dashboard Admin ── */
    "admin-general":  ["KPIs en tiempo real","Gráfica barras ventas mensual","Clientes activos","Tasa de satisfacción","Resumen de citas del día","Sidebar con 6 módulos expandibles"],
    "admin-inventario-dt": ["DataTable con foto del producto","Stock Bodega + Local separado","Hover foto → botón eliminar imagen","Subir imagen desde dispositivo o URL","Ordenamiento por columnas (▲▼)","Categorías: Gafas/Lentes/Accesorios"],
    "admin-ventas":   ["Registro de ventas con productos","Cálculo IVA y descuentos automático","Métodos: efectivo/tarjeta/PSE","Alertify para validaciones","Búsqueda reactiva","Paginación de tabla"],
    "admin-citas":    ["Vista Año/Mes/Semana/Día","Días con citas marcados en calendario","Panel lateral de detalles","Modal de reagendamiento","Filtros por estado","Alertify en confirmaciones"],
    "admin-usuarios": ["Sub-tab Clientes (pedidos/última compra)","Sub-tab Trabajadores (rol/especialidad)","Roles granulares por módulo","Ver/Editar/Eliminar permisos","Estado activo/inactivo","Sidebar expandible"],
    /* ── Dashboard Optómetra ── */
    "opto-dashboard": ["6 KPIs clínicos (pacientes/citas/exámenes)","Calendario mensual con citas marcadas","Agenda del día con horarios","5 accesos rápidos a módulos","Credenciales: optometra@gmail.com / 12345","Ruta independiente /dashboard-optometra"],
    "opto-pacientes": ["Tipo + número de documento","Nombre, apellido, género, edad","Teléfono, correo, dirección, EPS","Estado Activo/Inactivo","Búsqueda por documento o nombre","Ver detalle + Editar + Eliminar con confirmación"],
    "opto-citas":     ["Calendario mensual con días marcados","Panel lateral agenda diaria","Estados: Pendiente/Confirmada/En proceso/Atendida/Cancelada","Botones Ver/Editar/Reagendar/Iniciar Consulta","CRUD completo con selector de paciente","Filtro por estado"],
    "opto-examen":    ["Agudeza Visual OD/OI","Tonometría OD/OI","Refracción (esfera/cilindro/eje/adición)","Segmento anterior y posterior","Diagnóstico + tratamiento","Sin opción eliminar (expediente clínico)"],
    "opto-formulas":  ["Prescripción en tabla OD/OI","Esfera, cilindro, eje, adición","Distancia pupilar + tipo lente","Imprimir fórmula","Descargar como PDF","Estado Vigente/Vencida"],
  };
  return features[key] ?? ["Funcionalidad completa","Diseño responsive","Accesibilidad WCAG 2.1"];
}
