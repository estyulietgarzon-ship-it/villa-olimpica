/* VILLA OLÍMPICA · vistas de los módulos (la información proviene de data/*.js) */
window.MOD = (function () {
  const { esc, norm, $, $$, badge, fuente, fmtM, fmtN, icon, modal, lightbox, badgeTipo, bars, animateBars, donut, sortable, th } = UI;
  const go = (r, q) => APP.go(r, q);
  const escById = id => VO.escenarios.find(e => e.id === id);
  const galById = id => VO.galeria.find(g => g.id === id);
  const criticos = () => VO.pendientes.filter(p => p.prio === 'alta');
  const head = (k, t, p, extra = '') => `<div class="vh"><div><div class="kicker">${k}</div><h1>${t}</h1>${p ? `<p>${p}</p>` : ''}</div>${extra}</div>`;
  const src = k => `<div class="small muted" style="margin-top:10px">${icon('doc', '').replace('<svg', '<svg style="width:13px;height:13px;vertical-align:-2px"')} Fuente: ${fuente(k)}</div>`;

  /* ========== FICHAS / MODALES COMPARTIDOS ========== */
  function fichaEscenario(id) {
    const e = escById(id); if (!e) return;
    const g = e.img ? galById(e.img) : null;
    const ligas = VO.ligas.filter(l => l.esc.includes(id));
    const imgs = VO.galeria.filter(x => x.esc === id);
    modal(`${g ? `<div class="mh"><img src="${g.src}" alt="${esc(g.t)}" style="cursor:zoom-in" data-lb><span class="concept">${g.tipo === 'render' ? 'RENDER CONCEPTUAL · NO ES DISEÑO APROBADO' : ''}</span></div>` : ''}
      <div class="mb"><div class="kicker">${{ deportivo: 'Escenario deportivo', servicio: 'Servicio complementario', administracion: 'Administración y operación', urbanismo: 'Urbanismo y redes' }[e.categoria]}${e.grupo && e.grupo !== '—' ? ' · Grupo ' + e.grupo : ''}</div>
      <h2>${esc(e.nombre)}</h2><div>${badge(e.estado)} ${e.enPlanteamiento ? '<span class="tag">En el planteamiento (16)</span>' : '<span class="tag">No figura en el planteamiento</span>'} ${e.enPresupuesto ? '<span class="tag">Con rubro en el presupuesto</span>' : '<span class="tag">Sin rubro de construcción</span>'}</div>
      <dl class="dl"><dt>Uso previsto</dt><dd>${esc(e.uso)}</dd><dt>Descripción</dt><dd>${esc(e.descripcion)}</dd><dt>Área</dt><dd>${esc(e.area)}</dd>
      <dt>Programa</dt><dd>${esc(e.programa)}</dd><dt>Presupuesto</dt><dd>${esc(e.presupuesto)}</dd>
      <dt>Características técnicas</dt><dd>${e.tecnicas.length ? e.tecnicas.map(esc).join('<br>') : '<span class="muted">No documentadas</span>'}</dd>
      <dt>Requerimientos</dt><dd>${e.requerimientos.length ? e.requerimientos.map(esc).join('<br>') : '<span class="muted">No documentados</span>'}</dd>
      <dt>Ligas relacionadas</dt><dd>${ligas.length ? ligas.map(l => `<a href="#/ligas?q=${encodeURIComponent(l.n)}" class="tag" style="text-decoration:none">${esc(l.n)}</a>`).join('') : '<span class="muted">' + (e.grupo === 'Todas' ? 'Todas las ligas' : 'Sin liga específica') + '</span>'}</dd>
      <dt>Pendiente de validación</dt><dd>${e.pendientes.length ? e.pendientes.map(p => '• ' + esc(p)).join('<br>') : '<span class="muted">Sin pendientes registrados</span>'}</dd>
      <dt>Imágenes</dt><dd>${imgs.length ? imgs.map(x => `<span class="tag">${esc(x.t)}${x.usar === false ? ' (no usar)' : ''}</span>`).join('') : '<span class="muted">Sin imagen disponible</span>'}</dd></dl>${src(e.fuente)}</div>`);
    const h = $('#modal-ov [data-lb]'); if (h) h.onclick = () => lightbox(imgs.length ? imgs : [g], 0);
  }
  function fichaPendiente(id) {
    const p = VO.pendientes.find(x => x.id === id); if (!p) return;
    modal(`<div class="mb"><div class="kicker">${esc(p.cat)}</div><h2>${esc(p.id)}</h2>
      <div>${p.origen === 'auditoria' ? badge('observacion') : '<span class="badge st-revision">Registro documental</span>'} <span class="tag">Prioridad ${p.prio}</span></div>
      <dl class="dl"><dt>Descripción</dt><dd>${esc(p.desc)}</dd><dt>Estado</dt><dd>${esc(p.estado)}</dd><dt>Acción siguiente</dt><dd>${esc(p.accion)}</dd>
      <dt>Responsable</dt><dd class="muted">${p.responsable || 'Por definir (no documentado)'}</dd><dt>Fecha objetivo</dt><dd class="muted">${p.fecha || 'Por definir (no documentada)'}</dd></dl>${src(p.fuente)}</div>`, { w: 680 });
  }
  function fichaFase(id) {
    const f = VO.fases.find(x => x.id === id); if (!f) return;
    const L = (a, emp) => a && a.length ? '<ul style="margin:0;padding-left:18px">' + a.map(x => `<li>${esc(x)}</li>`).join('') + '</ul>' : `<span class="muted">${emp}</span>`;
    modal(`<div class="mb"><div class="kicker">Etapa ${f.n} de 6</div><h2>${esc(f.nombre)}</h2><div><span class="badge st-${f.estado === 'enDesarrollo' ? 'preliminar' : 'definir'}">${VO.estadosFase[f.estado]}</span> ${badge('observacion')}</div>
      <dl class="dl"><dt>Objetivo</dt><dd>${esc(f.objetivo)}</dd><dt>Actividades</dt><dd>${L(f.actividades)}</dd><dt>Productos esperados</dt><dd>${L(f.productos)}</dd>
      <dt>Dependencias</dt><dd>${f.dependencias.length ? f.dependencias.map(d => 'Etapa ' + d.slice(1)).join(', ') : 'Ninguna'}</dd>
      <dt>Responsables</dt><dd class="muted">Por confirmar</dd><dt>Fechas</dt><dd class="muted">Por confirmar</dd><dt>Avance</dt><dd class="muted">Por confirmar (sin porcentaje documentado)</dd>
      <dt>Riesgos</dt><dd>${f.riesgos.map(r => `<a class="tag" style="text-decoration:none" href="#/pendientes?q=${r}">${r}</a>`).join('')}</dd><dt>Próximo paso</dt><dd>${esc(f.proximo)}</dd>
      ${f.estadoNota ? `<dt>Nota</dt><dd>${esc(f.estadoNota)}</dd>` : ''}</dl>${src(f.fuente)}</div>`, { w: 720 });
  }
  function fichaIndicador(id) {
    const k = VO.indicadores.find(x => x.id === id); go(k.modulo);
  }

  /* ========== INICIO ========== */
  function inicio() {
    const fase = VO.fases.findIndex(f => f.estado === 'enDesarrollo');
    const ind = VO.indicadores.map(k => ({ ...k, valor: k.valor === '=criticos' ? String(criticos().length) : k.valor }));
    const mods = [['vision', 'eye', 'Visión general'], ['galeria', 'image', 'Vista arquitectónica'], ['escenarios', 'stadium', 'Escenarios'], ['ligas', 'users', 'Ligas y disciplinas'], ['infraestructura', 'layers', 'Infraestructura y áreas'], ['beneficiarios', 'heart', 'Beneficiarios'], ['presupuesto', 'coin', 'Presupuesto'], ['fases', 'route', 'Fases'], ['pendientes', 'alert', 'Pendientes y riesgos'], ['documentos', 'doc', 'Documentos']];
    return `<section class="hero"><img class="bg" src="img/renders/r02.jpg" alt="Vista aérea conceptual de la Villa Olímpica">
      <div class="in"><div class="eyebrow">FEDERACIÓN COLOMBIANA DEPORTIVA MILITAR · FEDEM</div><h1>VILLA OLÍMPICA</h1><p>${esc(VO.meta.proposito)}</p>
      <div class="chips"><span>${esc(VO.meta.etapa)}</span><span>${esc(VO.meta.ubicacion)}</span><span>Corte: ${VO.meta.corte}</span></div>
      <div class="acts"><button class="btn btn-g" data-act="pres">${icon('play')}Modo presentación ejecutiva</button><button class="btn btn-ghost" data-go="vision">${icon('eye')}El proyecto en un minuto</button></div></div>
      <span class="concept">RENDER CONCEPTUAL · NO ES DISEÑO APROBADO</span></section>

      <div class="sec"><h2>Resumen ejecutivo</h2></div>
      <div class="grid g3">${VO.meta.resumen.map((r, i) => `<div class="card"><div class="kicker">${['Necesidad', 'Propuesta', 'Estado'][i]}</div><p>${esc(r)}</p></div>`).join('')}</div>

      <div class="sec"><h2>Indicadores principales</h2><span class="note">Cada indicador abre su información de respaldo</span></div>
      <div class="grid g5">${ind.map(k => `<div class="card kpi click" data-go="${k.modulo}" tabindex="0" title="${esc(k.nota || '')}"><div class="l">${esc(k.label)}</div><div class="v">${esc(k.valor)}</div><div class="s">${esc(k.sub)}</div><div class="go">${badge(k.estado)}<span>Ver ›</span></div></div>`).join('')}</div>

      <div class="sec"><h2>Estado de la estructuración</h2><span class="note">Ruta derivada del numeral 7 · sin fechas documentadas</span></div>
      <div class="card"><div class="steps">${VO.fases.map((f, i) => `<div class="step ${i === fase ? 'now' : ''}" data-fase="${f.id}" style="cursor:pointer"><div class="dot">${f.n}</div><b>${esc(f.nombre)}</b><div class="small">${VO.estadosFase[f.estado]}</div></div>`).join('')}</div>
      <div class="callout warn" style="margin-top:18px">${icon('alert')}<div><b>Etapa actual: perfil de formulación.</b> Nada está aprobado, financiado ni contratado. La formulación avanza en paralelo, pero el registro depende de la autorización del predio y del cierre del alcance.</div></div></div>

      <div class="grid g2" style="margin-top:16px">
        <div class="card"><div class="sec" style="margin:0 0 6px"><h2>Hitos documentados</h2><button class="btn btn-o" data-go="documentos">Documentos</button></div>
          <ul class="list">${VO.hitos.slice().reverse().slice(0, 6).map(h => `<li><span class="when">${esc(h.fecha)}</span><div><b style="color:var(--ink)">${esc(h.t)}</b><div class="small muted">${esc(h.d)}</div></div></li>`).join('')}</ul></div>
        <div class="card"><div class="sec" style="margin:0 0 6px"><h2>Pendientes prioritarios</h2><button class="btn btn-o" data-go="pendientes">Matriz completa</button></div>
          <ul class="list">${criticos().slice(0, 7).map(p => `<li data-pend="${p.id}" style="cursor:pointer"><span class="prio alta"></span><div><b style="color:var(--ink)">${esc(p.id)}</b> <span class="small">${esc(p.desc)}</span></div></li>`).join('')}</ul></div>
      </div>

      <div class="sec"><h2>Módulos</h2></div>
      <div class="grid g5">${mods.map(m => `<div class="card click" data-go="${m[0]}" tabindex="0" style="display:flex;gap:12px;align-items:center;padding:16px">${icon(m[1]).replace('<svg', '<svg style="width:22px;height:22px;color:var(--purple)"')}<b style="color:var(--ink);font-size:14px">${m[2]}</b></div>`).join('')}</div>`;
  }

  /* ========== 1 VISIÓN GENERAL ========== */
  function vision() {
    const M = VO.meta;
    return head('Módulo 1', 'Visión general del proyecto', 'Qué es la Villa Olímpica, qué necesidad atiende y qué falta para estructurarla.') + `
      <div class="grid g2" style="align-items:start">
        <div class="card"><div class="kicker">El proyecto en un minuto</div><h3 style="font-size:20px;margin-bottom:6px">Para introducir el tema ante un alto mando</h3>
          <div class="minute">${M.enUnMinuto.map(m => `<div class="m"><div><b style="color:var(--ink)">${esc(m.t)}</b><div>${esc(m.d)}</div></div></div>`).join('')}</div>
          <button class="btn btn-o" data-copy style="margin-top:12px">Copiar texto</button> <span class="small muted" data-copied></span></div>
        <div>
          <div class="feature" style="margin-bottom:16px"><img src="img/renders/r03.jpg" alt="" style="max-height:300px"><div class="cap"><div class="kicker" style="color:#d9c3ec">Propósito</div><h3>${esc(M.proposito)}</h3></div><span class="concept" style="top:12px;bottom:auto">RENDER CONCEPTUAL</span></div>
          <div class="card"><div class="kicker">Problema central</div><p style="color:var(--ink);font-weight:600">${esc(M.necesidad)}</p>${src('DT')}</div>
        </div>
      </div>
      <div class="sec"><h2>Causas que atiende el proyecto</h2><span class="note">Árbol de problemas (numeral 4.1.1)</span></div>
      <div class="grid g4">${M.causas.map(c => `<div class="card"><span class="pill-n">${c.id}</span><h3 style="margin-top:10px">${esc(c.t)}</h3><p class="small">${esc(c.d)}</p></div>`).join('')}</div>
      <div class="grid g2" style="margin-top:16px">
        <div class="card"><div class="kicker">Misión propuesta</div><p>${esc(M.mision)}</p><div class="kicker" style="margin-top:14px">Visión institucional</div><p>${esc(M.vision)} ${badge('preliminar')}</p>${src('DT')}</div>
        <div class="card"><div class="kicker">Alcance institucional documentado</div><p>El alcance cubre a la totalidad de la Fuerza Pública representada en FEDEM:</p>
          <div style="margin:10px 0">${M.instituciones.map(i => `<span class="tag" style="font-size:12.5px;padding:5px 10px">${esc(i)}</span>`).join('')}</div>
          <p class="small muted">Componentes de la estrategia integral: Villa Olímpica (inversión física), infraestructura existente mediante convenios, centros regionales (por definir), Comité Móvil, escuelas de formación, LIDIFA y gestión de alianzas.</p>${src('DT')}</div>
      </div>
      <div class="grid g2" style="margin-top:16px">
        <div class="card click" data-go="beneficiarios"><div class="kicker">Beneficios esperados</div><p>${VO.beneficiarios.beneficios.map(b => esc(b.t)).join(' · ')}</p><p class="small muted" style="margin-top:8px">Son beneficios proyectados; no hay resultados medidos.</p></div>
        <div class="card click" data-go="pendientes"><div class="kicker">Aspectos por definir</div><ul style="margin:6px 0 0;padding-left:18px">${M.faltaDefinir.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>
      </div>
      <div class="sec"><h2>Árbol de problemas</h2></div>
      <div class="card" style="text-align:center"><img src="img/proyecto/arbol_problemas.jpg" alt="Árbol de problemas" style="margin:auto;max-height:520px;cursor:zoom-in" data-lbg="g-arbol">${src('DT')}</div>`;
  }
  function visionBind(v) {
    const b = $('[data-copy]', v); if (b) b.onclick = () => {
      const t = VO.meta.enUnMinuto.map(m => m.t + ': ' + m.d).join('\n');
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => $('[data-copied]', v).textContent = 'Copiado.', () => $('[data-copied]', v).textContent = 'El navegador no permitió copiar; seleccione el texto manualmente.');
    };
  }

  /* ========== 2 VISTA ARQUITECTÓNICA ========== */
  let galF = 'Todos', galT = 'todos';
  function galeria() {
    const comps = ['Todos', ...new Set(VO.galeria.map(g => g.comp))];
    return head('Módulo 2', 'Vista arquitectónica interactiva', 'Planteamiento, implantación, renders y fotografías del terreno. Toda imagen indica si es render conceptual, plano, propuesta o fotografía existente.') + `
      <div class="callout info" style="margin-bottom:18px">${icon('info')}<div>${esc(VO.galeriaNota)}</div></div>
      <div class="grid g2" style="align-items:start">
        <div><div class="sec" style="margin-top:0"><h2>Planteamiento interactivo</h2><span class="note">Seleccione una zona rotulada</span></div>
          <div class="plan-wrap" id="plan"><img src="img/proyecto/planteamiento.jpg" alt="Planteamiento preliminar de infraestructura">
          ${VO.hotspots.map((h, i) => `<button class="hs" style="left:${h.x}%;top:${h.y}%" data-esc="${h.esc}" aria-label="${esc(h.l)}">${i + 1}<span class="tip">${esc(h.l)}</span></button>`).join('')}</div>
          <p class="small muted" style="margin-top:8px">Los puntos marcan los rótulos que trae la figura del documento técnico (numeral 4.1.3). No representan medidas ni posiciones definitivas.</p></div>
        <div><div class="sec" style="margin-top:0"><h2>Hoy y propuesta</h2><span class="note">Deslice para comparar</span></div>
          <div class="compare" id="cmp"><img src="img/proyecto/predio_aereo.jpg" alt="Fotografía actual"><img class="top-img" src="img/proyecto/vista_aerea_implantacion.jpg" alt="Implantación propuesta">
          <div class="bar"></div><div class="knob">⇆</div><span class="lb l">HOY · FOTOGRAFÍA</span><span class="lb r">PROPUESTA CONCEPTUAL</span><input type="range" min="0" max="100" value="50" aria-label="Comparar"></div>
          <p class="small muted" style="margin-top:8px">Fotografía aérea del terreno y vista de implantación de la presentación inicial (05/10/2026). Los encuadres no coinciden exactamente: la comparación es ilustrativa.</p></div>
      </div>
      <div class="sec"><h2>Galería</h2><span class="note" id="gcount"></span></div>
      <div class="toolbar"><div class="seg" id="gtipo">${[['todos', 'Todos'], ['render', 'Renders'], ['plano', 'Planos'], ['propuesta', 'Propuestas'], ['fotografia', 'Fotografías']].map(t => `<button data-t="${t[0]}" class="${galT === t[0] ? 'on' : ''}">${t[1]}</button>`).join('')}</div>
        <select id="gcomp" aria-label="Componente">${comps.map(c => `<option ${c === galF ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></div>
      <div class="gal" id="ggrid"></div>`;
  }
  function galeriaBind(v) {
    const draw = () => {
      const items = VO.galeria.filter(g => (galF === 'Todos' || g.comp === galF) && (galT === 'todos' || g.tipo === galT));
      $('#gcount', v).textContent = items.length + ' imágenes';
      $('#ggrid', v).innerHTML = items.length ? items.map((g, i) => `<div class="mcard" data-i="${i}" tabindex="0"><div class="ph"><img loading="lazy" src="${g.th}" alt="${esc(g.t)}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'noimg',textContent:'Imagen no disponible'}))"><span class="b">${badgeTipo(g.tipo)}</span>${g.usar === false ? '<span class="no">NO USAR</span>' : ''}</div><div class="bd"><h3>${esc(g.t)}</h3><div class="small muted">${esc(g.comp)}</div></div></div>`).join('') : '<div class="empty">No hay imágenes con estos filtros.</div>';
      $$('.mcard', v).forEach(c => c.onclick = () => lightbox(items, +c.dataset.i));
    };
    $$('#gtipo button', v).forEach(b => b.onclick = () => { galT = b.dataset.t; $$('#gtipo button', v).forEach(x => x.classList.toggle('on', x === b)); draw(); });
    $('#gcomp', v).onchange = e => { galF = e.target.value; draw(); };
    $$('.hs', v).forEach(h => h.onclick = () => fichaEscenario(h.dataset.esc));
    const r = $('#cmp input', v), top = $('#cmp .top-img', v);
    r.oninput = () => { top.style.clipPath = `inset(0 0 0 ${r.value}%)`; $('#cmp .bar', v).style.left = r.value + '%'; $('#cmp .knob', v).style.left = r.value + '%'; };
    $('#plan img', v).onclick = () => lightbox([galById('g-plan')], 0);
    draw();
  }

  /* ========== 3 ESCENARIOS ========== */
  const ESC_ST = { q: '', cat: 'todas', grupo: 'todos', est: 'todos', disc: 'todas', vista: 'tarjetas' };
  function escenarios() {
    const discs = [...new Set(VO.ligas.map(l => l.n))].sort((a, b) => a.localeCompare(b));
    const nP = VO.escenarios.filter(e => e.enPlanteamiento).length, nR = VO.escenarios.filter(e => e.enPresupuesto).length, nB = VO.escenarios.filter(e => e.enPlanteamiento && e.enPresupuesto).length;
    return head('Módulo 3', 'Escenarios y componentes', `Catálogo de los ${VO.escenarios.length} componentes documentados en el planteamiento, el programa y el presupuesto preliminar.`) + `
      <div class="grid g4" style="margin-bottom:18px">
        <div class="card kpi"><div class="l">Componentes registrados</div><div class="v">${VO.escenarios.length}</div><div class="s">Escenarios, servicios, administración y urbanismo</div></div>
        <div class="card kpi"><div class="l">En el planteamiento</div><div class="v">${nP}</div><div class="s">Figura del numeral 4.1.3 (16 infraestructuras)</div></div>
        <div class="card kpi"><div class="l">Con rubro de presupuesto</div><div class="v">${nR}</div><div class="s">Presupuesto preliminar de obra civil</div></div>
        <div class="card kpi"><div class="l">En ambos</div><div class="v">${nB}</div><div class="s">${badge('contradictorio')} Ver OB-08</div></div></div>
      <div class="toolbar"><input type="search" id="eq" placeholder="Buscar escenario, uso o disciplina…" value="${esc(ESC_ST.q)}">
        <select id="ecat"><option value="todas">Todas las categorías</option><option value="deportivo">Escenarios deportivos</option><option value="servicio">Servicios complementarios</option><option value="administracion">Administración</option><option value="urbanismo">Urbanismo y redes</option></select>
        <select id="egr"><option value="todos">Todos los grupos</option>${['A', 'B', 'D', 'Todas'].map(g => `<option value="${g}">${g === 'Todas' ? 'Uso de todas las ligas' : 'Grupo ' + g}</option>`).join('')}</select>
        <select id="edisc"><option value="todas">Todas las disciplinas</option>${discs.map(d => `<option>${esc(d)}</option>`).join('')}</select>
        <select id="eest"><option value="todos">Todos los estados</option>${Object.entries(UI.ESTADOS).map(([k, t]) => `<option value="${k}">${t}</option>`).join('')}</select>
        <div class="seg" id="evista"><button data-v="tarjetas">Tarjetas</button><button data-v="tabla">Tabla</button></div><span class="count" id="ecount"></span></div>
      <div id="eres"></div>`;
  }
  function escenariosBind(v) {
    ['cat', 'grupo', 'est', 'disc'].forEach(k => { const el = $({ cat: '#ecat', grupo: '#egr', est: '#eest', disc: '#edisc' }[k], v); el.value = ESC_ST[k]; });
    const draw = () => {
      const q = norm(ESC_ST.q);
      const items = VO.escenarios.filter(e => (ESC_ST.cat === 'todas' || e.categoria === ESC_ST.cat) && (ESC_ST.grupo === 'todos' || e.grupo === ESC_ST.grupo) && (ESC_ST.est === 'todos' || e.estado === ESC_ST.est)
        && (ESC_ST.disc === 'todas' || VO.ligas.some(l => l.n === ESC_ST.disc && l.esc.includes(e.id)))
        && (!q || norm(e.nombre + ' ' + e.uso + ' ' + e.descripcion).includes(q)));
      $('#ecount', v).textContent = `${items.length} de ${VO.escenarios.length}`;
      $$('#evista button', v).forEach(b => b.classList.toggle('on', b.dataset.v === ESC_ST.vista));
      if (!items.length) { $('#eres', v).innerHTML = '<div class="empty">No hay componentes que coincidan con los filtros.</div>'; return; }
      if (ESC_ST.vista === 'tarjetas') {
        $('#eres', v).innerHTML = `<div class="gal" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">${items.map(e => { const g = e.img && galById(e.img); return `<div class="mcard" data-esc="${e.id}" tabindex="0"><div class="ph">${g ? `<img loading="lazy" src="${g.th}" alt="">` : '<div class="noimg">Sin imagen disponible</div>'}<span class="b">${badge(e.estado)}</span></div><div class="bd"><h3>${esc(e.nombre)}</h3><div class="small muted">${esc(e.uso)}</div><div class="meta"><span class="tag">${esc(e.area.split('(')[0])}</span>${e.costoM != null ? `<span class="tag">${fmtM(e.costoM)}</span>` : '<span class="tag">Sin rubro</span>'}</div></div></div>`; }).join('')}</div>`;
      } else {
        $('#eres', v).innerHTML = `<div class="tbl-wrap"><table class="tbl"><thead>${th([{ t: 'Componente' }, { t: 'Categoría' }, { t: 'Grupo' }, { t: 'Área' }, { t: 'Costo directo' }, { t: 'Planteamiento' }, { t: 'Estado' }])}</thead><tbody>${items.map(e => `<tr class="click" data-esc="${e.id}"><td><b style="color:var(--ink)">${esc(e.nombre)}</b></td><td>${e.categoria}</td><td>${e.grupo}</td><td>${esc(e.area)}</td><td class="num" data-v="${e.costoM ?? -1}">${fmtM(e.costoM)}</td><td>${e.enPlanteamiento ? 'Sí' : 'No'}</td><td data-v="${e.estado}">${badge(e.estado)}</td></tr>`).join('')}</tbody></table></div>`;
        sortable($('table', v));
      }
      $$('[data-esc]', $('#eres', v)).forEach(c => c.onclick = () => fichaEscenario(c.dataset.esc));
    };
    $('#eq', v).oninput = e => { ESC_ST.q = e.target.value; draw(); };
    $('#ecat', v).onchange = e => { ESC_ST.cat = e.target.value; draw(); };
    $('#egr', v).onchange = e => { ESC_ST.grupo = e.target.value; draw(); };
    $('#eest', v).onchange = e => { ESC_ST.est = e.target.value; draw(); };
    $('#edisc', v).onchange = e => { ESC_ST.disc = e.target.value; draw(); };
    $$('#evista button', v).forEach(b => b.onclick = () => { ESC_ST.vista = b.dataset.v; draw(); });
    draw();
  }

  /* ========== 4 LIGAS ========== */
  const LG = { q: '', grupo: 'todos', tipo: 'todos', enc: 'todos' };
  function ligas(qs) {
    if (qs.q) LG.q = qs.q;
    const L = VO.ligas, E = VO.encuesta;
    const byG = ['A', 'B', 'C', 'D'].map(g => [g, L.filter(l => l.grupo === g).length]);
    const conEnc = L.filter(l => l.encuesta).length;
    return head('Módulo 4', 'Ligas y disciplinas', `${L.length} ligas de FEDEM: ${L.filter(l => l.tipo === 'olimpica').length} olímpicas, ${L.filter(l => l.tipo === 'militar').length} militares y ${L.filter(l => l.tipo === 'paralimpica').length} paralímpicas (FEDEM, 2026).`) + `
      <div class="grid g3" style="align-items:stretch">
        <div class="card"><div class="kicker">Cómo se atienden las 37 ligas</div>
          <div class="stack">${byG.map(([g, n]) => `<div data-g="${g}" title="Grupo ${g}: ${n}" style="flex:${n};background:${{ A: '#7030A0', B: '#903596', C: '#9aa0b8', D: '#c6c9d6' }[g]};color:${'CD'.includes(g) ? '#16182b' : '#fff'}">${n}</div>`).join('')}</div>
          <div class="legend" style="flex-direction:column">${byG.map(([g, n]) => `<span><i style="background:${{ A: '#7030A0', B: '#903596', C: '#9aa0b8', D: '#c6c9d6' }[g]}"></i><b>${g}</b> · ${esc(VO.grupos[g].t)} (${n})</span>`).join('')}</div>${src('DT')}</div>
        <div class="card"><div class="kicker">Respuesta a la encuesta</div><div class="donut-wrap">${donut([['Respondieron', conEnc, '#7030A0'], ['Sin respuesta', L.length - conEnc, '#d9dbe6']], 150, `${conEnc}/37`)}
          <div class="small"><p><b style="color:var(--ink)">${conEnc} de 37</b> ligas de la relación respondieron (${(100 * conEnc / 37).toFixed(1).replace('.', ',')} %).</p><p>También respondieron la LIDIFA y la Liga de Esgrima (en activación). ${E.formularios} formularios en total.</p><p class="muted">${esc(E.fecha)} · muestreo no probabilístico.</p></div></div></div>
        <div class="card"><div class="kicker">Escenarios priorizados por las ligas</div>${bars(E.prioridades)}<p class="small muted">Número de menciones.</p></div>
      </div>
      <div class="grid g2" style="margin-top:16px">
        <div class="card"><div class="kicker">Disponibilidad de escenarios (14 formularios)</div>${bars(E.disponibilidad.map((d, i) => [d[0], d[1], i < 2 ? '#b9a6cc' : '#7030A0']))}<p class="small"><b>9 de 14</b> los encuentran solo «algunas veces» o «rara vez».</p></div>
        <div class="card"><div class="kicker">Dificultades de acceso</div>${bars(E.dificultades)}<p class="small muted">Número de ligas que señalaron cada dificultad.</p></div>
      </div>
      <div class="sec"><h2>Relación de ligas</h2><span class="note">Seleccione una fila para ver sus escenarios y su información</span></div>
      <div class="toolbar"><input type="search" id="lq" placeholder="Buscar liga…" value="${esc(LG.q)}">
        <select id="lg"><option value="todos">Todos los grupos</option>${['A', 'B', 'C', 'D'].map(g => `<option value="${g}">Grupo ${g} · ${esc(VO.grupos[g].t)}</option>`).join('')}</select>
        <select id="lt"><option value="todos">Todos los tipos</option><option value="olimpica">Olímpicas</option><option value="militar">Militares</option><option value="paralimpica">Paralímpicas</option></select>
        <select id="le"><option value="todos">Encuesta: todas</option><option value="si">Suministraron información</option><option value="no">Requieren información</option></select><span class="count" id="lcount"></span></div>
      <div class="tbl-wrap" id="lres"></div>
      <div class="sec"><h2>Otras ligas que respondieron la encuesta</h2></div>
      <div class="grid g2">${VO.ligasExtra.map(x => `<div class="card"><h3>${esc(x.n)}</h3><p class="small">${esc(x.nota)}</p><p class="small muted" style="margin-top:6px">${x.encuesta.pers} personas · ${x.encuesta.ciudad} · ${x.encuesta.hTer} h/sem en terceros · disponibilidad: ${x.encuesta.disp}</p></div>`).join('')}</div>
      <div class="sec"><h2>Observaciones para resolver</h2></div>
      <div class="card"><ul class="list">${['OB-10', 'OB-11', 'OB-08'].map(id => { const p = VO.pendientes.find(x => x.id === id); return `<li data-pend="${id}" style="cursor:pointer">${badge('observacion')}<div class="small">${esc(p.desc)}</div></li>`; }).join('')}
        <li>${badge('observacion')}<div class="small">El total de 246 personas de la encuesta no es comparable con las 259 de la TOE 2026; LIDIFA reporta 52 en la encuesta y 39 en la TOE.</div></li></ul></div>`;
  }
  function ligasBind(v) {
    $('#lg', v).value = LG.grupo; $('#lt', v).value = LG.tipo; $('#le', v).value = LG.enc;
    const T = { olimpica: 'Olímpica', militar: 'Militar', paralimpica: 'Paralímpica' };
    const draw = () => {
      const q = norm(LG.q);
      const items = VO.ligas.filter(l => (LG.grupo === 'todos' || l.grupo === LG.grupo) && (LG.tipo === 'todos' || l.tipo === LG.tipo) && (LG.enc === 'todos' || (LG.enc === 'si') === !!l.encuesta) && (!q || norm(l.n).includes(q)));
      $('#lcount', v).textContent = `${items.length} de ${VO.ligas.length}`;
      $('#lres', v).innerHTML = items.length ? `<table class="tbl"><thead>${th([{ t: 'Liga' }, { t: 'Tipo' }, { t: 'Grupo' }, { t: 'Escenarios en la Villa' }, { t: 'Sede (mapa)' }, { t: 'Encuesta' }, { t: 'Información' }])}</thead><tbody>${items.map((l, i) => `<tr class="click" data-l="${esc(l.n)}"><td><b style="color:var(--ink)">${esc(l.n)}</b></td><td>${T[l.tipo]}</td><td>${l.grupo}</td><td>${l.esc.length ? l.esc.map(id => esc(escById(id).nombre)).join(', ') : '<span class="muted">Externa / convenios</span>'}</td><td>${esc(l.sedeMapa)}</td><td data-v="${l.encuesta ? 1 : 0}">${l.encuesta ? '<span class="badge st-confirmado">Respondió</span>' : '<span class="badge st-pendiente">Sin respuesta</span>'}</td><td data-v="${infoEstado(l)}">${badge(infoEstado(l))}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">No hay ligas con estos filtros.</div>';
      if (items.length) sortable($('table', v));
      $$('tr[data-l]', v).forEach(r => r.onclick = () => fichaLiga(r.dataset.l));
    };
    $('#lq', v).oninput = e => { LG.q = e.target.value; draw(); };
    $('#lg', v).onchange = e => { LG.grupo = e.target.value; draw(); };
    $('#lt', v).onchange = e => { LG.tipo = e.target.value; draw(); };
    $('#le', v).onchange = e => { LG.enc = e.target.value; draw(); };
    $$('.stack div', v).forEach(d => d.onclick = () => { LG.grupo = d.dataset.g; $('#lg', v).value = LG.grupo; draw(); $('#lres', v).scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    draw();
  }
  function infoEstado(l) {
    if (!l.encuesta) return 'pendiente';
    const ciudadMapa = norm(l.sedeMapa.split(' ·')[0]);
    const igual = ciudadMapa === norm(l.encuesta.ciudad) || (l.n === 'Karate'); // Tolemaida está en Nilo (Cundinamarca)
    return igual ? 'confirmado' : 'contradictorio';
  }
  function fichaLiga(n) {
    const l = VO.ligas.find(x => x.n === n); const e = l.encuesta;
    const cop = v => v == null ? 'No reportado' : '$' + v.toLocaleString('es-CO');
    modal(`<div class="mb"><div class="kicker">Liga ${{ olimpica: 'olímpica', militar: 'militar', paralimpica: 'paralímpica' }[l.tipo]} · Grupo ${l.grupo}</div><h2>${esc(l.n)}</h2>
      <p class="small">${esc(VO.grupos[l.grupo].t)}: ${esc(VO.grupos[l.grupo].d)}</p>
      <dl class="dl"><dt>Escenarios en la Villa</dt><dd>${l.esc.length ? l.esc.map(id => `<button class="tag" style="cursor:pointer" data-esc="${id}">${esc(escById(id).nombre)}</button>`).join('') : 'Ninguno: requiere infraestructura externa o convenios'}</dd>
      <dt>Servicios comunes</dt><dd>Sede administrativa, gimnasio, medicina deportiva y alojamiento cuando se concentre en Bogotá</dd>
      <dt>Sede según el mapa</dt><dd>${esc(l.sedeMapa)} <span class="small muted">(presentación inicial)</span></dd>
      ${e ? `<dt>Encuesta</dt><dd>${badge(infoEstado(l))} ${e.pers} personas · ${esc(e.ciudad)}</dd><dt>Horas en terceros</dt><dd>${e.hTer == null ? 'No aplica' : e.hTer + ' h/semana'}</dd><dt>Horas en la Villa</dt><dd>${String(e.hVilla).replace('.', ',')} h/semana (estimación de la liga)</dd>
        <dt>Alquiler mensual</dt><dd>${cop(e.alq)}</dd><dt>Disponibilidad</dt><dd>${esc(e.disp)}</dd><dt>Condiciones adecuadas</dt><dd>${esc(e.cond)}</dd>` : `<dt>Encuesta</dt><dd><span class="badge st-pendiente">Requiere información</span> La liga no diligenció el formulario.</dd>`}
      ${l.nota ? `<dt>Nota</dt><dd>${esc(l.nota)}</dd>` : ''}</dl>${src(e ? 'ENC' : 'DT')}</div>`, { w: 720 });
    $$('#modal-ov [data-esc]').forEach(b => b.onclick = () => fichaEscenario(b.dataset.esc));
  }

  /* ========== 5 INFRAESTRUCTURA Y ÁREAS ========== */
  function infraestructura() {
    const A = VO.areas; const max = 110000;
    const zt = A.zonificacion.reduce((a, z) => a + z.m2, 0);
    const cub = A.zonificacion.filter(z => z.id === 'z-c1' || z.id === 'z-c2').reduce((a, z) => a + z.m2, 0);
    return head('Módulo 5', 'Infraestructura y áreas', 'Se distingue el área del predio, el área de planeamiento, el área medida y las áreas del programa. No hay ningún área aprobada.') + `
      <div class="callout err" style="margin-bottom:18px">${icon('alert')}<div><b>Riesgo extremo R-20.</b> El programa se planteó sobre 10 ha, pero el polígono medido tiene ≈5,25 ha. Antes de los diseños debe decidirse si se amplía el polígono o se ajusta y prioriza el programa.</div></div>
      <div class="card"><div class="sec" style="margin:0 0 10px"><h2>Áreas de referencia</h2><span class="note">m² · el Cantón Sur (≈141 ha) no se dibuja a escala</span></div>
        ${bars(A.referencias.filter(r => r.id !== 'a-canton').map(r => [r.label, r.m2, { 'a-programa': '#7030A0', 'a-poligono': '#C11F25', 'a-coord': '#e07a7e' }[r.id] || '#9aa0b8']), { max, fmt: v => fmtN(Math.round(v)) })}
        <div class="tbl-wrap" style="margin-top:14px"><table class="tbl"><thead>${th([{ t: 'Referencia' }, { t: 'Tipo de área' }, { t: 'm²' }, { t: 'Estado' }, { t: 'Nota', s: false }])}</thead><tbody>${A.referencias.map(r => `<tr><td><b style="color:var(--ink)">${esc(r.label)}</b></td><td>${esc(r.tipo)}</td><td class="num" data-v="${r.m2}">${fmtN(r.m2)}</td><td data-v="${r.estado}">${badge(r.estado)}</td><td class="small">${esc(r.nota)}</td></tr>`).join('')}
        <tr><td><b style="color:var(--ink)">Área aprobada</b></td><td>—</td><td class="num" data-v="0">—</td><td>${badge('definir')}</td><td class="small">No existe un área aprobada formalmente.</td></tr></tbody></table></div></div>
      <div class="grid g2" style="margin-top:16px;align-items:start">
        <div class="card"><div class="kicker">Zonificación del programa</div><h3>${fmtN(zt)} m² en cuatro zonas</h3>
          <div class="stack">${A.zonificacion.map(z => `<div style="flex:${z.m2};background:${z.color}" title="${esc(z.label)}: ${fmtN(z.m2)} m²" data-z="${z.id}">${z.m2 > 5000 ? fmtN(z.m2) : ''}</div>`).join('')}</div>
          <ul class="list">${A.zonificacion.map(z => `<li><span class="prio" style="background:${z.color}"></span><div><b style="color:var(--ink)">${esc(z.label)} · ${fmtN(z.m2)} m²</b><div class="small muted">${esc(z.items)}</div></div></li>`).join('')}</ul>
          <div class="callout warn">${icon('alert')}<div class="small"><b>Observación para revisión (OB-01).</b> El documento describe los 49.874 m² como «edificaciones y superficies cubiertas», pero coinciden con la suma de estas cuatro zonas. Solo ${fmtN(cub)} m² son cubiertos.</div></div>${src('PI')}</div>
        <div class="card" style="padding:0;overflow:hidden"><img src="img/proyecto/zonificacion.jpg" alt="Lámina de zonificación" style="cursor:zoom-in" data-lbg="g-zonif"><div style="padding:14px 18px"><b style="color:var(--ink)">Programa del documento técnico</b>
          ${bars(A.programa.map(p => [p.label, p.m2, p.id === 'p-edif' ? '#C11F25' : '#304F19']), { max: 100000, fmt: v => fmtN(v) })}<p class="small muted">Suma: 100.000 m² (área de planeamiento).</p></div></div>
      </div>
      <div class="sec"><h2>Componentes por tipo</h2><span class="note">Área documentada de cada componente</span></div>
      <div class="grid g4">${[['deportivo', 'Edificaciones y escenarios deportivos'], ['servicio', 'Servicios complementarios'], ['administracion', 'Administración y operación'], ['urbanismo', 'Urbanismo y redes']].map(([c, t]) => { const it = VO.escenarios.filter(e => e.categoria === c); return `<div class="card click" data-cat="${c}"><div class="kicker">${t}</div><div class="kpi"><div class="v">${it.length}</div></div><ul style="margin:0;padding-left:16px;font-size:13px">${it.map(e => `<li>${esc(e.nombre)}: <span class="muted">${esc(e.area.split('(')[0])}</span></li>`).join('')}</ul></div>`; }).join('')}</div>
      <div class="grid g2" style="margin-top:16px">
        <div class="card"><div class="kicker">Localización</div><p>${esc(VO.meta.ubicacion)} · Carrera 7 # 53 Sur-2 a 53 Sur-44. Acceso principal propuesto por la Carrera 9A.</p>
          <dl class="dl"><dt>Centroide</dt><dd>${A.coordenadas.centroide} (WGS 84)</dd><dt>Vértices</dt><dd>${A.coordenadas.vertices} · precisión ${A.coordenadas.precision}</dd><dt>Perímetro</dt><dd>${A.coordenadas.perimetro} m</dd></dl>
          <p class="small muted">Coordenadas aproximadas para la MGA; no reemplazan el levantamiento topográfico.</p>${src('DT')}</div>
        <div class="card" style="padding:0;overflow:hidden"><img src="img/proyecto/terreno_coordenadas.jpg" alt="Terreno sobre la cuadrícula" style="cursor:zoom-in" data-lbg="g-coord"><div style="padding:12px 18px" class="small muted">Terreno sobre la cuadrícula de coordenadas (numeral 11.2). Clic para ampliar.</div></div>
      </div>`;
  }
  function infraBind(v) { $$('[data-cat]', v).forEach(c => c.onclick = () => { ESC_ST.cat = c.dataset.cat; go('escenarios'); }); UI.animateBars(v); }

  /* ========== 6 BENEFICIARIOS ========== */
  function beneficiarios() {
    const B = VO.beneficiarios, T = B.toe;
    return head('Módulo 6', 'Beneficiarios y valor institucional', 'Se distinguen los beneficiarios identificados, los estimados y los beneficios esperados. No hay resultados medidos: el proyecto no ha iniciado su ejecución.') + `
      <div class="grid g3">
        <div class="card"><div class="kicker">Personal de FEDEM · TOE 2026</div><div class="kpi"><div class="v">${T.total}</div><div class="s">${T.sumaFilas} de las cuatro instituciones + ${T.externas} de ligas de unidades externas</div></div>
          ${bars(T.porInstitucion, { max: 140 })}<p class="small">${badge('contradictorio')} Las filas suman ${T.sumaFilas}; el total impreso dice ${T.totalImpreso}.</p>${src('TOE')}</div>
        <div class="card"><div class="kicker">Situación del personal</div>${donut([['Orgánico', T.organicos, '#0b1140'], ['Comisión deportiva', T.comision, '#7030A0'], ['Orgánico destinado a ligas', 1, '#BF9900'], ['Ligas de unidades externas', T.externas, '#9aa0b8']], 170, T.total)}
          <div class="legend" style="margin-top:10px"><span><i style="background:#0b1140"></i>Orgánico ${T.organicos}</span><span><i style="background:#7030A0"></i>Comisión ${T.comision}</span><span><i style="background:#BF9900"></i>Destinado a ligas 1</span><span><i style="background:#9aa0b8"></i>Externas ${T.externas}</span></div></div>
        <div class="card"><div class="kicker">Resultados medidos</div><div class="empty" style="padding:28px 16px">Sin resultados medidos.<br><span class="small">Los beneficios de este módulo son esperados; podrán medirse cuando el proyecto entre en operación y tenga indicadores (capítulo 14, por elaborar).</span></div></div>
      </div>
      <div class="sec"><h2>Categorías de beneficiarios</h2></div>
      <div class="grid g4">${B.categorias.map(c => `<div class="card"><span class="badge ${c.tipo === 'identificado' ? 'st-confirmado' : 'st-definir'}">${c.tipo === 'identificado' ? 'Identificado' : 'Estimado'}</span><h3 style="margin-top:10px">${esc(c.t)}</h3><p class="small">${esc(c.d)}</p><p style="margin-top:8px;font-weight:700;color:var(--ink)">${esc(c.cifra)}</p>${badge(c.estado)}</div>`).join('')}</div>
      <div class="sec"><h2>Necesidad → componente → beneficio esperado</h2><span class="note">Seleccione un elemento para ver sus relaciones</span></div>
      <div class="card"><div class="flow" id="flow">
        <div class="col"><h4>Causas (necesidad)</h4>${VO.meta.causas.map(c => `<div class="node" data-n="c:${c.id}"><b>${c.id}</b> ${esc(c.t)}</div>`).join('')}</div>
        <div class="col"><h4>Componentes</h4>${[...new Set(B.beneficios.flatMap(b => b.componentes))].map(id => `<div class="node" data-n="e:${id}">${esc(escById(id).nombre)}</div>`).join('')}</div>
        <div class="col"><h4>Beneficios esperados</h4>${B.beneficios.map(b => `<div class="node" data-n="b:${b.id}"><b>${esc(b.t)}</b><div class="small muted">${esc(b.d)}</div></div>`).join('')}</div>
      </div><p class="small muted" style="margin-top:10px">Relaciones construidas a partir del árbol de problemas y la tabla de necesidades del numeral 3. Beneficios proyectados, no logrados.</p></div>`;
  }
  function benefBind(v) {
    const B = VO.beneficiarios.beneficios;
    const rel = key => {
      const [t, id] = key.split(':'); const on = new Set([key]);
      B.forEach(b => {
        const hit = (t === 'b' && b.id === id) || (t === 'c' && b.causa === id) || (t === 'e' && b.componentes.includes(id));
        if (hit) { on.add('b:' + b.id); on.add('c:' + b.causa); b.componentes.forEach(c => on.add('e:' + c)); }
      });
      return on;
    };
    $$('#flow .node', v).forEach(n => n.onclick = () => {
      const was = n.classList.contains('hl'); $$('#flow .node', v).forEach(x => x.classList.remove('hl', 'dim'));
      if (was) return; const on = rel(n.dataset.n); $$('#flow .node', v).forEach(x => x.classList.add(on.has(x.dataset.n) ? 'hl' : 'dim'));
    });
    UI.animateBars(v);
  }

  /* ========== 7 PRESUPUESTO ========== */
  const PR = { tipo: 'todos', est: 'todos' };
  function presupuesto() {
    const P = VO.presupuesto; const cols = { 'Construcción': '#7030A0', 'Interventoría': '#0b1140', 'Estudios y diseños': '#BF9900' };
    const tipos = Object.keys(cols).map(t => [t, P.estructura.filter(e => e.tipo === t).reduce((a, e) => a + e.v, 0), cols[t]]);
    const cd = VO.escenarios.filter(e => e.enPresupuesto).sort((a, b) => b.costoM - a.costoM);
    return head('Módulo 7', 'Presupuesto y dimensión económica', 'Única versión disponible: estimación preliminar de obra civil. No es un presupuesto consolidado ni una asignación aprobada.') + `
      <div class="grid g4">
        <div class="card kpi" style="grid-column:span 2"><div class="l">Estimación preliminar total</div><div class="v" style="font-size:38px;color:var(--purple)">${P.total.texto}</div><div class="s">Diseños, licencias, obra civil, AIU e interventoría · ${badge('preliminar')}</div><div class="s" style="margin-top:6px">Versión ${esc(P.versiones[0].id)} · ${esc(P.versiones[0].nota)}</div></div>
        <div class="card kpi"><div class="l">Recursos aprobados</div><div class="v">Por definir</div><div class="s">No hay asignación documentada</div></div>
        <div class="card kpi"><div class="l">Operación y mantenimiento</div><div class="v">Por definir</div><div class="s">Riesgo R-18 (alto)</div></div></div>
      <div class="grid g2" style="margin-top:16px;align-items:start">
        <div class="card"><div class="kicker">Composición por tipo de costo</div><div class="donut-wrap">${donut(tipos.map(t => [t[0], t[1], t[2], fmtM(t[1])]), 180, '$63.316 M')}<div class="legend" style="flex-direction:column">${tipos.map(t => `<span><i style="background:${t[2]}"></i>${t[0]}: <b>${fmtM(t[1])}</b> (${(100 * t[1] / P.total.valor).toFixed(1).replace('.', ',')} %)</span>`).join('')}</div></div>
          <div class="tbl-wrap" style="margin-top:14px"><table class="tbl"><thead>${th([{ t: 'Concepto' }, { t: 'Millones $' }, { t: 'Estado' }])}</thead><tbody>${P.estructura.map(e => `<tr><td><b style="color:var(--ink)">${esc(e.t)}</b><div class="small muted">${esc(e.nota)}</div></td><td class="num" data-v="${e.v}">${fmtM(e.v)}</td><td data-v="${e.estado}">${badge(e.estado)}</td></tr>`).join('')}<tr class="hl"><td><b>Total</b></td><td class="num" data-v="99999"><b>${fmtM(P.total.valor)}</b></td><td>${badge('preliminar')}</td></tr></tbody></table></div></div>
        <div class="card"><div class="kicker">Costo directo por componente (22 rubros agrupados en 18 componentes)</div>
          <div class="toolbar" style="margin:8px 0;padding:6px 8px"><select id="ptipo"><option value="todos">Todas las categorías</option><option value="deportivo">Deportivo</option><option value="servicio">Servicios</option><option value="administracion">Administración</option><option value="urbanismo">Urbanismo y redes</option></select><select id="pest"><option value="todos">Todos los estados</option><option value="preliminar">Preliminar</option><option value="contradictorio">Contradictorio</option><option value="revision">En revisión</option><option value="confirmado">Confirmado</option></select><span class="count" id="pcount"></span></div>
          <div id="pbars"></div><p class="small muted">Suma del costo directo: ${fmtM(38703.47)} (verificada). Clic en un componente para ver su ficha.</p></div>
      </div>
      <div class="grid g2" style="margin-top:16px">
        <div class="card"><div class="kicker">Por definir · información faltante</div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Componente de costo</th><th>Valor</th><th>Qué falta</th></tr></thead><tbody>${P.sinDefinir.map(s => `<tr><td><b style="color:var(--ink)">${esc(s.t)}</b></td><td>${badge('definir')}</td><td class="small">${esc(s.falta)}</td></tr>`).join('')}</tbody></table></div></div>
        <div class="card"><div class="kicker">Fuentes de financiación identificadas</div><ul class="list">${P.fuentesFinanciacion.map(f => `<li><div style="flex:1"><b style="color:var(--ink)">${esc(f.t)}</b><div class="small muted">${esc(f.v)}</div></div>${badge(f.estado)}</li>`).join('')}</ul>${src('DT')}</div>
      </div>
      <div class="grid g2" style="margin-top:16px">
        <div class="card"><div class="kicker">Referencia de gasto actual</div><h3>${esc(P.referencia.v)}</h3><p class="small">${esc(P.referencia.nota)}</p>${badge(P.referencia.estado)}${src('ENC')}</div>
        <div class="card"><div class="kicker">Supuestos económicos</div><ul style="margin:6px 0 0;padding-left:18px">${P.supuestos.map(s => `<li class="small">${esc(s)}</li>`).join('')}</ul><p class="small muted" style="margin-top:8px">Fecha de actualización de las cifras: 05/10/2026 (sin fecha base de precios). Verificación aritmética: 20/10/2026.</p></div>
      </div>`;
  }
  function presBind(v) {
    $('#ptipo', v).value = PR.tipo; $('#pest', v).value = PR.est;
    const draw = () => {
      const it = VO.escenarios.filter(e => e.enPresupuesto && (PR.tipo === 'todos' || e.categoria === PR.tipo) && (PR.est === 'todos' || e.estado === PR.est)).sort((a, b) => b.costoM - a.costoM);
      $('#pcount', v).textContent = it.length + ' componentes · ' + fmtM(it.reduce((a, e) => a + e.costoM, 0));
      $('#pbars', v).innerHTML = it.length ? bars(it.map(e => [e.nombre, e.costoM, e.estado === 'contradictorio' ? '#C11F25' : '#7030A0']), { max: 12000, fmt: x => fmtM(x).replace(' M', ''), click: true }) : '<div class="empty">Sin componentes con estos filtros.</div>';
      $$('#pbars .row', v).forEach((r, k) => r.onclick = () => fichaEscenario(it[k].id));
      UI.animateBars(v);
    };
    $('#ptipo', v).onchange = e => { PR.tipo = e.target.value; draw(); };
    $('#pest', v).onchange = e => { PR.est = e.target.value; draw(); };
    draw();
  }

  /* ========== 8 FASES ========== */
  let FV = 'linea';
  function fases() {
    return head('Módulo 8', 'Fases, cronograma y seguimiento', 'Ruta de trabajo en seis etapas. No hay fechas, responsables ni porcentajes de avance documentados.',
      `<div class="seg" id="fvista"><button data-v="linea">Línea de tiempo</button><button data-v="tablero">Tablero de estados</button><button data-v="lista">Lista detallada</button></div>`) + `
      <div class="callout warn" style="margin-bottom:18px">${icon('info')}<div><b>Observación para revisión.</b> ${esc(VO.fasesNota)}</div></div><div id="fres"></div>`;
  }
  function fasesBind(v) {
    const F = VO.fases;
    const draw = () => {
      $$('#fvista button', v).forEach(b => b.classList.toggle('on', b.dataset.v === FV));
      let h = '';
      if (FV === 'linea') {
        h = `<div class="card"><div class="tl">${F.map((f, i) => `<div class="ph ${i === 0 ? 'on' : ''} ${f.estado === 'enDesarrollo' ? 'dev' : ''}" data-f="${f.id}" tabindex="0"><div class="nd">${f.n}</div><b>${esc(f.nombre)}</b><div class="small muted">${VO.estadosFase[f.estado]}</div></div>`).join('')}</div>
          <div id="fdet" style="margin-top:22px"></div><div style="display:flex;justify-content:space-between;margin-top:16px"><button class="btn btn-o" id="fprev">‹ Anterior</button><span class="small muted" style="align-self:center">Fechas: por confirmar</span><button class="btn btn-o" id="fnext">Siguiente ›</button></div></div>`;
      } else if (FV === 'tablero') {
        h = `<div class="kan">${Object.entries(VO.estadosFase).filter(([k]) => k !== 'porConfirmar').map(([k, t]) => { const it = F.filter(f => f.estado === k); return `<div class="col"><h4>${t}<span class="pill-n">${it.length}</span></h4>${it.map(f => `<div class="it" data-ff="${f.id}"><b>${f.n}. ${esc(f.nombre)}</b><div class="small muted">${esc(f.proximo)}</div></div>`).join('') || '<div class="small muted" style="padding:6px">Sin etapas</div>'}</div>`; }).join('')}</div>
          <p class="small muted" style="margin-top:10px">Ninguna etapa está completada: no hay soporte documental de cierre.</p>`;
      } else {
        h = `<div class="tbl-wrap"><table class="tbl"><thead>${th([{ t: '#' }, { t: 'Etapa' }, { t: 'Objetivo' }, { t: 'Productos' }, { t: 'Depende de' }, { t: 'Responsable' }, { t: 'Fechas' }, { t: 'Estado' }])}</thead><tbody>${F.map(f => `<tr class="click" data-ff="${f.id}"><td data-v="${f.n}">${f.n}</td><td><b style="color:var(--ink)">${esc(f.nombre)}</b></td><td class="small">${esc(f.objetivo)}</td><td class="small">${f.productos.map(esc).join(', ')}</td><td>${f.dependencias.map(d => d.replace('F', 'Etapa ')).join(', ') || '—'}</td><td class="muted">Por confirmar</td><td class="muted">Por confirmar</td><td>${VO.estadosFase[f.estado]}</td></tr>`).join('')}</tbody></table></div>`;
      }
      $('#fres', v).innerHTML = h;
      if (FV === 'linea') {
        let cur = 0;
        const det = i => { cur = i; const f = F[i]; $$('.tl .ph', v).forEach((p, k) => p.classList.toggle('on', k === i));
          $('#fdet', v).innerHTML = `<div class="grid g3"><div><div class="kicker">Etapa ${f.n} · ${VO.estadosFase[f.estado]}</div><h3 style="font-size:20px">${esc(f.nombre)}</h3><p>${esc(f.objetivo)}</p><p class="small" style="margin-top:8px"><b>Próximo paso:</b> ${esc(f.proximo)}</p></div>
          <div><div class="kicker">Actividades</div><ul style="margin:0;padding-left:18px">${f.actividades.map(a => `<li class="small">${esc(a)}</li>`).join('')}</ul></div>
          <div><div class="kicker">Productos · dependencias · riesgos</div><p class="small">${f.productos.map(esc).join(', ')}</p><p class="small">Depende de: ${f.dependencias.map(d => d.replace('F', 'etapa ')).join(', ') || 'ninguna'}</p><p>${f.riesgos.map(r => `<a class="tag" style="text-decoration:none" href="#/pendientes?q=${r}">${r}</a>`).join('')}</p><p class="small muted">Responsable y fechas: por confirmar.</p></div></div>`; };
        $$('.tl .ph', v).forEach((p, k) => { p.onclick = () => det(k); p.onkeydown = e => { if (e.key === 'Enter') det(k); }; });
        $('#fprev', v).onclick = () => det(Math.max(0, cur - 1)); $('#fnext', v).onclick = () => det(Math.min(F.length - 1, cur + 1));
        det(0);
      }
      $$('[data-ff]', v).forEach(x => x.onclick = () => fichaFase(x.dataset.ff));
      if (FV === 'lista') sortable($('table', v));
    };
    $$('#fvista button', v).forEach(b => b.onclick = () => { FV = b.dataset.v; draw(); });
    draw();
  }

  /* ========== 9 PENDIENTES ========== */
  const PD = { q: '', cat: 'todas', prio: 'todas', origen: 'todos' };
  function pendientes(qs) {
    if (qs.q) PD.q = qs.q;
    const P = VO.pendientes; const cats = [...new Set(P.map(p => p.cat))];
    return head('Módulo 9', 'Pendientes, riesgos e inconsistencias', 'Matriz de control. Los registros detectados en la auditoría se identifican como «Observación para revisión» y no son decisiones institucionales.') + `
      <div class="grid g4" style="margin-bottom:16px">${[['Prioridad alta', P.filter(p => p.prio === 'alta').length, 'alta'], ['Riesgos documentados', P.filter(p => p.cat === 'Riesgo').length, 'Riesgo'], ['Observaciones para revisión', P.filter(p => p.origen === 'auditoria').length, 'auditoria'], ['Estudios y validaciones', P.filter(p => p.cat === 'Estudio requerido' || p.cat === 'Validación institucional').length, 'estudio']].map(k => `<div class="card kpi click" data-k="${k[2]}"><div class="l">${k[0]}</div><div class="v">${k[1]}</div><div class="go"><span></span><span>Filtrar ›</span></div></div>`).join('')}</div>
      <div class="card" style="margin-bottom:16px"><div class="kicker">Registros por categoría y prioridad</div>${bars(cats.map(c => [c, P.filter(p => p.cat === c).length]), { click: true })}</div>
      <div class="toolbar"><input type="search" id="pq" placeholder="Buscar en la matriz…" value="${esc(PD.q)}">
        <select id="pcat"><option value="todas">Todas las categorías</option>${cats.map(c => `<option>${esc(c)}</option>`).join('')}<option value="estudio">Estudios y validaciones</option></select>
        <select id="pprio"><option value="todas">Todas las prioridades</option><option value="alta">Alta</option><option value="media">Media</option><option value="baja">Baja</option></select>
        <select id="por"><option value="todos">Todos los orígenes</option><option value="documento">Del documento técnico</option><option value="auditoria">Observación para revisión</option></select>
        <button class="btn btn-o" id="pclr">Limpiar</button><span class="count" id="pcount"></span></div>
      <div class="tbl-wrap" id="pres"></div>`;
  }
  function pendBind(v) {
    const set = () => { $('#pq', v).value = PD.q; $('#pcat', v).value = PD.cat; $('#pprio', v).value = PD.prio; $('#por', v).value = PD.origen; };
    const W = { alta: 3, media: 2, baja: 1 };
    const draw = () => {
      const q = norm(PD.q);
      const it = VO.pendientes.filter(p => (PD.cat === 'todas' || p.cat === PD.cat || (PD.cat === 'estudio' && (p.cat === 'Estudio requerido' || p.cat === 'Validación institucional'))) && (PD.prio === 'todas' || p.prio === PD.prio) && (PD.origen === 'todos' || p.origen === PD.origen) && (!q || norm(p.id + ' ' + p.desc + ' ' + p.accion + ' ' + p.cat).includes(q)));
      $('#pcount', v).textContent = `${it.length} de ${VO.pendientes.length} registros`;
      $('#pres', v).innerHTML = it.length ? `<table class="tbl"><thead>${th([{ t: 'ID' }, { t: 'Descripción' }, { t: 'Categoría' }, { t: 'Prioridad' }, { t: 'Estado' }, { t: 'Fuente' }, { t: 'Responsable' }, { t: 'Fecha objetivo' }, { t: 'Acción siguiente' }])}</thead><tbody>${it.map(p => `<tr class="click" data-pend="${p.id}"><td><b style="color:var(--ink)">${p.id}</b></td><td class="small" style="min-width:280px">${esc(p.desc)}</td><td>${esc(p.cat)}</td><td data-v="${W[p.prio]}"><span class="prio ${p.prio}" style="display:inline-block;margin-right:6px"></span>${p.prio}</td><td>${p.origen === 'auditoria' ? badge('observacion') : esc(p.estado)}</td><td class="small">${p.fuente ? esc(VO.fuentes[p.fuente].t) : '—'}</td><td class="muted small">Por definir</td><td class="muted small">Por definir</td><td class="small">${esc(p.accion)}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">Sin registros con estos filtros.</div>';
      if (it.length) sortable($('table', v));
      $$('tr[data-pend]', v).forEach(r => r.onclick = () => fichaPendiente(r.dataset.pend));
    };
    set();
    $('#pq', v).oninput = e => { PD.q = e.target.value; draw(); };
    $('#pcat', v).onchange = e => { PD.cat = e.target.value; draw(); };
    $('#pprio', v).onchange = e => { PD.prio = e.target.value; draw(); };
    $('#por', v).onchange = e => { PD.origen = e.target.value; draw(); };
    $('#pclr', v).onclick = () => { Object.assign(PD, { q: '', cat: 'todas', prio: 'todas', origen: 'todos' }); set(); draw(); };
    $$('[data-k]', v).forEach(c => c.onclick = () => { Object.assign(PD, { q: '', cat: 'todas', prio: 'todas', origen: 'todos' }); const k = c.dataset.k; if (k === 'alta') PD.prio = 'alta'; else if (k === 'auditoria') PD.origen = 'auditoria'; else if (k === 'Riesgo') PD.cat = 'Riesgo'; else PD.cat = 'estudio'; set(); draw(); $('#pres', v).scrollIntoView({ behavior: 'smooth' }); });
    const cats = [...new Set(VO.pendientes.map(p => p.cat))];
    $$('.bars .row', v).forEach((r, k) => r.onclick = () => { PD.cat = cats[k]; set(); draw(); });
    UI.animateBars(v); draw();
  }

  /* ========== 10 DOCUMENTOS ========== */
  const DC = { q: '', cat: 'todas' };
  function documentos() {
    return head('Módulo 10', 'Documentos y trazabilidad', 'Biblioteca documental e inventario de fuentes. Solo se enlazan los archivos incluidos en esta carpeta.') + `
      <div class="toolbar"><input type="search" id="dq" placeholder="Buscar documento…"><select id="dcat"><option value="todas">Todas las categorías</option>${VO.categoriasDoc.map(c => `<option>${esc(c)}</option>`).join('')}</select><span class="count" id="dcount"></span></div>
      <div class="tbl-wrap" id="dres"></div>
      <div class="sec"><h2>Tabla de trazabilidad</h2><span class="note">Datos importantes de la plataforma y su fuente</span></div>
      <div class="tbl-wrap"><table class="tbl" id="trz"><thead>${th([{ t: 'Dato' }, { t: 'Fuente' }, { t: 'Ubicación en la fuente' }, { t: 'Estado' }])}</thead><tbody>${VO.trazabilidad.map(r => `<tr><td><b style="color:var(--ink)">${esc(r[0])}</b></td><td>${r[1].split(' / ').map(k => esc(VO.fuentes[k].t) + ' ' + esc(VO.fuentes[k].ref)).join(' · ')}</td><td class="small">${esc(r[2])}</td><td data-v="${r[3]}">${badge(r[3])}</td></tr>`).join('')}</tbody></table></div>
      <div class="sec"><h2>Fuentes</h2></div>
      <div class="grid g3">${Object.entries(VO.fuentes).map(([k, f]) => `<div class="card"><span class="pill-n">${k}</span><h3 style="margin-top:8px;font-size:14.5px">${esc(f.t)}</h3><p class="small muted">${esc(f.ref)} · ${esc(f.v)}</p></div>`).join('')}</div>`;
  }
  function docBind(v) {
    sortable($('#trz', v));
    const draw = () => {
      const q = norm(DC.q);
      const it = VO.documentos.filter(d => (DC.cat === 'todas' || d.cat === DC.cat) && (!q || norm(d.nombre + ' ' + d.descripcion + ' ' + d.cat + ' ' + d.tipo).includes(q)));
      $('#dcount', v).textContent = `${it.length} de ${VO.documentos.length}`;
      $('#dres', v).innerHTML = it.length ? `<table class="tbl"><thead>${th([{ t: 'Documento' }, { t: 'Categoría' }, { t: 'Tipo' }, { t: 'Versión' }, { t: 'Fecha' }, { t: 'Estado' }, { t: 'Módulos', s: false }, { t: 'Acceso', s: false }])}</thead><tbody>${it.map(d => `<tr><td style="min-width:260px"><b style="color:var(--ink)">${esc(d.nombre)}</b><div class="small muted">${esc(d.descripcion)}</div>${d.obs ? `<div class="small" style="color:#7a6200">${esc(d.obs)}</div>` : ''}</td><td>${esc(d.cat)}</td><td>${esc(d.tipo)}</td><td>${esc(d.version)}</td><td>${esc(d.fecha)}</td><td>${esc(d.estado)}</td><td>${d.modulos.map(m => `<a class="tag" style="text-decoration:none" href="#/${m}">${m}</a>`).join('')}</td><td>${d.archivo ? (d.archivo.endsWith('/') ? `<a class="btn btn-o" href="#/galeria">Ver galería</a>` : `<a class="btn btn-o" href="${esc(d.archivo)}" target="_blank" rel="noopener" data-doc>Abrir</a>`) : '<span class="badge st-definir">No incluido</span>'}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">No hay documentos con estos filtros.</div>';
    };
    $('#dq', v).oninput = e => { DC.q = e.target.value; draw(); };
    $('#dcat', v).onchange = e => { DC.cat = e.target.value; draw(); };
    draw();
  }

  return {
    inicio: { html: inicio }, vision: { html: vision, bind: visionBind }, galeria: { html: galeria, bind: galeriaBind },
    escenarios: { html: escenarios, bind: escenariosBind }, ligas: { html: ligas, bind: ligasBind }, infraestructura: { html: infraestructura, bind: infraBind },
    beneficiarios: { html: beneficiarios, bind: benefBind }, presupuesto: { html: presupuesto, bind: presBind }, fases: { html: fases, bind: fasesBind },
    pendientes: { html: pendientes, bind: pendBind }, documentos: { html: documentos, bind: docBind },
    fichaEscenario, fichaPendiente, fichaFase, fichaLiga, criticos
  };
})();
