/* =====================================================================
   VILLA OLÍMPICA · SEGUIMIENTO: presupuesto, fases y matriz de control
   ===================================================================== */
window.VO = window.VO || {};

/* ---------------- PRESUPUESTO ----------------
   Versión única disponible: presupuesto preliminar de obra civil (presentación del 05/10/2026).
   valores en millones de pesos · estado por cifra */
VO.presupuesto = {
  versiones: [
    { id: 'PRES-2026-10-05', nombre: 'Presupuesto preliminar de obra civil «Villa Olímpica – Predios ESART»', fecha: '05/10/2026', fuente: 'PRES', estado: 'preliminar',
      nota: 'Única versión disponible. Sin análisis de precios unitarios (APU) ni fecha base. Aritmética verificada en la auditoría (20/10/2026).' }
  ],
  total: { valor: 63315.691276, texto: '$63.315.691.276,98', estado: 'preliminar', fuente: 'PRES' },
  estructura: [
    { id: 'pr-cd', t: 'Obra civil – costo directo', v: 38703.47, tipo: 'Construcción', estado: 'preliminar', nota: '22 rubros' },
    { id: 'pr-aiu', t: 'AIU (30 %)', v: 11611.04, tipo: 'Construcción', estado: 'preliminar', nota: '30 % del costo directo' },
    { id: 'pr-int', t: 'Interventoría de obra (11 %)', v: 5534.60, tipo: 'Interventoría', estado: 'preliminar', nota: '11 % de obra + AIU' },
    { id: 'pr-dis', t: 'Diseños (110.000 m² × $30.000)', v: 3300.00, tipo: 'Estudios y diseños', estado: 'contradictorio', nota: 'Base de 110.000 m² frente a ≈52.536 m² medidos' },
    { id: 'pr-intd', t: 'Interventoría de diseños (7 %)', v: 231.00, tipo: 'Estudios y diseños', estado: 'preliminar', nota: '7 % de los diseños' },
    { id: 'pr-lic', t: 'Licencias y permisos («18 % obra»)', v: 3935.59, tipo: 'Estudios y diseños', estado: 'revision', nota: 'La base implícita ($21.864 M) no corresponde a ningún subtotal' }
  ],
  sinDefinir: [
    { t: 'Construcción de coliseos, gimnasio, tenis y entrenamiento militar', falta: 'Programa de áreas y presupuesto por componente' },
    { t: 'Medicina deportiva, comedor, aulas, biblioteca y transporte', falta: 'Áreas y costos' },
    { t: 'Dotación deportiva', falta: 'Cantidades y especificaciones (listado preliminar en la presentación inicial)' },
    { t: 'Operación y mantenimiento', falta: 'Modelo de sostenibilidad (riesgo R-18)' },
    { t: 'Costos recurrentes', falta: 'Personal, servicios públicos y mantenimiento' },
    { t: 'Fecha base y APU', falta: 'Estudio de mercado e indexación por vigencias' }
  ],
  fuentesFinanciacion: [
    { t: 'Ministerio de Defensa Nacional (PGN)', v: 'Fuente principal esperada', estado: 'pendiente' },
    { t: 'Patrocinio privado', v: 'Fuente alterna adoptada por FEDEM', estado: 'preliminar' },
    { t: 'Ministerio del Deporte', v: 'Apoyo a infraestructura deportiva', estado: 'definir' },
    { t: 'Sistema General de Regalías', v: 'Sujeta a viabilización', estado: 'definir' },
    { t: 'Cooperación internacional', v: 'Apoyo técnico o en equipamiento', estado: 'definir' },
    { t: 'APP, créditos, eventos y alquiler', v: 'Estrategias por fase', estado: 'definir' }
  ],
  referencia: { t: 'Gasto actual reportado en alquileres', v: '$547,26 – $738,26 M al año', nota: '13 ligas: entrenamiento $468,76–659,76 M + eventos $78,5 M. Es una referencia del gasto actual, no un ahorro proyectado.', estado: 'preliminar', fuente: 'ENC' },
  supuestos: ['Precios sin fecha base ni APU', 'Diseños calculados sobre 110.000 m²', 'AIU 30 %; interventoría de obra 11 %; interventoría de diseños 7 %', 'Licencias al 18 % de una base no identificada', 'No incluye dotación, operación ni edificaciones sin rubro'],
  aprobado: null // no hay recursos aprobados documentados
};

/* ---------------- FASES / ETAPAS ----------------
   Etapas derivadas de la secuencia del numeral 7 («Inicio y fin») y de la estrategia de mitigación (numeral 16).
   No hay fechas, responsables ni porcentajes documentados. */
VO.fasesNota = 'Las «seis fases» mencionadas en documentos de trabajo anteriores no figuran en el documento vigente (19/10/2026). La presentación inicial (05/10/2026) muestra tres fases (0–12 meses, 1–3 años y 3–7 años) con fuentes de financiación y obras no documentadas. Las seis etapas siguientes son una lectura del numeral 7: Observación para revisión.';
VO.fases = [
  { id: 'F1', n: 1, nombre: 'Predio', objetivo: 'Contar con la autorización formal de uso del predio.', estado: 'porIniciar',
    actividades: ['Solicitud de autorización ante el Ejército Nacional', 'Visita técnica conjunta con la Décima Tercera Brigada', 'Confirmar la titularidad del predio'],
    productos: ['Acto formal de autorización'], dependencias: [], responsables: null, fechas: null, riesgos: ['R-01'], proximo: 'Radicar la solicitud de autorización de uso', fuente: 'DT' },
  { id: 'F2', n: 2, nombre: 'Estudios del predio', objetivo: 'Conocer las condiciones físicas, ambientales y normativas del terreno.', estado: 'porIniciar',
    actividades: ['Levantamiento topográfico georreferenciado', 'Estudio de suelos', 'Conceptos ambiental y de ronda hídrica', 'Concepto de amenaza y riesgo', 'Concepto de norma urbanística', 'Concepto de seguridad del entorno'],
    productos: ['Polígono definitivo', 'Conceptos técnicos'], dependencias: ['F1'], responsables: null, fechas: null, riesgos: ['R-02', 'R-03', 'R-04', 'R-08', 'R-22'], proximo: 'Depende de la etapa 1', fuente: 'DT' },
  { id: 'F3', n: 3, nombre: 'Cierre del alcance', objetivo: 'Definir qué se construye y con qué nivel de competencia.', estado: 'porIniciar',
    actividades: ['Decidir: ampliar el polígono o priorizar el programa', 'Definir la capacidad de alojamiento', 'Definir el nivel de competencia por escenario', 'Requisitos de accesibilidad con la LIDIFA y la DIVRI'],
    productos: ['Programa arquitectónico conciliado'], dependencias: ['F2'], responsables: null, fechas: null, riesgos: ['R-07', 'R-20', 'R-21', 'R-23'], proximo: 'Orientación institucional sobre el área', fuente: 'DT' },
  { id: 'F4', n: 4, nombre: 'Formulación completa', objetivo: 'Completar el proyecto para su registro.', estado: 'enDesarrollo',
    actividades: ['Objetivos y árbol de objetivos', 'Cadena de valor, indicadores y EDT', 'Presupuesto con APU', 'Costos de operación y mantenimiento', 'Evaluación económica en la MGA'],
    productos: ['Proyecto formulado en la MGA'], dependencias: ['F3'], responsables: null, fechas: null, riesgos: ['R-06', 'R-18'], proximo: 'Elaborar los capítulos pendientes del componente FEDEM', fuente: 'DT', estadoNota: 'El perfil existe; varios capítulos están por elaborar.' },
  { id: 'F5', n: 5, nombre: 'Gestión de recursos', objetivo: 'Asegurar la financiación por etapas funcionales.', estado: 'porIniciar',
    actividades: ['Gestión ante el MDN', 'Instancia de gestión de alianzas', 'Fuentes complementarias'],
    productos: ['Recursos asignados'], dependencias: ['F4'], responsables: null, fechas: null, riesgos: ['R-05', 'R-19'], proximo: 'Depende de la etapa 4', fuente: 'DT' },
  { id: 'F6', n: 6, nombre: 'Diseño y ejecución', objetivo: 'Diseñar, construir, dotar y poner en operación.', estado: 'porIniciar',
    actividades: ['Estudios y diseños definitivos', 'Licencias', 'Construcción e interventoría', 'Dotación', 'Traslado de FEDEM e inicio de la operación'],
    productos: ['Villa Olímpica en operación'], dependencias: ['F5'], responsables: null, fechas: null, riesgos: ['R-09', 'R-10', 'R-12'], proximo: 'Depende de la etapa 5', fuente: 'DT' }
];
VO.estadosFase = { porIniciar: 'Por iniciar', enDesarrollo: 'En desarrollo', enRevision: 'En revisión', pendiente: 'Pendiente de validación', completado: 'Completado', porConfirmar: 'Por confirmar' };

/* ---------------- MATRIZ DE CONTROL ----------------
   categoria: Pendiente | Diferencia documental | Estudio requerido | Validación institucional | Riesgo | Dependencia
   origen: documento (riesgo o pendiente del documento) | auditoria (Observación para revisión)
   prioridad: alta | media | baja · responsable/fecha: null = no definidos */
const R = (id, desc, cat, prio, estado, fuente, accion, origen = 'documento') => ({ id, desc, cat, prio, estado, fuente, accion, origen, responsable: null, fecha: null });
VO.pendientes = [
  R('R-20', 'Área disponible insuficiente para el programa (≈5,25 ha medidas frente a 10 ha programadas). Nivel extremo.', 'Riesgo', 'alta', 'Abierto', 'DT', 'Decidir: ampliar el polígono o ajustar y priorizar el programa'),
  R('R-01', 'No autorización o demora en la autorización de uso del predio. Nivel alto.', 'Riesgo', 'alta', 'Abierto', 'DT', 'Obtener el acto formal de autorización antes del registro'),
  R('R-02', 'Restricciones por el humedal, la ronda o la estructura ecológica. Nivel alto.', 'Riesgo', 'alta', 'Abierto', 'DT', 'Conceptos ambiental y de riesgo antes de fijar el terreno'),
  R('R-22', 'Inundación o encharcamiento por cercanía al río Tunjuelo. Nivel alto.', 'Riesgo', 'alta', 'Abierto', 'DT', 'Concepto de amenaza y riesgo y ronda hídrica antes del polígono'),
  R('R-07', 'Programa físico no definido; áreas no conciliadas. Nivel alto.', 'Riesgo', 'alta', 'Abierto', 'DT', 'Cerrar las decisiones de alcance antes del diseño'),
  R('R-23', 'Escenarios que no cumplen las dimensiones reglamentarias. Nivel alto.', 'Riesgo', 'alta', 'Abierto', 'DT', 'Definir el nivel de competencia; confirmar con cada federación'),
  R('R-05', 'No consecución de recursos o asignación inferior. Nivel alto.', 'Riesgo', 'alta', 'Abierto', 'DT', 'Etapas funcionales; gestión ante el MDN; alianzas'),
  R('R-06', 'Incremento de costos (precios sin APU ni fecha). Nivel alto.', 'Riesgo', 'media', 'Abierto', 'DT', 'Estudios de mercado, APU e indexación'),
  R('R-09', 'Retrasos en la ejecución de obras. Nivel alto.', 'Riesgo', 'media', 'Abierto', 'DT', 'Planeación detallada y supervisión permanente'),
  R('R-18', 'Recursos insuficientes para operación y mantenimiento. Nivel alto.', 'Riesgo', 'alta', 'Abierto', 'DT', 'Modelo de sostenibilidad con costos y fuentes'),
  R('R-11', 'Baja articulación entre entidades del sector Defensa. Nivel moderado/alto.', 'Riesgo', 'media', 'Abierto', 'DT', 'Mesas de coordinación interinstitucional'),
  R('R-03', 'Uso del suelo no permitido o con exigencias adicionales. Moderado.', 'Riesgo', 'media', 'Abierto', 'DT', 'Concepto de norma urbanística antes del diseño'),
  R('R-04', 'Incompatibilidad con polígonos de tiro, «CRM» o establecimiento penitenciario cercano. Moderado.', 'Riesgo', 'media', 'Abierto', 'DT', 'Concepto de seguridad; ajustar la zonificación'),
  R('R-08', 'Condiciones de suelo desfavorables. Moderado.', 'Riesgo', 'media', 'Abierto', 'DT', 'Estudio de suelos temprano'),
  R('R-10', 'Retrasos por trámites de licencias y permisos. Moderado.', 'Riesgo', 'baja', 'Abierto', 'DT', 'Ruta crítica de trámites desde la fase 1'),
  R('R-12', 'Insuficientes escenarios alternos durante la ejecución. Moderado.', 'Riesgo', 'baja', 'Abierto', 'DT', 'Plan de continuidad operativa'),
  R('R-17', 'Cambio de prioridades por nuevo gobierno o PND. Moderado.', 'Riesgo', 'media', 'Abierto', 'DT', 'Actualizar la alineación del numeral 3'),
  R('R-19', 'Patrocinio privado no concretado. Moderado.', 'Riesgo', 'baja', 'Abierto', 'DT', 'Constituir la instancia de gestión de alianzas'),
  R('R-21', 'Diseño o dotación sin accesibilidad universal ni requisitos paralímpicos. Moderado.', 'Riesgo', 'media', 'Abierto', 'DT', 'Levantar requisitos con la LIDIFA y la DIVRI'),
  R('P-01', 'Autorización formal de uso y titularidad del predio.', 'Validación institucional', 'alta', 'Pendiente', 'DT', 'Gestión ante el Ejército Nacional'),
  R('P-02', 'Levantamiento topográfico georreferenciado.', 'Estudio requerido', 'alta', 'Pendiente', 'DT', 'Contratar tras la autorización'),
  R('P-03', 'Conceptos ambiental, de ronda hídrica, de riesgo, urbanístico y de seguridad.', 'Estudio requerido', 'alta', 'Pendiente', 'DT', 'Solicitar a las autoridades competentes'),
  R('P-04', 'Objetivos, cadena de valor, indicadores y EDT del componente FEDEM.', 'Pendiente', 'alta', 'Pendiente', 'DT', 'Elaborar los capítulos 4.2, 13, 14 y 15'),
  R('P-05', 'Ingresos y beneficios, regionalización, focalización y equipo estructurador.', 'Pendiente', 'media', 'Pendiente', 'DT', 'Elaborar los capítulos 17 a 20'),
  R('P-06', 'Evaluación económica en la MGA (VPN y TIR frente a la tasa social).', 'Pendiente', 'alta', 'Pendiente', 'DT', 'Requiere los costos de A1 y A2 y el presupuesto completo'),
  R('P-07', 'Costos de operación y mantenimiento.', 'Pendiente', 'alta', 'Pendiente', 'DT', 'Modelo de sostenibilidad'),
  R('P-08', 'Capacidad de FEDEM para contratar y supervisar obras de esta escala.', 'Pendiente', 'media', 'Pendiente', 'DT', 'Documentar la capacidad de gestión'),
  R('P-09', 'Número de concentraciones al año y su costo.', 'Pendiente', 'media', 'Pendiente', 'DT', 'Registrar con las ligas'),
  R('P-10', 'Soportes de pago de los alquileres reportados en la encuesta.', 'Pendiente', 'media', 'Pendiente', 'ENC', 'Solicitar a las 6 ligas que pagan alquiler'),
  R('P-11', 'Respuesta de las 24 ligas que no diligenciaron la encuesta.', 'Pendiente', 'media', 'Pendiente', 'ENC', 'Completar el levantamiento de información'),
  R('P-12', 'Requerimientos de la liga de Fuerzas Comando.', 'Pendiente', 'baja', 'Pendiente', 'DT', 'Documentar requerimientos'),
  R('OB-01', 'Los 49.874 m² («edificaciones y superficies cubiertas») coinciden con la suma de la zonificación: 12.652 + 35.322 + 1.100 + 800 m². El área cubierta es de 13.752 m².', 'Diferencia documental', 'alta', 'Observación para revisión', 'PI', 'Corregir la denominación en el documento técnico', 'auditoria'),
  R('OB-02', 'Alojamiento: 400 huéspedes (numerales 6 y 7) frente a «300 oficiales / 100 huéspedes, por validar» (numeral 3).', 'Diferencia documental', 'alta', 'Observación para revisión', 'DT', 'Definir la capacidad con la demanda de concentraciones', 'auditoria'),
  R('OB-03', 'Personal en traslado y comisión: 175 (numeral 6 y total impreso de la TOE) frente a 176 (suma de filas).', 'Diferencia documental', 'baja', 'Observación para revisión', 'TOE', 'Conciliar con la TOE vigente', 'auditoria'),
  R('OB-04', 'El presupuesto se describe como «solo obra civil», pero incluye diseños, licencias e interventoría y excluye varias edificaciones.', 'Diferencia documental', 'alta', 'Observación para revisión', 'DT', 'Presupuesto completo por componentes', 'auditoria'),
  R('OB-05', 'Licencias al «18 % obra»: $3.935,6 M implica una base de $21.864 M que no corresponde a ningún subtotal.', 'Diferencia documental', 'media', 'Observación para revisión', 'PRES', 'Revisar la fórmula', 'auditoria'),
  R('OB-06', 'Pista de pentatlón: 15 × 200 m (programa) frente a 15 × 215 m (presupuesto); el recorrido CISM es de 500 m.', 'Diferencia documental', 'media', 'Observación para revisión', 'DT', 'Diseño conforme al reglamento CISM', 'auditoria'),
  R('OB-07', 'Piscina de 21 m de ancho frente a los 25 m del estándar olímpico citado.', 'Diferencia documental', 'media', 'Observación para revisión', 'DT', 'Definir el nivel de competencia', 'auditoria'),
  R('OB-08', 'Las 16 infraestructuras del planteamiento no coinciden con los rubros del presupuesto (esgrima, campo de tiro, orientación y semilleros tienen rubro pero no están en el planteamiento; coliseos, gimnasio y servicios están en el planteamiento sin rubro).', 'Diferencia documental', 'alta', 'Observación para revisión', 'DT', 'Programa único conciliado', 'auditoria'),
  R('OB-09', 'Las «seis fases» no figuran en el documento vigente; la presentación inicial muestra 3 fases con plazos (0–12 meses, 1–3 y 3–7 años) y fuentes no documentadas.', 'Diferencia documental', 'media', 'Observación para revisión', 'PI', 'Definir la ruta oficial', 'auditoria'),
  R('OB-10', 'Sedes de ligas: el mapa y la encuesta difieren para Natación (Cartagena/Ibagué), Tejo (Bogotá/Tunja), Taekwondo (Madrid/Bogotá) y Orientación (Tolemaida/Bogotá).', 'Diferencia documental', 'baja', 'Observación para revisión', 'ENC', 'Confirmar la sede vigente de cada liga', 'auditoria'),
  R('OB-11', 'El mapa de sedes incluye Ajedrez (Club PONAL), que no figura en la relación de 37 ligas.', 'Diferencia documental', 'baja', 'Observación para revisión', 'PI', 'Confirmar la relación de ligas', 'auditoria'),
  R('OB-12', 'Decreto de 2000: 1521 (presentación inicial) frente a 1512, art. 32 (documento técnico).', 'Diferencia documental', 'baja', 'Observación para revisión', 'DT', 'Verificar en el Diario Oficial', 'auditoria'),
  R('OB-13', 'Renders con entorno tropical y emblema que no es el oficial de FEDEM; render 15 con equitación; render 18 con rótulos de inteligencia y operaciones.', 'Diferencia documental', 'media', 'Observación para revisión', 'REN', 'Usar como ilustración; excluir 15 y 18', 'auditoria'),
  R('OB-14', 'Base de diseños de 110.000 m² frente al polígono medido de ≈52.536 m².', 'Diferencia documental', 'media', 'Observación para revisión', 'PRES', 'Recalcular cuando se cierre el alcance', 'auditoria'),
  R('OB-15', 'Sobrepeso de hasta 17 % en cadetes: fuente por confirmar (Redalyc, s. f.; Brújula de Semilleros, 2017).', 'Diferencia documental', 'baja', 'Observación para revisión', 'DT', 'No citar hasta verificar', 'auditoria'),
  R('OB-16', 'Tabla de tratamiento de riesgos con filas desplazadas (R-20 a R-22) y sin la fila de R-22.', 'Diferencia documental', 'baja', 'Observación para revisión', 'DT', 'Corregir la tabla del documento', 'auditoria'),
  R('OB-17', 'El archivo «VILLA_OLIMPICA_FFMM_Perfil_Formulacion_v7» no está entre los documentos disponibles; no fue posible verificar su contenido.', 'Pendiente', 'media', 'Observación para revisión', null, 'Adjuntarlo para compararlo con la versión del 19/10/2026', 'auditoria')
];
