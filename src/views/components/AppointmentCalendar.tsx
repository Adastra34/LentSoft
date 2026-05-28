import { useState, useMemo } from "react";
import { Calendar as BigCalendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, Clock, User, X, CheckCircle2, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { toast } from "sonner";

moment.updateLocale("es", {
  months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
  monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
  weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
  weekdaysShort: "dom_lun_mar_mié_jue_vie_sáb".split("_"),
  weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
});

const localizer = momentLocalizer(moment);

interface Appointment {
  id: number;
  date: string;
  time: string;
  type: string;
  doctor: string;
  status: "confirmada" | "pendiente" | "completada";
}

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource: Appointment;
}

interface AppointmentCalendarProps {
  appointments: Appointment[];
  textSize: number;
  onUpdateAppointment?: (appointment: Appointment) => void;
}

export function AppointmentCalendar({ appointments, textSize, onUpdateAppointment }: AppointmentCalendarProps) {
  const [view, setView] = useState<View | "year">("month");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [yearViewDate, setYearViewDate] = useState(new Date());
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleData, setRescheduleData] = useState<{ date: string; time: string } | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [availableTimes] = useState(["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]);

  const events: CalendarEvent[] = useMemo(() => {
    return appointments.map(appt => {
      const [hours, minutes] = appt.time.split(/[: ]/);
      const isPM = appt.time.toLowerCase().includes("pm");
      let hour = parseInt(hours);

      if (isPM && hour !== 12) {
        hour += 12;
      } else if (!isPM && hour === 12) {
        hour = 0;
      }

      const startDate = new Date(appt.date);
      startDate.setHours(hour, parseInt(minutes) || 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 1);

      return {
        id: appt.id,
        title: appt.type,
        start: startDate,
        end: endDate,
        resource: appt,
      };
    });
  }, [appointments]);

  const eventStyleGetter = (event: CalendarEvent) => {
    const status = event.resource.status;
    let backgroundColor = "#9333ea";
    let borderColor = "#7e22ce";

    if (status === "confirmada") {
      backgroundColor = "#7c3aed";
      borderColor = "#6d28d9";
    } else if (status === "pendiente") {
      backgroundColor = "#c084fc";
      borderColor = "#a855f7";
    } else if (status === "completada") {
      backgroundColor = "#9ca3af";
      borderColor = "#6b7280";
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        borderWidth: "3px",
        borderStyle: "solid",
        borderRadius: "12px",
        color: "white",
        fontSize: `${textSize * 0.75}rem`,
        fontWeight: 600,
        boxShadow: status === "confirmada" ? "0 4px 6px -1px rgba(124, 58, 237, 0.3)" : "none",
      },
    };
  };

  const dayStyleGetter = (date: Date) => {
    const hasConfirmedAppointment = events.some(event =>
      moment(event.start).isSame(date, "day") && event.resource.status === "confirmada"
    );

    const hasAnyAppointment = events.some(event =>
      moment(event.start).isSame(date, "day")
    );

    if (hasConfirmedAppointment) {
      return {
        style: {
          backgroundColor: "#a855f7",
          color: "white",
          fontWeight: 600,
        },
      };
    }

    if (hasAnyAppointment) {
      return {
        style: {
          backgroundColor: "#e9d5ff",
        },
      };
    }

    return {};
  };

  const getAppointmentsForDate = (date: Date | null) => {
    if (!date) return [];
    return appointments.filter(appt =>
      moment(appt.date).isSame(date, "day")
    );
  };

  const selectedDateAppointments = useMemo(() => {
    return getAppointmentsForDate(selectedDate);
  }, [selectedDate, appointments]);

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedAppointment(event.resource);
    setSelectedDate(event.start);
  };

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    setSelectedAppointment(null);
  };

  const handleNavigate = (date: Date) => {
    setSelectedDate(date);
  };

  const isSlotAvailable = (date: string, time: string, doctor: string, excludeId?: number) => {
    return !appointments.some(
      appt => appt.date === date &&
        appt.time === time &&
        appt.doctor === doctor &&
        (appt.status === "confirmada" || appt.status === "pendiente") &&
        appt.id !== excludeId
    );
  };

  const handleRescheduleClick = () => {
    if (!selectedAppointment) return;
    setRescheduleData({
      date: selectedAppointment.date,
      time: selectedAppointment.time
    });
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = () => {
    if (!selectedAppointment || !rescheduleData) return;

    if (!isSlotAvailable(rescheduleData.date, rescheduleData.time, selectedAppointment.doctor, selectedAppointment.id)) {
      toast.error("Horario no disponible", {
        description: "El horario seleccionado ya está ocupado. Por favor, elige otro.",
        className: "bg-red-50 border-2 border-red-200 text-red-900",
      });
      return;
    }

    setShowRescheduleModal(false);
    setShowConfirmModal(true);
  };

  const handleConfirmReschedule = () => {
    if (!selectedAppointment || !rescheduleData || !onUpdateAppointment) return;

    const updatedAppointment: Appointment = {
      ...selectedAppointment,
      date: rescheduleData.date,
      time: rescheduleData.time,
    };

    onUpdateAppointment(updatedAppointment);
    setSelectedAppointment(updatedAppointment);
    setSelectedDate(new Date(rescheduleData.date));
    setShowConfirmModal(false);

    toast.success("Cita reagendada exitosamente", {
      description: `Nueva fecha: ${moment(rescheduleData.date).format("DD [de] MMMM [de] YYYY")} a las ${rescheduleData.time}`,
      className: "bg-purple-50 border-2 border-purple-200 text-purple-900",
    });
  };

  const getAvailableTimesForReschedule = () => {
    if (!selectedAppointment || !rescheduleData) return [];

    return availableTimes.map(time => ({
      time,
      available: isSlotAvailable(rescheduleData.date, time, selectedAppointment.doctor, selectedAppointment.id)
    }));
  };

  const YearView = () => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const monthDate = new Date(yearViewDate.getFullYear(), i, 1);
      return monthDate;
    });

    const getDaysInMonth = (monthDate: Date) => {
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const days: (Date | null)[] = [];

      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }

      return days;
    };

    const hasConfirmedAppointmentOnDate = (date: Date | null) => {
      if (!date) return false;
      return appointments.some(
        appt => moment(appt.date).isSame(date, "day") && appt.status === "confirmada"
      );
    };

    const hasAnyAppointmentOnDate = (date: Date | null) => {
      if (!date) return false;
      return appointments.some(appt => moment(appt.date).isSame(date, "day"));
    };

    return (
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setYearViewDate(new Date(yearViewDate.getFullYear() - 1, 0, 1))}
            className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>
          <h3 className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.5}rem` }}>
            {yearViewDate.getFullYear()}
          </h3>
          <button
            onClick={() => setYearViewDate(new Date(yearViewDate.getFullYear() + 1, 0, 1))}
            className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {months.map((monthDate, idx) => {
            const days = getDaysInMonth(monthDate);
            return (
              <div key={idx} className="border-2 border-purple-100 rounded-2xl p-3 bg-purple-50/30">
                <h4 className="text-purple-900 font-semibold text-center mb-2" style={{ fontSize: `${textSize * 0.875}rem` }}>
                  {moment(monthDate).format("MMMM")}
                </h4>
                <div className="grid grid-cols-7 gap-1">
                  {["D", "L", "M", "M", "J", "V", "S"].map((day, i) => (
                    <div key={i} className="text-center text-purple-600 font-medium text-xs">
                      {day}
                    </div>
                  ))}
                  {days.map((day, i) => {
                    const hasConfirmed = hasConfirmedAppointmentOnDate(day);
                    const hasAny = hasAnyAppointmentOnDate(day);
                    const isToday = day && moment(day).isSame(new Date(), "day");

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (day) {
                            setSelectedDate(day);
                            setView("day");
                          }
                        }}
                        disabled={!day}
                        className={`aspect-square text-xs rounded-lg transition-all ${
                          !day
                            ? "invisible"
                            : hasConfirmed
                            ? "bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-md"
                            : hasAny
                            ? "bg-purple-200 text-purple-900 font-semibold hover:bg-purple-300"
                            : isToday
                            ? "bg-purple-100 text-purple-900 font-medium border-2 border-purple-600"
                            : "hover:bg-purple-50 text-purple-700"
                        }`}
                      >
                        {day ? day.getDate() : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* View Selector */}
      <div className="flex gap-2 bg-white rounded-2xl p-3 shadow-md">
        <button
          onClick={() => setView("year")}
          className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
            view === "year"
              ? "bg-purple-600 text-white shadow-md"
              : "bg-purple-50 text-purple-700 hover:bg-purple-100"
          }`}
        >
          Año
        </button>
        <button
          onClick={() => setView("month")}
          className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
            view === "month"
              ? "bg-purple-600 text-white shadow-md"
              : "bg-purple-50 text-purple-700 hover:bg-purple-100"
          }`}
        >
          Mes
        </button>
        <button
          onClick={() => setView("week")}
          className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
            view === "week"
              ? "bg-purple-600 text-white shadow-md"
              : "bg-purple-50 text-purple-700 hover:bg-purple-100"
          }`}
        >
          Semana
        </button>
        <button
          onClick={() => setView("day")}
          className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
            view === "day"
              ? "bg-purple-600 text-white shadow-md"
              : "bg-purple-50 text-purple-700 hover:bg-purple-100"
          }`}
        >
          Día
        </button>
      </div>

      {/* Calendar */}
      {view === "year" ? (
        <YearView />
      ) : (
        <div className="bg-white rounded-3xl shadow-lg p-6 calendar-wrapper">
          <style>{`
            .calendar-wrapper .rbc-calendar {
              font-family: var(--font-secondary);
              font-size: ${textSize * 0.875}rem;
            }
            .calendar-wrapper .rbc-header {
              padding: 12px 6px;
              font-weight: 600;
              color: #581c87;
              background: #f3e8ff;
              border-radius: 8px 8px 0 0;
            }
            .calendar-wrapper .rbc-today {
              background-color: #faf5ff;
            }
            .calendar-wrapper .rbc-off-range-bg {
              background-color: #f9fafb;
            }
            .calendar-wrapper .rbc-event {
              padding: 4px 6px;
            }
            .calendar-wrapper .rbc-event-label {
              font-size: ${textSize * 0.75}rem;
            }
            .calendar-wrapper .rbc-toolbar {
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 2px solid #e9d5ff;
            }
            .calendar-wrapper .rbc-toolbar button {
              color: #7e22ce;
              font-weight: 500;
              border-radius: 12px;
              padding: 8px 16px;
              border: 2px solid #e9d5ff;
              background: white;
              transition: all 0.2s;
            }
            .calendar-wrapper .rbc-toolbar button:hover {
              background: #f3e8ff;
              border-color: #c084fc;
            }
            .calendar-wrapper .rbc-toolbar button:active,
            .calendar-wrapper .rbc-toolbar button.rbc-active {
              background: #9333ea;
              color: white;
              border-color: #7e22ce;
            }
            .calendar-wrapper .rbc-month-view,
            .calendar-wrapper .rbc-time-view {
              border-radius: 12px;
              overflow: hidden;
              border: 2px solid #e9d5ff;
            }
            .calendar-wrapper .rbc-time-header {
              background: #faf5ff;
            }
            .calendar-wrapper .rbc-time-content {
              border-top: 2px solid #e9d5ff;
            }
            .calendar-wrapper .rbc-current-time-indicator {
              background-color: #9333ea;
              height: 2px;
            }
            .calendar-wrapper .rbc-time-slot.rbc-now {
              background-color: #f3e8ff;
            }
            .calendar-wrapper .rbc-day-slot .rbc-event {
              border-left: 4px solid currentColor;
            }
            .calendar-wrapper .rbc-selected-cell {
              background-color: #e9d5ff;
            }
            .calendar-wrapper .rbc-event.rbc-selected {
              background-color: #6d28d9 !important;
              border-color: #5b21b6 !important;
            }
            .calendar-wrapper .rbc-date-cell.rbc-now {
              background-color: #f3e8ff;
            }
            .calendar-wrapper .rbc-date-cell.rbc-off-range {
              color: #d1d5db;
            }
          `}</style>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            view={view as View}
            onView={(v) => setView(v)}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            onNavigate={handleNavigate}
            selectable
            eventPropGetter={eventStyleGetter}
            dayPropGetter={dayStyleGetter}
            messages={{
              next: "Siguiente",
              previous: "Anterior",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              agenda: "Agenda",
              date: "Fecha",
              time: "Hora",
              event: "Cita",
              noEventsInRange: "No hay citas programadas en este rango.",
              showMore: (total) => `+ ${total} más`,
            }}
          />
        </div>
      )}

      {/* Selected Date Appointments Details */}
      {selectedDate && selectedDateAppointments.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-2xl">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.25}rem` }}>
                Citas del {moment(selectedDate).format("DD [de] MMMM [de] YYYY")}
              </h3>
              <p className="text-purple-600 text-sm">
                {selectedDateAppointments.length} {selectedDateAppointments.length === 1 ? "cita programada" : "citas programadas"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {selectedDateAppointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 hover:border-purple-400 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-purple-900 font-semibold mb-1" style={{ fontSize: `${textSize * 1}rem` }}>
                      {appt.type}
                    </h4>
                    <div className="flex flex-wrap gap-3 text-sm text-purple-700">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{appt.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{appt.doctor}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      appt.status === "confirmada"
                        ? "bg-purple-600 text-white"
                        : appt.status === "pendiente"
                        ? "bg-purple-400 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-2xl">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.25}rem` }}>
                  Detalle de Cita
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-50 rounded-2xl p-4">
                <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide">Tipo de Examen</p>
                <p className="text-purple-900 font-semibold" style={{ fontSize: `${textSize * 1}rem` }}>
                  {selectedAppointment.type}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-2xl p-4">
                  <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide">Fecha</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <p className="text-purple-900 font-semibold text-sm">
                      {new Date(selectedAppointment.date).toLocaleDateString("es-CO", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-2xl p-4">
                  <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide">Hora</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <p className="text-purple-900 font-semibold text-sm">{selectedAppointment.time}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-4">
                <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide">Profesional</p>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-600" />
                  <p className="text-purple-900 font-semibold" style={{ fontSize: `${textSize * 1}rem` }}>
                    {selectedAppointment.doctor}
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-4">
                <p className="text-purple-600 text-xs font-medium mb-1 uppercase tracking-wide">Estado</p>
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    selectedAppointment.status === "confirmada"
                      ? "bg-purple-600 text-white border border-purple-700"
                      : selectedAppointment.status === "pendiente"
                      ? "bg-purple-400 text-white border border-purple-500"
                      : "bg-gray-100 text-gray-700 border border-gray-200"
                  }`}
                >
                  {selectedAppointment.status === "confirmada" && <CheckCircle2 className="w-4 h-4" />}
                  {selectedAppointment.status === "pendiente" && <Clock className="w-4 h-4" />}
                  {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-purple-900 font-medium transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={handleRescheduleClick}
                className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
              >
                Reagendar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && rescheduleData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-2xl">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-purple-900 font-bold" style={{ fontSize: `${textSize * 1.25}rem` }}>
                  Reagendar Cita
                </h3>
              </div>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Información precargada (no editable) */}
              <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
                <p className="text-purple-600 text-xs font-medium mb-3 uppercase tracking-wide">Información de la Cita</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-purple-600 text-xs font-medium">Tipo de Examen</p>
                    <p className="text-purple-900 font-semibold">{selectedAppointment.type}</p>
                  </div>
                  <div>
                    <p className="text-purple-600 text-xs font-medium">Profesional</p>
                    <p className="text-purple-900 font-semibold">{selectedAppointment.doctor}</p>
                  </div>
                  <div>
                    <p className="text-purple-600 text-xs font-medium">Estado</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedAppointment.status === "confirmada" ? "bg-purple-600 text-white" :
                      selectedAppointment.status === "pendiente" ? "bg-purple-400 text-white" :
                      "bg-gray-500 text-white"
                    }`}>
                      {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Nueva Fecha (editable) */}
              <div>
                <label className="flex items-center gap-2 text-purple-900 font-medium mb-2" style={{ fontSize: `${textSize * 0.875}rem` }}>
                  <Calendar className="w-4 h-4 text-purple-600" />
                  Nueva Fecha
                </label>
                <input
                  type="date"
                  value={rescheduleData.date}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 bg-white text-purple-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  style={{ fontSize: `${textSize * 0.875}rem` }}
                />
              </div>

              {/* Nueva Hora (editable con disponibilidad) */}
              <div>
                <label className="flex items-center gap-2 text-purple-900 font-medium mb-2" style={{ fontSize: `${textSize * 0.875}rem` }}>
                  <Clock className="w-4 h-4 text-purple-600" />
                  Nueva Hora
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-1">
                  {getAvailableTimesForReschedule().map(({ time, available }) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => available && setRescheduleData({ ...rescheduleData, time })}
                      disabled={!available}
                      className={`px-4 py-3 rounded-2xl border-2 transition-all text-center text-sm ${
                        rescheduleData.time === time && available
                          ? "border-purple-600 bg-purple-600 text-white shadow-md"
                          : !available
                          ? "border-red-200 bg-red-50 text-red-400 cursor-not-allowed opacity-60"
                          : "border-purple-200 bg-white text-purple-900 hover:border-purple-400 hover:bg-purple-50"
                      }`}
                    >
                      {time}
                      {!available && <span className="block text-xs mt-1">Ocupado</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Warning si el horario está ocupado */}
              {rescheduleData.time && !isSlotAvailable(rescheduleData.date, rescheduleData.time, selectedAppointment.doctor, selectedAppointment.id) && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">
                    <span className="font-semibold">Horario no disponible:</span> El horario seleccionado ya está ocupado. Por favor, elige otro.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-purple-900 font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleRescheduleSubmit}
                disabled={!rescheduleData.date || !rescheduleData.time}
                className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && selectedAppointment && rescheduleData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-2xl">
                <AlertCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-purple-900 font-bold mb-1" style={{ fontSize: `${textSize * 1.25}rem` }}>
                  ¿Estás seguro que deseas reagendar esta cita?
                </h3>
                <p className="text-purple-600 text-sm">
                  Esta acción modificará la fecha y hora de tu cita.
                </p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 mb-6">
              <div className="space-y-3">
                <div>
                  <p className="text-purple-600 text-xs font-medium uppercase tracking-wide mb-1">Fecha y hora actual</p>
                  <p className="text-purple-900 font-semibold">
                    {moment(selectedAppointment.date).format("DD [de] MMMM [de] YYYY")} - {selectedAppointment.time}
                  </p>
                </div>
                <div className="border-t border-purple-200 pt-3">
                  <p className="text-purple-600 text-xs font-medium uppercase tracking-wide mb-1">Nueva fecha y hora</p>
                  <p className="text-purple-900 font-semibold">
                    {moment(rescheduleData.date).format("DD [de] MMMM [de] YYYY")} - {rescheduleData.time}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-purple-900 font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h4 className="text-purple-900 font-semibold mb-3" style={{ fontSize: `${textSize * 1}rem` }}>
          Leyenda
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-600 border-2 border-purple-700" />
            <span className="text-purple-700 text-sm">Confirmada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-400 border-2 border-purple-500" />
            <span className="text-purple-700 text-sm">Pendiente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-500 border-2 border-gray-600" />
            <span className="text-purple-700 text-sm">Completada</span>
          </div>
        </div>
      </div>
    </div>
  );
}
