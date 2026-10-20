/* =====================================================================
   VILLA OLÍMPICA · DATOS DEL PROYECTO
   ---------------------------------------------------------------------
   Este archivo contiene TODA la información que muestra la plataforma.
   Para actualizar la plataforma, edite este archivo (y catalogos.js);
   la interfaz (app/) no contiene datos.

   Estados de validación permitidos (campo "estado"):
     confirmado    → Confirmado documentalmente
     preliminar    → Preliminar
     revision      → En revisión
     pendiente     → Pendiente de validación
     contradictorio→ Contradictorio entre fuentes
     definir       → Por definir
     observacion   → Observación para revisión (detectada en la auditoría; no es decisión institucional)

   Claves de fuente (campo "fuente"): ver VO.fuentes en documentos.js
   Corte de la información: 20/10/2026
   ===================================================================== */
window.VO = window.VO || {};

VO.meta = {
  nombre: 'VILLA OLÍMPICA',
  corte: '20/10/2026',
  clasificacion: 'RESERVADO',
  proposito: 'Una sede propia e integral para el deporte de la Fuerza Pública: entrenamiento, alojamiento, formación y administración en un solo lugar.',
  propositoFuente: 'DT',
  ubicacion: 'Cantón Sur – Escuela de Artillería · Localidad de Tunjuelito, Bogotá D.C.',
  etapa: 'Perfil de formulación',
  resumen: [
    'Desde 1950, FEDEM administra el deporte de la Fuerza Pública sin escenarios, alojamiento ni sede propios. Sus 37 ligas funcionan en sedes prestadas o alquiladas en 11 ciudades.',
    'La Villa Olímpica propone un complejo integral en el Cantón Sur – Escuela de Artillería: escenarios deportivos, alojamiento para concentraciones, sede administrativa y servicios al deportista.',
    'El proyecto está en etapa de perfil. No hay recursos aprobados, autorización formal del predio ni diseños. La decisión crítica es el área: el programa supone 10 ha y el polígono medido tiene ≈5,25 ha.'
  ],
  enUnMinuto: [
    { t: 'La necesidad', d: 'FEDEM es la entidad que administra el deporte del sector Defensa desde 1950. Hoy tiene 37 ligas y 259 personas, pero 0 escenarios, 0 m² y 0 cupos de alojamiento propios. Las ligas entrenan en sedes prestadas, en 11 ciudades.' },
    { t: 'La evidencia', d: 'En la encuesta de octubre de 2026, 13 de 14 ligas calificaron sus escenarios como inadecuados para el alto rendimiento. Las que respondieron reportan entre $547 y $738 millones al año en alquileres.' },
    { t: 'La propuesta', d: 'Un complejo integral en el Cantón Sur con 16 infraestructuras: 9 deportivas, 5 de servicios y 2 de administración. Atendería directamente a 25 ligas y daría sede, alojamiento y servicios a las 37.' },
    { t: 'El estado', d: 'Perfil de formulación. La inversión preliminar es de $63.316 millones, sin recursos aprobados. Falta la autorización del predio, los estudios técnicos y conciliar el programa con el área disponible.' },
    { t: 'Lo que se necesita', d: 'Orientación sobre tres puntos: la autorización del predio, el alcance frente al área disponible y la ruta de formulación ante el MDN.' }
  ],
  necesidad: 'Limitada capacidad de FEDEM para garantizar de manera continua la preparación, la concentración y el bienestar de los deportistas de las 37 ligas de las Fuerzas Militares y la Policía Nacional.',
  mision: 'Proveer a las ligas deportivas de FEDEM y a los deportistas de las Fuerzas Militares y la Policía Nacional una infraestructura integral, propia y permanente, que concentre la preparación deportiva de alto rendimiento, el alojamiento, la formación y los servicios de bienestar y salud necesarios para su desarrollo humano y competitivo.',
  vision: 'Hacia 2032, la Villa Olímpica de las Fuerzas Militares y la Policía Nacional se consolida como el referente del deporte militar y policial en Latinoamérica.',
  instituciones: ['Ejército Nacional', 'Armada Nacional', 'Fuerza Aeroespacial Colombiana', 'Policía Nacional'],
  causas: [
    { id: 'CD1', t: 'Sin escenarios deportivos propios', d: 'Dependencia de instalaciones prestadas o alquiladas, sin garantía de disponibilidad.' },
    { id: 'CD2', t: 'Dispersión territorial', d: 'Ligas con sede en unidades de 11 ciudades; deportistas en todo el territorio.' },
    { id: 'CD3', t: 'Sede arrendada y sin alojamiento', d: 'El deportista asume el costo de arriendo durante las concentraciones.' },
    { id: 'CD4', t: 'Preparación integral no articulada', d: 'Preparación física, nutrición, biomedicina y formación sin articulación con escuelas y unidades.' }
  ],
  faltaDefinir: [
    'Autorización formal y titularidad del predio',
    'Área disponible frente al programa (10 ha frente a ≈5,25 ha)',
    'Capacidad de alojamiento (400 huéspedes o 300 + 100)',
    'Nivel de competencia y dimensiones de cada escenario',
    'Costo de coliseos, gimnasio, tenis, servicios, dotación y operación',
    'Fuentes de financiación y cronograma'
  ]
};

/* ---------------- INDICADORES DEL INICIO ----------------
   valor: texto mostrado · modulo: vista que abre · estado: validación */
VO.indicadores = [
  { id: 'ind-area-plan', label: 'Área de planeamiento', valor: '100.000 m²', sub: '10 ha · sujeta a validación', estado: 'pendiente', modulo: 'infraestructura', fuente: 'DT', nota: 'El numeral 7 indica que el área de 10 ha «está sujeta a validación». El polígono medido es de 52.536,27 m².' },
  { id: 'ind-area-medida', label: 'Polígono medido', valor: '52.536 m²', sub: '≈5,25 ha · Google Earth', estado: 'preliminar', modulo: 'infraestructura', fuente: 'DT', nota: 'Medición sobre Google Earth; no reemplaza el levantamiento topográfico.' },
  { id: 'ind-area-zonif', label: 'Áreas de la zonificación', valor: '49.874 m²', sub: '13.752 m² cubiertos', estado: 'contradictorio', modulo: 'infraestructura', fuente: 'PI', nota: 'El documento lo describe como «edificaciones y superficies cubiertas», pero la lámina de zonificación suma áreas cubiertas (13.752 m²), descubiertas (35.322 m²) y la zona de tiro (800 m²).' },
  { id: 'ind-ligas', label: 'Ligas de FEDEM', valor: '37', sub: '24 olímpicas · 3 militares · 10 paralímpicas', estado: 'confirmado', modulo: 'ligas', fuente: 'DT' },
  { id: 'ind-ligas-villa', label: 'Ligas con escenario en la Villa', valor: '25', sub: '7 especializado + 18 compartido', estado: 'preliminar', modulo: 'ligas', fuente: 'DT' },
  { id: 'ind-infra', label: 'Infraestructuras planteadas', valor: '16', sub: '9 deportivas · 5 servicios · 2 administración', estado: 'preliminar', modulo: 'escenarios', fuente: 'DT' },
  { id: 'ind-personas', label: 'Personal de FEDEM', valor: '259', sub: 'TOE 2026, versión 27', estado: 'confirmado', modulo: 'beneficiarios', fuente: 'TOE' },
  { id: 'ind-inversion', label: 'Inversión preliminar', valor: '$63.316 M', sub: 'Sin APU ni fecha base · sin recursos aprobados', estado: 'preliminar', modulo: 'presupuesto', fuente: 'PRES' },
  { id: 'ind-fases', label: 'Ruta de trabajo', valor: '6 etapas', sub: 'Derivadas del numeral 7 · sin fechas', estado: 'observacion', modulo: 'fases', fuente: 'DT', nota: 'Las «seis fases» no figuran en el documento vigente; la presentación inicial muestra 3 fases. Las 6 etapas son una lectura del numeral 7 para revisión.' },
  { id: 'ind-criticos', label: 'Pendientes críticos', valor: '=criticos', sub: 'Prioridad alta en la matriz de control', estado: 'pendiente', modulo: 'pendientes', fuente: 'DT' }
];

/* ---------------- HITOS DOCUMENTADOS ---------------- */
VO.hitos = [
  { fecha: '1950', t: 'Creación', d: 'Decreto 3938 de 1950: se crea la Dirección General de Educación Física y Deportes Militares.', estado: 'confirmado', fuente: 'DT' },
  { fecha: '1970', t: 'Nivel de federación nacional', d: 'Decreto 1387 de 1970: nivel jerárquico de federación deportiva nacional.', estado: 'confirmado', fuente: 'DT' },
  { fecha: '1995', t: 'Administración del deporte del MDN', d: 'Ley 181 y Decreto Ley 1228 de 1995: FEDEM administra el deporte del Ministerio de Defensa.', estado: 'confirmado', fuente: 'DT' },
  { fecha: '2010', t: 'Prediseño en el Cantón Sur', d: 'Se presentó el prediseño «Escuela Educación Física del Ejército», que no se materializó.', estado: 'confirmado', fuente: 'DT' },
  { fecha: '06/03/2026', t: 'TOE FEDEM 2026, versión 27', d: '259 personas registradas.', estado: 'confirmado', fuente: 'TOE' },
  { fecha: '05/10/2026', t: 'Presentación inicial', d: 'Programa, presupuesto de obra civil y renders de implantación.', estado: 'confirmado', fuente: 'PI' },
  { fecha: '8–9/10/2026', t: 'Encuesta a las ligas', d: '14 formularios (15 ligas); 13 de la relación de 37.', estado: 'confirmado', fuente: 'ENC' },
  { fecha: '19/10/2026', t: 'Documento técnico vigente', d: 'Componente FEDEM del documento técnico general del CGFM.', estado: 'confirmado', fuente: 'DT' },
  { fecha: '20/10/2026', t: 'Presentación ejecutiva v3', d: 'Doce diapositivas para el señor General, con anexos.', estado: 'confirmado', fuente: 'PE' }
];

/* ---------------- ÁREAS ---------------- */
VO.areas = {
  referencias: [
    { id: 'a-canton', label: 'Cantón Sur (predio general)', m2: 1410000, tipo: 'Área del predio general', estado: 'preliminar', fuente: 'DT', nota: '«Aproximadamente 141 hectáreas». No es área de intervención.' },
    { id: 'a-disenos', label: 'Base de cálculo de los diseños', m2: 110000, tipo: 'Área calculada (presupuesto)', estado: 'contradictorio', fuente: 'PRES', nota: 'Diseños presupuestados: 110.000 m² × $30.000.' },
    { id: 'a-pres', label: 'Suma de áreas del presupuesto', m2: 104500, tipo: 'Área calculada', estado: 'contradictorio', fuente: 'DT', nota: 'Suma de rubros sin el cerramiento (numeral 7.2).' },
    { id: 'a-programa', label: 'Área de planeamiento del programa', m2: 100000, tipo: 'Área identificada en la propuesta', estado: 'pendiente', fuente: 'DT', nota: '10 ha «sujetas a validación» (numeral 7).' },
    { id: 'a-poligono', label: 'Polígono medido', m2: 52536.27, tipo: 'Área preliminar (Google Earth)', estado: 'preliminar', fuente: 'DT', nota: 'Medición en Google Earth (numeral 7.2).' },
    { id: 'a-coord', label: 'Polígono por coordenadas aproximadas', m2: 48694, tipo: 'Área calculada', estado: 'preliminar', fuente: 'DT', nota: '14 vértices WGS 84, precisión ±30 m; perímetro 990 m (numeral 11.2).' }
  ],
  programa: [
    { id: 'p-edif', label: 'Edificaciones y superficies cubiertas (según el documento)', m2: 49874, estado: 'contradictorio', fuente: 'DT', nota: 'Ver la observación OB-01: la cifra coincide con la suma de la zonificación (cubiertas + descubiertas + tiro).' },
    { id: 'p-verde', label: 'Zonas verdes, circulaciones y áreas exteriores', m2: 50126, estado: 'preliminar', fuente: 'DT' }
  ],
  zonificacion: [
    { id: 'z-c1', label: 'Área cubierta 1', m2: 12652, items: 'Cancha multipropósito, parqueadero, alojamientos/hotel, piscina olímpica, semillero deportivo, esgrima', color: '#7030A0' },
    { id: 'z-desc', label: 'Área descubierta', m2: 35322, items: 'Pista de atletismo, pista de pentatlón, campo de orientación, cancha de fútbol, carriles perimetrales de atletismo', color: '#304F19' },
    { id: 'z-c2', label: 'Área cubierta 2', m2: 1100, items: 'Zonas administrativas, compañía de seguridad y mantenimiento', color: '#0C124C' },
    { id: 'z-tiro', label: 'Zona de tiro', m2: 800, items: 'Campo de tiro', color: '#BF9900' }
  ],
  zonificacionFuente: 'PI',
  zonificacionNota: 'Lámina «Zonificación – programa» de la presentación inicial (05/10/2026). La suma de las cuatro zonas es 49.874 m².',
  coordenadas: { centroide: '4,55755 N · −74,13209 W', vertices: 14, precision: '±1″ (≈30 m)', perimetro: 990 }
};

/* ---------------- BENEFICIARIOS ---------------- */
VO.beneficiarios = {
  toe: { total: 259, porInstitucion: [['Ejército Nacional', 133], ['Policía Nacional', 37], ['Armada Nacional', 5], ['Fuerza Aeroespacial', 1]],
         externas: 83, lidifaToe: 39, organicos: 57, comision: 118, sumaFilas: 176, totalImpreso: 175, fuente: 'TOE' },
  categorias: [
    { id: 'b-dir', tipo: 'identificado', t: 'Directos', d: 'Deportistas, entrenadores y personal técnico de las 37 ligas de FEDEM y su personal administrativo, de las cuatro instituciones.', cifra: '259 personas (TOE 2026)', estado: 'confirmado', fuente: 'DT' },
    { id: 'b-pri', tipo: 'identificado', t: 'Prioritarios por inclusión', d: 'Deportistas con discapacidad de la LIDIFA y de las ligas paralímpicas: requieren accesibilidad en escenarios, alojamiento y circulaciones (Ley 1618 de 2013, art. 18).', cifra: 'LIDIFA: 39 (TOE) · 52 (encuesta)', estado: 'contradictorio', fuente: 'DT' },
    { id: 'b-vin', tipo: 'estimado', t: 'Vinculados a la estrategia', d: 'Estudiantes de las escuelas de formación que hagan práctica de educación física y personal atendido por el Comité Móvil.', cifra: 'Por estimar', estado: 'definir', fuente: 'DT' },
    { id: 'b-ind', tipo: 'estimado', t: 'Indirectos', d: 'Integrantes de las cuatro instituciones, sus familias y las delegaciones deportivas que utilicen el complejo.', cifra: 'Por estimar', estado: 'definir', fuente: 'DT' }
  ],
  beneficios: [
    { id: 'v-cont', t: 'Continuidad del entrenamiento', d: 'Escenarios propios y disponibles, frente a la disponibilidad incierta actual.', causa: 'CD1', componentes: ['esc-atletismo', 'esc-piscina', 'esc-coliseo-multi', 'esc-pentatlon'] },
    { id: 'v-conc', t: 'Concentración y control', d: 'Ligas y personal en un solo lugar, con control administrativo y disciplinario.', causa: 'CD2', componentes: ['srv-alojamiento', 'srv-comando'] },
    { id: 'v-bien', t: 'Bienestar del deportista', d: 'Alojamiento institucional durante las concentraciones; el deportista deja de asumir ese costo.', causa: 'CD3', componentes: ['srv-alojamiento', 'srv-comedor'] },
    { id: 'v-prep', t: 'Preparación integral', d: 'Medicina deportiva, gimnasio y formación articulados con escuelas y el Comité Móvil.', causa: 'CD4', componentes: ['srv-medicina', 'esc-gimnasio', 'srv-aulas', 'srv-biblioteca'] },
    { id: 'v-incl', t: 'Inclusión', d: 'Accesibilidad universal para la LIDIFA y las ligas paralímpicas en un solo complejo.', causa: 'CD1', componentes: ['esc-coliseo-equipos', 'srv-alojamiento'] },
    { id: 'v-proy', t: 'Proyección institucional', d: 'Base para la preparación ante el CISM y el Comité Olímpico Colombiano.', causa: 'CD1', componentes: ['esc-atletismo', 'esc-pentatlon'] }
  ],
  resultadosMedidos: [] // ninguno: el proyecto no ha iniciado ejecución
};

/* ---------------- ENCUESTA (resumen) ---------------- */
VO.encuesta = {
  fecha: '8 y 9 de octubre de 2026', formularios: 14, ligas: 15, enRelacion: 13, fuente: 'ENC',
  disponibilidad: [['Siempre', 3], ['Casi siempre', 2], ['Algunas veces', 5], ['Rara vez', 4]],
  condiciones: [['Adecuadas', 1], ['Parcialmente adecuadas', 9], ['Inadecuadas', 4]],
  dificultades: [['Alto costo del alquiler', 8], ['Falta de escenarios especializados', 8], ['Compartir con otros usuarios', 6], ['Falta de equipamiento', 5], ['Horarios no compatibles', 5]],
  prioridades: [['Coliseo o sala de combate, fuerza o esgrima', 9], ['Gimnasio', 7], ['Piscina olímpica', 4], ['Pista de atletismo', 3]],
  kpis: [
    { t: 'Condiciones parcial o totalmente inadecuadas', v: '13 de 14', p: 'Pregunta 19' },
    { t: 'Escenario disponible solo «algunas veces» o «rara vez»', v: '9 de 14', p: 'Pregunta 17' },
    { t: 'Ligas que pagan alquiler para entrenar', v: '6 de 14', p: 'Preguntas 8 y 25' },
    { t: 'Horas semanales en escenarios de terceros', v: '207,5 h', p: 'Pregunta 5' },
    { t: 'Horas semanales que usarían en la Villa', v: '406 h', p: 'Pregunta 31' },
    { t: 'Eventos en el último año (13 ligas)', v: '59', p: 'Pregunta 11' }
  ],
  nota: 'Muestreo no probabilístico; valores autodeclarados. Respondieron 13 de las 37 ligas de la relación (35,1 %), además de la LIDIFA y la Liga de Esgrima (en proceso de activación).'
};
