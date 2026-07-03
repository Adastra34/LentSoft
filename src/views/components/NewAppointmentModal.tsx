import { X, Calendar, Clock, User as UserIcon, AlertCircle } from "lucide-react";
import { useState, useMemo } from "react";
import { notify } from "../../utils/notify";

interface Appointment {
  id: number;
  date: string;
  time: string;
  type: string;
  doctor: string;
  status: "confirmada" | "pendiente" | "completada";
}

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  textSize: number;
  existingAppointments?: Appointment[];
}

export function NewAppointmentModal({ isOpen, onClose, textSize, existingAppointments = [] }: NewAppointmentModalProps) {
  const [formData, setFormData] = useState({
    type: "Examen de vista completo",
    date: "",
    time: "10:00 AM",
    doctor: "Dr. Carlos Mendoza"
  });

  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

  const occupiedSlots = useMemo(() => {
    return existingAppointments
      .filter(appt => appt.status === "confirmada" || appt.status === "pendiente")
      .map(appt => ({
        date: appt.date,
        time: appt.time,
        doctor: appt.doctor
      }));
  }, [existingAppointments]);

  const isSlotOccupied = (date: string, time: string, doctor: string) => {
    return occupiedSlots.some(
      slot => slot.date === date && slot.time === time && slot.doctor === doctor
    );
  };

  const getAvailableTimesForDate = () => {
    if (!formData.date || !formData.doctor) return availableTimes;

    return availableTimes.map(time => ({
      time,
      occupied: isSlotOccupied(formData.date, time, formData.doctor)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSlotOccupied(formData.date, formData.time, formData.doctor)) {
      notify.warning("Este horario ya está ocupado. Por favor, selecciona otro horario o profesional.");
      return;
    }

    notify.success("¡Cita agendada exitosamente! Recibirás una confirmación pronto.");

    onClose();
    setFormData({
      type: "Examen de vista completo",
      date: "",
      time: "10:00 AM",
      doctor: "Dr. Carlos Mendoza"
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-purple-100 sticky top-0 bg-white rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-2xl">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h2
                className="text-purple-900"
                style={{ fontSize: `${textSize * 1.5}rem` }}
              >
                Agendar Nueva Cita
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-purple-900 hover:bg-purple-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Tipo de Examen */}
            <div>
              <label
                className="flex items-center gap-2 text-purple-900 mb-2"
                style={{ fontSize: `${textSize}rem` }}
              >
                <UserIcon className="w-5 h-5 text-purple-600" />
                Tipo de Examen
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 bg-purple-50 text-purple-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                style={{ fontSize: `${textSize}rem` }}
                required
              >
                <option>Examen de vista completo</option>
                <option>Revisión de lentes de contacto</option>
                <option>Ajuste de monturas</option>
                <option>Consulta de graduación</option>
                <option>Control de seguimiento</option>
              </select>
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="flex items-center gap-2 text-purple-900 mb-2"
                  style={{ fontSize: `${textSize}rem` }}
                >
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Fecha Preferida
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 bg-purple-50 text-purple-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  style={{ fontSize: `${textSize}rem` }}
                  required
                />
              </div>

              <div>
                <label
                  className="flex items-center gap-2 text-purple-900 mb-2"
                  style={{ fontSize: `${textSize}rem` }}
                >
                  <Clock className="w-5 h-5 text-purple-600" />
                  Hora Preferida
                </label>
                {formData.date && formData.doctor ? (
                  <div className="grid grid-cols-2 gap-2">
                    {getAvailableTimesForDate().map(({ time, occupied }) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => !occupied && setFormData({ ...formData, time })}
                        disabled={occupied}
                        className={`px-4 py-3 rounded-2xl border-2 transition-all text-center ${
                          formData.time === time && !occupied
                            ? "border-purple-600 bg-purple-600 text-white shadow-md"
                            : occupied
                            ? "border-red-200 bg-red-50 text-red-400 cursor-not-allowed opacity-60"
                            : "border-purple-200 bg-purple-50 text-purple-900 hover:border-purple-400"
                        }`}
                        style={{ fontSize: `${textSize * 0.875}rem` }}
                      >
                        {time}
                        {occupied && <span className="block text-xs mt-1">Ocupado</span>}
                      </button>
                    ))}
                  </div>
                ) : (
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 bg-purple-50 text-purple-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    style={{ fontSize: `${textSize}rem` }}
                    required
                  >
                    {availableTimes.map(time => (
                      <option key={time}>{time}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Optómetra */}
            <div>
              <label
                className="flex items-center gap-2 text-purple-900 mb-2"
                style={{ fontSize: `${textSize}rem` }}
              >
                <UserIcon className="w-5 h-5 text-purple-600" />
                Optómetra de Preferencia
              </label>
              <select
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 bg-purple-50 text-purple-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                style={{ fontSize: `${textSize}rem` }}
                required
              >
                <option>Dr. Carlos Mendoza</option>
                <option>Dra. María González</option>
                <option>Dr. Juan Pérez</option>
                <option>Dra. Ana López</option>
                <option>Dr. Roberto Silva</option>
              </select>
            </div>

            {/* Availability Warning */}
            {formData.date && formData.doctor && getAvailableTimesForDate().some(slot => slot.occupied) && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p
                  className="text-yellow-700"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                >
                  <span className="font-semibold">Atención:</span> Algunos horarios ya están ocupados para la fecha y profesional seleccionados. Los horarios ocupados aparecen en rojo y no se pueden seleccionar.
                </p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4">
              <p
                className="text-purple-700"
                style={{ fontSize: `${textSize * 0.875}rem` }}
              >
                <span className="font-semibold">Nota:</span> Recibirás un correo de confirmación con los detalles de tu cita. Si necesitas cancelar o reprogramar, puedes hacerlo hasta 24 horas antes de la cita.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-purple-100 text-purple-700 rounded-2xl hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                style={{ fontSize: `${textSize}rem` }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                style={{ fontSize: `${textSize}rem` }}
              >
                Confirmar Cita
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
