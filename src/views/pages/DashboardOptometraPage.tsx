import { useState, useRef } from "react";
import { useOutletContext } from "react-router";
import {
  Eye, Users, Calendar, ClipboardList, Activity, FileText,
  User, Plus, Edit, Trash2, X, ChevronLeft, ChevronRight,
  Search, Menu, Phone, Mail, MapPin, Printer, Download,
  CheckCircle, Clock, AlertCircle, LayoutDashboard, Lock,
  Camera, Save, RefreshCw,
} from "lucide-react";
import { formatPrice } from "../../models/data/products";

/* ─── Types ──────────────────────────────────────────────── */
interface Paciente {
  id: number;
  tipoDoc: string;
  numDoc: string;
  nombres: string;
  apellidos: string;
  fechaNac: string;
  edad: number;
  genero: string;
  telefono: string;
  correo: string;
  direccion: string;
  eps: string;
  observaciones: string;
  estado: "Activo" | "Inactivo";
  fechaRegistro: string;
}

interface Cita {
  id: string;
  pacienteId: number;
  paciente: string;
  tipoCita: string;
  fecha: string;
  hora: string;
  optometra: string;
  estado: "Pendiente" | "Confirmada" | "En proceso" | "Atendida" | "Cancelada";
  observaciones: string;
}

interface HistorialMedico {
  id: number;
  pacienteId: number;
  paciente: string;
  fecha: string;
  diagnostico: string;
  optometra: string;
  antecedentes: string;
  tratamiento: string;
  observaciones: string;
  formulaId?: number;
  examenes: string;
  estado: "Activo" | "Archivado";
}

interface ExamenVisual {
  id: number;
  pacienteId: number;
  paciente: string;
  fecha: string;
  agudezaOD: string;
  agudezaOI: string;
  tonometriaOD: string;
  tonometriaOI: string;
  esfOD: string; cilOD: string; ejeOD: string; adOD: string;
  esfOI: string; cilOI: string; ejeOI: string; adOI: string;
  distPupilar: string;
  segAnterior: string;
  segPosterior: string;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
}

interface Formula {
  id: number;
  pacienteId: number;
  paciente: string;
  fecha: string;
  esfOD: string; cilOD: string; ejeOD: string; adOD: string;
  esfOI: string; cilOI: string; ejeOI: string; adOI: string;
  distPupilar: string;
  tipoLente: string;
  observaciones: string;
  estado: "Vigente" | "Vencida";
}

/* ─── Helpers ────────────────────────────────────────────── */
const PAGE_SIZE = 6;

function usePagination<T>(items: T[]) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safe = Math.min(page, totalPages);
  const start = (safe - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, items.length);
  return { slice: items.slice(start, end), page: safe, setPage, totalPages, start, end, total: items.length };
}

const inputCls = "w-full px-4 py-2.5 rounded-xl border-2 border-purple-200 focus:border-purple-600 focus:outline-none bg-white text-purple-900 text-sm";

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

function ModalWrapper({ title, subtitle, onClose, children, wide }: { title: string; subtitle?: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-3xl shadow-xl w-full ${wide ? "max-w-3xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-start justify-between p-6 pb-4 border-b border-purple-100 sticky top-0 bg-white rounded-t-3xl z-10">
          <div>
            <h2 className="text-purple-900 font-bold text-lg">{title}</h2>
            {subtitle && <p className="text-purple-500 text-sm mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl ml-4 flex-shrink-0"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function ConfirmDialog({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 p-3 rounded-2xl"><Trash2 className="w-6 h-6 text-red-600" /></div>
          <p className="text-purple-900 font-medium">{message}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-purple-900 font-medium">Cancelar</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium">Eliminar</button>
        </div>
      </div>
    </div>
  );
}

function TablePager({ start, end, total, page, totalPages, setPage }: { start: number; end: number; total: number; page: number; totalPages: number; setPage: (p: number) => void }) {
  if (total === 0) return null;
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-purple-100 bg-purple-50/40">
      <p className="text-sm text-purple-600">Mostrando <strong>{start + 1}–{end}</strong> de <strong>{total}</strong></p>
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(page - 1)} disabled={page === 1} className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-100 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-medium ${p === page ? "bg-purple-600 text-white" : "text-purple-600 hover:bg-purple-100"}`}>{p}</button>
          ))}
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-100 disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
        </div>
      )}
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-700 to-purple-900 rounded-t-2xl">
      <Search className="w-4 h-4 text-purple-300 flex-shrink-0" />
      <input
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Buscar..."}
        className="flex-1 bg-transparent text-white placeholder-purple-300 focus:outline-none text-sm"
      />
      {value && <button onClick={() => onChange("")} className="text-purple-300 hover:text-white"><X className="w-4 h-4" /></button>}
    </div>
  );
}

function StatusBadge({ estado }: { estado: string }) {
  const map: Record<string, string> = {
    Pendiente: "bg-yellow-100 text-yellow-700",
    Confirmada: "bg-blue-100 text-blue-700",
    "En proceso": "bg-purple-100 text-purple-700",
    Atendida: "bg-green-100 text-green-700",
    Cancelada: "bg-red-100 text-red-700",
    Activo: "bg-green-100 text-green-700",
    Inactivo: "bg-gray-100 text-gray-600",
    Vigente: "bg-green-100 text-green-700",
    Vencida: "bg-red-100 text-red-700",
    Archivado: "bg-gray-100 text-gray-600",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[estado] || "bg-gray-100 text-gray-600"}`}>{estado}</span>;
}

/* ─── Mock data ──────────────────────────────────────────── */
const MOCK_PACIENTES: Paciente[] = [
  { id: 1, tipoDoc: "CC", numDoc: "1023456789", nombres: "Valentina", apellidos: "Rodríguez", fechaNac: "1995-03-12", edad: 29, genero: "Femenino", telefono: "3104567890", correo: "vale.rodriguez@email.com", direccion: "Cra 15 #45-20 Bogotá", eps: "Sura", observaciones: "Paciente con antecedentes de miopía", estado: "Activo", fechaRegistro: "2026-01-10" },
  { id: 2, tipoDoc: "CC", numDoc: "1098765432", nombres: "Santiago", apellidos: "Morales", fechaNac: "1988-07-25", edad: 37, genero: "Masculino", telefono: "3209876543", correo: "smorales@email.com", direccion: "Calle 80 #22-10 Bogotá", eps: "Nueva EPS", observaciones: "", estado: "Activo", fechaRegistro: "2026-01-18" },
  { id: 3, tipoDoc: "TI", numDoc: "10234561", nombres: "Sofía", apellidos: "Herrera", fechaNac: "2008-11-02", edad: 17, genero: "Femenino", telefono: "3112233445", correo: "sofia.herrera@email.com", direccion: "Av 68 #32-15 Bogotá", eps: "Compensar", observaciones: "Menor de edad, acudiente: Claudia Herrera", estado: "Activo", fechaRegistro: "2026-02-05" },
  { id: 4, tipoDoc: "CC", numDoc: "79456123", nombres: "Andrés", apellidos: "Díaz", fechaNac: "1975-05-18", edad: 50, genero: "Masculino", telefono: "3001122334", correo: "andresdiaz@email.com", direccion: "Calle 100 #14-30 Bogotá", eps: "Sanitas", observaciones: "Paciente con glaucoma incipiente", estado: "Activo", fechaRegistro: "2026-02-20" },
  { id: 5, tipoDoc: "CE", numDoc: "E-123456", nombres: "María", apellidos: "López", fechaNac: "1992-09-30", edad: 33, genero: "Femenino", telefono: "3155566778", correo: "mlopez@email.com", direccion: "Cra 7 #72-50 Bogotá", eps: "Colsanitas", observaciones: "", estado: "Inactivo", fechaRegistro: "2025-11-15" },
  { id: 6, tipoDoc: "CC", numDoc: "1054321678", nombres: "Camilo", apellidos: "Vargas", fechaNac: "2000-02-14", edad: 26, genero: "Masculino", telefono: "3184455667", correo: "camilo.v@email.com", direccion: "Calle 45 #9-21 Bogotá", eps: "Coomeva", observaciones: "", estado: "Activo", fechaRegistro: "2026-03-08" },
  { id: 7, tipoDoc: "CC", numDoc: "52345678", nombres: "Daniela", apellidos: "Pinzón", fechaNac: "1990-06-22", edad: 35, genero: "Femenino", telefono: "3126677889", correo: "d.pinzon@email.com", direccion: "Cra 50 #128-10 Bogotá", eps: "Famisanar", observaciones: "Alergia a conservantes", estado: "Activo", fechaRegistro: "2026-03-22" },
];

const MOCK_CITAS: Cita[] = [
  { id: "CIT-001", pacienteId: 1, paciente: "Valentina Rodríguez", tipoCita: "Examen visual completo", fecha: "2026-06-26", hora: "09:00", optometra: "Dra. Ana Gómez", estado: "Confirmada", observaciones: "Traer gafas actuales" },
  { id: "CIT-002", pacienteId: 2, paciente: "Santiago Morales", tipoCita: "Control de lentes", fecha: "2026-06-26", hora: "10:30", optometra: "Dra. Ana Gómez", estado: "Pendiente", observaciones: "" },
  { id: "CIT-003", pacienteId: 3, paciente: "Sofía Herrera", tipoCita: "Primera consulta", fecha: "2026-06-27", hora: "14:00", optometra: "Dra. Ana Gómez", estado: "Confirmada", observaciones: "Menor de edad" },
  { id: "CIT-004", pacienteId: 4, paciente: "Andrés Díaz", tipoCita: "Seguimiento glaucoma", fecha: "2026-06-28", hora: "08:30", optometra: "Dra. Ana Gómez", estado: "Pendiente", observaciones: "Realizar tonometría" },
  { id: "CIT-005", pacienteId: 6, paciente: "Camilo Vargas", tipoCita: "Adaptación lentes contacto", fecha: "2026-06-30", hora: "11:00", optometra: "Dra. Ana Gómez", estado: "Confirmada", observaciones: "" },
  { id: "CIT-006", pacienteId: 7, paciente: "Daniela Pinzón", tipoCita: "Examen visual completo", fecha: "2026-07-02", hora: "15:30", optometra: "Dra. Ana Gómez", estado: "Pendiente", observaciones: "" },
  { id: "CIT-007", pacienteId: 1, paciente: "Valentina Rodríguez", tipoCita: "Control anual", fecha: "2026-05-10", hora: "09:00", optometra: "Dra. Ana Gómez", estado: "Atendida", observaciones: "" },
];

const MOCK_HISTORIAL: HistorialMedico[] = [
  { id: 1, pacienteId: 1, paciente: "Valentina Rodríguez", fecha: "2026-05-10", diagnostico: "Miopía moderada OD/OI con astigmatismo", optometra: "Dra. Ana Gómez", antecedentes: "Miopía desde los 12 años. Sin cirugías oculares. Sin alergias a medicamentos.", tratamiento: "Cambio de fórmula óptica. Uso continuo de corrección óptica.", observaciones: "Control en 6 meses.", formulaId: 1, examenes: "Agudeza visual OD: 20/200 sc / OI: 20/150 sc. Refracción bajo ciclopéjico.", estado: "Activo" },
  { id: 2, pacienteId: 4, paciente: "Andrés Díaz", fecha: "2026-04-22", diagnostico: "Glaucoma de ángulo abierto incipiente", optometra: "Dra. Ana Gómez", antecedentes: "Presión intraocular elevada detectada en 2024. Padre con glaucoma.", tratamiento: "Colirio Timolol 0.5% 1 gota cada 12h. Control mensual.", observaciones: "Derivar a oftalmología para evaluación completa.", formulaId: undefined, examenes: "Tonometría OD: 21 mmHg / OI: 22 mmHg. Fondo de ojo: excavación 0.6.", estado: "Activo" },
  { id: 3, pacienteId: 2, paciente: "Santiago Morales", fecha: "2026-03-15", diagnostico: "Hipermetropía leve bilateral", optometra: "Dra. Ana Gómez", antecedentes: "Sin antecedentes oculares relevantes.", tratamiento: "Corrección óptica para uso en lectura y computador.", observaciones: "Buen pronóstico. Control en 1 año.", formulaId: 2, examenes: "Agudeza visual: OD 20/25 / OI 20/25. Refracción bajo ciclopéjico.", estado: "Activo" },
  { id: 4, pacienteId: 7, paciente: "Daniela Pinzón", fecha: "2026-02-08", diagnostico: "Ojo seco moderado bilateral", optometra: "Dra. Ana Gómez", antecedentes: "Uso prolongado de pantallas. Toma anticonceptivos orales.", tratamiento: "Lágrimas artificiales sin conservantes c/4h. Pausas frecuentes en pantalla.", observaciones: "Evaluar respuesta al tratamiento en 3 meses.", formulaId: undefined, examenes: "Test de Schirmer: OD 8mm / OI 7mm. Tinción con fluoresceína positiva.", estado: "Activo" },
];

const MOCK_EXAMENES: ExamenVisual[] = [
  { id: 1, pacienteId: 1, paciente: "Valentina Rodríguez", fecha: "2026-05-10", agudezaOD: "20/200 sc / 20/20 cc", agudezaOI: "20/150 sc / 20/20 cc", tonometriaOD: "14 mmHg", tonometriaOI: "13 mmHg", esfOD: "-3.25", cilOD: "-0.75", ejeOD: "180", adOD: "", esfOI: "-3.00", cilOI: "-0.50", ejeOI: "175", adOI: "", distPupilar: "62mm", segAnterior: "Sin alteraciones. Cristalino transparente.", segPosterior: "Relación copa/disco 0.3. Sin alteraciones periféricas.", diagnostico: "Miopía moderada con astigmatismo bilateral", tratamiento: "Nueva fórmula óptica. Gafas o lentes de contacto.", observaciones: "Uso de computador ≥8h/día. Recomendado filtro luz azul." },
];

const MOCK_FORMULAS: Formula[] = [
  { id: 1, pacienteId: 1, paciente: "Valentina Rodríguez", fecha: "2026-05-10", esfOD: "-3.25", cilOD: "-0.75", ejeOD: "180", adOD: "", esfOI: "-3.00", cilOI: "-0.50", ejeOI: "175", adOI: "", distPupilar: "62mm", tipoLente: "Monofocal - Anti reflejo", observaciones: "Uso full time. Incluir filtro luz azul.", estado: "Vigente" },
  { id: 2, pacienteId: 2, paciente: "Santiago Morales", fecha: "2026-03-15", esfOD: "+1.50", cilOD: "", ejeOD: "", adOD: "+1.00", esfOI: "+1.25", cilOI: "", ejeOI: "", adOI: "+1.00", distPupilar: "64mm", tipoLente: "Bifocal", observaciones: "Uso en lectura y computador.", estado: "Vigente" },
  { id: 3, pacienteId: 5, paciente: "María López", fecha: "2025-08-20", esfOD: "-1.75", cilOD: "", ejeOD: "", adOD: "", esfOI: "-2.00", cilOI: "-0.25", ejeOI: "90", adOI: "", distPupilar: "60mm", tipoLente: "Monofocal", observaciones: "", estado: "Vencida" },
];

const PERFIL_OPTOMETRA = { nombre: "Ana", apellidos: "Gómez Torres", correo: "ana.gomez@lentsoft.com", telefono: "+57 300 987 6543", registro: "RM-COL-12345", especialidad: "Optometría Clínica y Contactología", universidad: "Universidad Nacional de Colombia", experiencia: "8 años", foto: "" };

/* ─── Main Component ─────────────────────────────────────── */
interface OutletContext { textSize: number }

type Tab = "dashboard" | "pacientes" | "citas" | "historial" | "examen" | "formulas" | "perfil";

export function DashboardOptometraPage() {
  const ctx = useOutletContext<OutletContext | null>();
  const textSize = ctx?.textSize ?? 1;
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ message: string; onConfirm: () => void } | null>(null);

  /* ── Pacientes state ── */
  const [pacientes, setPacientes] = useState<Paciente[]>(MOCK_PACIENTES);
  const [pacSearch, setPacSearch] = useState("");
  const [showPacModal, setShowPacModal] = useState(false);
  const [editingPac, setEditingPac] = useState<Paciente | null>(null);
  const emptyPac = { tipoDoc: "CC", numDoc: "", nombres: "", apellidos: "", fechaNac: "", edad: 0, genero: "Femenino", telefono: "", correo: "", direccion: "", eps: "", observaciones: "", estado: "Activo" as const, fechaRegistro: new Date().toISOString().split("T")[0] };
  const [pacForm, setPacForm] = useState({ ...emptyPac });
  const [viewPac, setViewPac] = useState<Paciente | null>(null);

  const filteredPac = pacientes.filter(p =>
    p.nombres.toLowerCase().includes(pacSearch.toLowerCase()) ||
    p.apellidos.toLowerCase().includes(pacSearch.toLowerCase()) ||
    p.numDoc.includes(pacSearch)
  );
  const pacPag = usePagination(filteredPac);

  const openAddPac = () => { setEditingPac(null); setPacForm({ ...emptyPac }); setShowPacModal(true); };
  const openEditPac = (p: Paciente) => { setEditingPac(p); setPacForm({ tipoDoc: p.tipoDoc, numDoc: p.numDoc, nombres: p.nombres, apellidos: p.apellidos, fechaNac: p.fechaNac, edad: p.edad, genero: p.genero, telefono: p.telefono, correo: p.correo, direccion: p.direccion, eps: p.eps, observaciones: p.observaciones, estado: p.estado, fechaRegistro: p.fechaRegistro }); setShowPacModal(true); };
  const savePac = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPac) {
      setPacientes(pacientes.map(p => p.id === editingPac.id ? { ...p, ...pacForm } : p));
    } else {
      setPacientes([...pacientes, { id: Date.now(), ...pacForm }]);
    }
    setShowPacModal(false);
  };
  const deletePac = (id: number) => setConfirmAction({ message: "¿Está seguro de eliminar este paciente?", onConfirm: () => { setPacientes(pacientes.filter(p => p.id !== id)); setConfirmAction(null); } });

  /* ── Citas state ── */
  const [citas, setCitas] = useState<Cita[]>(MOCK_CITAS);
  const [citaSearch, setCitaSearch] = useState("");
  const [citaEstadoFilter, setCitaEstadoFilter] = useState("Todos");
  const [showCitaModal, setShowCitaModal] = useState(false);
  const [editingCita, setEditingCita] = useState<Cita | null>(null);
  const [viewCita, setViewCita] = useState<Cita | null>(null);
  const emptyCita: Omit<Cita, "id"> = { pacienteId: 0, paciente: "", tipoCita: "Examen visual completo", fecha: new Date().toISOString().split("T")[0], hora: "09:00", optometra: "Dra. Ana Gómez", estado: "Pendiente", observaciones: "" };
  const [citaForm, setCitaForm] = useState<Omit<Cita, "id">>({ ...emptyCita });
  const [citaVista, setCitaVista] = useState<"lista" | "calendario">("lista");
  const [calMes, setCalMes] = useState(new Date(2026, 5, 1));

  const filteredCitas = citas.filter(c =>
    (citaEstadoFilter === "Todos" || c.estado === citaEstadoFilter) &&
    (c.paciente.toLowerCase().includes(citaSearch.toLowerCase()) || c.id.includes(citaSearch))
  );
  const citaPag = usePagination(filteredCitas);

  const openAddCita = () => { setEditingCita(null); setCitaForm({ ...emptyCita }); setShowCitaModal(true); };
  const openEditCita = (c: Cita) => { setEditingCita(c); setCitaForm({ pacienteId: c.pacienteId, paciente: c.paciente, tipoCita: c.tipoCita, fecha: c.fecha, hora: c.hora, optometra: c.optometra, estado: c.estado, observaciones: c.observaciones }); setShowCitaModal(true); };
  const saveCita = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCita) {
      setCitas(citas.map(c => c.id === editingCita.id ? { ...c, ...citaForm } : c));
    } else {
      setCitas([...citas, { id: `CIT-${String(citas.length + 1).padStart(3, "0")}`, ...citaForm }]);
    }
    setShowCitaModal(false);
  };
  const deleteCita = (id: string) => setConfirmAction({ message: "¿Está seguro de eliminar esta cita?", onConfirm: () => { setCitas(citas.filter(c => c.id !== id)); setConfirmAction(null); } });

  /* ── Historial state ── */
  const [historial, setHistorial] = useState<HistorialMedico[]>(MOCK_HISTORIAL);
  const [histSearch, setHistSearch] = useState("");
  const [viewHist, setViewHist] = useState<HistorialMedico | null>(null);
  const [editHistModal, setEditHistModal] = useState<HistorialMedico | null>(null);
  const filteredHist = historial.filter(h => h.paciente.toLowerCase().includes(histSearch.toLowerCase()) || h.diagnostico.toLowerCase().includes(histSearch.toLowerCase()));
  const histPag = usePagination(filteredHist);

  /* ── Examen visual state ── */
  const [examenes, setExamenes] = useState<ExamenVisual[]>(MOCK_EXAMENES);
  const [examenSearch, setExamenSearch] = useState("");
  const [showExamenModal, setShowExamenModal] = useState(false);
  const [editingExamen, setEditingExamen] = useState<ExamenVisual | null>(null);
  const emptyExamen = { pacienteId: 0, paciente: "", fecha: new Date().toISOString().split("T")[0], agudezaOD: "", agudezaOI: "", tonometriaOD: "", tonometriaOI: "", esfOD: "", cilOD: "", ejeOD: "", adOD: "", esfOI: "", cilOI: "", ejeOI: "", adOI: "", distPupilar: "", segAnterior: "", segPosterior: "", diagnostico: "", tratamiento: "", observaciones: "" };
  const [examenForm, setExamenForm] = useState({ ...emptyExamen });
  const filteredExamenes = examenes.filter(e => e.paciente.toLowerCase().includes(examenSearch.toLowerCase()));
  const examenPag = usePagination(filteredExamenes);
  const openAddExamen = () => { setEditingExamen(null); setExamenForm({ ...emptyExamen }); setShowExamenModal(true); };
  const openEditExamen = (e: ExamenVisual) => { setEditingExamen(e); setExamenForm({ pacienteId: e.pacienteId, paciente: e.paciente, fecha: e.fecha, agudezaOD: e.agudezaOD, agudezaOI: e.agudezaOI, tonometriaOD: e.tonometriaOD, tonometriaOI: e.tonometriaOI, esfOD: e.esfOD, cilOD: e.cilOD, ejeOD: e.ejeOD, adOD: e.adOD, esfOI: e.esfOI, cilOI: e.cilOI, ejeOI: e.ejeOI, adOI: e.adOI, distPupilar: e.distPupilar, segAnterior: e.segAnterior, segPosterior: e.segPosterior, diagnostico: e.diagnostico, tratamiento: e.tratamiento, observaciones: e.observaciones }); setShowExamenModal(true); };
  const saveExamen = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (editingExamen) {
      setExamenes(examenes.map(e => e.id === editingExamen.id ? { ...e, ...examenForm } : e));
    } else {
      setExamenes([...examenes, { id: Date.now(), ...examenForm }]);
    }
    setShowExamenModal(false);
  };

  /* ── Fórmulas state ── */
  const [formulas, setFormulas] = useState<Formula[]>(MOCK_FORMULAS);
  const [formulaSearch, setFormulaSearch] = useState("");
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [editingFormula, setEditingFormula] = useState<Formula | null>(null);
  const [viewFormula, setViewFormula] = useState<Formula | null>(null);
  const emptyFormula = { pacienteId: 0, paciente: "", fecha: new Date().toISOString().split("T")[0], esfOD: "", cilOD: "", ejeOD: "", adOD: "", esfOI: "", cilOI: "", ejeOI: "", adOI: "", distPupilar: "", tipoLente: "Monofocal", observaciones: "", estado: "Vigente" as const };
  const [formulaForm, setFormulaForm] = useState({ ...emptyFormula });
  const filteredFormulas = formulas.filter(f => f.paciente.toLowerCase().includes(formulaSearch.toLowerCase()));
  const formulaPag = usePagination(filteredFormulas);
  const openAddFormula = () => { setEditingFormula(null); setFormulaForm({ ...emptyFormula }); setShowFormulaModal(true); };
  const openEditFormula = (f: Formula) => { setEditingFormula(f); setFormulaForm({ pacienteId: f.pacienteId, paciente: f.paciente, fecha: f.fecha, esfOD: f.esfOD, cilOD: f.cilOD, ejeOD: f.ejeOD, adOD: f.adOD, esfOI: f.esfOI, cilOI: f.cilOI, ejeOI: f.ejeOI, adOI: f.adOI, distPupilar: f.distPupilar, tipoLente: f.tipoLente, observaciones: f.observaciones, estado: f.estado }); setShowFormulaModal(true); };
  const saveFormula = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (editingFormula) {
      setFormulas(formulas.map(f => f.id === editingFormula.id ? { ...f, ...formulaForm } : f));
    } else {
      setFormulas([...formulas, { id: Date.now(), ...formulaForm }]);
    }
    setShowFormulaModal(false);
  };
  const deleteFormula = (id: number) => setConfirmAction({ message: "¿Está seguro de eliminar esta fórmula óptica?", onConfirm: () => { setFormulas(formulas.filter(f => f.id !== id)); setConfirmAction(null); } });

  /* ── Perfil state ── */
  const [perfil, setPerfil] = useState(PERFIL_OPTOMETRA);
  const [editPerfil, setEditPerfil] = useState(false);
  const [perfilForm, setPerfilForm] = useState({ ...PERFIL_OPTOMETRA });
  const [showCambioPass, setShowCambioPass] = useState(false);

  /* ─── Sidebar ─────────────────────────────────────────── */
  const navItems: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: "dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
    { id: "pacientes", icon: <Users className="w-5 h-5" />, label: "Pacientes" },
    { id: "citas",     icon: <Calendar className="w-5 h-5" />, label: "Citas" },
    { id: "historial", icon: <ClipboardList className="w-5 h-5" />, label: "Historial Médico" },
    { id: "examen",    icon: <Eye className="w-5 h-5" />, label: "Examen Visual" },
    { id: "formulas",  icon: <FileText className="w-5 h-5" />, label: "Fórmulas Ópticas" },
    { id: "perfil",    icon: <User className="w-5 h-5" />, label: "Perfil" },
  ];

  function SidebarContent({ onNav }: { onNav?: () => void }) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-5 py-6 border-b border-purple-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">LentSoft</p>
              <p className="text-purple-400 text-xs">Módulo Optómetra</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); onNav?.(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                activeTab === id ? "bg-purple-600 text-white shadow-md" : "text-purple-300 hover:bg-purple-800 hover:text-white"
              }`}
            >
              <span className={activeTab === id ? "text-white" : "text-purple-400 group-hover:text-purple-200"}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-purple-800 space-y-1">
          <p className="text-white text-xs font-semibold truncate">{perfil.nombre} {perfil.apellidos}</p>
          <p className="text-purple-400 text-xs truncate">{perfil.especialidad}</p>
        </div>
      </div>
    );
  }

  /* ─── Calendar helper ─────────────────────────────────── */
  function MiniCalendar() {
    const year = calMes.getFullYear(), month = calMes.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const citasDelMes = citas.filter(c => { const d = new Date(c.fecha); return d.getFullYear() === year && d.getMonth() === month; });
    const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const days = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
    const blanks = firstDay;
    return (
      <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCalMes(new Date(year, month - 1, 1))} className="p-1.5 hover:bg-purple-100 rounded-lg"><ChevronLeft className="w-4 h-4 text-purple-600" /></button>
          <h3 className="text-purple-900 font-semibold text-sm">{meses[month]} {year}</h3>
          <button onClick={() => setCalMes(new Date(year, month + 1, 1))} className="p-1.5 hover:bg-purple-100 rounded-lg"><ChevronRight className="w-4 h-4 text-purple-600" /></button>
        </div>
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {days.map(d => <div key={d} className="text-center text-xs font-semibold text-purple-400 py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: blanks }).map((_, i) => <div key={`b${i}`} />)}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const hasCita = citasDelMes.some(c => c.fecha === dateStr);
            const isToday = dateStr === "2026-06-25";
            return (
              <div key={day} className={`text-center py-1 rounded-lg text-xs font-medium relative cursor-default ${isToday ? "bg-purple-600 text-white" : hasCita ? "bg-purple-100 text-purple-800" : "text-gray-500 hover:bg-gray-50"}`}>
                {day}
                {hasCita && !isToday && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full" />}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ─── Tab label ──────────────────────────────────────── */
  const tabLabel = navItems.find(n => n.id === activeTab)?.label || "Dashboard";

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">

        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-60 xl:w-64 bg-purple-900 flex-shrink-0 sticky top-0 h-screen">
          <SidebarContent />
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <aside className={`fixed left-0 top-0 h-full w-64 bg-purple-900 z-50 transform transition-transform duration-300 lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-end px-4 pt-4">
            <button onClick={() => setSidebarOpen(false)} className="text-purple-400 hover:text-white p-1.5 rounded-lg hover:bg-purple-800"><X className="w-5 h-5" /></button>
          </div>
          <SidebarContent onNav={() => setSidebarOpen(false)} />
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Mobile topbar */}
          <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-purple-100 px-4 py-3 flex items-center gap-3 shadow-sm">
            <button onClick={() => setSidebarOpen(true)} className="p-2 text-purple-700 hover:bg-purple-50 rounded-xl"><Menu className="w-5 h-5" /></button>
            <div>
              <p className="text-purple-900 font-bold text-sm">{tabLabel}</p>
              <p className="text-purple-500 text-xs">Optómetra</p>
            </div>
          </div>

          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
            {/* Page header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.75}rem` }}>{tabLabel}</h1>
                <p className="text-purple-500 text-sm mt-0.5">Sistema LentSoft · Módulo Optómetra</p>
              </div>
            </div>

            {/* ═══ DASHBOARD ════════════════════════════════════════ */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {[
                    { label: "Pacientes", value: pacientes.length, icon: <Users className="w-5 h-5" />, color: "bg-blue-50 text-blue-600" },
                    { label: "Citas hoy", value: citas.filter(c => c.fecha === "2026-06-25").length, icon: <Calendar className="w-5 h-5" />, color: "bg-purple-50 text-purple-600" },
                    { label: "Pendientes", value: citas.filter(c => c.estado === "Pendiente").length, icon: <Clock className="w-5 h-5" />, color: "bg-yellow-50 text-yellow-600" },
                    { label: "Exámenes", value: examenes.length, icon: <Eye className="w-5 h-5" />, color: "bg-green-50 text-green-600" },
                    { label: "Fórmulas", value: formulas.length, icon: <FileText className="w-5 h-5" />, color: "bg-pink-50 text-pink-600" },
                    { label: "Próxima cita", value: "26 Jun", icon: <CheckCircle className="w-5 h-5" />, color: "bg-indigo-50 text-indigo-600" },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-purple-100 p-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>{s.icon}</div>
                      <p className="text-2xl font-bold text-purple-900">{s.value}</p>
                      <p className="text-purple-500 text-xs mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Calendar */}
                  <div>
                    <MiniCalendar />
                  </div>

                  {/* Today's agenda */}
                  <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-5">
                    <h3 className="text-purple-900 font-semibold mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-600" />Agenda de hoy</h3>
                    <div className="space-y-3">
                      {citas.filter(c => c.fecha === "2026-06-25").length === 0
                        ? <p className="text-purple-400 text-sm text-center py-4">Sin citas para hoy</p>
                        : citas.filter(c => c.fecha === "2026-06-25").map(c => (
                          <div key={c.id} className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                            <span className="text-purple-600 text-xs font-bold mt-0.5 w-12 flex-shrink-0">{c.hora}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-purple-900 font-medium text-sm truncate">{c.paciente}</p>
                              <p className="text-purple-500 text-xs">{c.tipoCita}</p>
                            </div>
                            <StatusBadge estado={c.estado} />
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  {/* Quick access */}
                  <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-5">
                    <h3 className="text-purple-900 font-semibold mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-purple-600" />Accesos rápidos</h3>
                    <div className="space-y-2">
                      {[
                        { label: "Registrar paciente", tab: "pacientes" as Tab, action: () => { setActiveTab("pacientes"); setTimeout(openAddPac, 100); } },
                        { label: "Registrar cita", tab: "citas" as Tab, action: () => { setActiveTab("citas"); setTimeout(openAddCita, 100); } },
                        { label: "Consultar historial", tab: "historial" as Tab, action: () => setActiveTab("historial") },
                        { label: "Registrar examen visual", tab: "examen" as Tab, action: () => { setActiveTab("examen"); setTimeout(openAddExamen, 100); } },
                        { label: "Crear fórmula óptica", tab: "formulas" as Tab, action: () => { setActiveTab("formulas"); setTimeout(openAddFormula, 100); } },
                      ].map(({ label, action }) => (
                        <button key={label} onClick={action} className="w-full flex items-center gap-2 px-3 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-sm font-medium transition-colors text-left">
                          <Plus className="w-4 h-4 flex-shrink-0" />{label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Próximas citas */}
                <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100">
                    <h3 className="text-purple-900 font-semibold flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-600" />Próximas consultas</h3>
                    <button onClick={() => setActiveTab("citas")} className="text-purple-600 text-sm hover:underline">Ver todas →</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="bg-purple-50"><th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Cita</th><th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Paciente</th><th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold hidden sm:table-cell">Tipo</th><th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Fecha</th><th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Estado</th></tr></thead>
                      <tbody>
                        {citas.filter(c => c.estado !== "Atendida" && c.estado !== "Cancelada").slice(0, 5).map(c => (
                          <tr key={c.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                            <td className="py-3 px-4 text-purple-700 text-xs font-mono">{c.id}</td>
                            <td className="py-3 px-4 text-purple-900 text-sm font-medium">{c.paciente}</td>
                            <td className="py-3 px-4 text-purple-600 text-xs hidden sm:table-cell">{c.tipoCita}</td>
                            <td className="py-3 px-4 text-purple-900 text-xs">{new Date(c.fecha).toLocaleDateString("es-CO")} · {c.hora}</td>
                            <td className="py-3 px-4"><StatusBadge estado={c.estado} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ PACIENTES ════════════════════════════════════════ */}
            {activeTab === "pacientes" && (
              <div className="space-y-5">
                <div className="flex justify-end">
                  <button onClick={openAddPac} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold shadow-md transition-colors">
                    <Plus className="w-4 h-4" />Nuevo Paciente
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-hidden">
                  <SearchBar value={pacSearch} onChange={setPacSearch} placeholder="Buscar por nombre o documento..." />
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="bg-purple-50">
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Documento</th>
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Nombre completo</th>
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold hidden md:table-cell">Teléfono</th>
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold hidden lg:table-cell">Correo</th>
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Estado</th>
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold hidden sm:table-cell">Registro</th>
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Acciones</th>
                      </tr></thead>
                      <tbody>
                        {pacPag.slice.map(p => (
                          <tr key={p.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                            <td className="py-3 px-4 text-purple-700 text-xs font-mono">{p.tipoDoc} {p.numDoc}</td>
                            <td className="py-3 px-4 text-purple-900 text-sm font-medium">{p.nombres} {p.apellidos}</td>
                            <td className="py-3 px-4 text-purple-600 text-sm hidden md:table-cell">{p.telefono}</td>
                            <td className="py-3 px-4 text-purple-600 text-xs hidden lg:table-cell">{p.correo}</td>
                            <td className="py-3 px-4"><StatusBadge estado={p.estado} /></td>
                            <td className="py-3 px-4 text-purple-600 text-xs hidden sm:table-cell">{new Date(p.fechaRegistro).toLocaleDateString("es-CO")}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-1.5">
                                <button onClick={() => setViewPac(p)} title="Ver" className="p-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                                <button onClick={() => openEditPac(p)} title="Editar" className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                                <button onClick={() => deletePac(p.id)} title="Eliminar" className="p-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredPac.length === 0 && <tr><td colSpan={7} className="py-10 text-center text-purple-400 text-sm">No se encontraron pacientes.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                  <TablePager {...pacPag} />
                </div>
              </div>
            )}

            {/* ═══ CITAS ════════════════════════════════════════════ */}
            {activeTab === "citas" && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex gap-2">
                    {(["lista", "calendario"] as const).map(v => (
                      <button key={v} onClick={() => setCitaVista(v)} className={`px-3 py-1.5 rounded-xl text-sm font-medium capitalize transition-colors ${citaVista === v ? "bg-purple-600 text-white" : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50"}`}>{v === "lista" ? "Lista" : "Calendario"}</button>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {(["Todos","Pendiente","Confirmada","En proceso","Atendida","Cancelada"] as const).map(e => (
                      <button key={e} onClick={() => setCitaEstadoFilter(e)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${citaEstadoFilter === e ? "bg-purple-600 text-white" : "bg-white text-purple-600 border border-purple-200 hover:bg-purple-50"}`}>{e}</button>
                    ))}
                  </div>
                  <div className="ml-auto">
                    <button onClick={openAddCita} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold shadow-md transition-colors">
                      <Plus className="w-4 h-4" />Nueva Cita
                    </button>
                  </div>
                </div>

                {citaVista === "calendario" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MiniCalendar />
                    <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-5">
                      <h3 className="text-purple-900 font-semibold mb-4 text-sm">Citas del mes</h3>
                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {citas.filter(c => { const d = new Date(c.fecha); return d.getMonth() === calMes.getMonth() && d.getFullYear() === calMes.getFullYear(); }).map(c => (
                          <div key={c.id} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                            <div className="w-1 h-8 bg-purple-600 rounded-full flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-purple-900 font-medium text-xs">{c.paciente}</p>
                              <p className="text-purple-500 text-xs">{new Date(c.fecha).toLocaleDateString("es-CO")} · {c.hora} · {c.tipoCita}</p>
                            </div>
                            <StatusBadge estado={c.estado} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {citaVista === "lista" && (
                  <div className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-hidden">
                    <SearchBar value={citaSearch} onChange={setCitaSearch} placeholder="Buscar por paciente o número de cita..." />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead><tr className="bg-purple-50">
                          <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">N° Cita</th>
                          <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Paciente</th>
                          <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Fecha / Hora</th>
                          <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold hidden md:table-cell">Tipo</th>
                          <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Estado</th>
                          <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Acciones</th>
                        </tr></thead>
                        <tbody>
                          {citaPag.slice.map(c => (
                            <tr key={c.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                              <td className="py-3 px-4 text-purple-700 text-xs font-mono">{c.id}</td>
                              <td className="py-3 px-4 text-purple-900 text-sm font-medium">{c.paciente}</td>
                              <td className="py-3 px-4 text-purple-600 text-xs">{new Date(c.fecha).toLocaleDateString("es-CO")} · {c.hora}</td>
                              <td className="py-3 px-4 text-purple-600 text-xs hidden md:table-cell">{c.tipoCita}</td>
                              <td className="py-3 px-4"><StatusBadge estado={c.estado} /></td>
                              <td className="py-3 px-4">
                                <div className="flex gap-1.5">
                                  <button onClick={() => setViewCita(c)} title="Ver" className="p-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => openEditCita(c)} title="Editar" className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => deleteCita(c.id)} title="Eliminar" className="p-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {filteredCitas.length === 0 && <tr><td colSpan={6} className="py-10 text-center text-purple-400 text-sm">No se encontraron citas.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                    <TablePager {...citaPag} />
                  </div>
                )}
              </div>
            )}

            {/* ═══ HISTORIAL MÉDICO ════════════════════════════════ */}
            {activeTab === "historial" && (
              <div className="space-y-5">
                {viewHist ? (
                  <div className="space-y-5">
                    <button onClick={() => setViewHist(null)} className="flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium"><ChevronLeft className="w-4 h-4" />Volver al historial</button>
                    <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-6 space-y-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-purple-900 font-bold text-lg">{viewHist.paciente}</h2>
                          <p className="text-purple-500 text-sm">{new Date(viewHist.fecha).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
                        </div>
                        <div className="flex gap-2">
                          <StatusBadge estado={viewHist.estado} />
                          <button onClick={() => setEditHistModal(viewHist)} className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-semibold hover:bg-purple-700"><Edit className="w-3.5 h-3.5" />Actualizar</button>
                        </div>
                      </div>
                      {[
                        { label: "Antecedentes", content: viewHist.antecedentes },
                        { label: "Diagnóstico", content: viewHist.diagnostico },
                        { label: "Exámenes realizados", content: viewHist.examenes },
                        { label: "Tratamiento", content: viewHist.tratamiento },
                        { label: "Observaciones", content: viewHist.observaciones },
                      ].map(s => (
                        <div key={s.label} className="bg-purple-50 rounded-xl p-4">
                          <p className="text-purple-600 text-xs font-semibold uppercase tracking-wide mb-1">{s.label}</p>
                          <p className="text-purple-900 text-sm leading-relaxed">{s.content || "—"}</p>
                        </div>
                      ))}
                      {viewHist.formulaId && (
                        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                          <p className="text-green-700 text-xs font-semibold uppercase tracking-wide mb-1">Fórmula óptica asociada</p>
                          <button onClick={() => { setActiveTab("formulas"); setViewFormula(formulas.find(f => f.id === viewHist.formulaId) || null); }} className="text-green-700 text-sm font-medium hover:underline">Ver fórmula óptica →</button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-hidden">
                    <SearchBar value={histSearch} onChange={setHistSearch} placeholder="Buscar por paciente o diagnóstico..." />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead><tr className="bg-purple-50">
                          <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Fecha</th>
                          <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Paciente</th>
                          <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold hidden md:table-cell">Diagnóstico</th>
                          <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold hidden lg:table-cell">Optómetra</th>
                          <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Estado</th>
                          <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Acciones</th>
                        </tr></thead>
                        <tbody>
                          {histPag.slice.map(h => (
                            <tr key={h.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                              <td className="py-3 px-4 text-purple-600 text-xs">{new Date(h.fecha).toLocaleDateString("es-CO")}</td>
                              <td className="py-3 px-4 text-purple-900 text-sm font-medium">{h.paciente}</td>
                              <td className="py-3 px-4 text-purple-600 text-xs hidden md:table-cell max-w-xs truncate">{h.diagnostico}</td>
                              <td className="py-3 px-4 text-purple-600 text-xs hidden lg:table-cell">{h.optometra}</td>
                              <td className="py-3 px-4"><StatusBadge estado={h.estado} /></td>
                              <td className="py-3 px-4">
                                <div className="flex gap-1.5">
                                  <button onClick={() => setViewHist(h)} title="Ver detalle" className="p-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => setEditHistModal(h)} title="Actualizar" className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {filteredHist.length === 0 && <tr><td colSpan={6} className="py-10 text-center text-purple-400 text-sm">No se encontraron historiales.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                    <TablePager {...histPag} />
                  </div>
                )}
              </div>
            )}

            {/* ═══ EXAMEN VISUAL ═══════════════════════════════════ */}
            {activeTab === "examen" && (
              <div className="space-y-5">
                <div className="flex justify-end">
                  <button onClick={openAddExamen} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold shadow-md transition-colors">
                    <Plus className="w-4 h-4" />Registrar Examen
                  </button>
                </div>
                <div className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-hidden">
                  <SearchBar value={examenSearch} onChange={setExamenSearch} placeholder="Buscar por paciente..." />
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="bg-purple-50">
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Fecha</th>
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Paciente</th>
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold hidden md:table-cell">Agudeza OD</th>
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold hidden md:table-cell">Agudeza OI</th>
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold hidden lg:table-cell">Diagnóstico</th>
                        <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Acciones</th>
                      </tr></thead>
                      <tbody>
                        {examenPag.slice.map(e => (
                          <tr key={e.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                            <td className="py-3 px-4 text-purple-600 text-xs">{new Date(e.fecha).toLocaleDateString("es-CO")}</td>
                            <td className="py-3 px-4 text-purple-900 text-sm font-medium">{e.paciente}</td>
                            <td className="py-3 px-4 text-purple-600 text-xs hidden md:table-cell">{e.agudezaOD}</td>
                            <td className="py-3 px-4 text-purple-600 text-xs hidden md:table-cell">{e.agudezaOI}</td>
                            <td className="py-3 px-4 text-purple-600 text-xs hidden lg:table-cell max-w-xs truncate">{e.diagnostico}</td>
                            <td className="py-3 px-4">
                              <button onClick={() => openEditExamen(e)} title="Editar" className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                            </td>
                          </tr>
                        ))}
                        {filteredExamenes.length === 0 && <tr><td colSpan={6} className="py-10 text-center text-purple-400 text-sm">No se encontraron exámenes.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                  <TablePager {...examenPag} />
                </div>
              </div>
            )}

            {/* ═══ FÓRMULAS ÓPTICAS ════════════════════════════════ */}
            {activeTab === "formulas" && (
              <div className="space-y-5">
                {viewFormula ? (
                  <div className="space-y-5">
                    <button onClick={() => setViewFormula(null)} className="flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium"><ChevronLeft className="w-4 h-4" />Volver</button>
                    <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-purple-900 font-bold text-lg">Fórmula Óptica</h2>
                          <p className="text-purple-500 text-sm">{viewFormula.paciente} · {new Date(viewFormula.fecha).toLocaleDateString("es-CO")}</p>
                        </div>
                        <div className="flex gap-2">
                          <StatusBadge estado={viewFormula.estado} />
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold hover:bg-blue-100"><Printer className="w-3.5 h-3.5" />Imprimir</button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-xl text-xs font-semibold hover:bg-green-100"><Download className="w-3.5 h-3.5" />PDF</button>
                        </div>
                      </div>
                      <div className="border border-purple-200 rounded-2xl overflow-hidden">
                        <div className="bg-purple-600 text-white text-center py-2 text-sm font-semibold">Prescripción Óptica</div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead><tr className="bg-purple-50"><th className="py-2 px-4 text-purple-700 text-xs font-semibold">Ojo</th><th className="py-2 px-4 text-purple-700 text-xs font-semibold">Esfera</th><th className="py-2 px-4 text-purple-700 text-xs font-semibold">Cilindro</th><th className="py-2 px-4 text-purple-700 text-xs font-semibold">Eje</th><th className="py-2 px-4 text-purple-700 text-xs font-semibold">Adición</th></tr></thead>
                            <tbody>
                              <tr className="border-t border-purple-100"><td className="py-3 px-4 text-center font-semibold text-purple-900 text-sm">OD</td><td className="py-3 px-4 text-center text-purple-900 text-sm">{viewFormula.esfOD || "—"}</td><td className="py-3 px-4 text-center text-purple-900 text-sm">{viewFormula.cilOD || "—"}</td><td className="py-3 px-4 text-center text-purple-900 text-sm">{viewFormula.ejeOD || "—"}</td><td className="py-3 px-4 text-center text-purple-900 text-sm">{viewFormula.adOD || "—"}</td></tr>
                              <tr className="border-t border-purple-100"><td className="py-3 px-4 text-center font-semibold text-purple-900 text-sm">OI</td><td className="py-3 px-4 text-center text-purple-900 text-sm">{viewFormula.esfOI || "—"}</td><td className="py-3 px-4 text-center text-purple-900 text-sm">{viewFormula.cilOI || "—"}</td><td className="py-3 px-4 text-center text-purple-900 text-sm">{viewFormula.ejeOI || "—"}</td><td className="py-3 px-4 text-center text-purple-900 text-sm">{viewFormula.adOI || "—"}</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="p-4 border-t border-purple-100 grid grid-cols-2 gap-4">
                          <div><p className="text-purple-500 text-xs">Distancia pupilar</p><p className="text-purple-900 font-semibold text-sm">{viewFormula.distPupilar}</p></div>
                          <div><p className="text-purple-500 text-xs">Tipo de lente</p><p className="text-purple-900 font-semibold text-sm">{viewFormula.tipoLente}</p></div>
                          {viewFormula.observaciones && <div className="col-span-2"><p className="text-purple-500 text-xs">Observaciones</p><p className="text-purple-900 text-sm">{viewFormula.observaciones}</p></div>}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-end">
                      <button onClick={openAddFormula} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold shadow-md transition-colors">
                        <Plus className="w-4 h-4" />Generar Fórmula
                      </button>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-hidden">
                      <SearchBar value={formulaSearch} onChange={setFormulaSearch} placeholder="Buscar por paciente..." />
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead><tr className="bg-purple-50">
                            <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Paciente</th>
                            <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Fecha</th>
                            <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold hidden md:table-cell">Tipo de lente</th>
                            <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Estado</th>
                            <th className="text-left py-3 px-4 text-purple-700 text-xs font-semibold">Acciones</th>
                          </tr></thead>
                          <tbody>
                            {formulaPag.slice.map(f => (
                              <tr key={f.id} className="border-b border-purple-50 hover:bg-purple-50/50">
                                <td className="py-3 px-4 text-purple-900 text-sm font-medium">{f.paciente}</td>
                                <td className="py-3 px-4 text-purple-600 text-xs">{new Date(f.fecha).toLocaleDateString("es-CO")}</td>
                                <td className="py-3 px-4 text-purple-600 text-xs hidden md:table-cell">{f.tipoLente}</td>
                                <td className="py-3 px-4"><StatusBadge estado={f.estado} /></td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-1.5">
                                    <button onClick={() => setViewFormula(f)} title="Ver" className="p-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => openEditFormula(f)} title="Editar" className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                                    <button title="Imprimir" className="p-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg"><Printer className="w-3.5 h-3.5" /></button>
                                    <button title="Descargar PDF" className="p-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg"><Download className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => deleteFormula(f.id)} title="Eliminar" className="p-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {filteredFormulas.length === 0 && <tr><td colSpan={5} className="py-10 text-center text-purple-400 text-sm">No se encontraron fórmulas.</td></tr>}
                          </tbody>
                        </table>
                      </div>
                      <TablePager {...formulaPag} />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ═══ PERFIL ══════════════════════════════════════════ */}
            {activeTab === "perfil" && (
              <div className="max-w-2xl space-y-6">
                <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-6">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-800 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                        {perfil.nombre[0]}{perfil.apellidos[0]}
                      </div>
                      <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700">
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-purple-900 font-bold text-xl">{perfil.nombre} {perfil.apellidos}</h2>
                      <p className="text-purple-500 text-sm">{perfil.especialidad}</p>
                      <p className="text-purple-400 text-xs mt-0.5">Reg. Médico: {perfil.registro}</p>
                    </div>
                    {!editPerfil && (
                      <button onClick={() => { setPerfilForm({ ...perfil }); setEditPerfil(true); }} className="ml-auto flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-sm font-medium">
                        <Edit className="w-4 h-4" />Editar
                      </button>
                    )}
                  </div>

                  {editPerfil ? (
                    <form onSubmit={e => { e.preventDefault(); setPerfil({ ...perfilForm }); setEditPerfil(false); }} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField label="Nombre"><input value={perfilForm.nombre} onChange={e => setPerfilForm({ ...perfilForm, nombre: e.target.value })} className={inputCls} /></FormField>
                        <FormField label="Apellidos"><input value={perfilForm.apellidos} onChange={e => setPerfilForm({ ...perfilForm, apellidos: e.target.value })} className={inputCls} /></FormField>
                      </div>
                      <FormField label="Correo institucional"><input type="email" value={perfilForm.correo} onChange={e => setPerfilForm({ ...perfilForm, correo: e.target.value })} className={inputCls} /></FormField>
                      <FormField label="Teléfono"><input value={perfilForm.telefono} onChange={e => setPerfilForm({ ...perfilForm, telefono: e.target.value })} className={inputCls} /></FormField>
                      <FormField label="Especialidad"><input value={perfilForm.especialidad} onChange={e => setPerfilForm({ ...perfilForm, especialidad: e.target.value })} className={inputCls} /></FormField>
                      <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setEditPerfil(false)} className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm">Cancelar</button>
                        <button type="submit" className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm flex items-center justify-center gap-2"><Save className="w-4 h-4" />Guardar cambios</button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      {[
                        { icon: <Mail className="w-4 h-4" />, label: "Correo", value: perfil.correo },
                        { icon: <Phone className="w-4 h-4" />, label: "Teléfono", value: perfil.telefono },
                        { icon: <Activity className="w-4 h-4" />, label: "Universidad", value: perfil.universidad },
                        { icon: <Clock className="w-4 h-4" />, label: "Experiencia", value: perfil.experiencia },
                      ].map(({ icon, label, value }) => (
                        <div key={label} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                          <span className="text-purple-500 flex-shrink-0">{icon}</span>
                          <div>
                            <p className="text-purple-400 text-xs">{label}</p>
                            <p className="text-purple-900 text-sm font-medium">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button onClick={() => setShowCambioPass(true)} className="flex items-center gap-2 px-5 py-3 bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 rounded-2xl text-sm font-medium shadow-sm w-full">
                  <Lock className="w-4 h-4" />Cambiar contraseña
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══ MODALS ══════════════════════════════════════════════ */}

      {/* Paciente modal */}
      {showPacModal && (
        <ModalWrapper title={editingPac ? "Actualizar Paciente" : "Registrar Paciente"} subtitle={editingPac ? `Editando: ${editingPac.nombres} ${editingPac.apellidos}` : "Complete los datos del nuevo paciente"} onClose={() => setShowPacModal(false)}>
          <form onSubmit={savePac} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Tipo de documento" required>
                <select value={pacForm.tipoDoc} onChange={e => setPacForm({ ...pacForm, tipoDoc: e.target.value })} className={inputCls}><option>CC</option><option>TI</option><option>CE</option><option>PA</option><option>NIT</option></select>
              </FormField>
              <FormField label="Número de documento" required>
                <input value={pacForm.numDoc} onChange={e => setPacForm({ ...pacForm, numDoc: e.target.value })} className={inputCls} placeholder="1023456789" required />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Nombres" required><input value={pacForm.nombres} onChange={e => setPacForm({ ...pacForm, nombres: e.target.value })} className={inputCls} required /></FormField>
              <FormField label="Apellidos" required><input value={pacForm.apellidos} onChange={e => setPacForm({ ...pacForm, apellidos: e.target.value })} className={inputCls} required /></FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Fecha de nacimiento" required><input type="date" value={pacForm.fechaNac} onChange={e => setPacForm({ ...pacForm, fechaNac: e.target.value })} className={inputCls} required /></FormField>
              <FormField label="Género"><select value={pacForm.genero} onChange={e => setPacForm({ ...pacForm, genero: e.target.value })} className={inputCls}><option>Femenino</option><option>Masculino</option><option>Otro</option></select></FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Teléfono"><input value={pacForm.telefono} onChange={e => setPacForm({ ...pacForm, telefono: e.target.value })} className={inputCls} placeholder="+57 300 000 0000" /></FormField>
              <FormField label="Correo electrónico"><input type="email" value={pacForm.correo} onChange={e => setPacForm({ ...pacForm, correo: e.target.value })} className={inputCls} /></FormField>
            </div>
            <FormField label="Dirección"><input value={pacForm.direccion} onChange={e => setPacForm({ ...pacForm, direccion: e.target.value })} className={inputCls} /></FormField>
            <FormField label="EPS"><input value={pacForm.eps} onChange={e => setPacForm({ ...pacForm, eps: e.target.value })} className={inputCls} placeholder="Ej: Sura, Compensar..." /></FormField>
            <FormField label="Observaciones"><textarea value={pacForm.observaciones} onChange={e => setPacForm({ ...pacForm, observaciones: e.target.value })} className={`${inputCls} resize-none`} rows={2} /></FormField>
            <div className="flex gap-3 pt-2 sticky bottom-0 bg-white pb-1">
              <button type="button" onClick={() => setShowPacModal(false)} className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold">{editingPac ? "Actualizar Paciente" : "Guardar Paciente"}</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* Ver paciente */}
      {viewPac && (
        <ModalWrapper title={`${viewPac.nombres} ${viewPac.apellidos}`} subtitle={`${viewPac.tipoDoc} ${viewPac.numDoc}`} onClose={() => setViewPac(null)}>
          <div className="space-y-3">
            {[
              ["Fecha de nacimiento", viewPac.fechaNac], ["Edad", `${viewPac.edad} años`], ["Género", viewPac.genero],
              ["Teléfono", viewPac.telefono], ["Correo", viewPac.correo], ["Dirección", viewPac.direccion],
              ["EPS", viewPac.eps], ["Estado", viewPac.estado], ["Registro", new Date(viewPac.fechaRegistro).toLocaleDateString("es-CO")],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-purple-50">
                <span className="text-purple-500 text-sm">{k}</span>
                <span className="text-purple-900 text-sm font-medium">{v}</span>
              </div>
            ))}
            {viewPac.observaciones && <div className="bg-purple-50 rounded-xl p-3"><p className="text-purple-500 text-xs mb-1">Observaciones</p><p className="text-purple-900 text-sm">{viewPac.observaciones}</p></div>}
            <div className="flex gap-3 pt-2">
              <button onClick={() => { setViewPac(null); openEditPac(viewPac); }} className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white font-medium text-sm hover:bg-purple-700 flex items-center justify-center gap-2"><Edit className="w-4 h-4" />Editar</button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* Cita modal */}
      {showCitaModal && (
        <ModalWrapper title={editingCita ? "Actualizar Cita" : "Registrar Cita"} onClose={() => setShowCitaModal(false)}>
          <form onSubmit={saveCita} className="space-y-4">
            <FormField label="Paciente" required>
              <select value={citaForm.pacienteId} onChange={e => { const p = pacientes.find(p => p.id === Number(e.target.value)); setCitaForm({ ...citaForm, pacienteId: Number(e.target.value), paciente: p ? `${p.nombres} ${p.apellidos}` : "" }); }} className={inputCls} required>
                <option value="">Seleccionar paciente...</option>
                {pacientes.map(p => <option key={p.id} value={p.id}>{p.nombres} {p.apellidos} — {p.numDoc}</option>)}
              </select>
            </FormField>
            <FormField label="Tipo de consulta" required>
              <select value={citaForm.tipoCita} onChange={e => setCitaForm({ ...citaForm, tipoCita: e.target.value })} className={inputCls}>
                {["Examen visual completo","Control de lentes","Adaptación lentes contacto","Primera consulta","Seguimiento","Control anual","Urgencia"].map(t => <option key={t}>{t}</option>)}
              </select>
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Fecha" required><input type="date" value={citaForm.fecha} onChange={e => setCitaForm({ ...citaForm, fecha: e.target.value })} className={inputCls} required /></FormField>
              <FormField label="Hora" required><input type="time" value={citaForm.hora} onChange={e => setCitaForm({ ...citaForm, hora: e.target.value })} className={inputCls} required /></FormField>
            </div>
            <FormField label="Optómetra asignado"><input value={citaForm.optometra} onChange={e => setCitaForm({ ...citaForm, optometra: e.target.value })} className={inputCls} /></FormField>
            <FormField label="Estado">
              <select value={citaForm.estado} onChange={e => setCitaForm({ ...citaForm, estado: e.target.value as Cita["estado"] })} className={inputCls}>
                {["Pendiente","Confirmada","En proceso","Atendida","Cancelada"].map(s => <option key={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Observaciones"><textarea value={citaForm.observaciones} onChange={e => setCitaForm({ ...citaForm, observaciones: e.target.value })} className={`${inputCls} resize-none`} rows={2} /></FormField>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowCitaModal(false)} className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-700 font-medium">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 text-white font-semibold">{editingCita ? "Actualizar Cita" : "Guardar Cita"}</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* Ver cita */}
      {viewCita && (
        <ModalWrapper title="Detalle de la Cita" subtitle={viewCita.id} onClose={() => setViewCita(null)}>
          <div className="space-y-3">
            {[
              ["Paciente", viewCita.paciente], ["Tipo de consulta", viewCita.tipoCita],
              ["Fecha", new Date(viewCita.fecha).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })],
              ["Hora", viewCita.hora], ["Optómetra", viewCita.optometra], ["Estado", viewCita.estado],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-purple-50">
                <span className="text-purple-500 text-sm">{k}</span>
                <span className="text-purple-900 text-sm font-medium">{v}</span>
              </div>
            ))}
            {viewCita.observaciones && <div className="bg-purple-50 rounded-xl p-3"><p className="text-purple-500 text-xs mb-1">Observaciones</p><p className="text-purple-900 text-sm">{viewCita.observaciones}</p></div>}
            <div className="flex gap-2 pt-2">
              <button onClick={() => { setViewCita(null); openEditCita(viewCita); }} className="flex-1 py-2.5 rounded-xl bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 flex items-center justify-center gap-1.5"><Edit className="w-4 h-4" />Editar</button>
              <button onClick={() => { const nc = { ...viewCita }; setViewCita(null); openEditCita(nc); }} className="flex-1 py-2.5 rounded-xl bg-yellow-50 text-yellow-700 text-sm font-medium hover:bg-yellow-100 flex items-center justify-center gap-1.5"><RefreshCw className="w-4 h-4" />Reagendar</button>
              <button className="flex-1 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 flex items-center justify-center gap-1.5"><CheckCircle className="w-4 h-4" />Iniciar</button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* Historial update modal */}
      {editHistModal && (
        <ModalWrapper title="Actualizar Historial Médico" subtitle={editHistModal.paciente} onClose={() => setEditHistModal(null)}>
          <form onSubmit={e => { e.preventDefault(); setHistorial(historial.map(h => h.id === editHistModal.id ? { ...editHistModal } : h)); setEditHistModal(null); }} className="space-y-4">
            <FormField label="Antecedentes"><textarea value={editHistModal.antecedentes} onChange={e => setEditHistModal({ ...editHistModal, antecedentes: e.target.value })} className={`${inputCls} resize-none`} rows={2} /></FormField>
            <FormField label="Diagnóstico" required><textarea value={editHistModal.diagnostico} onChange={e => setEditHistModal({ ...editHistModal, diagnostico: e.target.value })} className={`${inputCls} resize-none`} rows={2} required /></FormField>
            <FormField label="Exámenes realizados"><textarea value={editHistModal.examenes} onChange={e => setEditHistModal({ ...editHistModal, examenes: e.target.value })} className={`${inputCls} resize-none`} rows={2} /></FormField>
            <FormField label="Tratamiento"><textarea value={editHistModal.tratamiento} onChange={e => setEditHistModal({ ...editHistModal, tratamiento: e.target.value })} className={`${inputCls} resize-none`} rows={2} /></FormField>
            <FormField label="Observaciones"><textarea value={editHistModal.observaciones} onChange={e => setEditHistModal({ ...editHistModal, observaciones: e.target.value })} className={`${inputCls} resize-none`} rows={2} /></FormField>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setEditHistModal(null)} className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-700 font-medium">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 text-white font-semibold">Actualizar Historial</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* Examen visual modal */}
      {showExamenModal && (
        <ModalWrapper title={editingExamen ? "Actualizar Examen Visual" : "Registrar Examen Visual"} onClose={() => setShowExamenModal(false)} wide>
          <form onSubmit={saveExamen} className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Paciente" required>
                <select value={examenForm.pacienteId} onChange={e => { const p = pacientes.find(p => p.id === Number(e.target.value)); setExamenForm({ ...examenForm, pacienteId: Number(e.target.value), paciente: p ? `${p.nombres} ${p.apellidos}` : "" }); }} className={inputCls} required>
                  <option value="">Seleccionar...</option>
                  {pacientes.map(p => <option key={p.id} value={p.id}>{p.nombres} {p.apellidos}</option>)}
                </select>
              </FormField>
              <FormField label="Fecha" required><input type="date" value={examenForm.fecha} onChange={e => setExamenForm({ ...examenForm, fecha: e.target.value })} className={inputCls} required /></FormField>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 space-y-3 border border-blue-100">
              <h4 className="text-blue-800 font-semibold text-sm">Agudeza Visual</h4>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="OD (ojo derecho)"><input value={examenForm.agudezaOD} onChange={e => setExamenForm({ ...examenForm, agudezaOD: e.target.value })} className={inputCls} placeholder="Ej: 20/200 sc / 20/20 cc" /></FormField>
                <FormField label="OI (ojo izquierdo)"><input value={examenForm.agudezaOI} onChange={e => setExamenForm({ ...examenForm, agudezaOI: e.target.value })} className={inputCls} placeholder="Ej: 20/150 sc / 20/20 cc" /></FormField>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 space-y-3 border border-purple-100">
              <h4 className="text-purple-800 font-semibold text-sm">Tonometría</h4>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="OD"><input value={examenForm.tonometriaOD} onChange={e => setExamenForm({ ...examenForm, tonometriaOD: e.target.value })} className={inputCls} placeholder="Ej: 14 mmHg" /></FormField>
                <FormField label="OI"><input value={examenForm.tonometriaOI} onChange={e => setExamenForm({ ...examenForm, tonometriaOI: e.target.value })} className={inputCls} placeholder="Ej: 13 mmHg" /></FormField>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 space-y-3 border border-green-100">
              <h4 className="text-green-800 font-semibold text-sm">Refracción</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr><th className="text-left py-1 px-2 text-xs text-purple-600">Ojo</th><th className="text-center py-1 px-2 text-xs text-purple-600">Esfera</th><th className="text-center py-1 px-2 text-xs text-purple-600">Cilindro</th><th className="text-center py-1 px-2 text-xs text-purple-600">Eje</th><th className="text-center py-1 px-2 text-xs text-purple-600">Adición</th></tr></thead>
                  <tbody>
                    <tr>
                      <td className="py-1 px-2 font-semibold text-purple-900 text-xs">OD</td>
                      {(["esfOD","cilOD","ejeOD","adOD"] as const).map(k => <td key={k} className="py-1 px-1"><input value={examenForm[k]} onChange={e => setExamenForm({ ...examenForm, [k]: e.target.value })} className={`${inputCls} text-center`} placeholder="—" /></td>)}
                    </tr>
                    <tr>
                      <td className="py-1 px-2 font-semibold text-purple-900 text-xs">OI</td>
                      {(["esfOI","cilOI","ejeOI","adOI"] as const).map(k => <td key={k} className="py-1 px-1"><input value={examenForm[k]} onChange={e => setExamenForm({ ...examenForm, [k]: e.target.value })} className={`${inputCls} text-center`} placeholder="—" /></td>)}
                    </tr>
                  </tbody>
                </table>
              </div>
              <FormField label="Distancia pupilar"><input value={examenForm.distPupilar} onChange={e => setExamenForm({ ...examenForm, distPupilar: e.target.value })} className={inputCls} placeholder="Ej: 62mm" /></FormField>
            </div>

            <FormField label="Segmento anterior"><textarea value={examenForm.segAnterior} onChange={e => setExamenForm({ ...examenForm, segAnterior: e.target.value })} className={`${inputCls} resize-none`} rows={2} placeholder="Hallazgos del segmento anterior..." /></FormField>
            <FormField label="Segmento posterior"><textarea value={examenForm.segPosterior} onChange={e => setExamenForm({ ...examenForm, segPosterior: e.target.value })} className={`${inputCls} resize-none`} rows={2} placeholder="Hallazgos del fondo de ojo..." /></FormField>
            <FormField label="Diagnóstico" required><textarea value={examenForm.diagnostico} onChange={e => setExamenForm({ ...examenForm, diagnostico: e.target.value })} className={`${inputCls} resize-none`} rows={2} required /></FormField>
            <FormField label="Tratamiento"><textarea value={examenForm.tratamiento} onChange={e => setExamenForm({ ...examenForm, tratamiento: e.target.value })} className={`${inputCls} resize-none`} rows={2} /></FormField>
            <FormField label="Observaciones"><textarea value={examenForm.observaciones} onChange={e => setExamenForm({ ...examenForm, observaciones: e.target.value })} className={`${inputCls} resize-none`} rows={2} /></FormField>

            <div className="flex gap-3 pt-2 sticky bottom-0 bg-white pb-1">
              <button type="button" onClick={() => setShowExamenModal(false)} className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-700 font-medium">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 text-white font-semibold">{editingExamen ? "Actualizar Examen" : "Registrar Examen"}</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* Fórmula modal */}
      {showFormulaModal && (
        <ModalWrapper title={editingFormula ? "Actualizar Fórmula" : "Generar Fórmula Óptica"} onClose={() => setShowFormulaModal(false)} wide>
          <form onSubmit={saveFormula} className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Paciente" required>
                <select value={formulaForm.pacienteId} onChange={e => { const p = pacientes.find(p => p.id === Number(e.target.value)); setFormulaForm({ ...formulaForm, pacienteId: Number(e.target.value), paciente: p ? `${p.nombres} ${p.apellidos}` : "" }); }} className={inputCls} required>
                  <option value="">Seleccionar...</option>
                  {pacientes.map(p => <option key={p.id} value={p.id}>{p.nombres} {p.apellidos}</option>)}
                </select>
              </FormField>
              <FormField label="Fecha" required><input type="date" value={formulaForm.fecha} onChange={e => setFormulaForm({ ...formulaForm, fecha: e.target.value })} className={inputCls} required /></FormField>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <h4 className="text-purple-800 font-semibold text-sm mb-3">Prescripción</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr><th className="text-xs text-purple-600 text-left py-1 px-2">Ojo</th><th className="text-xs text-purple-600 text-center py-1 px-2">Esfera</th><th className="text-xs text-purple-600 text-center py-1 px-2">Cilindro</th><th className="text-xs text-purple-600 text-center py-1 px-2">Eje</th><th className="text-xs text-purple-600 text-center py-1 px-2">Adición</th></tr></thead>
                  <tbody>
                    <tr><td className="py-1 px-2 font-bold text-purple-900 text-xs">OD</td>{(["esfOD","cilOD","ejeOD","adOD"] as const).map(k => <td key={k} className="py-1 px-1"><input value={formulaForm[k]} onChange={e => setFormulaForm({ ...formulaForm, [k]: e.target.value })} className={`${inputCls} text-center`} placeholder="—" /></td>)}</tr>
                    <tr><td className="py-1 px-2 font-bold text-purple-900 text-xs">OI</td>{(["esfOI","cilOI","ejeOI","adOI"] as const).map(k => <td key={k} className="py-1 px-1"><input value={formulaForm[k]} onChange={e => setFormulaForm({ ...formulaForm, [k]: e.target.value })} className={`${inputCls} text-center`} placeholder="—" /></td>)}</tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Distancia pupilar"><input value={formulaForm.distPupilar} onChange={e => setFormulaForm({ ...formulaForm, distPupilar: e.target.value })} className={inputCls} placeholder="Ej: 62mm" /></FormField>
              <FormField label="Tipo de lente" required>
                <select value={formulaForm.tipoLente} onChange={e => setFormulaForm({ ...formulaForm, tipoLente: e.target.value })} className={inputCls}>
                  {["Monofocal","Monofocal - Anti reflejo","Bifocal","Progresivo","Lentes de contacto","Terapéutico"].map(t => <option key={t}>{t}</option>)}
                </select>
              </FormField>
            </div>
            <FormField label="Observaciones"><textarea value={formulaForm.observaciones} onChange={e => setFormulaForm({ ...formulaForm, observaciones: e.target.value })} className={`${inputCls} resize-none`} rows={2} /></FormField>

            <div className="flex gap-3 pt-2 sticky bottom-0 bg-white pb-1">
              <button type="button" onClick={() => setShowFormulaModal(false)} className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-700 font-medium">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 text-white font-semibold">{editingFormula ? "Actualizar Fórmula" : "Generar Fórmula"}</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* Cambio de contraseña */}
      {showCambioPass && (
        <ModalWrapper title="Cambiar Contraseña" onClose={() => setShowCambioPass(false)}>
          <form onSubmit={e => { e.preventDefault(); setShowCambioPass(false); }} className="space-y-4">
            <FormField label="Contraseña actual" required><input type="password" className={inputCls} required /></FormField>
            <FormField label="Nueva contraseña" required><input type="password" className={inputCls} required /></FormField>
            <FormField label="Confirmar nueva contraseña" required><input type="password" className={inputCls} required /></FormField>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowCambioPass(false)} className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-700 font-medium">Cancelar</button>
              <button type="submit" className="flex-1 py-3 rounded-2xl bg-purple-600 text-white font-semibold">Cambiar contraseña</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* Confirm dialog */}
      {confirmAction && <ConfirmDialog message={confirmAction.message} onConfirm={confirmAction.onConfirm} onCancel={() => setConfirmAction(null)} />}
    </>
  );
}
