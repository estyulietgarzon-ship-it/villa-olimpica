/* VILLA OLÍMPICA · navegación, búsqueda global y modo presentación ejecutiva */
window.APP = (function () {
  const { esc, norm, $, $$, icon, closeModal } = UI;
  const NAV = [
    ['Proyecto', [['inicio', 'home', 'Inicio'], ['vision', 'eye', 'Visión general'], ['galeria', 'image', 'Vista arquitectónica']]],
    ['Alcance', [['escenarios', 'stadium', 'Escenarios y componentes'], ['ligas', 'users', 'Ligas y disciplinas'], ['infraestructura', 'layers', 'Infraestructura y áreas'], ['beneficiarios', 'heart', 'Beneficiarios y valor']]],
    ['Estructuración', [['presupuesto', 'coin', 'Presupuesto'], ['fases', 'route', 'Fases y seguimiento'], ['pendientes', 'alert', 'Pendientes y riesgos'], ['documentos', 'doc', 'Documentos y trazabilidad']]]
  ];
  const TITLES = Object.fromEntries(NAV.flatMap(g => g[1].map(i => [i[0], i[2]])));

  function shell() {
    document.body.innerHTML = `<div class="shell">
      <aside class="side" id="side"><div class="brand"><img src="img/escudo_cgfm.png" alt="Escudo del Comando General de las Fuerzas Militares"><div><b>VILLA OLÍMPICA</b><span>FEDEM · Centro de proyecto</span></div></div>
      <nav class="nav" aria-label="Módulos">${NAV.map(g => `<div class="grp">${g[0]}</div>${g[1].map(i => `<button data-route="${i[0]}">${icon(i[1])}<span>${i[2]}</span></button>`).join('')}`).join('')}
        <div class="grp">Exposición</div><button data-act="pres">${icon('play')}<span>Modo presentación ejecutiva</span></button><button data-act="search">${icon('search')}<span>Búsqueda global</span></button></nav>
      <div class="side-foot">Clasificación: <b>${esc(VO.meta.clasificacion)}</b><br>Corte de la información: ${esc(VO.meta.corte)}<br>Versión de trabajo local · sin autenticación</div></aside>
      <div class="main"><header class="top"><button class="menu-btn" id="menu" aria-label="Menú">${icon('menu')}</button><div class="crumb">VILLA OLÍMPICA › <b id="crumb"></b></div><div class="grow"></div>
        <button class="search-btn" data-act="search">${icon('search').replace('<svg', '<svg style="width:16px;height:16px"')}<span class="lbl">Buscar escenarios, ligas, cifras…</span><kbd>Ctrl K</kbd></button>
        <button class="btn btn-g" data-act="pres">${icon('play')}<span class="lbl">Presentación</span></button></header>
      <main id="view" class="view" tabindex="-1"></main></div></div>`;
    $('#menu').onclick = () => $('#side').classList.toggle('open');
  }

  function parse() {
    const h = location.hash.replace(/^#\/?/, ''); const [r, q] = h.split('?');
    const qs = Object.fromEntries(new URLSearchParams(q || '')); return { r: MOD[r] && MOD[r].html ? r : 'inicio', qs };
  }
  function render() {
    closeModal(); const { r, qs } = parse(); const m = MOD[r]; const v = $('#view');
    v.innerHTML = m.html(qs); v.classList.remove('view'); void v.offsetWidth; v.classList.add('view');
    if (m.bind) m.bind(v, qs);
    UI.animateBars(v);
    $$('.nav button[data-route]').forEach(b => b.classList.toggle('on', b.dataset.route === r));
    $('#crumb').textContent = TITLES[r]; document.title = 'VILLA OLÍMPICA · ' + TITLES[r];
    $('#side').classList.remove('open'); window.scrollTo(0, 0);
    if (qs.esc) MOD.fichaEscenario(qs.esc); if (qs.pend) MOD.fichaPendiente(qs.pend); if (qs.fase) MOD.fichaFase(qs.fase); if (qs.liga) MOD.fichaLiga(qs.liga);
  }
  function go(r, q) { const nh = '#/' + r + (q ? '?' + new URLSearchParams(q) : ''); if (location.hash === nh) render(); else location.hash = nh; }

  /* delegación global de clics: cualquier elemento con data-go / data-act / data-pend / data-fase / data-lbg funciona en toda la app */
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-route],[data-go],[data-act],[data-pend],[data-fase],[data-lbg]'); if (!t) return;
    if (t.dataset.route) go(t.dataset.route);
    else if (t.dataset.go) go(t.dataset.go);
    else if (t.dataset.act === 'pres') present();
    else if (t.dataset.act === 'search') search();
    else if (t.dataset.pend) MOD.fichaPendiente(t.dataset.pend);
    else if (t.dataset.fase) MOD.fichaFase(t.dataset.fase);
    else if (t.dataset.lbg) UI.lightbox([VO.galeria.find(g => g.id === t.dataset.lbg)], 0);
  });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); search(); }
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Enter' && e.target.matches('.card.click,.mcard')) e.target.click();
  });

  /* ---------- búsqueda global ---------- */
  function index() {
    const I = [];
    VO.escenarios.forEach(x => I.push({ ty: 'Escenario', t: x.nombre, s: x.uso + ' · ' + x.area, k: x.nombre + ' ' + x.uso + ' ' + x.descripcion + ' ' + x.presupuesto, a: () => go('escenarios', { esc: x.id }) }));
    VO.ligas.forEach(x => I.push({ ty: 'Liga', t: x.n, s: 'Grupo ' + x.grupo + ' · ' + x.sedeMapa, k: x.n + ' ' + x.tipo + ' disciplina', a: () => go('ligas', { liga: x.n }) }));
    VO.documentos.forEach(x => I.push({ ty: 'Documento', t: x.nombre, s: x.cat + ' · ' + x.estado, k: x.nombre + ' ' + x.descripcion + ' ' + x.cat, a: () => go('documentos') }));
    VO.indicadores.forEach(x => I.push({ ty: 'Indicador', t: x.label + ': ' + (x.valor === '=criticos' ? MOD.criticos().length : x.valor), s: x.sub, k: x.label + ' ' + x.valor + ' ' + x.sub + ' ' + (x.nota || ''), a: () => go(x.modulo) }));
    VO.fases.forEach(x => I.push({ ty: 'Fase', t: 'Etapa ' + x.n + ': ' + x.nombre, s: x.objetivo, k: x.nombre + ' ' + x.objetivo + ' ' + x.actividades.join(' '), a: () => go('fases', { fase: x.id }) }));
    VO.pendientes.forEach(x => I.push({ ty: x.origen === 'auditoria' ? 'Observación' : x.cat === 'Riesgo' ? 'Riesgo' : 'Pendiente', t: x.id, s: x.desc, k: x.id + ' ' + x.desc + ' ' + x.accion + ' ' + x.cat, a: () => go('pendientes', { pend: x.id }) }));
    VO.trazabilidad.forEach(x => I.push({ ty: 'Cifra', t: x[0], s: VO.fuentes[x[1].split(' / ')[0]].t + ' · ' + x[2], k: x[0] + ' ' + x[2], a: () => go('documentos') }));
    VO.presupuesto.estructura.forEach(x => I.push({ ty: 'Cifra', t: x.t + ': ' + UI.fmtM(x.v), s: x.nota, k: x.t + ' presupuesto costo ' + x.nota, a: () => go('presupuesto') }));
    VO.galeria.forEach((x, i) => I.push({ ty: 'Imagen', t: x.t, s: x.comp + ' · ' + x.tipo, k: x.t + ' ' + x.d + ' ' + x.comp + ' render imagen', a: () => UI.lightbox([x], 0) }));
    I.forEach(x => x.n = norm(x.t + ' ' + x.k));
    return I;
  }
  function search() {
    closeModal(); const IDX = index();
    const ov = document.createElement('div'); ov.className = 'ov'; ov.id = 'modal-ov';
    ov.innerHTML = `<div class="sbox" role="dialog" aria-label="Búsqueda global"><input type="search" placeholder="Buscar escenarios, ligas, disciplinas, documentos, cifras, fases, pendientes…" aria-label="Buscar"><div class="sres"></div><div class="small muted" style="padding:8px 18px 12px">↑ ↓ para moverse · Enter para abrir · Esc para cerrar</div></div>`;
    document.body.appendChild(ov);
    const inp = $('input', ov), res = $('.sres', ov); let hits = [], sel = 0;
    const hl = (t, q) => { if (!q) return esc(t); const i = norm(t).indexOf(q); return i < 0 ? esc(t) : esc(t.slice(0, i)) + '<mark>' + esc(t.slice(i, i + q.length)) + '</mark>' + esc(t.slice(i + q.length)); };
    const draw = () => {
      const q = norm(inp.value.trim()); const ws = q.split(/\s+/).filter(Boolean);
      hits = q ? IDX.filter(x => ws.every(w => x.n.includes(w))).sort((a, b) => (norm(b.t).includes(q) ? 1 : 0) - (norm(a.t).includes(q) ? 1 : 0)).slice(0, 40) : [];
      sel = 0;
      res.innerHTML = !q ? '<div class="empty" style="border:0">Escriba para buscar en toda la plataforma.</div>' : hits.length ? hits.map((h, i) => `<div class="it ${i === 0 ? 'on' : ''}" data-i="${i}"><span class="ty">${h.ty}</span><div class="tx"><b>${hl(h.t, ws[0])}</b><span>${esc(h.s).slice(0, 140)}</span></div></div>`).join('') : `<div class="empty" style="border:0">Sin resultados para «${esc(inp.value)}».</div>`;
      $$('.it', res).forEach(el => el.onclick = () => open(+el.dataset.i));
    };
    const open = i => { const h = hits[i]; if (!h) return; ov.remove(); h.a(); };
    inp.oninput = draw;
    inp.onkeydown = e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, Math.min(hits.length - 1, sel + (e.key === 'ArrowDown' ? 1 : -1))); $$('.it', res).forEach((x, k) => x.classList.toggle('on', k === sel)); const o = $$('.it', res)[sel]; if (o) o.scrollIntoView({ block: 'nearest' }); }
      if (e.key === 'Enter') open(sel);
    };
    ov.onclick = e => { if (e.target === ov) ov.remove(); };
    draw(); inp.focus();
  }

  /* ---------- modo presentación ejecutiva ---------- */
  function present(start = 0) {
    closeModal(); const S = VO.presentacion; let i = start, notes = false;
    const BL = ['', 'Contexto y necesidad', 'Visión de la Villa Olímpica', 'Escenarios y alcance', 'Estado actual y ruta de trabajo', 'Conclusiones y siguientes pasos'];
    const pm = document.createElement('div'); pm.className = 'pm'; pm.id = 'pm';
    pm.innerHTML = `<div class="stage"></div><div class="ctl"><button data-p="-1" aria-label="Anterior">‹</button><span class="n"></span><button data-p="1" aria-label="Siguiente">›</button><button data-p="n">Notas (N)</button><button data-p="f">Pantalla completa (F)</button><button data-p="x">Salir (Esc)</button></div><div class="notes" hidden></div>`;
    document.body.appendChild(pm);
    const st = $('.stage', pm);
    const foot = `<div class="foot"><span>FECHA ${esc(VO.meta.corte)}</span><b>${esc(VO.meta.clasificacion)}</b><span>COGFM · FEDEM</span></div>`;
    const crest = `<img class="crest" src="img/escudo_cgfm.png" alt="">`;
    const k = s => s.bloque ? `<div class="k">Bloque ${s.bloque} · ${BL[s.bloque]}</div>` : '';
    const tagc = t => `<span class="tagc">${t}</span>`;
    const R = {
      portada: s => `<img class="bgimg" src="${s.img}" alt=""><div class="shade"></div><div class="pad dark"><img src="img/escudo_cgfm.png" alt="" style="width:9%;margin-bottom:1.2em"><div class="k">${esc(s.pie)}</div><div class="big">VILLA<br>OLÍMPICA</div><div class="lead" style="color:#fff">${esc(s.sub)}</div></div>${tagc('RENDER CONCEPTUAL · NO ES DISEÑO APROBADO')}${foot}`,
      agenda: s => `${crest}<div class="pad" style="left:8%;right:40%"><div class="k">Recorrido de la exposición</div><h1>${esc(s.titulo)}</h1><ol class="ag">${s.items.map(x => `<li>${esc(x)}</li>`).join('')}</ol></div><img src="img/renders/r09.jpg" alt="" style="position:absolute;right:0;top:0;width:34%;height:94.5%;object-fit:cover">${foot}`,
      cifras: s => `${crest}<div class="pad" ${s.img ? 'style="right:40%"' : ''}>${k(s)}<h1 ${s.img ? 'style="max-width:100%"' : ''}>${esc(s.titulo)}</h1><div class="cf" style="grid-template-columns:repeat(${s.img ? 2 : s.cifras.length},1fr)">${s.cifras.map(c => `<div class="c"><b>${esc(c[0])}</b><span>${esc(c[1])}</span></div>`).join('')}</div>${s.pie ? `<div style="margin-top:1.4em;font-size:1.05em;color:#7a6200;background:#fbf3d6;padding:.8em 1em;border-radius:.5em">${esc(s.pie)}</div>` : ''}</div>${s.img ? `<img src="${s.img}" alt="" style="position:absolute;right:0;top:0;width:36%;height:94.5%;object-fit:cover"><span class="tagc" style="${s.imgTag ? '' : 'background:#304F19'}">${s.imgTag || 'HOY · EL TERRENO'}</span>` : ''}${foot}`,
      imagen: s => s.contain ? `${crest}<div class="pad" style="right:52%">${k(s)}<h1 style="max-width:100%">${esc(s.titulo)}</h1><p style="font-size:1.4em;color:var(--purple);font-weight:800">${esc(s.texto)}</p><p style="font-size:1em;color:var(--muted)">${esc(s.etiqueta)}</p></div><img src="${s.img}" alt="" style="position:absolute;right:3%;top:12%;width:48%;border-radius:.6em;box-shadow:0 1em 2em rgba(0,0,0,.25)">${tagc('PLANTEAMIENTO PRELIMINAR')}${foot}`
        : `<img class="bgimg" src="${s.img}" alt=""><div class="shade"></div><div class="pad dark">${k(s)}<h1 style="max-width:50%">${esc(s.titulo)}</h1><div class="lead" style="color:#fff">${esc(s.texto)}</div><p style="margin-top:2em;font-weight:700;color:#e2bd3a;font-size:1.05em">${esc(s.etiqueta)}</p></div>${tagc('RENDER CONCEPTUAL')}${foot}`,
      galeria: s => `${crest}<div class="pad" style="top:6%">${k(s)}<h1 style="margin-bottom:.5em">${esc(s.titulo)}</h1><div class="mos">${s.imgs.map(m => `<figure><img src="${m[0]}" alt=""><figcaption>${esc(m[1])}</figcaption></figure>`).join('')}</div></div>${tagc('RENDERS CONCEPTUALES')}${foot}`,
      estado: s => `${crest}<div class="pad">${k(s)}<h1>${esc(s.titulo)}</h1><div class="cols4">${s.cols.map((c, j) => `<div class="c" style="${['background:#e6f1e1', 'background:#e3e8fb', 'background:#fbf3d6', 'background:#fbe2e3'][j]}"><b style="color:${['#2d5a16', '#26318a', '#7a6200', '#a1161c'][j]}">${esc(c[0])}</b><span style="font-size:1.05em">${esc(c[1])}</span></div>`).join('')}</div><div class="alert">${esc(s.alerta)}</div></div>${foot}`,
      ruta: s => `${crest}<div class="pad">${k(s)}<h1>${esc(s.titulo)}</h1><div class="chev">${s.pasos.map((p, j) => `<div>${j + 1}. ${esc(p)}</div>`).join('')}</div><p style="margin-top:2em;font-size:1.15em"><b style="color:var(--purple)">Etapa actual:</b> perfil de formulación, antes de la etapa 1. <b>${esc(s.pie)}</b></p></div><img src="img/proyecto/predio_aereo.jpg" alt="" style="position:absolute;left:6%;right:6%;bottom:9%;width:88%;height:34%;object-fit:cover;border-radius:.6em"><span class="tagc" style="background:#304F19;bottom:10.5%;right:7%">HOY · EL TERRENO DEL CANTÓN SUR</span>${foot}`,
      ideas: s => `${crest}<div class="pad" style="right:40%">${k(s)}<h1>${esc(s.titulo)}</h1>${s.ideas.map((d, j) => `<div style="display:flex;gap:1em;align-items:flex-start;background:var(--purple-soft);border-radius:.6em;padding:1em 1.2em;margin-bottom:.8em"><span style="flex:none;width:2em;height:2em;border-radius:50%;background:var(--purple);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800">${j + 1}</span><div><b style="font-size:1.3em;color:var(--purple)">${esc(d[0])}</b><div style="font-size:1.05em">${esc(d[1])}</div></div></div>`).join('')}</div><img src="${s.img}" alt="" style="position:absolute;right:0;top:0;width:36%;height:94.5%;object-fit:cover">${tagc('RENDER CONCEPTUAL')}${foot}`,
      cierre: s => `<img class="bgimg" src="${s.img}" alt=""><div class="shade"></div><div class="pad dark" style="right:42%">${k(s)}<h1 style="max-width:100%">${esc(s.titulo)}</h1><div style="color:#e2bd3a;font-weight:800;font-size:1.1em;margin-bottom:.8em">Orientación que se solicita al señor General</div>${s.pide.map((p, j) => `<div style="display:flex;gap:.9em;margin-bottom:.9em"><span style="flex:none;width:1.9em;height:1.9em;border-radius:50%;background:#BF9900;color:#111;display:flex;align-items:center;justify-content:center;font-weight:800">${j + 1}</span><div><b style="font-size:1.2em">${esc(p[0])}</b><div style="color:#e6e7f5">${esc(p[1])}</div></div></div>`).join('')}<p style="color:#d9c3ec;font-style:italic">${esc(s.pie)}</p></div>${tagc('IMPLANTACIÓN CONCEPTUAL')}${foot}`
    };
    const show = () => {
      const s = S[i]; st.innerHTML = `<div class="sl">${R[s.tipo](s)}</div>`;
      $('.n', pm).textContent = `${i + 1} / ${S.length}`;
      const n = $('.notes', pm); n.hidden = !notes; n.innerHTML = `<b>Notas para la expositora · ${i + 1}/${S.length}</b><br>${esc(s.notas || 'Sin notas.')}`;
    };
    const nav = d => { i = Math.max(0, Math.min(S.length - 1, i + d)); show(); };
    const close = () => { pm.remove(); document.removeEventListener('keydown', key, true); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); };
    const fs = () => { if (!document.fullscreenElement) pm.requestFullscreen && pm.requestFullscreen().catch(() => {}); else document.exitFullscreen(); };
    function key(e) {
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); nav(1); }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); nav(-1); }
      else if (e.key === 'Escape') { e.stopPropagation(); close(); }
      else if (e.key.toLowerCase() === 'n') { notes = !notes; show(); }
      else if (e.key.toLowerCase() === 'f') fs();
      else if (e.key === 'Home') { i = 0; show(); } else if (e.key === 'End') { i = S.length - 1; show(); }
    }
    document.addEventListener('keydown', key, true);
    $$('[data-p]', pm).forEach(b => b.onclick = () => { const p = b.dataset.p; if (p === 'x') close(); else if (p === 'n') { notes = !notes; show(); } else if (p === 'f') fs(); else nav(+p); });
    st.onclick = e => { const r = st.getBoundingClientRect(); nav(e.clientX - r.left > r.width / 3 ? 1 : -1); };
    show();
  }

  function init() {
    if (!window.VO || !VO.meta) { document.body.innerHTML = '<div class="empty" style="margin:40px">No fue posible cargar los datos (carpeta data/). Verifique que la carpeta esté completa.</div>'; return; }
    shell(); window.addEventListener('hashchange', render); render();
  }
  return { init, go, present, search };
})();
document.addEventListener('DOMContentLoaded', APP.init);
