import { useState } from "react";
import { useOutletContext } from "react-router";
import {
  Package,
  Calendar,
  Users,
  FileText,
  TrendingUp,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  ShoppingBag,
  UserCog,
  X,
  Filter,
  ArrowUpDown,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Receipt,
  CreditCard,
  Wallet,
  Smartphone,
  Percent,
  Truck,
  History,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import { formatPrice } from "../../models/data/products";

const PAGE_SIZE = 5;

function usePagination<T>(items: T[]) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, items.length);
  const slice = items.slice(start, end);
  return { slice, page: safePage, setPage, totalPages, start, end, total: items.length };
}

function TableSearchBar({ search, setSearch, placeholder }: {
  search: string;
  setSearch: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 rounded-t-3xl">
      <div className="flex items-center gap-3 text-white">
        <span className="text-sm font-medium">Mostrar</span>
        <div className="bg-purple-950 border-2 border-purple-600 rounded-lg px-3 py-1.5 shadow-inner">
          <span className="text-white font-semibold">{PAGE_SIZE}</span>
        </div>
        <span className="text-sm font-medium">registros</span>
      </div>
      <div className="flex items-center gap-3 text-white w-full sm:w-auto">
        <span className="text-sm font-medium whitespace-nowrap">Buscar:</span>
        <div className="relative flex-1 sm:flex-initial">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder || "Buscar..."}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border-2 border-purple-600 bg-purple-950 text-white placeholder-purple-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all shadow-inner"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TableFooter({ start, end, total, page, totalPages, setPage }: {
  start: number; end: number; total: number;
  page: number; totalPages: number; setPage: (p: number) => void;
}) {
  if (total === 0) return null;
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-purple-100 bg-purple-50/40">
      <p className="text-sm text-purple-600">
        Mostrando registros del{" "}
        <span className="font-semibold text-purple-900">{start + 1}</span>{" "}
        al{" "}
        <span className="font-semibold text-purple-900">{end}</span>{" "}
        de un total de{" "}
        <span className="font-semibold text-purple-900">{total}</span>{" "}
        {total === 1 ? "registro" : "registros"}
      </p>
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-purple-600 text-white" : "text-purple-600 hover:bg-purple-100"}`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

interface OutletContext {
  textSize: number;
}

interface ModulePermissions {
  ver: boolean;
  editar: boolean;
  eliminar: boolean;
}

interface UserPermissions {
  inventario: ModulePermissions;
  citas: ModulePermissions;
  usuarios: ModulePermissions;
  ventas: ModulePermissions;
  facturas: ModulePermissions;
  trabajadores: ModulePermissions;
}

interface User {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  pedidos: number;
  ultimaCompra: string;
  rol?: "administrador" | "vendedor" | "trabajador" | "solo lectura";
  permisos?: UserPermissions;
}

interface Employee {
  id: number;
  nombre: string;
  rol: string;
  email: string;
  telefono: string;
  especialidad: string;
}

interface Invoice {
  id: string;
  cliente: string;
  fecha: string;
  total: number;
  estado: string;
}

interface Order {
  id: string;
  cliente: string;
  producto: string;
  total: number;
  estado: string;
}

interface Appointment {
  id: number;
  paciente: string;
  fecha: string;
  hora: string;
  optometra: string;
  tipo: string;
  estado: string;
}

interface SaleProduct {
  id: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

interface Sale {
  id: string;
  cliente: string;
  documento: string;
  telefono: string;
  fecha: string;
  productos: SaleProduct[];
  subtotal: number;
  descuento: number;
  iva: number;
  total: number;
  metodoPago: string;
  estado: string;
  observaciones: string;
}

interface Proveedor {
  id: string;
  nombre: string;
  tipoProductos: string;
  telefono: string;
  correo: string;
}

interface MovimientoInventario {
  id: number;
  producto: string;
  tipo: "Entrada" | "Salida";
  cantidad: number;
  fecha: string;
}

const DEFAULT_PERMISSIONS: UserPermissions = {
  inventario: { ver: false, editar: false, eliminar: false },
  citas: { ver: false, editar: false, eliminar: false },
  usuarios: { ver: false, editar: false, eliminar: false },
  ventas: { ver: false, editar: false, eliminar: false },
  facturas: { ver: false, editar: false, eliminar: false },
  trabajadores: { ver: false, editar: false, eliminar: false },
};

const EMPTY_USER = { nombre: "", email: "", telefono: "", pedidos: 0, ultimaCompra: new Date().toISOString().split("T")[0], rol: "solo lectura" as const, permisos: { ...DEFAULT_PERMISSIONS } };
const EMPTY_EMPLOYEE = { nombre: "", rol: "Vendedor", email: "", telefono: "", especialidad: "" };
const EMPTY_INVOICE = { id: "", cliente: "", fecha: new Date().toISOString().split("T")[0], total: 0, estado: "Pendiente" };
const EMPTY_ORDER = { id: "", cliente: "", producto: "", total: 0, estado: "Pendiente" };
const EMPTY_SALE = {
  id: "",
  cliente: "",
  documento: "",
  telefono: "",
  fecha: new Date().toISOString().split("T")[0],
  productos: [],
  subtotal: 0,
  descuento: 0,
  iva: 19,
  total: 0,
  metodoPago: "Efectivo",
  estado: "Pendiente",
  observaciones: ""
};

function ConfirmDialog({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 p-3 rounded-2xl">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-purple-900 font-medium">{message}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-purple-900 font-medium transition-colors">
            Cancelar
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

function CrudActions({ onView, onEdit, onDelete }: { onView?: () => void; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {onView && (
        <button
          onClick={onView}
          className="flex items-center gap-1.5 px-3 py-1.5 text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 hover:border-purple-300 rounded-lg transition-all duration-200 hover:shadow-md group focus:outline-none focus:ring-2 focus:ring-purple-500"
          title="Ver detalle"
        >
          <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium hidden sm:inline">Ver</span>
        </button>
      )}
      <button
        onClick={onEdit}
        className="flex items-center gap-1.5 px-3 py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition-all duration-200 hover:shadow-md group focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Editar"
      >
        <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium hidden sm:inline">Editar</span>
      </button>
      <button
        onClick={onDelete}
        className="flex items-center gap-1.5 px-3 py-1.5 text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg transition-all duration-200 hover:shadow-md group focus:outline-none focus:ring-2 focus:ring-red-500"
        title="Eliminar"
      >
        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium hidden sm:inline">Eliminar</span>
      </button>
    </div>
  );
}

function ModalWrapper({ title, subtitle, onClose, children }: { title: string; subtitle?: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between p-6 pb-4 border-b border-purple-100">
          <div>
            <h2 className="text-purple-900 font-bold text-lg">{title}</h2>
            {subtitle && <p className="text-purple-500 text-sm mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors ml-4 flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-purple-700 text-sm font-medium mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-4 py-2.5 rounded-xl border-2 border-purple-200 focus:border-purple-600 focus:outline-none bg-white text-purple-900";

export function DashboardAdminPage() {
  const { textSize } = useOutletContext<OutletContext>();
  const [activeTab, setActiveTab] = useState<"general" | "inventario" | "citas" | "usuarios" | "trabajadores" | "facturas" | "ventas">("general");
  const [inventorySubTab, setInventorySubTab] = useState<"productos" | "proveedores" | "historial">("productos");
  const [categoryFilter, setCategoryFilter] = useState<string>("Todos");
  const [confirmAction, setConfirmAction] = useState<{ message: string; onConfirm: () => void } | null>(null);

  // ── USUARIOS ──────────────────────────────────────────────────────────────
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      nombre: "María García",
      email: "maria.garcia@email.com",
      telefono: "+57 300 111 2222",
      pedidos: 12,
      ultimaCompra: "2026-03-15",
      rol: "administrador",
      permisos: {
        inventario: { ver: true, editar: true, eliminar: true },
        citas: { ver: true, editar: true, eliminar: true },
        usuarios: { ver: true, editar: true, eliminar: true },
        ventas: { ver: true, editar: true, eliminar: true },
        facturas: { ver: true, editar: true, eliminar: true },
        trabajadores: { ver: true, editar: true, eliminar: true },
      }
    },
    {
      id: 2,
      nombre: "Carlos López",
      email: "carlos.lopez@email.com",
      telefono: "+57 301 222 3333",
      pedidos: 8,
      ultimaCompra: "2026-03-18",
      rol: "vendedor",
      permisos: {
        inventario: { ver: true, editar: true, eliminar: false },
        citas: { ver: true, editar: true, eliminar: false },
        usuarios: { ver: true, editar: false, eliminar: false },
        ventas: { ver: true, editar: true, eliminar: false },
        facturas: { ver: true, editar: false, eliminar: false },
        trabajadores: { ver: false, editar: false, eliminar: false },
      }
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      email: "ana.martinez@email.com",
      telefono: "+57 302 333 4444",
      pedidos: 15,
      ultimaCompra: "2026-03-20",
      rol: "trabajador",
      permisos: {
        inventario: { ver: true, editar: false, eliminar: false },
        citas: { ver: true, editar: true, eliminar: false },
        usuarios: { ver: false, editar: false, eliminar: false },
        ventas: { ver: true, editar: false, eliminar: false },
        facturas: { ver: false, editar: false, eliminar: false },
        trabajadores: { ver: false, editar: false, eliminar: false },
      }
    },
    {
      id: 4,
      nombre: "Luis Fernández",
      email: "luis.fernandez@email.com",
      telefono: "+57 303 444 5555",
      pedidos: 5,
      ultimaCompra: "2026-04-02",
      rol: "solo lectura",
      permisos: {
        inventario: { ver: true, editar: false, eliminar: false },
        citas: { ver: true, editar: false, eliminar: false },
        usuarios: { ver: false, editar: false, eliminar: false },
        ventas: { ver: true, editar: false, eliminar: false },
        facturas: { ver: true, editar: false, eliminar: false },
        trabajadores: { ver: false, editar: false, eliminar: false },
      }
    },
  ]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState({ ...EMPTY_USER });
  const [userSearch, setUserSearch] = useState("");

  const filteredUsers = users.filter(u =>
    u.nombre.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const openAddUser = () => { setEditingUser(null); setUserForm({ ...EMPTY_USER }); setShowUserModal(true); };
  const openEditUser = (u: User) => {
    setEditingUser(u);
    setUserForm({
      nombre: u.nombre,
      email: u.email,
      telefono: u.telefono,
      pedidos: u.pedidos,
      ultimaCompra: u.ultimaCompra,
      rol: u.rol || "solo lectura",
      permisos: u.permisos || { ...DEFAULT_PERMISSIONS }
    });
    setShowUserModal(true);
  };
  const saveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userForm } : u));
    } else {
      setUsers([...users, { id: Date.now(), ...userForm }]);
    }
    setShowUserModal(false);
  };
  const deleteUser = (id: number) => setConfirmAction({
    message: "¿Eliminar este usuario? Esta acción no se puede deshacer.",
    onConfirm: () => { setUsers(users.filter(u => u.id !== id)); setConfirmAction(null); }
  });

  // ── EMPLEADOS ─────────────────────────────────────────────────────────────
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, nombre: "Dr. Carlos Mendoza", rol: "Optómetra", email: "c.mendoza@lentsoft.com", telefono: "+57 310 444 5555", especialidad: "Optometría clínica" },
    { id: 2, nombre: "Dra. María González", rol: "Optómetra", email: "m.gonzalez@lentsoft.com", telefono: "+57 311 555 6666", especialidad: "Lentes de contacto" },
    { id: 3, nombre: "Juan Pérez", rol: "Vendedor", email: "j.perez@lentsoft.com", telefono: "+57 312 666 7777", especialidad: "Atención al cliente" },
    { id: 4, nombre: "Sandra Ruiz", rol: "Administrador", email: "s.ruiz@lentsoft.com", telefono: "+57 313 777 8888", especialidad: "Gestión y finanzas" },
  ]);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeForm, setEmployeeForm] = useState({ ...EMPTY_EMPLOYEE });
  const [employeeSearch, setEmployeeSearch] = useState("");

  const filteredEmployees = employees.filter(e =>
    e.nombre.toLowerCase().includes(employeeSearch.toLowerCase()) ||
    e.email.toLowerCase().includes(employeeSearch.toLowerCase()) ||
    e.rol.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const openAddEmployee = () => { setEditingEmployee(null); setEmployeeForm({ ...EMPTY_EMPLOYEE }); setShowEmployeeModal(true); };
  const openEditEmployee = (e: Employee) => { setEditingEmployee(e); setEmployeeForm({ nombre: e.nombre, rol: e.rol, email: e.email, telefono: e.telefono, especialidad: e.especialidad }); setShowEmployeeModal(true); };
  const saveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(employees.map(em => em.id === editingEmployee.id ? { ...em, ...employeeForm } : em));
    } else {
      setEmployees([...employees, { id: Date.now(), ...employeeForm }]);
    }
    setShowEmployeeModal(false);
  };
  const deleteEmployee = (id: number) => setConfirmAction({
    message: "¿Eliminar este trabajador del sistema?",
    onConfirm: () => { setEmployees(employees.filter(e => e.id !== id)); setConfirmAction(null); }
  });

  // ── FACTURAS ──────────────────────────────────────────────────────────────
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: "FAC-001", cliente: "María García", fecha: "2026-03-20", total: 659900, estado: "Pagada" },
    { id: "FAC-002", cliente: "Carlos López", fecha: "2026-03-19", total: 124900, estado: "Pendiente" },
    { id: "FAC-003", cliente: "Ana Martínez", fecha: "2026-03-18", total: 789900, estado: "Pagada" },
    { id: "FAC-004", cliente: "Luis Fernández", fecha: "2026-04-01", total: 325900, estado: "Pendiente" },
  ]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [invoiceForm, setInvoiceForm] = useState({ ...EMPTY_INVOICE });
  const [invoiceSearch, setInvoiceSearch] = useState("");

  const filteredInvoices = invoices.filter(inv =>
    inv.id.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
    inv.cliente.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
    inv.estado.toLowerCase().includes(invoiceSearch.toLowerCase())
  );

  const openAddInvoice = () => { setEditingInvoice(null); setInvoiceForm({ ...EMPTY_INVOICE, id: `FAC-${String(invoices.length + 1).padStart(3, "0")}` }); setShowInvoiceModal(true); };
  const openEditInvoice = (inv: Invoice) => { setEditingInvoice(inv); setInvoiceForm({ id: inv.id, cliente: inv.cliente, fecha: inv.fecha, total: inv.total, estado: inv.estado }); setShowInvoiceModal(true); };
  const saveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingInvoice) {
      setInvoices(invoices.map(inv => inv.id === editingInvoice.id ? { ...invoiceForm } : inv));
    } else {
      setInvoices([...invoices, { ...invoiceForm }]);
    }
    setShowInvoiceModal(false);
  };
  const deleteInvoice = (id: string) => setConfirmAction({
    message: `¿Eliminar la factura ${id}? Esta acción no se puede deshacer.`,
    onConfirm: () => { setInvoices(invoices.filter(inv => inv.id !== id)); setConfirmAction(null); }
  });

  // ── PEDIDOS (General) ─────────────────────────────────────────────────────
  const [recentOrders, setRecentOrders] = useState<Order[]>([
    { id: "ORD-001", cliente: "María García", producto: "Gafas Ray-Ban Aviador", total: 659900, estado: "Completado" },
    { id: "ORD-002", cliente: "Carlos López", producto: "Lentes Acuvue", total: 124900, estado: "En proceso" },
    { id: "ORD-003", cliente: "Ana Martínez", producto: "Gafas Oakley", total: 789900, estado: "Pendiente" },
    { id: "ORD-004", cliente: "Luis Fernández", producto: "Gafas de Sol Polarizadas", total: 325900, estado: "Pendiente" },
  ]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [orderForm, setOrderForm] = useState({ ...EMPTY_ORDER });
  const [orderSearch, setOrderSearch] = useState("");

  const filteredOrders = recentOrders.filter(o =>
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.cliente.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.producto.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.estado.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const openAddOrder = () => { setEditingOrder(null); setOrderForm({ ...EMPTY_ORDER, id: `ORD-${String(recentOrders.length + 1).padStart(3, "0")}` }); setShowOrderModal(true); };
  const openEditOrder = (o: Order) => { setEditingOrder(o); setOrderForm({ id: o.id, cliente: o.cliente, producto: o.producto, total: o.total, estado: o.estado }); setShowOrderModal(true); };
  const saveOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      setRecentOrders(recentOrders.map(o => o.id === editingOrder.id ? { ...orderForm } : o));
    } else {
      setRecentOrders([...recentOrders, { ...orderForm }]);
    }
    setShowOrderModal(false);
  };
  const deleteOrder = (id: string) => setConfirmAction({
    message: `¿Eliminar el pedido ${id}?`,
    onConfirm: () => { setRecentOrders(recentOrders.filter(o => o.id !== id)); setConfirmAction(null); }
  });

  // ── VENTAS ────────────────────────────────────────────────────────────────
  const [sales, setSales] = useState<Sale[]>([
    {
      id: "VEN-001",
      cliente: "María García",
      documento: "1001234567",
      telefono: "310 123 4567",
      fecha: "2026-05-15",
      productos: [
        { id: 1, nombre: "Gafas Ray-Ban Aviador", cantidad: 1, precioUnitario: 659900, subtotal: 659900 },
        { id: 2, nombre: "Estuche Premium", cantidad: 1, precioUnitario: 45900, subtotal: 45900 }
      ],
      subtotal: 705800,
      descuento: 5,
      iva: 19,
      total: 710991,
      metodoPago: "Tarjeta",
      estado: "Completado",
      observaciones: "Cliente frecuente, aplicar descuento"
    },
    {
      id: "VEN-002",
      cliente: "Carlos López",
      documento: "900234456",
      telefono: "320 456 7890",
      fecha: "2026-05-16",
      productos: [
        { id: 1, nombre: "Lentes Acuvue Mensuales", cantidad: 2, precioUnitario: 124900, subtotal: 249800 }
      ],
      subtotal: 249800,
      descuento: 0,
      iva: 19,
      total: 297262,
      metodoPago: "Efectivo",
      estado: "Pendiente",
      observaciones: ""
    }
  ]);

  const [showSaleModal, setShowSaleModal] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [saleForm, setSaleForm] = useState<Sale>({ ...EMPTY_SALE });
  const [saleSearch, setSaleSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<{ nombre: string; precio: number } | null>(null);
  const [productQty, setProductQty] = useState(1);

  const filteredSales = sales.filter(s =>
    s.id.toLowerCase().includes(saleSearch.toLowerCase()) ||
    s.cliente.toLowerCase().includes(saleSearch.toLowerCase()) ||
    s.documento.toLowerCase().includes(saleSearch.toLowerCase()) ||
    s.metodoPago.toLowerCase().includes(saleSearch.toLowerCase()) ||
    s.estado.toLowerCase().includes(saleSearch.toLowerCase())
  );

  const calculateSaleTotals = (productos: SaleProduct[], descuento: number) => {
    const subtotal = productos.reduce((acc, p) => acc + p.subtotal, 0);
    const descuentoAmount = (subtotal * descuento) / 100;
    const baseImponible = subtotal - descuentoAmount;
    const iva = baseImponible * 0.19;
    const total = baseImponible + iva;
    return { subtotal, iva, total };
  };

  const addProductToSale = () => {
    if (!selectedProduct || productQty <= 0) return;

    const newProduct: SaleProduct = {
      id: Date.now(),
      nombre: selectedProduct.nombre,
      cantidad: productQty,
      precioUnitario: selectedProduct.precio,
      subtotal: selectedProduct.precio * productQty
    };

    const updatedProducts = [...saleForm.productos, newProduct];
    const totals = calculateSaleTotals(updatedProducts, saleForm.descuento);

    setSaleForm({
      ...saleForm,
      productos: updatedProducts,
      ...totals
    });

    setSelectedProduct(null);
    setProductSearch("");
    setProductQty(1);
  };

  const removeProductFromSale = (productId: number) => {
    const updatedProducts = saleForm.productos.filter(p => p.id !== productId);
    const totals = calculateSaleTotals(updatedProducts, saleForm.descuento);

    setSaleForm({
      ...saleForm,
      productos: updatedProducts,
      ...totals
    });
  };

  const updateSaleDiscount = (discount: number) => {
    const totals = calculateSaleTotals(saleForm.productos, discount);
    setSaleForm({
      ...saleForm,
      descuento: discount,
      ...totals
    });
  };

  const openAddSale = () => {
    setEditingSale(null);
    setSaleForm({
      ...EMPTY_SALE,
      id: `VEN-${String(sales.length + 1).padStart(3, "0")}`,
      fecha: new Date().toISOString().split("T")[0]
    });
    setShowSaleModal(true);
  };

  const openEditSale = (sale: Sale) => {
    setEditingSale(sale);
    setSaleForm({ ...sale });
    setShowSaleModal(true);
  };

  const saveSale = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!saleForm.cliente.trim()) {
      alert("Por favor ingrese el nombre del cliente");
      return;
    }
    if (!saleForm.documento.trim()) {
      alert("Por favor ingrese el documento del cliente");
      return;
    }
    if (saleForm.productos.length === 0) {
      alert("Debe agregar al menos un producto a la venta");
      return;
    }
    if (!saleForm.metodoPago) {
      alert("Por favor seleccione un método de pago");
      return;
    }

    if (editingSale) {
      setSales(sales.map(s => s.id === editingSale.id ? { ...saleForm } : s));
    } else {
      setSales([...sales, { ...saleForm }]);
    }

    // Resetear formulario
    setSaleForm({
      id: `V-${Date.now()}`,
      cliente: "",
      documento: "",
      telefono: "",
      fecha: new Date().toISOString().split("T")[0],
      productos: [],
      subtotal: 0,
      descuento: 0,
      iva: 0,
      total: 0,
      metodoPago: "",
      estado: "Pendiente",
      observaciones: ""
    });
    setEditingSale(null);
    setShowSaleModal(false);
  };

  const deleteSale = (id: string) => setConfirmAction({
    message: `¿Eliminar la venta ${id}? Esta acción no se puede deshacer.`,
    onConfirm: () => { setSales(sales.filter(s => s.id !== id)); setConfirmAction(null); }
  });

  // ── CITAS ─────────────────────────────────────────────────────────────────
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, paciente: "Juan Pérez", fecha: "2026-03-22", hora: "10:00 AM", optometra: "Dr. Carlos Mendoza", tipo: "Examen completo", estado: "Confirmada" },
    { id: 2, paciente: "Laura Rodríguez", fecha: "2026-03-22", hora: "11:30 AM", optometra: "Dra. María González", tipo: "Revisión lentes", estado: "Confirmada" },
    { id: 3, paciente: "Pedro Sánchez", fecha: "2026-03-23", hora: "2:00 PM", optometra: "Dr. Juan Pérez", tipo: "Ajuste montura", estado: "Pendiente" },
    { id: 4, paciente: "Ana Martínez", fecha: "2026-03-21", hora: "9:00 AM", optometra: "Dr. Carlos Mendoza", tipo: "Examen completo", estado: "Confirmada" },
  ]);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [appointmentForm, setAppointmentForm] = useState({ paciente: "", fecha: "", hora: "", optometra: "", tipo: "", estado: "Pendiente" });
  const [appointmentSort, setAppointmentSort] = useState<"alfabetico-az" | "alfabetico-za" | "fecha-reciente" | "fecha-antigua">("fecha-reciente");
  const [appointmentSearch, setAppointmentSearch] = useState("");

  const filteredAppointments = appointments.filter(a =>
    a.paciente.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
    a.optometra.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
    a.tipo.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
    a.estado.toLowerCase().includes(appointmentSearch.toLowerCase())
  );

  const openAddAppointment = () => { setEditingAppointment(null); setAppointmentForm({ paciente: "", fecha: "", hora: "", optometra: "", tipo: "", estado: "Pendiente" }); setShowAppointmentModal(true); };
  const openEditAppointment = (a: Appointment) => { setEditingAppointment(a); setAppointmentForm({ paciente: a.paciente, fecha: a.fecha, hora: a.hora, optometra: a.optometra, tipo: a.tipo, estado: a.estado }); setShowAppointmentModal(true); };
  const saveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAppointment) {
      setAppointments(appointments.map(a => a.id === editingAppointment.id ? { ...a, ...appointmentForm } : a));
    } else {
      setAppointments([...appointments, { id: Date.now(), ...appointmentForm }]);
    }
    setShowAppointmentModal(false);
  };
  const deleteAppointment = (id: number) => setConfirmAction({
    message: "¿Eliminar esta cita?",
    onConfirm: () => { setAppointments(appointments.filter(a => a.id !== id)); setConfirmAction(null); }
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (appointmentSort === "alfabetico-az") return a.paciente.localeCompare(b.paciente);
    if (appointmentSort === "alfabetico-za") return b.paciente.localeCompare(a.paciente);
    if (appointmentSort === "fecha-reciente") return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
  });

  // ── INVENTARIO ────────────────────────────────────────────────────────────
  const [inventory, setInventory] = useState([
    { id: 1, nombre: "Gafas Ray-Ban Aviador", categoria: "Gafas", stock: 45, precio: 659900 },
    { id: 2, nombre: "Lentes Acuvue Mensuales", categoria: "Lentes", stock: 120, precio: 124900 },
    { id: 3, nombre: "Gafas Oakley Deportivas", categoria: "Gafas", stock: 28, precio: 789900 },
    { id: 4, nombre: "Gafas Wayfarer", categoria: "Gafas", stock: 62, precio: 539900 },
    { id: 5, nombre: "Lentes Biofinity Tóricas", categoria: "Lentes", stock: 85, precio: 189900 },
    { id: 6, nombre: "Lentes Air Optix", categoria: "Lentes", stock: 95, precio: 165900 },
    { id: 7, nombre: "Gafas Gucci Clásicas", categoria: "Gafas", stock: 18, precio: 1250000 },
    { id: 8, nombre: "Estuche Rígido Premium", categoria: "Accesorios", stock: 150, precio: 45900 },
    { id: 9, nombre: "Líquido Limpiador 360ml", categoria: "Accesorios", stock: 200, precio: 28900 },
    { id: 10, nombre: "Paño Microfibra Set 3", categoria: "Accesorios", stock: 180, precio: 15900 },
    { id: 11, nombre: "Gafas Polo Sport", categoria: "Gafas", stock: 35, precio: 425900 },
    { id: 12, nombre: "Lentes Freshlook Colorblends", categoria: "Lentes", stock: 65, precio: 139900 },
    { id: 13, nombre: "Solución Multiuso 240ml", categoria: "Accesorios", stock: 175, precio: 32900 },
    { id: 14, nombre: "Gafas de Sol Polarizadas", categoria: "Gafas", stock: 42, precio: 325900 },
    { id: 15, nombre: "Cadena para Gafas Elegante", categoria: "Accesorios", stock: 90, precio: 18900 },
  ]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({ nombre: "", categoria: "Gafas", stock: 0, precio: 0, descripcion: "", marca: "", modelo: "" });
  const [inventorySearch, setInventorySearch] = useState("");

  const filteredInventory = (categoryFilter === "Todos" ? inventory : inventory.filter(item => item.categoria === categoryFilter))
    .filter(item =>
      item.nombre.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.categoria.toLowerCase().includes(inventorySearch.toLowerCase())
    );

  const openAddProduct = () => { setEditingProduct(null); setProductForm({ nombre: "", categoria: "Gafas", stock: 0, precio: 0, descripcion: "", marca: "", modelo: "" }); setShowProductModal(true); };
  const openEditProduct = (p: any) => { setEditingProduct(p); setProductForm({ nombre: p.nombre, categoria: p.categoria, stock: p.stock, precio: p.precio, descripcion: "", marca: "", modelo: "" }); setShowProductModal(true); };
  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setInventory(inventory.map(p => p.id === editingProduct.id ? { ...p, nombre: productForm.nombre, categoria: productForm.categoria, stock: productForm.stock, precio: productForm.precio } : p));
    } else {
      setInventory([...inventory, { id: Date.now(), nombre: productForm.nombre, categoria: productForm.categoria, stock: productForm.stock, precio: productForm.precio }]);
    }
    setShowProductModal(false);
  };
  const deleteProduct = (id: number) => setConfirmAction({
    message: "¿Eliminar este producto del inventario?",
    onConfirm: () => { setInventory(inventory.filter(p => p.id !== id)); setConfirmAction(null); }
  });

  // ── PROVEEDORES ───────────────────────────────────────────────────────────
  const [proveedores, setProveedores] = useState<Proveedor[]>([
    { id: "PROV001", nombre: "Vision Center Supplies", tipoProductos: "Monturas y lentes", telefono: "3104567890", correo: "ventas@visioncenter.com" },
    { id: "PROV002", nombre: "OptiLens Colombia", tipoProductos: "Lentes formulados", telefono: "3209876543", correo: "contacto@optilens.com" },
    { id: "PROV003", nombre: "SunGlass Import", tipoProductos: "Gafas de sol", telefono: "3112233445", correo: "info@sunglassimport.com" },
    { id: "PROV004", nombre: "Luxottica", tipoProductos: "Monturas de marca", telefono: "3001122334", correo: "soporte@luxottica.com" },
    { id: "PROV005", nombre: "Essilor Colombia", tipoProductos: "Lentes oftálmicos", telefono: "3015566778", correo: "servicio@essilor.com" },
    { id: "PROV006", nombre: "Johnson & Johnson Vision", tipoProductos: "Lentes de contacto", telefono: "3159988776", correo: "ventas@jjvision.com" },
    { id: "PROV007", nombre: "Ópticas Distribuciones SAS", tipoProductos: "Accesorios ópticos", telefono: "3184455667", correo: "pedidos@opticasas.com" },
    { id: "PROV008", nombre: "EyeCare Medical", tipoProductos: "Equipos médicos", telefono: "3126677889", correo: "comercial@eyecare.com" },
    { id: "PROV009", nombre: "BioLens Labs", tipoProductos: "Líquidos y limpieza", telefono: "3192233554", correo: "info@biolens.com" },
    { id: "PROV010", nombre: "Fashion Frames", tipoProductos: "Monturas modernas", telefono: "3147788990", correo: "ventas@fashionframes.com" },
  ]);
  const [showProveedorModal, setShowProveedorModal] = useState(false);
  const [editingProveedor, setEditingProveedor] = useState<Proveedor | null>(null);
  const [proveedorForm, setProveedorForm] = useState({ id: "", nombre: "", tipoProductos: "", telefono: "", correo: "" });
  const [proveedorSearch, setProveedorSearch] = useState("");

  const filteredProveedores = proveedores.filter(p =>
    p.nombre.toLowerCase().includes(proveedorSearch.toLowerCase()) ||
    p.tipoProductos.toLowerCase().includes(proveedorSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(proveedorSearch.toLowerCase())
  );

  const openAddProveedor = () => {
    const nextId = `PROV${String(proveedores.length + 1).padStart(3, "0")}`;
    setEditingProveedor(null);
    setProveedorForm({ id: nextId, nombre: "", tipoProductos: "", telefono: "", correo: "" });
    setShowProveedorModal(true);
  };
  const openEditProveedor = (p: Proveedor) => {
    setEditingProveedor(p);
    setProveedorForm({ id: p.id, nombre: p.nombre, tipoProductos: p.tipoProductos, telefono: p.telefono, correo: p.correo });
    setShowProveedorModal(true);
  };
  const saveProveedor = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProveedor) {
      setProveedores(proveedores.map(p => p.id === editingProveedor.id ? { ...proveedorForm } : p));
    } else {
      setProveedores([...proveedores, { ...proveedorForm }]);
    }
    setShowProveedorModal(false);
  };
  const deleteProveedor = (id: string) => setConfirmAction({
    message: "¿Eliminar este proveedor?",
    onConfirm: () => { setProveedores(proveedores.filter(p => p.id !== id)); setConfirmAction(null); }
  });

  // ── HISTORIAL DE MOVIMIENTOS ──────────────────────────────────────────────
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([
    { id: 1, producto: "Gafas Ray-Ban Aviador", tipo: "Entrada", cantidad: 5, fecha: "2026-05-22" },
    { id: 2, producto: "Gafas Ray-Ban Aviador", tipo: "Salida", cantidad: 2, fecha: "2026-05-22" },
    { id: 3, producto: "Lentes Acuvue Mensuales", tipo: "Entrada", cantidad: 30, fecha: "2026-05-20" },
    { id: 4, producto: "Gafas Oakley Deportivas", tipo: "Salida", cantidad: 3, fecha: "2026-05-19" },
    { id: 5, producto: "Lentes Biofinity Tóricas", tipo: "Entrada", cantidad: 20, fecha: "2026-05-18" },
  ]);
  const [showMovimientoModal, setShowMovimientoModal] = useState(false);
  const [editingMovimiento, setEditingMovimiento] = useState<MovimientoInventario | null>(null);
  const [movimientoForm, setMovimientoForm] = useState({ producto: "", tipo: "Entrada" as "Entrada" | "Salida", cantidad: 0, fecha: new Date().toISOString().split("T")[0] });
  const [movimientoSearch, setMovimientoSearch] = useState("");

  const filteredMovimientos = movimientos.filter(m =>
    m.producto.toLowerCase().includes(movimientoSearch.toLowerCase()) ||
    m.tipo.toLowerCase().includes(movimientoSearch.toLowerCase())
  );

  const openAddMovimiento = () => {
    setEditingMovimiento(null);
    setMovimientoForm({ producto: "", tipo: "Entrada", cantidad: 0, fecha: new Date().toISOString().split("T")[0] });
    setShowMovimientoModal(true);
  };
  const openEditMovimiento = (m: MovimientoInventario) => {
    setEditingMovimiento(m);
    setMovimientoForm({ producto: m.producto, tipo: m.tipo, cantidad: m.cantidad, fecha: m.fecha });
    setShowMovimientoModal(true);
  };
  const saveMovimiento = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMovimiento) {
      setMovimientos(movimientos.map(m => m.id === editingMovimiento.id ? { ...m, ...movimientoForm } : m));
    } else {
      setMovimientos([...movimientos, { id: Date.now(), ...movimientoForm }]);
    }
    setShowMovimientoModal(false);
  };
  const deleteMovimiento = (id: number) => setConfirmAction({
    message: "¿Eliminar este movimiento?",
    onConfirm: () => { setMovimientos(movimientos.filter(m => m.id !== id)); setConfirmAction(null); }
  });

  // ── STATS ─────────────────────────────────────────────────────────────────
  const stats = [
    { icon: <DollarSign className="w-8 h-8" />, label: "Ventas del Mes", value: formatPrice(45680000), change: "+12.5%", positive: true },
    { icon: <ShoppingBag className="w-8 h-8" />, label: "Pedidos Activos", value: "156", change: "+8.2%", positive: true },
    { icon: <Users className="w-8 h-8" />, label: "Clientes Totales", value: "2,847", change: "+23.1%", positive: true },
    { icon: <Package className="w-8 h-8" />, label: "Productos en Stock", value: "487", change: "-5.4%", positive: false },
  ];

  const orderStatusBadge = (estado: string) => {
    if (estado === "Completado") return "bg-green-100 text-green-700";
    if (estado === "En proceso") return "bg-blue-100 text-blue-700";
    return "bg-yellow-100 text-yellow-700";
  };

  // ── PAGINACIÓN ────────────────────────────────────────────────────────────
  const ordersPag = usePagination(filteredOrders);
  const inventoryPag = usePagination(filteredInventory);
  const apptPag = usePagination(sortedAppointments);
  const usersPag = usePagination(filteredUsers);
  const employeesPag = usePagination(filteredEmployees);
  const invoicesPag = usePagination(filteredInvoices);
  const salesPag = usePagination(filteredSales);
  const proveedoresPag = usePagination(filteredProveedores);
  const movimientosPag = usePagination(filteredMovimientos);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 pb-20 md:pb-12">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-purple-900 mb-2" style={{ fontSize: `${textSize * 2}rem` }}>Administración</h1>
          <p className="text-purple-600" style={{ fontSize: `${textSize * 0.875}rem` }}>Gestiona tu negocio desde un solo lugar</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-2 sm:p-3 mb-6 sm:mb-8">
          <div className="flex gap-2 sm:gap-3 justify-between mb-3 sm:mb-4" role="tablist">
            {(["inventario", "citas", "usuarios"] as const).map((tab) => {
              const icons = { inventario: <Package className="w-6 h-6 flex-shrink-0" />, citas: <Calendar className="w-6 h-6 flex-shrink-0" />, usuarios: <Users className="w-6 h-6 flex-shrink-0" /> };
              const labels = { inventario: "Inventario", citas: "Citas", usuarios: "Usuarios" };
              return (
                <button key={tab} onClick={() => setActiveTab(tab)} role="tab" aria-selected={activeTab === tab}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 min-w-0 ${activeTab === tab ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-md" : "bg-white text-purple-700 hover:bg-purple-50"}`}
                  style={{ fontSize: `${textSize * 0.875}rem` }}>
                  {icons[tab]}
                  <span className="font-medium whitespace-nowrap text-center leading-tight">{labels[tab]}</span>
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {([
              { id: "general", icon: <TrendingUp className="w-4 h-4" />, label: "General" },
              { id: "ventas", icon: <Receipt className="w-4 h-4" />, label: "Ventas" },
              { id: "trabajadores", icon: <UserCog className="w-4 h-4" />, label: "Trabajadores" },
              { id: "facturas", icon: <FileText className="w-4 h-4" />, label: "Facturas" },
            ] as const).map(({ id, icon, label }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 py-2 px-4 rounded-xl whitespace-nowrap transition-all text-sm ${activeTab === id ? "bg-purple-100 text-purple-900 font-medium" : "bg-transparent text-purple-600 hover:bg-purple-50"}`}>
                {icon}{label}
              </button>
            ))}
          </div>
        </div>

        {/* ── GENERAL ── */}
        {activeTab === "general" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-purple-100 p-3 rounded-2xl text-purple-600">{stat.icon}</div>
                    <span className={`text-sm font-medium ${stat.positive ? "text-green-600" : "text-red-600"}`}>{stat.change}</span>
                  </div>
                  <p className="text-purple-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.75}rem` }}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-purple-50 border-b border-purple-100">
                <h2 className="text-purple-900" style={{ fontSize: `${textSize * 1.5}rem` }}>Pedidos Recientes</h2>
                <button onClick={openAddOrder} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" />Nuevo Pedido
                </button>
              </div>
              <TableSearchBar search={orderSearch} setSearch={setOrderSearch} placeholder="Buscar por ID, cliente, producto..." />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-100">
                      <th className="text-left py-3 px-4 text-purple-600 font-medium text-sm">ID</th>
                      <th className="text-left py-3 px-4 text-purple-600 font-medium text-sm">Cliente</th>
                      <th className="text-left py-3 px-4 text-purple-600 font-medium text-sm">Producto</th>
                      <th className="text-left py-3 px-4 text-purple-600 font-medium text-sm">Total</th>
                      <th className="text-left py-3 px-4 text-purple-600 font-medium text-sm">Estado</th>
                      <th className="text-left py-3 px-4 text-purple-600 font-medium text-sm">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersPag.slice.map((order) => (
                      <tr key={order.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                        <td className="py-4 px-4 text-purple-900 font-medium text-sm">{order.id}</td>
                        <td className="py-4 px-4 text-purple-900 text-sm">{order.cliente}</td>
                        <td className="py-4 px-4 text-purple-900 text-sm">{order.producto}</td>
                        <td className="py-4 px-4 text-purple-900 font-medium text-sm">{formatPrice(order.total)}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${orderStatusBadge(order.estado)}`}>{order.estado}</span>
                        </td>
                        <td className="py-4 px-4">
                          <CrudActions onEdit={() => openEditOrder(order)} onDelete={() => deleteOrder(order.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <TableFooter {...ordersPag} />
            </div>
          </div>
        )}

        {/* ── INVENTARIO ── */}
        {activeTab === "inventario" && (
          <div className="space-y-6">

            {/* Sub-navigation buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {([
                { id: "productos", icon: <Package className="w-6 h-6" />, label: "Productos" },
                { id: "proveedores", icon: <Truck className="w-6 h-6" />, label: "Proveedor" },
                { id: "historial", icon: <History className="w-6 h-6" />, label: "Historial de Movimientos" },
              ] as const).map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => setInventorySubTab(id)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md ${inventorySubTab === id ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-purple-200" : "bg-white text-purple-700 hover:bg-purple-50 border border-purple-100"}`}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* ── PRODUCTOS sub-tab ── */}
            {inventorySubTab === "productos" && (
              <>
                <div className="flex justify-end">
                  <button onClick={openAddProduct} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl transition-colors flex items-center gap-2 justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    <Plus className="w-5 h-5" /><span className="hidden sm:inline">Nuevo Producto</span><span className="sm:hidden">Nuevo</span>
                  </button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {(["Todos", "Gafas", "Lentes", "Accesorios"] as const).map(cat => (
                    <button key={cat} onClick={() => setCategoryFilter(cat)}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap flex-shrink-0 transition-colors ${categoryFilter === cat ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700 hover:bg-purple-200"}`}>
                      {cat === "Todos" ? `Todos (${inventory.length})` : `${cat} (${inventory.filter(i => i.categoria === cat).length})`}
                    </button>
                  ))}
                </div>

                {/* Desktop table */}
                <div className="hidden lg:block bg-white rounded-3xl shadow-lg overflow-hidden">
                  <TableSearchBar search={inventorySearch} setSearch={setInventorySearch} placeholder="Buscar producto, categoría..." />
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-purple-50">
                          <th className="text-left py-4 px-6 text-purple-900 font-medium">ID</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium">Producto</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium">Categoría</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium">Stock</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium">Precio</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryPag.slice.map((item) => (
                          <tr key={item.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                            <td className="py-4 px-6 text-purple-900">#{item.id}</td>
                            <td className="py-4 px-6 text-purple-900">{item.nombre}</td>
                            <td className="py-4 px-6"><span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{item.categoria}</span></td>
                            <td className="py-4 px-6"><span className={`font-medium ${item.stock < 30 ? "text-red-600" : "text-green-600"}`}>{item.stock} unidades</span></td>
                            <td className="py-4 px-6 text-purple-900 font-medium">{formatPrice(item.precio)}</td>
                            <td className="py-4 px-6">
                              <CrudActions onEdit={() => openEditProduct(item)} onDelete={() => deleteProduct(item.id)} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <TableFooter {...inventoryPag} />
                </div>

                {/* Mobile cards */}
                <div className="lg:hidden space-y-3">
                  {inventoryPag.slice.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-purple-100">
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-purple-600 font-medium">#{item.id}</span>
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">{item.categoria}</span>
                            </div>
                            <h3 className="text-purple-900 font-medium text-base leading-tight">{item.nombre}</h3>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-purple-50 rounded-xl p-3">
                            <div className="text-xs text-purple-600 mb-1">Stock</div>
                            <div className={`font-bold text-base ${item.stock < 30 ? "text-red-600" : "text-green-600"}`}>{item.stock}</div>
                            <div className="text-xs text-purple-500">unidades</div>
                          </div>
                          <div className="bg-purple-50 rounded-xl p-3">
                            <div className="text-xs text-purple-600 mb-1">Precio</div>
                            <div className="font-bold text-base text-purple-900">{formatPrice(item.precio)}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => openEditProduct(item)} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors">
                            <Edit className="w-4 h-4" /><span className="text-sm font-medium">Editar</span>
                          </button>
                          <button onClick={() => deleteProduct(item.id)} className="py-2.5 px-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="h-1 bg-purple-100">
                        <div className={`h-full ${item.stock < 30 ? "bg-red-500" : "bg-green-500"}`} style={{ width: `${Math.min((item.stock / 150) * 100, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                  <TableFooter {...inventoryPag} />
                </div>
              </>
            )}

            {/* ── PROVEEDORES sub-tab ── */}
            {inventorySubTab === "proveedores" && (
              <div className="space-y-4">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 bg-purple-50 border-b border-purple-100">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-purple-600" />
                      <h2 className="text-purple-900 font-semibold" style={{ fontSize: `${textSize * 1.25}rem` }}>Proveedores</h2>
                    </div>
                    <button onClick={openAddProveedor} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm">
                      <Plus className="w-4 h-4" />Nuevo Proveedor
                    </button>
                  </div>
                  <TableSearchBar search={proveedorSearch} setSearch={setProveedorSearch} placeholder="Buscar proveedor, tipo de producto..." />
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-purple-50">
                          <th className="text-left py-4 px-6 text-purple-900 font-medium text-sm">ID Proveedor</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium text-sm">Nombre del proveedor</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium text-sm hidden md:table-cell">Tipo de productos</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium text-sm hidden lg:table-cell">Teléfono</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium text-sm hidden lg:table-cell">Correo</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium text-sm">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proveedoresPag.slice.map((prov) => (
                          <tr key={prov.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                            <td className="py-4 px-6 text-purple-700 font-medium text-sm">{prov.id}</td>
                            <td className="py-4 px-6 text-purple-900 text-sm font-medium">{prov.nombre}</td>
                            <td className="py-4 px-6 text-purple-600 text-sm hidden md:table-cell">{prov.tipoProductos}</td>
                            <td className="py-4 px-6 text-purple-600 text-sm hidden lg:table-cell">{prov.telefono}</td>
                            <td className="py-4 px-6 text-sm hidden lg:table-cell">
                              <a href={`mailto:${prov.correo}`} className="text-purple-600 hover:text-purple-900 hover:underline transition-colors">{prov.correo}</a>
                            </td>
                            <td className="py-4 px-6">
                              <CrudActions onEdit={() => openEditProveedor(prov)} onDelete={() => deleteProveedor(prov.id)} />
                            </td>
                          </tr>
                        ))}
                        {filteredProveedores.length === 0 && (
                          <tr><td colSpan={6} className="py-12 text-center text-purple-400">No se encontraron proveedores.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <TableFooter {...proveedoresPag} />
                </div>
              </div>
            )}

            {/* ── HISTORIAL DE MOVIMIENTOS sub-tab ── */}
            {inventorySubTab === "historial" && (
              <div className="space-y-4">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 bg-purple-50 border-b border-purple-100">
                    <div className="flex items-center gap-3">
                      <History className="w-5 h-5 text-purple-600" />
                      <h2 className="text-purple-900 font-semibold" style={{ fontSize: `${textSize * 1.25}rem` }}>Historial de movimientos</h2>
                    </div>
                    <button onClick={openAddMovimiento} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm">
                      <Plus className="w-4 h-4" />Nuevo Movimiento
                    </button>
                  </div>
                  <TableSearchBar search={movimientoSearch} setSearch={setMovimientoSearch} placeholder="Buscar producto, tipo..." />
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-purple-50">
                          <th className="text-left py-4 px-6 text-purple-900 font-medium text-sm">Producto</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium text-sm">Tipo</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium text-sm">Cantidad</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium text-sm hidden sm:table-cell">Fecha</th>
                          <th className="text-left py-4 px-6 text-purple-900 font-medium text-sm">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {movimientosPag.slice.map((mov) => (
                          <tr key={mov.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                            <td className="py-4 px-6 text-purple-900 font-medium text-sm">{mov.producto}</td>
                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${mov.tipo === "Entrada" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {mov.tipo === "Entrada" ? <ArrowDownCircle className="w-3.5 h-3.5" /> : <ArrowUpCircle className="w-3.5 h-3.5" />}
                                {mov.tipo}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-purple-900 font-bold text-sm">{mov.cantidad}</td>
                            <td className="py-4 px-6 text-purple-600 text-sm hidden sm:table-cell">
                              {new Date(mov.fecha).toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" })}
                            </td>
                            <td className="py-4 px-6">
                              <CrudActions onEdit={() => openEditMovimiento(mov)} onDelete={() => deleteMovimiento(mov.id)} />
                            </td>
                          </tr>
                        ))}
                        {filteredMovimientos.length === 0 && (
                          <tr><td colSpan={5} className="py-12 text-center text-purple-400">No se encontraron movimientos.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <TableFooter {...movimientosPag} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CITAS ── */}
        {activeTab === "citas" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-purple-50 border-b border-purple-100">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <select value={appointmentSort} onChange={(e) => setAppointmentSort(e.target.value as any)} className="bg-transparent text-purple-900 font-medium focus:outline-none cursor-pointer border-2 border-purple-200 rounded-lg px-3 py-2" style={{ fontSize: `${textSize * 0.875}rem` }}>
                    <option value="fecha-reciente">Fecha: Más reciente</option>
                    <option value="fecha-antigua">Fecha: Más antigua</option>
                    <option value="alfabetico-az">Paciente: A-Z</option>
                    <option value="alfabetico-za">Paciente: Z-A</option>
                  </select>
                </div>
                <button onClick={openAddAppointment} className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg font-medium">
                  <Plus className="w-5 h-5" />Nueva Cita
                </button>
              </div>
              <TableSearchBar search={appointmentSearch} setSearch={setAppointmentSearch} placeholder="Buscar paciente, optómetra, tipo..." />
            </div>

            <div className="space-y-4">
              {apptPag.slice.map((appt) => (
                <div key={appt.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-purple-100">
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-purple-900 font-bold mb-1" style={{ fontSize: `${textSize * 1.25}rem` }}>{appt.paciente}</h3>
                        <div className="flex items-center gap-2 text-purple-600">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium" style={{ fontSize: `${textSize * 0.875}rem` }}>
                            {new Date(appt.fecha).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })} · {appt.hora}
                          </span>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm flex items-center gap-2 whitespace-nowrap ${appt.estado === "Confirmada" ? "bg-green-100 text-green-700 border border-green-200" : appt.estado === "Pendiente" ? "bg-yellow-100 text-yellow-700 border border-yellow-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
                        <div className={`w-2 h-2 rounded-full ${appt.estado === "Confirmada" ? "bg-green-500" : appt.estado === "Pendiente" ? "bg-yellow-500" : "bg-red-500"}`} />
                        {appt.estado}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 bg-purple-50 rounded-xl p-4">
                      <div>
                        <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide">Optómetra</p>
                        <p className="text-purple-900 font-semibold" style={{ fontSize: `${textSize * 0.875}rem` }}>{appt.optometra}</p>
                      </div>
                      <div>
                        <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide">Tipo de Examen</p>
                        <p className="text-purple-900 font-semibold" style={{ fontSize: `${textSize * 0.875}rem` }}>{appt.tipo}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => openEditAppointment(appt)} className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all font-medium">
                        <Edit className="w-5 h-5" /><span style={{ fontSize: `${textSize * 0.875}rem` }}>Editar</span>
                      </button>
                      <button onClick={() => deleteAppointment(appt.id)} className="flex items-center justify-center gap-2 py-3 px-4 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-all font-medium">
                        <Trash2 className="w-5 h-5" /><span className="hidden sm:inline" style={{ fontSize: `${textSize * 0.875}rem` }}>Eliminar</span>
                      </button>
                    </div>
                  </div>
                  <div className={`h-1.5 ${appt.estado === "Confirmada" ? "bg-gradient-to-r from-green-400 to-green-600" : appt.estado === "Pendiente" ? "bg-gradient-to-r from-yellow-400 to-yellow-600" : "bg-gradient-to-r from-red-400 to-red-600"}`} />
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-purple-100">
              <TableFooter {...apptPag} />
            </div>
          </div>
        )}

        {/* ── USUARIOS ── */}
        {activeTab === "usuarios" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button onClick={openAddUser} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl transition-colors flex items-center gap-2 justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <Plus className="w-5 h-5" /><span className="hidden sm:inline">Nuevo Usuario</span><span className="sm:hidden">Nuevo</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <TableSearchBar search={userSearch} setSearch={setUserSearch} placeholder="Buscar por nombre o email..." />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Nombre</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Email</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium hidden lg:table-cell">Teléfono</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium hidden md:table-cell">Rol</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium hidden sm:table-cell">Pedidos</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium hidden xl:table-cell">Última Compra</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersPag.slice.map((user) => (
                      <tr key={user.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                        <td className="py-4 px-6 text-purple-900 font-medium">{user.nombre}</td>
                        <td className="py-4 px-6 text-purple-900 text-sm">{user.email}</td>
                        <td className="py-4 px-6 text-purple-900 text-sm hidden lg:table-cell">{user.telefono}</td>
                        <td className="py-4 px-6 hidden md:table-cell">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                            user.rol === "administrador" ? "bg-purple-100 text-purple-700 border border-purple-200" :
                            user.rol === "vendedor" ? "bg-blue-100 text-blue-700 border border-blue-200" :
                            user.rol === "trabajador" ? "bg-green-100 text-green-700 border border-green-200" :
                            "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}>
                            {user.rol || "Sin rol"}
                          </span>
                        </td>
                        <td className="py-4 px-6 hidden sm:table-cell">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">{user.pedidos}</span>
                        </td>
                        <td className="py-4 px-6 text-purple-900 text-sm hidden xl:table-cell">{new Date(user.ultimaCompra).toLocaleDateString("es-CO")}</td>
                        <td className="py-4 px-6">
                          <CrudActions onEdit={() => openEditUser(user)} onDelete={() => deleteUser(user.id)} />
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr><td colSpan={7} className="py-12 text-center text-purple-400">No se encontraron usuarios.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <TableFooter {...usersPag} />
            </div>
          </div>
        )}

        {/* ── TRABAJADORES ── */}
        {activeTab === "trabajadores" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-purple-900" style={{ fontSize: `${textSize * 1.75}rem` }}>Gestión de Trabajadores</h2>
              <button onClick={openAddEmployee} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" /><span className="hidden sm:inline">Nuevo Empleado</span><span className="sm:hidden">Nuevo</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <TableSearchBar search={employeeSearch} setSearch={setEmployeeSearch} placeholder="Buscar por nombre, email o rol..." />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Nombre</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Rol</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium hidden md:table-cell">Email</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium hidden lg:table-cell">Teléfono</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium hidden sm:table-cell">Especialidad</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeesPag.slice.map((emp) => (
                      <tr key={emp.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                        <td className="py-4 px-6 text-purple-900 font-medium">{emp.nombre}</td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{emp.rol}</span>
                        </td>
                        <td className="py-4 px-6 text-purple-900 text-sm hidden md:table-cell">{emp.email}</td>
                        <td className="py-4 px-6 text-purple-900 text-sm hidden lg:table-cell">{emp.telefono}</td>
                        <td className="py-4 px-6 text-purple-900 text-sm hidden sm:table-cell">{emp.especialidad}</td>
                        <td className="py-4 px-6">
                          <CrudActions onEdit={() => openEditEmployee(emp)} onDelete={() => deleteEmployee(emp.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <TableFooter {...employeesPag} />
            </div>
          </div>
        )}

        {/* ── FACTURAS ── */}
        {activeTab === "facturas" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-purple-900" style={{ fontSize: `${textSize * 1.75}rem` }}>Gestión de Facturas</h2>
              <button onClick={openAddInvoice} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" /><span className="hidden sm:inline">Nueva Factura</span><span className="sm:hidden">Nueva</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <TableSearchBar search={invoiceSearch} setSearch={setInvoiceSearch} placeholder="Buscar por número, cliente..." />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Número</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Cliente</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium hidden sm:table-cell">Fecha</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Total</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Estado</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoicesPag.slice.map((inv) => (
                      <tr key={inv.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                        <td className="py-4 px-6 text-purple-900 font-medium">{inv.id}</td>
                        <td className="py-4 px-6 text-purple-900">{inv.cliente}</td>
                        <td className="py-4 px-6 text-purple-900 text-sm hidden sm:table-cell">{new Date(inv.fecha).toLocaleDateString("es-CO")}</td>
                        <td className="py-4 px-6 text-purple-900 font-bold">{formatPrice(inv.total)}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 w-fit ${inv.estado === "Pagada" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {inv.estado === "Pagada" ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                            {inv.estado}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <CrudActions onEdit={() => openEditInvoice(inv)} onDelete={() => deleteInvoice(inv.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <TableFooter {...invoicesPag} />
            </div>
          </div>
        )}

        {/* ── VENTAS ── */}
        {activeTab === "ventas" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-purple-900" style={{ fontSize: `${textSize * 1.75}rem` }}>Gestión de Ventas</h2>
              <button onClick={openAddSale} className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-2xl transition-all flex items-center gap-2 shadow-lg">
                <Plus className="w-5 h-5" /><span className="hidden sm:inline">Nueva Venta</span><span className="sm:inline">Registrar</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <TableSearchBar search={saleSearch} setSearch={setSaleSearch} placeholder="Buscar por ID, cliente, documento..." />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">ID</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Cliente</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium hidden md:table-cell">Documento</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium hidden sm:table-cell">Fecha</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Total</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium hidden lg:table-cell">Pago</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Estado</th>
                      <th className="text-left py-4 px-6 text-purple-900 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesPag.slice.map((sale) => (
                      <tr key={sale.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                        <td className="py-4 px-6 text-purple-900 font-semibold">{sale.id}</td>
                        <td className="py-4 px-6 text-purple-900">{sale.cliente}</td>
                        <td className="py-4 px-6 text-purple-900 text-sm hidden md:table-cell">{sale.documento}</td>
                        <td className="py-4 px-6 text-purple-900 text-sm hidden sm:table-cell">{new Date(sale.fecha).toLocaleDateString("es-CO")}</td>
                        <td className="py-4 px-6 text-purple-900 font-bold">{formatPrice(sale.total)}</td>
                        <td className="py-4 px-6 hidden lg:table-cell">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1.5 w-fit">
                            {sale.metodoPago === "Efectivo" ? <Wallet className="w-3.5 h-3.5" /> : sale.metodoPago === "Tarjeta" ? <CreditCard className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                            {sale.metodoPago}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 w-fit ${sale.estado === "Completado" ? "bg-green-100 text-green-700" : sale.estado === "Pendiente" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                            {sale.estado === "Completado" ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                            {sale.estado}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <CrudActions onView={() => openEditSale(sale)} onEdit={() => openEditSale(sale)} onDelete={() => deleteSale(sale.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <TableFooter {...salesPag} />
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL USUARIO ── */}
      {showUserModal && (
        <ModalWrapper title={editingUser ? "Editar Usuario" : "Nuevo Usuario"} subtitle={editingUser ? `Editando a ${editingUser.nombre}` : "Completa los datos del nuevo usuario"} onClose={() => setShowUserModal(false)}>
          <form onSubmit={saveUser} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
            <FormField label="Nombre completo" required>
              <input type="text" value={userForm.nombre} onChange={e => setUserForm({ ...userForm, nombre: e.target.value })} className={inputCls} placeholder="Ej: María García" required />
            </FormField>
            <FormField label="Correo electrónico" required>
              <input type="email" value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} className={inputCls} placeholder="correo@email.com" required />
            </FormField>
            <FormField label="Teléfono">
              <input type="tel" value={userForm.telefono} onChange={e => setUserForm({ ...userForm, telefono: e.target.value })} className={inputCls} placeholder="+57 300 000 0000" />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Pedidos">
                <input type="number" min="0" value={userForm.pedidos} onChange={e => setUserForm({ ...userForm, pedidos: parseInt(e.target.value) || 0 })} className={inputCls} />
              </FormField>
              <FormField label="Última compra">
                <input type="date" value={userForm.ultimaCompra} onChange={e => setUserForm({ ...userForm, ultimaCompra: e.target.value })} className={inputCls} />
              </FormField>
            </div>

            {/* Sección de Rol y Permisos */}
            <div className="border-t-2 border-purple-200 pt-4">
              <FormField label="Rol del usuario" required>
                <select
                  value={userForm.rol}
                  onChange={e => {
                    const newRol = e.target.value as typeof userForm.rol;
                    let newPermisos = { ...userForm.permisos };

                    if (newRol === "administrador") {
                      newPermisos = {
                        inventario: { ver: true, editar: true, eliminar: true },
                        citas: { ver: true, editar: true, eliminar: true },
                        usuarios: { ver: true, editar: true, eliminar: true },
                        ventas: { ver: true, editar: true, eliminar: true },
                        facturas: { ver: true, editar: true, eliminar: true },
                        trabajadores: { ver: true, editar: true, eliminar: true },
                      };
                    } else if (newRol === "vendedor") {
                      newPermisos = {
                        inventario: { ver: true, editar: true, eliminar: false },
                        citas: { ver: true, editar: true, eliminar: false },
                        usuarios: { ver: true, editar: false, eliminar: false },
                        ventas: { ver: true, editar: true, eliminar: false },
                        facturas: { ver: true, editar: false, eliminar: false },
                        trabajadores: { ver: false, editar: false, eliminar: false },
                      };
                    } else if (newRol === "trabajador") {
                      newPermisos = {
                        inventario: { ver: true, editar: false, eliminar: false },
                        citas: { ver: true, editar: true, eliminar: false },
                        usuarios: { ver: false, editar: false, eliminar: false },
                        ventas: { ver: true, editar: false, eliminar: false },
                        facturas: { ver: false, editar: false, eliminar: false },
                        trabajadores: { ver: false, editar: false, eliminar: false },
                      };
                    } else {
                      newPermisos = {
                        inventario: { ver: true, editar: false, eliminar: false },
                        citas: { ver: true, editar: false, eliminar: false },
                        usuarios: { ver: false, editar: false, eliminar: false },
                        ventas: { ver: true, editar: false, eliminar: false },
                        facturas: { ver: true, editar: false, eliminar: false },
                        trabajadores: { ver: false, editar: false, eliminar: false },
                      };
                    }

                    setUserForm({ ...userForm, rol: newRol, permisos: newPermisos });
                  }}
                  className={inputCls}
                  required
                >
                  <option value="administrador">Administrador</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="trabajador">Trabajador</option>
                  <option value="solo lectura">Solo Lectura</option>
                </select>
              </FormField>

              <div className="mt-4">
                <h4 className="text-purple-900 font-semibold mb-3">Permisos por Módulo</h4>
                <div className="space-y-3 bg-purple-50 rounded-xl p-4">
                  {(["inventario", "citas", "usuarios", "ventas", "facturas", "trabajadores"] as const).map(modulo => (
                    <div key={modulo} className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="font-medium text-purple-900 mb-2 capitalize">{modulo}</div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={userForm.permisos[modulo].ver}
                            onChange={e => setUserForm({
                              ...userForm,
                              permisos: {
                                ...userForm.permisos,
                                [modulo]: { ...userForm.permisos[modulo], ver: e.target.checked }
                              }
                            })}
                            className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                          />
                          <span className="text-sm text-purple-700">Ver</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={userForm.permisos[modulo].editar}
                            onChange={e => setUserForm({
                              ...userForm,
                              permisos: {
                                ...userForm.permisos,
                                [modulo]: { ...userForm.permisos[modulo], editar: e.target.checked }
                              }
                            })}
                            className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                          />
                          <span className="text-sm text-purple-700">Editar</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={userForm.permisos[modulo].eliminar}
                            onChange={e => setUserForm({
                              ...userForm,
                              permisos: {
                                ...userForm.permisos,
                                [modulo]: { ...userForm.permisos[modulo], eliminar: e.target.checked }
                              }
                            })}
                            className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                          />
                          <span className="text-sm text-purple-700">Eliminar</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2 sticky bottom-0 bg-white pb-2">
              <button type="button" onClick={() => setShowUserModal(false)} className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-purple-900 font-medium transition-colors">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">{editingUser ? "Guardar cambios" : "Crear usuario"}</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* ── MODAL EMPLEADO ── */}
      {showEmployeeModal && (
        <ModalWrapper title={editingEmployee ? "Editar Empleado" : "Nuevo Empleado"} subtitle={editingEmployee ? `Editando a ${editingEmployee.nombre}` : "Agrega un nuevo miembro al equipo"} onClose={() => setShowEmployeeModal(false)}>
          <form onSubmit={saveEmployee} className="space-y-4">
            <FormField label="Nombre completo" required>
              <input type="text" value={employeeForm.nombre} onChange={e => setEmployeeForm({ ...employeeForm, nombre: e.target.value })} className={inputCls} placeholder="Ej: Dr. Carlos Mendoza" required />
            </FormField>
            <FormField label="Rol" required>
              <select value={employeeForm.rol} onChange={e => setEmployeeForm({ ...employeeForm, rol: e.target.value })} className={inputCls} required>
                <option value="Optómetra">Optómetra</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Administrador">Administrador</option>
                <option value="Técnico">Técnico</option>
              </select>
            </FormField>
            <FormField label="Correo institucional" required>
              <input type="email" value={employeeForm.email} onChange={e => setEmployeeForm({ ...employeeForm, email: e.target.value })} className={inputCls} placeholder="nombre@lentsoft.com" required />
            </FormField>
            <FormField label="Teléfono">
              <input type="tel" value={employeeForm.telefono} onChange={e => setEmployeeForm({ ...employeeForm, telefono: e.target.value })} className={inputCls} placeholder="+57 310 000 0000" />
            </FormField>
            <FormField label="Especialidad">
              <input type="text" value={employeeForm.especialidad} onChange={e => setEmployeeForm({ ...employeeForm, especialidad: e.target.value })} className={inputCls} placeholder="Ej: Lentes de contacto" />
            </FormField>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowEmployeeModal(false)} className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-purple-900 font-medium transition-colors">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">{editingEmployee ? "Guardar cambios" : "Agregar empleado"}</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* ── MODAL FACTURA ── */}
      {showInvoiceModal && (
        <ModalWrapper title={editingInvoice ? "Editar Factura" : "Nueva Factura"} subtitle={editingInvoice ? `Editando ${editingInvoice.id}` : "Registra una nueva factura"} onClose={() => setShowInvoiceModal(false)}>
          <form onSubmit={saveInvoice} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Número de factura" required>
                <input type="text" value={invoiceForm.id} onChange={e => setInvoiceForm({ ...invoiceForm, id: e.target.value })} className={inputCls} placeholder="FAC-000" required />
              </FormField>
              <FormField label="Fecha" required>
                <input type="date" value={invoiceForm.fecha} onChange={e => setInvoiceForm({ ...invoiceForm, fecha: e.target.value })} className={inputCls} required />
              </FormField>
            </div>
            <FormField label="Cliente" required>
              <input type="text" value={invoiceForm.cliente} onChange={e => setInvoiceForm({ ...invoiceForm, cliente: e.target.value })} className={inputCls} placeholder="Nombre del cliente" required />
            </FormField>
            <FormField label="Total (COP)" required>
              <input type="number" min="0" step="100" value={invoiceForm.total} onChange={e => setInvoiceForm({ ...invoiceForm, total: parseInt(e.target.value) || 0 })} className={inputCls} required />
              {invoiceForm.total > 0 && <p className="text-purple-500 text-xs mt-1">{formatPrice(invoiceForm.total)}</p>}
            </FormField>
            <FormField label="Estado" required>
              <select value={invoiceForm.estado} onChange={e => setInvoiceForm({ ...invoiceForm, estado: e.target.value })} className={inputCls} required>
                <option value="Pendiente">Pendiente</option>
                <option value="Pagada">Pagada</option>
                <option value="Anulada">Anulada</option>
              </select>
            </FormField>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowInvoiceModal(false)} className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-purple-900 font-medium transition-colors">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">{editingInvoice ? "Guardar cambios" : "Crear factura"}</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* ── MODAL PEDIDO ── */}
      {showOrderModal && (
        <ModalWrapper title={editingOrder ? "Editar Pedido" : "Nuevo Pedido"} subtitle={editingOrder ? `Editando ${editingOrder.id}` : "Registra un nuevo pedido"} onClose={() => setShowOrderModal(false)}>
          <form onSubmit={saveOrder} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="ID del pedido" required>
                <input type="text" value={orderForm.id} onChange={e => setOrderForm({ ...orderForm, id: e.target.value })} className={inputCls} placeholder="ORD-000" required />
              </FormField>
              <FormField label="Estado" required>
                <select value={orderForm.estado} onChange={e => setOrderForm({ ...orderForm, estado: e.target.value })} className={inputCls} required>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Completado">Completado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </FormField>
            </div>
            <FormField label="Cliente" required>
              <input type="text" value={orderForm.cliente} onChange={e => setOrderForm({ ...orderForm, cliente: e.target.value })} className={inputCls} placeholder="Nombre del cliente" required />
            </FormField>
            <FormField label="Producto" required>
              <input type="text" value={orderForm.producto} onChange={e => setOrderForm({ ...orderForm, producto: e.target.value })} className={inputCls} placeholder="Nombre del producto" required />
            </FormField>
            <FormField label="Total (COP)" required>
              <input type="number" min="0" step="100" value={orderForm.total} onChange={e => setOrderForm({ ...orderForm, total: parseInt(e.target.value) || 0 })} className={inputCls} required />
              {orderForm.total > 0 && <p className="text-purple-500 text-xs mt-1">{formatPrice(orderForm.total)}</p>}
            </FormField>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowOrderModal(false)} className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-purple-900 font-medium transition-colors">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">{editingOrder ? "Guardar cambios" : "Crear pedido"}</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* ── MODAL CITA ── */}
      {showAppointmentModal && (
        <ModalWrapper title={editingAppointment ? "Editar Cita" : "Nueva Cita"} onClose={() => setShowAppointmentModal(false)}>
          <form onSubmit={saveAppointment} className="space-y-4">
            <FormField label="Paciente" required>
              <input type="text" value={appointmentForm.paciente} onChange={e => setAppointmentForm({ ...appointmentForm, paciente: e.target.value })} className={inputCls} required />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Fecha" required>
                <input type="date" value={appointmentForm.fecha} onChange={e => setAppointmentForm({ ...appointmentForm, fecha: e.target.value })} className={inputCls} required />
              </FormField>
              <FormField label="Hora" required>
                <input type="time" value={appointmentForm.hora} onChange={e => setAppointmentForm({ ...appointmentForm, hora: e.target.value })} className={inputCls} required />
              </FormField>
            </div>
            <FormField label="Optómetra" required>
              <input type="text" value={appointmentForm.optometra} onChange={e => setAppointmentForm({ ...appointmentForm, optometra: e.target.value })} className={inputCls} required />
            </FormField>
            <FormField label="Tipo de examen" required>
              <input type="text" value={appointmentForm.tipo} onChange={e => setAppointmentForm({ ...appointmentForm, tipo: e.target.value })} className={inputCls} placeholder="Ej: Examen completo" required />
            </FormField>
            <FormField label="Estado">
              <select value={appointmentForm.estado} onChange={e => setAppointmentForm({ ...appointmentForm, estado: e.target.value })} className={inputCls}>
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </FormField>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowAppointmentModal(false)} className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-purple-900 font-medium transition-colors">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">{editingAppointment ? "Guardar cambios" : "Crear cita"}</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* ── MODAL PRODUCTO ── */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between p-6 pb-4 border-b border-purple-100">
              <div>
                <h2 className="text-purple-900 font-bold text-lg">{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h2>
                <p className="text-purple-500 text-sm mt-0.5">Completa los campos para {editingProduct ? "actualizar" : "añadir"} el producto</p>
              </div>
              <button onClick={() => setShowProductModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors ml-4">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={saveProduct} className="space-y-5">
                <div className="bg-purple-50 rounded-2xl p-5">
                  <h3 className="text-purple-900 font-semibold mb-4 flex items-center gap-2"><Package className="w-5 h-5" />Información Básica</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Nombre del producto" required>
                      <input type="text" value={productForm.nombre} onChange={e => setProductForm({ ...productForm, nombre: e.target.value })} className={inputCls} placeholder="Ej: Gafas Ray-Ban Aviador" required />
                    </FormField>
                    <FormField label="Categoría" required>
                      <select value={productForm.categoria} onChange={e => setProductForm({ ...productForm, categoria: e.target.value })} className={inputCls} required>
                        <option value="Gafas">Gafas</option>
                        <option value="Lentes">Lentes de Contacto</option>
                        <option value="Accesorios">Accesorios</option>
                      </select>
                    </FormField>
                    <FormField label="Marca">
                      <input type="text" value={productForm.marca} onChange={e => setProductForm({ ...productForm, marca: e.target.value })} className={inputCls} placeholder="Ej: Ray-Ban" />
                    </FormField>
                    <FormField label="Modelo">
                      <input type="text" value={productForm.modelo} onChange={e => setProductForm({ ...productForm, modelo: e.target.value })} className={inputCls} placeholder="Ej: Aviador" />
                    </FormField>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-5">
                  <h3 className="text-purple-900 font-semibold mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5" />Inventario y Precio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Stock" required>
                      <input type="number" min="0" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })} className={inputCls} required />
                    </FormField>
                    <FormField label="Precio (COP)" required>
                      <input type="number" min="0" step="100" value={productForm.precio} onChange={e => setProductForm({ ...productForm, precio: parseInt(e.target.value) || 0 })} className={inputCls} required />
                      {productForm.precio > 0 && <p className="text-purple-500 text-xs mt-1">{formatPrice(productForm.precio)}</p>}
                    </FormField>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-5">
                  <h3 className="text-purple-900 font-semibold mb-4 flex items-center gap-2"><FileText className="w-5 h-5" />Descripción</h3>
                  <textarea value={productForm.descripcion} onChange={e => setProductForm({ ...productForm, descripcion: e.target.value })} className={`${inputCls} resize-none`} rows={3} placeholder="Características principales del producto..." />
                </div>
                <div className="flex gap-3 pt-2 border-t-2 border-purple-100">
                  <button type="button" onClick={() => setShowProductModal(false)} className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-purple-900 font-medium transition-colors">Cancelar</button>
                  <button type="submit" className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium transition-all shadow-lg">{editingProduct ? "Actualizar Producto" : "Agregar Producto"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL VENTA ── */}
      {showSaleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="bg-white/95 backdrop-blur-sm flex items-start justify-between p-6 pb-4 border-b-2 border-purple-200 rounded-t-3xl flex-shrink-0">
              <div>
                <h2 className="text-purple-900 font-bold text-2xl flex items-center gap-2">
                  <Receipt className="w-7 h-7" />
                  {editingSale ? "Editar Venta" : "Registrar Nueva Venta"}
                </h2>
                <p className="text-purple-600 text-sm mt-1">{editingSale ? `Editando ${editingSale.id}` : `ID: ${saleForm.id}`}</p>
              </div>
              <button onClick={() => setShowSaleModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={saveSale} className="overflow-y-auto flex-1 p-6 space-y-6">
              {/* Datos del Cliente */}
              <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-purple-100">
                <h3 className="text-purple-900 font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Datos del Cliente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Nombre / Razón Social" required>
                    <input type="text" value={saleForm.cliente} onChange={e => setSaleForm({ ...saleForm, cliente: e.target.value })} className={inputCls} placeholder="Ej: María García" required />
                  </FormField>
                  <FormField label="NIT / Cédula" required>
                    <input type="text" value={saleForm.documento} onChange={e => setSaleForm({ ...saleForm, documento: e.target.value })} className={inputCls} placeholder="900123456-1" required />
                  </FormField>
                  <FormField label="Teléfono">
                    <input type="tel" value={saleForm.telefono} onChange={e => setSaleForm({ ...saleForm, telefono: e.target.value })} className={inputCls} placeholder="310 123 4567" />
                  </FormField>
                  <FormField label="Fecha de Venta" required>
                    <input type="date" value={saleForm.fecha} onChange={e => setSaleForm({ ...saleForm, fecha: e.target.value })} className={inputCls} required />
                  </FormField>
                </div>
              </div>

              {/* Productos / Servicios */}
              <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-purple-100">
                <h3 className="text-purple-900 font-semibold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-600" />
                  Productos / Servicios
                </h3>

                {/* Lista de productos agregados */}
                {saleForm.productos.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-purple-700 pb-2 border-b border-purple-200">
                      <div className="col-span-5">PRODUCTO</div>
                      <div className="col-span-2 text-center">CANT.</div>
                      <div className="col-span-2 text-right">PRECIO UNIT.</div>
                      <div className="col-span-2 text-right">SUBTOTAL</div>
                      <div className="col-span-1"></div>
                    </div>
                    {saleForm.productos.map((prod) => (
                      <div key={prod.id} className="grid grid-cols-12 gap-2 items-center bg-purple-50 p-3 rounded-lg">
                        <div className="col-span-5 text-purple-900 font-medium text-sm">{prod.nombre}</div>
                        <div className="col-span-2 text-center text-purple-900 font-semibold">{prod.cantidad}</div>
                        <div className="col-span-2 text-right text-purple-900">{formatPrice(prod.precioUnitario)}</div>
                        <div className="col-span-2 text-right text-purple-900 font-bold">{formatPrice(prod.subtotal)}</div>
                        <div className="col-span-1 flex justify-end">
                          <button type="button" onClick={() => removeProductFromSale(prod.id)} className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Agregar producto */}
                <div className="bg-purple-50 rounded-xl p-4 border-2 border-dashed border-purple-300">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-6">
                      <label className="block text-purple-700 text-sm font-medium mb-1">Producto</label>
                      <select
                        value={selectedProduct ? selectedProduct.nombre : ""}
                        onChange={(e) => {
                          const prod = inventory.find(p => p.nombre === e.target.value);
                          setSelectedProduct(prod ? { nombre: prod.nombre, precio: prod.precio } : null);
                        }}
                        className={inputCls}
                      >
                        <option value="">Seleccionar producto</option>
                        {inventory.map((item) => (
                          <option key={item.id} value={item.nombre}>
                            {item.nombre} - {formatPrice(item.precio)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-purple-700 text-sm font-medium mb-1">Cantidad</label>
                      <input type="number" min="1" value={productQty} onChange={(e) => setProductQty(parseInt(e.target.value) || 1)} className={inputCls} />
                    </div>
                    <div className="md:col-span-3 flex items-end">
                      <button type="button" onClick={addProductToSale} disabled={!selectedProduct} className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium">
                        <Plus className="w-4 h-4" />Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumen de Totales */}
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-5 shadow-md border-2 border-purple-200">
                <h3 className="text-purple-900 font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  Resumen de Totales
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-purple-900">
                    <span className="font-medium">Subtotal</span>
                    <span className="text-xl font-bold">{formatPrice(saleForm.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-purple-900">Descuento (%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="number" min="0" max="100" value={saleForm.descuento} onChange={(e) => updateSaleDiscount(parseFloat(e.target.value) || 0)} className="w-20 px-3 py-1.5 rounded-lg border-2 border-purple-300 text-center font-semibold text-purple-900" />
                      <span className="text-purple-700 font-bold">-{formatPrice((saleForm.subtotal * saleForm.descuento) / 100)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-purple-900">
                    <span className="font-medium">IVA (19%)</span>
                    <span className="text-lg font-semibold">{formatPrice(saleForm.iva)}</span>
                  </div>
                  <div className="pt-3 border-t-2 border-purple-300 flex items-center justify-between">
                    <span className="text-purple-900 font-bold text-lg">Total a Pagar</span>
                    <span className="text-3xl font-extrabold text-purple-700">{formatPrice(saleForm.total)}</span>
                  </div>
                </div>
              </div>

              {/* Método de Pago */}
              <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-purple-100">
                <h3 className="text-purple-900 font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  Método de Pago
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Efectivo", "Tarjeta", "Transferencia"].map((metodo) => (
                    <button
                      key={metodo}
                      type="button"
                      onClick={() => setSaleForm({ ...saleForm, metodoPago: metodo })}
                      className={`p-4 rounded-xl border-2 transition-all font-medium flex items-center justify-center gap-2 ${
                        saleForm.metodoPago === metodo
                          ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                          : "bg-white text-purple-700 border-purple-200 hover:border-purple-400"
                      }`}
                    >
                      {metodo === "Efectivo" && <Wallet className="w-5 h-5" />}
                      {metodo === "Tarjeta" && <CreditCard className="w-5 h-5" />}
                      {metodo === "Transferencia" && <Smartphone className="w-5 h-5" />}
                      {metodo}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estado y Observaciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-purple-100">
                  <h3 className="text-purple-900 font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    Estado de la Venta
                  </h3>
                  <div className="flex gap-2">
                    {["Pendiente", "En proceso", "Completado"].map((estado) => (
                      <button
                        key={estado}
                        type="button"
                        onClick={() => setSaleForm({ ...saleForm, estado })}
                        className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                          saleForm.estado === estado
                            ? estado === "Completado"
                              ? "bg-green-600 text-white"
                              : estado === "Pendiente"
                              ? "bg-yellow-500 text-white"
                              : "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {estado}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-purple-100">
                  <h3 className="text-purple-900 font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Observaciones
                  </h3>
                  <textarea
                    value={saleForm.observaciones}
                    onChange={(e) => setSaleForm({ ...saleForm, observaciones: e.target.value })}
                    className={`${inputCls} resize-none`}
                    rows={2}
                    placeholder="Notas adicionales sobre la venta..."
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4 pb-2 border-t-2 border-purple-200">
                <button type="button" onClick={() => setShowSaleModal(false)} className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-purple-900 font-medium transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold transition-all shadow-lg flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {editingSale ? "Guardar Cambios" : "Registrar Venta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL PROVEEDOR ── */}
      {showProveedorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-purple-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-purple-900 font-bold text-xl">{editingProveedor ? "Editar Proveedor" : "Nuevo Proveedor"}</h2>
              <button onClick={() => setShowProveedorModal(false)} className="p-2 rounded-xl hover:bg-purple-50 text-purple-400 hover:text-purple-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveProveedor} className="p-6 space-y-4">
              <FormField label="ID Proveedor" required>
                <input className={inputCls} value={proveedorForm.id} onChange={e => setProveedorForm({ ...proveedorForm, id: e.target.value })} required disabled={!!editingProveedor} />
              </FormField>
              <FormField label="Nombre del proveedor" required>
                <input className={inputCls} value={proveedorForm.nombre} onChange={e => setProveedorForm({ ...proveedorForm, nombre: e.target.value })} required />
              </FormField>
              <FormField label="Tipo de productos" required>
                <input className={inputCls} value={proveedorForm.tipoProductos} onChange={e => setProveedorForm({ ...proveedorForm, tipoProductos: e.target.value })} required />
              </FormField>
              <FormField label="Teléfono" required>
                <input className={inputCls} value={proveedorForm.telefono} onChange={e => setProveedorForm({ ...proveedorForm, telefono: e.target.value })} required />
              </FormField>
              <FormField label="Correo electrónico" required>
                <input type="email" className={inputCls} value={proveedorForm.correo} onChange={e => setProveedorForm({ ...proveedorForm, correo: e.target.value })} required />
              </FormField>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowProveedorModal(false)} className="flex-1 py-3 rounded-2xl border-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-medium transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors">{editingProveedor ? "Guardar cambios" : "Crear proveedor"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL MOVIMIENTO ── */}
      {showMovimientoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-purple-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-purple-900 font-bold text-xl">{editingMovimiento ? "Editar Movimiento" : "Nuevo Movimiento"}</h2>
              <button onClick={() => setShowMovimientoModal(false)} className="p-2 rounded-xl hover:bg-purple-50 text-purple-400 hover:text-purple-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveMovimiento} className="p-6 space-y-4">
              <FormField label="Producto" required>
                <select className={inputCls} value={movimientoForm.producto} onChange={e => setMovimientoForm({ ...movimientoForm, producto: e.target.value })} required>
                  <option value="">Seleccionar producto...</option>
                  {inventory.map(p => (
                    <option key={p.id} value={p.nombre}>{p.nombre}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Tipo" required>
                <select className={inputCls} value={movimientoForm.tipo} onChange={e => setMovimientoForm({ ...movimientoForm, tipo: e.target.value as "Entrada" | "Salida" })} required>
                  <option value="Entrada">Entrada</option>
                  <option value="Salida">Salida</option>
                </select>
              </FormField>
              <FormField label="Cantidad" required>
                <input type="number" min={1} className={inputCls} value={movimientoForm.cantidad} onChange={e => setMovimientoForm({ ...movimientoForm, cantidad: Number(e.target.value) })} required />
              </FormField>
              <FormField label="Fecha" required>
                <input type="date" className={inputCls} value={movimientoForm.fecha} onChange={e => setMovimientoForm({ ...movimientoForm, fecha: e.target.value })} required />
              </FormField>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowMovimientoModal(false)} className="flex-1 py-3 rounded-2xl border-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-medium transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors">{editingMovimiento ? "Guardar cambios" : "Registrar movimiento"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── CONFIRM DELETE ── */}
      {confirmAction && (
        <ConfirmDialog message={confirmAction.message} onConfirm={confirmAction.onConfirm} onCancel={() => setConfirmAction(null)} />
      )}
    </main>
  );
}
