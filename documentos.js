/* =====================================================================
   VILLA OLÍMPICA · DOCUMENTOS, FUENTES, TRAZABILIDAD Y PRESENTACIÓN
   archivo: ruta relativa dentro de la carpeta docs/ (null = no incluido en el paquete)
   ===================================================================== */
window.VO = window.VO || {};

VO.fuentes = {
  DT: { t: 'Documento técnico «Villa Olímpica – Componente FEDEM»', ref: '(FEDEM, 2026)', v: 'Versión del 19/10/2026' },
  TOE: { t: 'TOE FEDEM 2026', ref: '(FEDEM, 2026)', v: 'Versión 27, 06/03/2026 (citada en el documento técnico)' },
  ENC: { t: 'Encuesta de FEDEM a las ligas', ref: '(FEDEM, 2026)', v: '8 y 9 de octubre de 2026 (resultados en el documento técnico)' },
  PRES: { t: 'Presupuesto preliminar de obra civil', ref: '(FEDEM, 2026)', v: 'Presentación del 05/10/2026' },
  PI: { t: 'Presentación inicial FEDEM', ref: '(FEDEM, 2026)', v: '05/10/2026' },
  REN: { t: 'Renders conceptuales de los escenarios', ref: '(FEDEM, 2026)', v: '20 imágenes recibidas el 20/10/2026' },
  PE: { t: 'Presentación ejecutiva v3', ref: 'Elaboración propia con base en (FEDEM, 2026)', v: '20/10/2026' },
  FIBA: { t: 'FIBA Venue Guide', ref: '(FIBA)', v: 'Consultada el 20/10/2026' }
};

VO.documentos = [
  { id: 'DOC-01', cat: 'Perfil del proyecto', nombre: 'Villa Olímpica – Componente FEDEM (extracto del documento técnico general)', tipo: 'Word (.docx)', version: '19/10/2026', fecha: '19/10/2026',
    descripcion: 'Fuente principal y vigente: introducción, política pública, diagnóstico, encuesta, población, alternativas, alcance, normativa, localización, financiación y riesgos.',
    estado: 'Vigente', modulos: ['vision', 'escenarios', 'ligas', 'infraestructura', 'beneficiarios', 'presupuesto', 'fases', 'pendientes'], archivo: null,
    obs: 'Disponible solo en la versión interna. Capítulos 2, 5, 13, 14, 15, 17, 18, 19 y 20 sin apartado de FEDEM.' },
  { id: 'DOC-02', cat: 'Presentaciones', nombre: 'Presentación inicial FEDEM (PRESENTACIÓN_FEDEM_05_10.pptx)', tipo: 'PowerPoint (.pptx)', version: 'Pie: 31/03/2026, versión 28', fecha: '05/10/2026',
    descripcion: '34 diapositivas: reseña histórica, sedes, TOE, programa de áreas, presupuesto de obra civil, dotación, renders y fases.',
    estado: 'Reemplazada en lo que difiere del documento técnico', modulos: ['galeria', 'presupuesto', 'infraestructura'], archivo: null,
    obs: 'No incluida en el paquete por su tamaño (88 MB). Contiene una lámina de fases con plazos y fuentes no documentados.' },
  { id: 'DOC-03', cat: 'Presupuesto', nombre: 'Presupuesto de obra civil «Villa Olímpica – Predios ESART – Escuela de Artillería»', tipo: 'Tabla incrustada (imagen EMF)', version: 'Sin versión', fecha: '05/10/2026',
    descripcion: '22 rubros de costo directo, AIU, interventoría, diseños y licencias. Total: $63.315.691.276,98.', estado: 'Preliminar', modulos: ['presupuesto'], archivo: null,
    obs: 'Forma parte de la presentación inicial (diapositiva 24); no existe como archivo independiente.' },
  { id: 'DOC-04', cat: 'Documentos técnicos', nombre: 'Plantilla institucional COGFM', tipo: 'PowerPoint (.pptx)', version: 'Versión 29', fecha: '15/09/2026',
    descripcion: 'Identidad gráfica institucional: escudo, colores, pie y diseños de diapositiva.', estado: 'Vigente', modulos: [], archivo: null, obs: 'Recurso gráfico; no contiene datos del proyecto.' },
  { id: 'DOC-05', cat: 'Escenarios y planos', nombre: 'Renders conceptuales de los escenarios (20 imágenes)', tipo: 'Imágenes JPG', version: '—', fecha: '20/10/2026',
    descripcion: 'Escenarios deportivos, alojamiento, servicios y administración.', estado: 'Conceptual', modulos: ['galeria', 'escenarios'], archivo: 'img/renders/',
    obs: 'Entorno no correspondiente a Bogotá; emblema no oficial; renders 15 y 18 marcados «no usar».' },
  { id: 'DOC-06', cat: 'Escenarios y planos', nombre: 'Planteamiento preliminar de infraestructura', tipo: 'Imagen', version: '—', fecha: '19/10/2026', descripcion: 'Figura del numeral 4.1.3 con las 16 infraestructuras.', estado: 'Preliminar', modulos: ['galeria'], archivo: 'img/proyecto/planteamiento.jpg', obs: '' },
  { id: 'DOC-07', cat: 'Escenarios y planos', nombre: 'Zonificación del programa', tipo: 'Imagen', version: '—', fecha: '05/10/2026', descripcion: 'Áreas cubiertas (12.652 y 1.100 m²), descubierta (35.322 m²) y zona de tiro (800 m²).', estado: 'Preliminar', modulos: ['infraestructura', 'galeria'], archivo: 'img/proyecto/zonificacion.jpg', obs: 'Ver OB-01.' },
  { id: 'DOC-08', cat: 'Encuestas', nombre: 'Encuesta a las ligas (resultados)', tipo: 'Contenida en DOC-01', version: '—', fecha: '8–9/10/2026', descripcion: 'Ficha técnica, gráficos y tabla de indicadores (numeral 4.1.2).', estado: 'Vigente', modulos: ['ligas'], archivo: null, obs: 'Las respuestas originales (formularios) no están disponibles.' },
  { id: 'DOC-09', cat: 'Información de ligas', nombre: 'TOE FEDEM 2026', tipo: 'Citada en DOC-01 y DOC-02', version: 'Versión 27', fecha: '06/03/2026', descripcion: 'Personal orgánico, en comisión y de apoyo.', estado: 'Vigente', modulos: ['beneficiarios'], archivo: null, obs: 'El archivo original de la TOE no está disponible.' },
  { id: 'DOC-10', cat: 'Presentaciones', nombre: 'Presentación ejecutiva Villa Olímpica v3 (PDF)', tipo: 'PDF', version: 'v3', fecha: '20/10/2026', descripcion: '12 diapositivas con agenda y anexos A1–A15.', estado: 'Vigente', modulos: ['presentacion'], archivo: null, obs: 'El PowerPoint editable se entregó por separado.' },
  { id: 'DOC-11', cat: 'Anexos', nombre: 'Fichas de las diapositivas y guion de la expositora', tipo: 'Word (.docx)', version: 'v3', fecha: '20/10/2026', descripcion: 'Objetivo, mensaje, texto en pantalla, imágenes, diseño, guion, tiempo y transición de cada diapositiva.', estado: 'Vigente', modulos: ['presentacion'], archivo: null, obs: '' },
  { id: 'DOC-12', cat: 'Matrices de seguimiento', nombre: 'Diagnóstico, anexo de respaldo y matriz de contradicciones', tipo: 'Word (.docx)', version: '20/10/2026', fecha: '20/10/2026', descripcion: 'Clasificación de la información, cifras con fuente y 29 contradicciones.', estado: 'Vigente', modulos: ['pendientes'], archivo: null, obs: '' },
  { id: 'DOC-13', cat: 'Perfil del proyecto', nombre: 'VILLA_OLIMPICA_FFMM_Perfil_Formulacion_v7', tipo: 'No disponible', version: 'v7', fecha: 'Desconocida', descripcion: 'Referencia de trabajo previo mencionada en las instrucciones.', estado: 'No disponible', modulos: [], archivo: null, obs: 'No fue adjuntado; no se pudo leer ni verificar. El documento del 19/10/2026 se tomó como vigente.' },
  { id: 'DOC-14', cat: 'Estudios y diseños', nombre: 'Estudios y diseños definitivos', tipo: '—', version: '—', fecha: '—', descripcion: 'Topografía, suelos, conceptos y diseños.', estado: 'No existen aún', modulos: ['fases'], archivo: null, obs: 'Pendientes (etapas 2 y 6).' }
];
VO.categoriasDoc = ['Perfil del proyecto', 'Documentos técnicos', 'Estudios y diseños', 'Escenarios y planos', 'Encuestas', 'Información de ligas', 'Presupuesto', 'Matrices de seguimiento', 'Presentaciones', 'Anexos', 'Otros documentos'];

VO.trazabilidad = [
  ['37 ligas (24 / 3 / 10)', 'DT', 'Numerales 1 y 4.1.3', 'confirmado'],
  ['259 personas', 'TOE', 'Numeral 4.4', 'confirmado'],
  ['133 / 37 / 5 / 1 por institución', 'TOE', 'Numeral 4.4', 'confirmado'],
  ['176 en traslado y comisión (175 impreso)', 'TOE', 'Numerales 4.1.3 y 6', 'contradictorio'],
  ['0 escenarios, 0 m², 0 cupos propios', 'DT', 'Numerales 4.1.3 y 10', 'confirmado'],
  ['11 ciudades con sedes de ligas', 'DT', 'Numeral 4.1.2', 'confirmado'],
  ['13 de 14 ligas con condiciones inadecuadas', 'ENC', 'Pregunta 19', 'confirmado'],
  ['$547,26–738,26 M al año en alquileres', 'ENC', 'Numeral 9 (A0)', 'preliminar'],
  ['207,5 h y 406 h semanales', 'ENC', 'Preguntas 5 y 31', 'preliminar'],
  ['16 infraestructuras en el planteamiento', 'DT', 'Numeral 4.1.3', 'preliminar'],
  ['25 ligas con escenario en la Villa', 'DT', 'Numerales 4.1.3 y 9', 'preliminar'],
  ['100.000 m² de planeamiento', 'DT', 'Numerales 7 y 7.2', 'pendiente'],
  ['49.874 m² edificaciones y superficies cubiertas', 'DT / PI', 'Numeral 7.2 · lámina de zonificación', 'contradictorio'],
  ['52.536,27 m² medidos', 'DT', 'Numeral 7.2', 'preliminar'],
  ['48.694 m² y 990 m por coordenadas', 'DT', 'Numeral 11.2', 'preliminar'],
  ['$63.315.691.276,98', 'PRES', 'Diapositiva 24 de la presentación inicial', 'preliminar'],
  ['400 huéspedes de alojamiento', 'DT', 'Numerales 6 y 7.2', 'contradictorio'],
  ['Sede de 300 m² para 30 funcionarios', 'DT', 'Numeral 7.2', 'confirmado'],
  ['Visión 2032', 'DT', 'Numeral 3', 'preliminar'],
  ['23 riesgos; R-20 extremo', 'DT', 'Numeral 16', 'preliminar'],
  ['Área mínima de cancha FIBA 32 × 19 m', 'FIBA', 'Venue Guide', 'confirmado']
];

/* ---------------- MODO PRESENTACIÓN EJECUTIVA ----------------
   tipo: portada | agenda | cifras | imagen | galeria | estado | ruta | ideas | cierre
   notas: se muestran solo al pulsar «N» (no aparecen automáticamente) */
VO.presentacion = [
  { tipo: 'portada', bloque: 0, img: 'img/renders/r02.jpg', titulo: 'VILLA OLÍMPICA', sub: 'Centro de preparación, concentración y bienestar para el deporte de la Fuerza Pública', pie: 'Federación Colombiana Deportiva Militar – FEDEM · Bogotá D.C. · Octubre de 2026',
    notas: 'Saludo. Presentar el proyecto en etapa de perfil y el propósito: obtener orientación para su siguiente etapa. Menos de 20 minutos.' },
  { tipo: 'agenda', bloque: 0, titulo: 'Agenda', items: ['Contexto y necesidad', 'Visión de la Villa Olímpica', 'Escenarios y alcance', 'Estado actual y ruta de trabajo', 'Conclusiones y siguientes pasos'],
    notas: 'Empiezo por la necesidad, sigo con la propuesta y sus escenarios, luego el estado real y la ruta, y cierro con el siguiente paso.' },
  { tipo: 'cifras', bloque: 1, titulo: 'FEDEM administra 37 ligas sin un solo escenario propio', img: 'img/proyecto/predio_aereo.jpg',
    cifras: [['0', 'escenarios deportivos propios'], ['0 m²', 'de infraestructura propia'], ['0', 'cupos de alojamiento'], ['13 de 14', 'ligas califican sus escenarios como inadecuados'], ['$547–738 M', 'al año en alquileres reportados']],
    notas: 'FEDEM existe desde 1950. Sus ligas entrenan en sedes prestadas en 11 ciudades. La encuesta de octubre lo confirma. El rango de alquileres se debe a inconsistencias entre los valores mensuales y anuales reportados.' },
  { tipo: 'imagen', bloque: 2, titulo: 'Una sede integral para el deporte de la Fuerza Pública', img: 'img/renders/r03.jpg',
    texto: 'Concentrar en un solo lugar la preparación, el alojamiento, la formación y la administración de las ligas de FEDEM.', etiqueta: 'Ejército · Armada · Fuerza Aeroespacial · Policía Nacional',
    notas: 'Misión y visión del numeral 3. La visión 2032 es una aspiración institucional, no un compromiso de fecha.' },
  { tipo: 'imagen', bloque: 2, titulo: '16 infraestructuras en un solo complejo', img: 'img/proyecto/planteamiento.jpg', contain: true,
    texto: '9 deportivas · 5 de servicios · 2 de administración', etiqueta: 'Planteamiento preliminar · Cantón Sur – Escuela de Artillería',
    notas: 'El planteamiento es conceptual; la disposición se definirá en los diseños.' },
  { tipo: 'galeria', bloque: 3, titulo: 'Escenarios deportivos para 25 de las 37 ligas', imgs: [['img/renders/r09.jpg', 'Pista y fútbol'], ['img/renders/r11.jpg', 'Piscina olímpica'], ['img/renders/r20.jpg', 'Coliseo multipropósito'], ['img/renders/r05.jpg', 'Pista de obstáculos'], ['img/renders/r06.jpg', 'Tenis']],
    notas: '7 ligas con escenario especializado y 18 con escenario compartido; 10 seguirán con convenios. Son renders conceptuales.' },
  { tipo: 'galeria', bloque: 3, titulo: 'Alojamiento, servicios y formación', imgs: [['img/renders/r12.jpg', 'Alojamiento'], ['img/renders/r13.jpg', 'Gimnasio'], ['img/renders/r14.jpg', 'Comedor'], ['img/renders/r17.jpg', 'Biblioteca'], ['img/renders/r07.jpg', 'Coliseo de equipos']],
    notas: 'Hoy el deportista paga su alojamiento. La capacidad está por validar: 400 o 300 + 100.' },
  { tipo: 'cifras', bloque: 3, titulo: 'Alcance y valor institucional', img: 'img/renders/r08.jpg', imgTag: 'RENDER CONCEPTUAL', cifras: [['37', 'ligas de las cuatro instituciones'], ['259', 'personas de FEDEM (TOE 2026)'], ['25', 'ligas con escenario en la Villa'], ['$63.316 M', 'inversión preliminar, sin recursos aprobados']],
    pie: 'Beneficios esperados (no son resultados): continuidad, concentración, bienestar, inclusión y proyección.',
    notas: 'La inversión no incluye coliseos, gimnasio, servicios, dotación ni operación. La LIDIFA es beneficiaria prioritaria.' },
  { tipo: 'estado', bloque: 4, titulo: 'Estado actual de la estructuración',
    cols: [['Elaborado', 'Diagnóstico · encuesta · población · alternativas · riesgos'], ['Adoptado por FEDEM', 'Alternativa Villa condicionada · sede de 300 m²'], ['Preliminar', 'Planteamiento · presupuesto · renders'], ['Pendiente', 'Predio · área · estudios · MGA · financiación']],
    alerta: 'Nada está aprobado, financiado ni contratado. Decisión crítica: 10 ha programadas frente a ≈5,25 ha medidas.',
    notas: 'Ser transparentes: el proyecto está en perfil.' },
  { tipo: 'ruta', bloque: 4, titulo: 'Ruta de trabajo: primero el predio y el alcance', pasos: ['Predio', 'Estudios del predio', 'Cierre del alcance', 'Formulación', 'Recursos', 'Diseño y ejecución'],
    pie: 'Fechas y responsables: por definir.', notas: 'Las tres primeras etapas definen dónde y qué se construye.' },
  { tipo: 'ideas', bloque: 5, titulo: 'Conclusiones', img: 'img/renders/r11.jpg', ideas: [['La necesidad es estructural', 'Desde 1950, sin escenarios, alojamiento ni sede propios.'], ['La propuesta es integral', 'Atiende las cuatro causas, para las cuatro instituciones y con accesibilidad.'], ['El siguiente paso está claro', 'Resolver el predio y el alcance.']],
    notas: 'Tres ideas para recordar.' },
  { tipo: 'cierre', bloque: 5, img: 'img/proyecto/vista_aerea_implantacion.jpg', titulo: 'De cero escenarios propios a una sede integral para la Fuerza Pública',
    pide: [['Predio', 'Respaldo para la autorización formal de uso.'], ['Alcance', 'Ajustar el programa al área o gestionar área adicional.'], ['Formulación', 'Completarla y presentarla ante el MDN.']],
    pie: 'No se solicitan recursos en esta etapa.', notas: 'Solicitar las tres orientaciones y abrir el espacio a preguntas.' }
];
