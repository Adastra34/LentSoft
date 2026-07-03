import { useState } from "react";
import { useOutletContext, Link } from "react-router";
import {
  Calendar,
  Heart,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  ShoppingBag,
  Star,
  CheckCircle2,
  XCircle,
  FileText,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import { products, formatPrice } from "../../models/data/products";
import { NewAppointmentModal } from "../components/NewAppointmentModal";
import { AppointmentCalendar } from "../components/AppointmentCalendar";

interface OutletContext {
  textSize: number;
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  type: string;
  doctor: string;
  status: "confirmada" | "pendiente" | "completada";
}

interface PrescriptionRecord {
  id: number;
  date: string;
  doctor: string;
  examType: string;
  diagnosis: string;
  prescription: {
    rightEye: {
      sphere: string;
      cylinder: string;
      axis: string;
      addition?: string;
    };
    leftEye: {
      sphere: string;
      cylinder: string;
      axis: string;
      addition?: string;
    };
    pupillaryDistance?: string;
  };
  notes: string;
}

const initialAppointments: Appointment[] = [
  {
    id: 1,
    date: "2026-03-25",
    time: "10:00 AM",
    type: "Examen de vista completo",
    doctor: "Dr. Carlos Mendoza",
    status: "confirmada"
  },
  {
    id: 2,
    date: "2026-04-10",
    time: "2:30 PM",
    type: "Revisión de lentes de contacto",
    doctor: "Dra. María González",
    status: "pendiente"
  }
];

const mockPrescriptionHistory: PrescriptionRecord[] = [
  {
    id: 1,
    date: "2025-12-15",
    doctor: "Dr. Carlos Mendoza",
    examType: "Examen de vista completo",
    diagnosis: "Miopía con astigmatismo bilateral",
    prescription: {
      rightEye: {
        sphere: "-2.50",
        cylinder: "-0.75",
        axis: "180"
      },
      leftEye: {
        sphere: "-2.75",
        cylinder: "-0.50",
        axis: "175"
      },
      pupillaryDistance: "63mm"
    },
    notes: "El paciente presenta miopía moderada con astigmatismo en ambos ojos. Se recomienda uso constante de lentes para mejorar la visión lejana, especialmente al conducir y en actividades que requieran precisión visual. Control en 12 meses."
  },
  {
    id: 2,
    date: "2025-06-20",
    doctor: "Dra. María González",
    examType: "Consulta de adaptación de lentes de contacto",
    diagnosis: "Adaptación de lentes de contacto para miopía",
    prescription: {
      rightEye: {
        sphere: "-2.25",
        cylinder: "0.00",
        axis: "0"
      },
      leftEye: {
        sphere: "-2.50",
        cylinder: "0.00",
        axis: "0"
      }
    },
    notes: "Se prescribieron lentes de contacto blandos para corrección de miopía. El paciente desea una opción para actividades deportivas. Se realizó adaptación exitosa con curva base 8.6mm y diámetro 14.2mm. Se recomienda uso máximo de 8 horas diarias y seguir estrictamente las normas de higiene."
  },
  {
    id: 3,
    date: "2024-11-10",
    doctor: "Dr. Juan Pérez",
    examType: "Examen de vista de rutina",
    diagnosis: "Miopía leve bilateral estable",
    prescription: {
      rightEye: {
        sphere: "-2.00",
        cylinder: "-0.50",
        axis: "180"
      },
      leftEye: {
        sphere: "-2.25",
        cylinder: "-0.25",
        axis: "175"
      },
      pupillaryDistance: "63mm"
    },
    notes: "La graduación ha aumentado ligeramente desde el último examen hace 12 meses. El paciente reporta fatiga visual al final del día por uso prolongado de pantallas. Se recomienda actualizar la graduación de los lentes y aplicar la regla 20-20-20 (cada 20 minutos, mirar a 20 pies de distancia por 20 segundos) para reducir la fatiga visual digital."
  }
];

export function DashboardUsuarioPage() {
  const { textSize } = useOutletContext<OutletContext>();
  const [activeTab, setActiveTab] = useState<"citas" | "favoritos" | "perfil" | "pedidos">("citas");
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock favorite products
  const favoriteProducts = products.filter(p => p.isBestSeller).slice(0, 4);

  const updateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(prev =>
      prev.map(appt => appt.id === updatedAppointment.id ? updatedAppointment : appt)
    );
  };

  const userNavItems = [
    { id: "citas" as const,     icon: <Calendar className="w-5 h-5" />,    label: "Mis Citas" },
    { id: "pedidos" as const,   icon: <Package className="w-5 h-5" />,     label: "Mis Pedidos" },
    { id: "favoritos" as const, icon: <Heart className="w-5 h-5" />,       label: "Favoritos" },
    { id: "perfil" as const,    icon: <User className="w-5 h-5" />,        label: "Mi Perfil" },
  ];

  const activeLabelUser: Record<string, string> = {
    citas: "Mis Citas", pedidos: "Mis Pedidos", favoritos: "Favoritos", perfil: "Mi Perfil",
  };

  function UserSidebarContent({ onNav }: { onNav?: () => void }) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-5 py-6 border-b border-purple-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-primary)" }}>Mi Cuenta</p>
              <p className="text-purple-400 text-xs" style={{ fontFamily: "var(--font-secondary)" }}>Panel personal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {userNavItems.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); onNav?.(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                activeTab === id
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-purple-300 hover:bg-purple-800 hover:text-white"
              }`}
            >
              <span className={`flex-shrink-0 ${activeTab === id ? "text-white" : "text-purple-400 group-hover:text-purple-200"}`}>{icon}</span>
              <span style={{ fontFamily: "var(--font-secondary)" }}>{label}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-purple-800">
          <p className="text-purple-500 text-xs text-center" style={{ fontFamily: "var(--font-secondary)" }}>LentSoft © 2026</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 xl:w-64 bg-purple-900 flex-shrink-0 sticky top-0 h-screen">
        <UserSidebarContent />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile drawer */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-purple-900 z-50 transform transition-transform duration-300 lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-end px-4 pt-4">
          <button onClick={() => setSidebarOpen(false)} className="text-purple-400 hover:text-white p-1.5 rounded-lg hover:bg-purple-800">
            <X className="w-5 h-5" />
          </button>
        </div>
        <UserSidebarContent onNav={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-purple-100 px-4 py-3 flex items-center gap-3 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-purple-700 hover:bg-purple-50 rounded-xl transition-colors" aria-label="Abrir menú">
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <p className="text-purple-900 font-bold text-sm" style={{ fontFamily: "var(--font-primary)" }}>{activeLabelUser[activeTab]}</p>
            <p className="text-purple-500 text-xs" style={{ fontFamily: "var(--font-secondary)" }}>Mi Cuenta</p>
          </div>
        </div>

        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 hidden lg:block">
            <h1 className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.75}rem`, fontFamily: "var(--font-primary)" }}>{activeLabelUser[activeTab]}</h1>
            <p className="text-purple-500 text-sm mt-0.5" style={{ fontFamily: "var(--font-secondary)" }}>Administra tu cuenta personal</p>
          </div>

        {/* Tab Content */}
        {activeTab === "citas" && (
          <div className="space-y-6">
            {/* New Appointment Button */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
              <h2
                className="text-purple-900"
                style={{ fontSize: `${textSize * 1.5}rem` }}
              >
                Calendario de Citas
              </h2>
              <button
                onClick={() => setShowNewAppointment(!showNewAppointment)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                style={{ fontSize: `${textSize * 0.875}rem` }}
              >
                Agendar Nueva Cita
              </button>
            </div>

            {/* Calendar Component */}
            <AppointmentCalendar
              appointments={appointments}
              textSize={textSize}
              onUpdateAppointment={updateAppointment}
            />
          </div>
        )}

        {activeTab === "favoritos" && (
          <div>
            <h2 
              className="text-purple-900 mb-6"
              style={{ fontSize: `${textSize * 1.75}rem` }}
            >
              Productos Favoritos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl shadow-lg overflow-hidden group">
                  <Link to={`/producto/${product.id}`} className="block relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <button className="absolute top-4 right-4 bg-white hover:bg-red-50 p-2 rounded-full shadow-lg transition-colors">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    </button>
                  </Link>
                  <div className="p-6">
                    <Link to={`/producto/${product.id}`}>
                      <h3 
                        className="text-purple-900 mb-2 hover:text-purple-600 transition-colors"
                        style={{ fontSize: `${textSize * 1.125}rem` }}
                      >
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-purple-700 text-sm">({product.reviews})</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span 
                        className="text-purple-900 font-bold"
                        style={{ fontSize: `${textSize * 1.25}rem` }}
                      >
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-purple-400 line-through text-sm">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl transition-colors flex items-center justify-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "pedidos" && (
          <div className="space-y-6">
            <h2
              className="text-purple-900"
              style={{ fontSize: `${textSize * 1.75}rem` }}
            >
              Seguimiento de Pedidos
            </h2>

            {/* Active Orders */}
            <div className="space-y-4">
              {/* Order 1 */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className="text-purple-900"
                          style={{ fontSize: `${textSize * 1.25}rem` }}
                        >
                          Pedido #ORD-2456
                        </h3>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          En camino
                        </span>
                      </div>
                      <p className="text-purple-600 text-sm">
                        Realizado el 20 de abril, 2026
                      </p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-2xl">
                      <Truck className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="bg-purple-50 rounded-2xl p-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center">
                        <Package className="w-10 h-10 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-900 font-medium mb-1">Gafas Ray-Ban Aviador Dorado</h4>
                        <p className="text-purple-600 text-sm mb-1">Cantidad: 1</p>
                        <p className="text-purple-900 font-bold">$659.900</p>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="space-y-3 mb-4">
                    <h4 className="text-purple-900 font-medium mb-3">Estado del envío</h4>

                    {/* Step 1 - Completed */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="w-0.5 h-12 bg-green-500"></div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-purple-900 font-medium">Pedido confirmado</p>
                        <p className="text-purple-600 text-sm">20 de abril, 10:30 AM</p>
                      </div>
                    </div>

                    {/* Step 2 - Completed */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="w-0.5 h-12 bg-green-500"></div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-purple-900 font-medium">En preparación</p>
                        <p className="text-purple-600 text-sm">20 de abril, 2:45 PM</p>
                      </div>
                    </div>

                    {/* Step 3 - Current */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center animate-pulse">
                          <Truck className="w-5 h-5 text-white" />
                        </div>
                        <div className="w-0.5 h-12 bg-purple-200"></div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-purple-900 font-medium">En tránsito</p>
                        <p className="text-purple-600 text-sm">Llegada estimada: 25 de abril</p>
                      </div>
                    </div>

                    {/* Step 4 - Pending */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-purple-400" />
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-purple-600">Entregado</p>
                        <p className="text-purple-400 text-sm">Pendiente</p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="border-t-2 border-purple-100 pt-4">
                    <div className="flex items-start gap-2 text-purple-700">
                      <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Dirección de entrega:</p>
                        <p className="text-sm">Calle 123 #45-67, Bogotá, Colombia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order 2 */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className="text-purple-900"
                          style={{ fontSize: `${textSize * 1.25}rem` }}
                        >
                          Pedido #ORD-2398
                        </h3>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          Preparando
                        </span>
                      </div>
                      <p className="text-purple-600 text-sm">
                        Realizado el 15 de abril, 2026
                      </p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-2xl">
                      <Package className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="bg-purple-50 rounded-2xl p-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center">
                        <Package className="w-10 h-10 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-900 font-medium mb-1">Lentes de Contacto Acuvue Mensuales</h4>
                        <p className="text-purple-600 text-sm mb-1">Cantidad: 2 cajas</p>
                        <p className="text-purple-900 font-bold">$249.800</p>
                      </div>
                    </div>
                  </div>

                  {/* Simplified Status */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-blue-900 font-medium">Tu pedido está siendo preparado</p>
                        <p className="text-blue-700 text-sm">Será enviado en las próximas 24 horas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Past Orders */}
            <div>
              <h3
                className="text-purple-900 mb-4"
                style={{ fontSize: `${textSize * 1.25}rem` }}
              >
                Pedidos Anteriores
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-2xl shadow-md p-5 border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-purple-900 font-medium">Pedido #ORD-2156</h4>
                        <p className="text-purple-600 text-sm">Gafas Oakley Deportivas</p>
                        <p className="text-purple-500 text-sm">Entregado el 10 de marzo, 2026</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-900 font-bold">$789.900</p>
                      <button className="text-purple-600 hover:text-purple-700 text-sm mt-1">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "perfil" && (
          <div className="space-y-6">
            <h2
              className="text-purple-900"
              style={{ fontSize: `${textSize * 1.75}rem` }}
            >
              Mi Perfil
            </h2>
            
            {/* Personal Information */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h3 
                className="text-purple-900 mb-6"
                style={{ fontSize: `${textSize * 1.5}rem` }}
              >
                Información Personal
              </h3>
              <div className="flex items-center gap-6 mb-8">
                <div className="bg-purple-100 p-6 rounded-full">
                  <User className="w-16 h-16 text-purple-600" />
                </div>
                <div>
                  <h4 
                    className="text-purple-900 mb-1"
                    style={{ fontSize: `${textSize * 1.5}rem` }}
                  >
                    Juan Pérez
                  </h4>
                  <p className="text-purple-600">Cliente desde marzo 2026</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 border-2 border-purple-100 rounded-2xl">
                  <Mail className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="text-purple-600 text-sm mb-1">Correo electrónico</p>
                    <p className="text-purple-900">juan.perez@example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border-2 border-purple-100 rounded-2xl">
                  <Phone className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="text-purple-600 text-sm mb-1">Teléfono</p>
                    <p className="text-purple-900">+57 300 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border-2 border-purple-100 rounded-2xl">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="text-purple-600 text-sm mb-1">Dirección</p>
                    <p className="text-purple-900">Calle 123 #45-67, Bogotá, Colombia</p>
                  </div>
                </div>
              </div>

              <button 
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{ fontSize: `${textSize}rem` }}
              >
                Editar Perfil
              </button>
            </div>

            {/* Prescription History */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-purple-600" />
                <h3 
                  className="text-purple-900"
                  style={{ fontSize: `${textSize * 1.5}rem` }}
                >
                  Historial Médico de Citas
                </h3>
              </div>

              <div className="space-y-6">
                {mockPrescriptionHistory.map((record, index) => (
                  <div 
                    key={record.id} 
                    className="border-2 border-purple-100 rounded-2xl p-6 hover:border-purple-300 transition-colors"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4 pb-4 border-b-2 border-purple-50">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-purple-600" />
                          <span 
                            className="text-purple-900 font-semibold"
                            style={{ fontSize: `${textSize * 1.125}rem` }}
                          >
                            {new Date(record.date).toLocaleDateString('es-CO', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <p className="text-purple-700" style={{ fontSize: `${textSize * 0.875}rem` }}>
                          {record.examType}
                        </p>
                        <p className="text-purple-600" style={{ fontSize: `${textSize * 0.875}rem` }}>
                          Atendido por: {record.doctor}
                        </p>
                      </div>
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Completada
                      </span>
                    </div>

                    {/* Diagnosis */}
                    <div className="mb-4">
                      <h4 
                        className="text-purple-900 font-semibold mb-2 flex items-center gap-2"
                        style={{ fontSize: `${textSize}rem` }}
                      >
                        <Eye className="w-5 h-5 text-purple-600" />
                        Diagnóstico
                      </h4>
                      <p className="text-purple-800 bg-purple-50 p-4 rounded-xl" style={{ fontSize: `${textSize * 0.875}rem` }}>
                        {record.diagnosis}
                      </p>
                    </div>

                    {/* Prescription Details */}
                    <div className="mb-4">
                      <h4 
                        className="text-purple-900 font-semibold mb-3"
                        style={{ fontSize: `${textSize}rem` }}
                      >
                        Fórmula Prescrita
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Right Eye */}
                        <div className="bg-purple-50 p-4 rounded-xl">
                          <p className="text-purple-900 font-semibold mb-3" style={{ fontSize: `${textSize * 0.875}rem` }}>
                            Ojo Derecho (OD)
                          </p>
                          <div className="space-y-2 text-purple-800" style={{ fontSize: `${textSize * 0.875}rem` }}>
                            <div className="flex justify-between">
                              <span className="text-purple-600">Esfera:</span>
                              <span className="font-mono font-semibold">{record.prescription.rightEye.sphere}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-purple-600">Cilindro:</span>
                              <span className="font-mono font-semibold">{record.prescription.rightEye.cylinder}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-purple-600">Eje:</span>
                              <span className="font-mono font-semibold">{record.prescription.rightEye.axis}°</span>
                            </div>
                            {record.prescription.rightEye.addition && (
                              <div className="flex justify-between">
                                <span className="text-purple-600">Adición:</span>
                                <span className="font-mono font-semibold">{record.prescription.rightEye.addition}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Left Eye */}
                        <div className="bg-purple-50 p-4 rounded-xl">
                          <p className="text-purple-900 font-semibold mb-3" style={{ fontSize: `${textSize * 0.875}rem` }}>
                            Ojo Izquierdo (OI)
                          </p>
                          <div className="space-y-2 text-purple-800" style={{ fontSize: `${textSize * 0.875}rem` }}>
                            <div className="flex justify-between">
                              <span className="text-purple-600">Esfera:</span>
                              <span className="font-mono font-semibold">{record.prescription.leftEye.sphere}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-purple-600">Cilindro:</span>
                              <span className="font-mono font-semibold">{record.prescription.leftEye.cylinder}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-purple-600">Eje:</span>
                              <span className="font-mono font-semibold">{record.prescription.leftEye.axis}°</span>
                            </div>
                            {record.prescription.leftEye.addition && (
                              <div className="flex justify-between">
                                <span className="text-purple-600">Adición:</span>
                                <span className="font-mono font-semibold">{record.prescription.leftEye.addition}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {record.prescription.pupillaryDistance && (
                        <div className="mt-3 bg-white border-2 border-purple-200 p-3 rounded-xl">
                          <div className="flex justify-between items-center">
                            <span className="text-purple-700 font-semibold" style={{ fontSize: `${textSize * 0.875}rem` }}>
                              Distancia Pupilar (DP):
                            </span>
                            <span className="text-purple-900 font-mono font-semibold" style={{ fontSize: `${textSize * 0.875}rem` }}>
                              {record.prescription.pupillaryDistance}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Notes and Reason */}
                    <div>
                      <h4 
                        className="text-purple-900 font-semibold mb-2"
                        style={{ fontSize: `${textSize}rem` }}
                      >
                        Observaciones y Recomendaciones
                      </h4>
                      <p className="text-purple-700 bg-blue-50 p-4 rounded-xl leading-relaxed" style={{ fontSize: `${textSize * 0.875}rem` }}>
                        {record.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>{/* end flex-1 content */}
      </div>{/* end right column */}

      {/* New Appointment Modal */}
      <NewAppointmentModal
        isOpen={showNewAppointment}
        onClose={() => setShowNewAppointment(false)}
        textSize={textSize}
        existingAppointments={appointments}
      />
    </div>
  );
}