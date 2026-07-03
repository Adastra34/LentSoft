/**
 * notify.ts
 * Wrapper centralizado de AlertifyJS para reemplazar alert(), confirm() y prompt()
 * nativos del navegador por notificaciones y diálogos modernos y accesibles.
 *
 * Uso:
 *   import { notify } from "@/utils/notify";
 *   notify.success("Guardado correctamente");
 *   notify.confirm("¿Deseas eliminar?", () => doDelete());
 */

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";

/* ── Configuración global ─────────────────────────────────── */
alertify.set("notifier", "position", "top-right");
alertify.set("notifier", "delay", 4);

/* Estilos personalizados para coincidir con la paleta morada de LentSoft */
const injectStyles = () => {
  if (document.getElementById("lentsoft-alertify-styles")) return;
  const style = document.createElement("style");
  style.id = "lentsoft-alertify-styles";
  style.textContent = `
    /* ── Notificaciones ── */
    .alertify-notifier .ajs-message {
      border-radius: 14px !important;
      font-family: var(--font-secondary, 'Montserrat', sans-serif) !important;
      font-size: 0.875rem !important;
      padding: 12px 18px !important;
      box-shadow: 0 8px 24px rgba(124, 58, 237, 0.15) !important;
    }
    .alertify-notifier .ajs-message.ajs-success {
      background: #22c55e !important;
      color: #fff !important;
    }
    .alertify-notifier .ajs-message.ajs-error {
      background: #ef4444 !important;
      color: #fff !important;
    }
    .alertify-notifier .ajs-message.ajs-warning {
      background: #f59e0b !important;
      color: #fff !important;
    }
    /* ── Diálogos ── */
    .alertify .ajs-dialog {
      border-radius: 24px !important;
      font-family: var(--font-primary, 'Bricolage Grotesque', sans-serif) !important;
      box-shadow: 0 20px 60px rgba(91, 33, 182, 0.25) !important;
    }
    .alertify .ajs-header {
      border-radius: 24px 24px 0 0 !important;
      background: linear-gradient(135deg, #7c3aed, #5b21b6) !important;
      color: #fff !important;
      font-weight: 700 !important;
      padding: 16px 24px !important;
    }
    .alertify .ajs-body {
      padding: 20px 24px !important;
      font-family: var(--font-secondary, 'Montserrat', sans-serif) !important;
      color: #3b0764 !important;
    }
    .alertify .ajs-footer {
      padding: 12px 24px 20px !important;
      border-top: 1px solid #f3e8ff !important;
    }
    .alertify .ajs-ok {
      background: linear-gradient(135deg, #7c3aed, #5b21b6) !important;
      color: #fff !important;
      border: none !important;
      border-radius: 12px !important;
      padding: 8px 20px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      transition: opacity 0.2s !important;
    }
    .alertify .ajs-ok:hover { opacity: 0.85 !important; }
    .alertify .ajs-cancel {
      background: #f3f4f6 !important;
      color: #374151 !important;
      border: none !important;
      border-radius: 12px !important;
      padding: 8px 20px !important;
      font-weight: 500 !important;
      cursor: pointer !important;
    }
    .alertify .ajs-cancel:hover { background: #e5e7eb !important; }
  `;
  document.head.appendChild(style);
};

/* Inyectar estilos al importar el módulo */
if (typeof document !== "undefined") injectStyles();

/* ── API pública ──────────────────────────────────────────── */
export const notify = {
  /** Notificación de éxito (verde) */
  success: (message: string) => alertify.success(message),

  /** Notificación de error (rojo) */
  error: (message: string) => alertify.error(message),

  /** Notificación de advertencia (amarillo) */
  warning: (message: string) => alertify.warning(message),

  /** Cuadro de alerta modal */
  alert: (message: string, callback?: () => void) =>
    alertify.alert("LentSoft", message, callback ?? (() => undefined)),

  /**
   * Cuadro de confirmación modal
   * @param message  Texto de la pregunta
   * @param onOk     Callback si el usuario acepta
   * @param onCancel Callback si el usuario cancela (opcional)
   */
  confirm: (message: string, onOk: () => void, onCancel?: () => void) =>
    alertify.confirm(
      "LentSoft",
      message,
      onOk,
      onCancel ?? (() => undefined)
    ),
};
