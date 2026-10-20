# VILLA OLÍMPICA · Plataforma de proyecto (versión de trabajo local)

Corte de la información: **20/10/2026** · Clasificación: **RESERVADO**

## 1. Cómo abrirla

1. Descomprima la carpeta `VILLA_OLIMPICA` completa, sin separar sus subcarpetas.
2. Abra `index.html` con Chrome o Edge.
3. No requiere internet, instalación ni servidor. Todos los recursos son locales: no carga fuentes, librerías ni servicios externos.

**Atajos de teclado**

| Dónde | Atajo | Acción |
|---|---|---|
| Plataforma | Ctrl + K | Búsqueda global |
| Plataforma | Esc | Cerrar ventanas |
| Imagen ampliada | ← → | Navegar entre imágenes |
| Imagen ampliada | + − / rueda del ratón | Zoom; arrastre para desplazarse |
| Modo presentación | → / espacio | Avanzar |
| Modo presentación | ← | Retroceder |
| Modo presentación | N | Mostrar u ocultar las notas para la expositora (ocultas al inicio) |
| Modo presentación | F | Pantalla completa |
| Modo presentación | Esc | Salir |

## 2. Estructura de los módulos

| # | Módulo | Contenido |
|---|---|---|
| — | Inicio | Portada panorámica, resumen ejecutivo y 10 indicadores que abren su respaldo. También el estado de la estructuración, hitos documentados, pendientes prioritarios y accesos rápidos. |
| 1 | Visión general | «El proyecto en un minuto» (con botón para copiar), problema central, causas, misión, visión, alcance institucional y aspectos por definir. |
| 2 | Vista arquitectónica | Planteamiento con 15 zonas seleccionables, comparador entre la fotografía actual y la propuesta, y galería de 31 imágenes con filtros, ampliación, zoom y navegación. |
| 3 | Escenarios y componentes | 28 fichas con buscador, filtros (categoría, grupo, disciplina y estado) y vista de tarjetas o tabla ordenable. |
| 4 | Ligas y disciplinas | 37 ligas con filtros por grupo, tipo y respuesta a la encuesta; gráficos de la encuesta; ficha por liga; observaciones. |
| 5 | Infraestructura y áreas | Áreas de referencia clasificadas por tipo, zonificación, componentes por tipo y coordenadas. |
| 6 | Beneficiarios y valor | TOE 2026, categorías (identificado o estimado), diagrama interactivo necesidad → componente → beneficio, resultados medidos (ninguno). |
| 7 | Presupuesto | Estimación preliminar, composición, costo por componente con filtros, lo que está por definir, fuentes de financiación y supuestos. |
| 8 | Fases y seguimiento | Seis etapas en tres vistas: línea de tiempo, tablero de estados y lista ordenable. |
| 9 | Pendientes y riesgos | Matriz de control de 48 registros: 19 riesgos, 12 pendientes y 17 observaciones para revisión. Permite filtrar, buscar y ordenar. |
| 10 | Documentos y trazabilidad | Biblioteca de 14 documentos (los incluidos se abren), tabla de trazabilidad de 21 cifras y fuentes. |
| 11 | Modo presentación ejecutiva | 12 pantallas en cinco bloques, agenda, notas para la expositora y cierre institucional. |
| 12 | Búsqueda global | Escenarios, ligas, documentos, indicadores, fases, pendientes, cifras e imágenes. |

## 3. Carpetas

```
VILLA_OLIMPICA/
├── index.html            ← abrir este archivo
├── LEAME.md              ← este documento
├── data/                 ← TODOS los datos (editar aquí)
│   ├── proyecto.js       meta, indicadores, hitos, áreas, beneficiarios, encuesta
│   ├── catalogos.js      escenarios, ligas, galería, zonas del planteamiento
│   ├── seguimiento.js    presupuesto, fases, matriz de control
│   └── documentos.js     fuentes, documentos, trazabilidad, modo presentación
├── app/                  ← interfaz (no contiene datos del proyecto)
│   ├── styles.css        configuración visual (paleta en :root)
│   ├── ui.js             componentes: modal, visor, gráficos, tablas
│   ├── modulos.js        vistas de los módulos
│   └── main.js           navegación, búsqueda y presentación
├── img/                  renders, planos y fotografías
(versión para GitHub Pages: sin la carpeta docs/; los documentos solo están en la versión interna)
```

## 4. Cómo actualizar la información

Edite los archivos de `data/` con cualquier editor de texto (por ejemplo, el Bloc de notas o VS Code). Cada archivo explica su formato al inicio. Guarde los cambios y recargue la página.

- **Estados de validación:** `confirmado`, `preliminar`, `revision`, `pendiente`, `contradictorio`, `definir` u `observacion`. Los indicadores, gráficos y conteos se recalculan solos.
- **Agregar un escenario, una liga, un pendiente o un documento:** copie un registro existente del mismo archivo y modifique sus campos.
- **Agregar una imagen:** cópiela en `img/` y registre su ruta en `VO.galeria` (archivo `catalogos.js`).
- **Agregar un documento que se pueda abrir:** cópielo en `docs/` y escriba su ruta en el campo `archivo`. Si deja `archivo: null`, la plataforma muestra «No incluido» y no genera un enlace roto.
- **Cerrar un pendiente:** cambie su campo `estado`. Para registrar un responsable o una fecha, complete los campos `responsable` y `fecha` solo cuando exista un soporte.
- **Marcar una fase como completada:** cambie su `estado` a `completado` únicamente cuando haya soporte documental.
- **Verificar la sintaxis:** si una página queda en blanco después de editar, revise que no falten comas o comillas. La consola del navegador (F12) indica la línea con el error.

## 5. Inventario de fuentes

| Archivo | Tipo | Fecha / versión | Utilidad | Observaciones |
|---|---|---|---|---|
| VILLA_OLIMPICA_Componente_FEDEM.docx | Word | 19/10/2026 | **Fuente principal y vigente** | Capítulos 2, 5, 13–15 y 17–20 sin apartado de FEDEM |
| PRESENTACIÓN_FEDEM_05_10.pptx | PowerPoint (88 MB) | 05/10/2026 (pie: v. 28) | Presupuesto, zonificación, implantación, mapa de sedes | Reemplazada donde difiere del documento técnico; lámina de 3 fases con plazos no documentados |
| Plantilla_Institucional_V29.pptx | PowerPoint | v. 29 | Escudo del Comando General y paleta | Sin datos del proyecto |
| 20 renders (JPG) | Imágenes | Recibidos el 20/10/2026 | Galería y presentación | Conceptuales; entorno tropical; emblema no oficial; 15 y 18 marcados «no usar» |
| Presentación v3, fichas y anexo de respaldo | PDF y Word | 20/10/2026 | Módulos 10 y 11 | Elaborados en esta sesión |
| VILLA_OLIMPICA_FFMM_Perfil_Formulacion_v7 | — | — | — | **No fue adjuntado; no se pudo leer ni verificar** |
| TOE FEDEM 2026, formularios de la encuesta | — | — | — | Solo disponibles como citas o resultados dentro del documento técnico |

## 6. Pendientes documentales principales

El detalle está en el módulo 9.

- Autorización y titularidad del predio, topografía y conceptos ambiental, de riesgo, urbanístico y de seguridad.
- Conciliar el área: 10 ha programadas frente a ≈5,25 ha medidas (R-20, extremo).
- Conciliar el programa: las 16 infraestructuras del planteamiento no coinciden con los rubros del presupuesto.
- Precisar el área cubierta: los 49.874 m² no corresponden solo a edificaciones, porque solo 13.752 m² son cubiertos.
- Definir la capacidad de alojamiento: 400 huéspedes o 300 + 100.
- Elaborar el presupuesto completo con APU, dotación, operación y mantenimiento.
- Elaborar los capítulos de objetivos, cadena de valor, indicadores, EDT, ingresos y beneficios, y la evaluación en la MGA.
- Definir la ruta oficial: las «seis fases» no figuran en el documento vigente.
- Obtener las respuestas de las 24 ligas sin encuesta y los soportes de pago de los alquileres.

## 7. Limitaciones conocidas

- **Sin autenticación ni control de acceso.** Cualquier persona con la carpeta puede abrirla. No la publique en internet ni la comparta fuera de los canales autorizados para información clasificada.
- **Sin persistencia ni multiusuario.** Los filtros y vistas no se guardan, y los cambios a los datos solo se hacen editando `data/`. No hay sincronización entre equipos.
- **Documentos no incluidos.** La presentación inicial (88 MB) y la plantilla no están en `docs/` por su tamaño y su naturaleza.
- **Zonas del planteamiento.** Están ubicadas sobre los rótulos de la figura del documento técnico; no son posiciones ni medidas reales.
- **Comparador «Hoy y propuesta».** Las dos imágenes no tienen exactamente el mismo encuadre, así que la comparación es ilustrativa.
- **Renders.** Son conceptuales: el entorno no corresponde a Bogotá y el emblema no es el oficial de FEDEM. El logotipo oficial de FEDEM no estaba entre los archivos; la plataforma usa el escudo del Comando General que trae la plantilla institucional.
- **Pantallas pequeñas.** Probada en computador (1440 px), tableta (1024 y 820 px) y teléfono (390 px). El modo presentación está pensado para pantallas 16:9.

## 8. Recomendaciones para una versión institucional

1. Alojarla en la intranet o en un servidor institucional con autenticación (directorio activo o SSO) y registro de accesos.
2. Trasladar los datos de `data/*.js` a una base de datos con roles de edición (lectura para el mando, edición para el equipo formulador) e historial de cambios por cifra.
3. Agregar carga de documentos con control de versiones y un flujo de validación (preliminar → en revisión → confirmado) con firma del responsable.
4. Vincular la matriz de control con responsables y fechas reales una vez se asignen, con alertas de vencimiento.
5. Reemplazar los renders por los diseños oficiales cuando existan y agregar un visor de planos (DWG o PDF) con capas.
