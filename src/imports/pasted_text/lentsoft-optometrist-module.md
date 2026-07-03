IMPORTANTE

Mantén toda la arquitectura, estructura, componentes, estilos, navegación, diseño visual, sistema de diseño y organización actual del proyecto LentSoft.

NO elimines, reemplaces ni modifiques funcionalidades ya implementadas que estén funcionando correctamente.

Todas las nuevas pantallas deben integrarse con la arquitectura existente del proyecto, respetando la navegación, los componentes reutilizables y la identidad visual.

Reglas generales
No generar las pantallas de Inicio de Sesión, Registro, Recuperar Contraseña ni Autenticación, ya que esas interfaces ya existen en el proyecto.
Comenzar directamente desde el Dashboard del Optómetra, asumiendo que el usuario ya inició sesión.
Toda la interfaz debe estar completamente en español.
Mantener compatibilidad con ASP.NET 9 y Bootstrap 5.
Reutilizar componentes existentes antes de crear nuevos.
Mantener el diseño responsive para escritorio, tablet y móvil.
Utilizar un estilo moderno tipo dashboard médico, limpio, profesional y fácil de usar.
Utilizar iconografía relacionada con salud visual.
Mantener la consistencia entre todas las pantallas.
OBJETIVO

Diseñar el módulo completo del Optómetra para el sistema LentSoft, incluyendo todas las pantallas, formularios, tablas, modales, navegación y flujo entre vistas.

FLUJO DEL OPTÓMETRA

Dashboard

↓

Pacientes (CRUD)

↓

Citas (CRUD)

↓

Historial Médico

↓

Examen Visual

↓

Fórmulas Ópticas (CRUD)

↓

Perfil

↓

Dashboard

DASHBOARD DEL OPTÓMETRA

Diseñar un Dashboard moderno mostrando:

Tarjetas informativas
Total de pacientes registrados.
Citas programadas para hoy.
Citas pendientes.
Exámenes visuales realizados.
Fórmulas ópticas emitidas.
Próxima cita.
Agenda

Mostrar:

Calendario.
Agenda diaria.
Próximas consultas.
Accesos rápidos
Registrar paciente.
Registrar cita.
Consultar historial.
Registrar examen visual.
Crear fórmula óptica.
Menú lateral
Dashboard
Pacientes
Citas
Historial Médico
Examen Visual
Fórmulas Ópticas
Perfil
MÓDULO PACIENTES (CRUD COMPLETO)

Diseñar todas las interfaces necesarias.

Crear Paciente

Formulario con:

Tipo de documento
Número de documento
Nombres
Apellidos
Fecha de nacimiento
Edad
Género
Teléfono
Correo electrónico
Dirección
EPS
Observaciones

Botón:

Guardar Paciente

Consultar Pacientes

Tabla moderna.

Columnas:

Documento
Nombre completo
Teléfono
Correo
Estado
Fecha de registro

Filtros:

Buscar por documento
Buscar por nombre

Acciones:

Ver
Editar
Eliminar
Actualizar Paciente

Mostrar todos los datos actuales del paciente.

Permitir editar toda la información.

Botón:

Actualizar Paciente

Eliminar Paciente

Mostrar una ventana modal de confirmación.

Mensaje:

¿Está seguro de eliminar este paciente?

Botones:

Cancelar
Eliminar
MÓDULO CITAS (CRUD COMPLETO)

Diseñar todas las interfaces necesarias para administrar las citas.

Crear Cita

Formulario con:

Paciente
Tipo de consulta
Fecha
Hora
Optómetra asignado
Estado
Observaciones

Estados:

Pendiente
Confirmada
En proceso
Atendida
Cancelada

Botón:

Guardar Cita

Consultar Citas

Mostrar:

Calendario interactivo
Agenda diaria
Agenda semanal
Agenda mensual

Tabla con:

Número de cita
Paciente
Fecha
Hora
Tipo de consulta
Estado

Filtros:

Buscar paciente
Buscar documento
Filtrar por fecha
Filtrar por estado

Acciones:

Ver
Editar
Eliminar
Actualizar Cita

Permitir modificar:

Fecha
Hora
Estado
Observaciones
Tipo de consulta

Botón:

Actualizar Cita

Eliminar Cita

Mostrar modal de confirmación.

Mensaje:

¿Está seguro de eliminar esta cita?

Botones:

Cancelar
Eliminar
Ver Detalle de la Cita

Mostrar:

Información del paciente
Información del optómetra
Fecha
Hora
Estado
Motivo de consulta
Observaciones

Botones:

Editar
Reprogramar
Iniciar Consulta
MÓDULO HISTORIAL MÉDICO

Diseñar las interfaces para:

Consultar historial.
Actualizar historial.
Ver detalle.

No incluir opción para eliminar historiales médicos, ya que forman parte del expediente clínico.

Tabla con:

Fecha
Paciente
Diagnóstico
Optómetra
Estado

Vista detalle:

Información personal del paciente
Antecedentes
Diagnóstico
Tratamiento
Observaciones
Fórmula óptica asociada
Exámenes realizados

Botón:

Actualizar Historial

MÓDULO EXAMEN VISUAL

Diseñar las interfaces para:

Registrar examen visual.
Consultar examen visual.
Actualizar examen visual.
IMPORTANTE

No crear un formulario nuevo.

Utilizar exactamente los mismos campos, secciones, controles, formularios y estructura que ya existen actualmente en el proyecto.

No cambiar:

Los nombres de los campos.
La lógica del formulario.
El flujo del examen visual.
La estructura clínica.

Únicamente mejorar:

El diseño visual.
La organización.
La experiencia de usuario.
La distribución de los elementos.
El responsive.

No agregar opción para eliminar exámenes visuales.

MÓDULO FÓRMULAS ÓPTICAS (CRUD COMPLETO)

Diseñar todas las interfaces.

Crear Fórmula

Formulario con:

Paciente
Fecha
Ojo Derecho (OD)
Ojo Izquierdo (OI)
Esfera
Cilindro
Eje
Adición
Distancia Pupilar
Tipo de lente
Observaciones

Botón:

Generar Fórmula

Consultar Fórmulas

Tabla con:

Paciente
Fecha
Tipo de lente
Estado

Acciones:

Ver
Editar
Imprimir
Descargar PDF
Eliminar
Actualizar Fórmula

Permitir modificar todos los datos antes de guardar.

Botón:

Actualizar Fórmula

Eliminar Fórmula

Mostrar modal de confirmación.

Mensaje:

¿Está seguro de eliminar esta fórmula?

Botones:

Cancelar
Eliminar
PERFIL DEL OPTÓMETRA

Permitir:

Consultar perfil.
Actualizar datos personales.
Cambiar contraseña.
Cambiar fotografía de perfil.
PROTOTIPO

Conectar correctamente todas las pantallas mediante prototipos navegables.

El flujo debe ser completamente funcional desde el Dashboard hasta cualquiera de los módulos.

Todos los botones deben dirigir a una pantalla o ejecutar una acción lógica.

EXPERIENCIA DE USUARIO (UX)
Diseño moderno tipo dashboard médico.
Componentes reutilizables.
Tablas elegantes.
Tarjetas informativas.
Formularios organizados por secciones.
Ventanas modales.
Confirmaciones antes de eliminar información.
Navegación intuitiva.
Responsive para escritorio, tablet y móvil.
VALIDACIÓN FINAL

Antes de finalizar el diseño:

Revisar toda la arquitectura existente del proyecto.
Mantener la consistencia visual.
No modificar funcionalidades existentes.
Corregir automáticamente errores de navegación.
Corregir errores visuales.
Corregir componentes rotos.
Corregir inconsistencias entre pantallas.
Corregir problemas de responsive.
Verificar que todos los botones tengan una acción lógica.
Verificar que todas las vistas estén conectadas correctamente.
Optimizar la experiencia de usuario.
Entregar una interfaz profesional, moderna, organizada, consistente y libre de errores, respetando completamente la arquitectura existente de LentSoft.