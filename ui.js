/* VILLA OLÍMPICA · componentes de interfaz reutilizables (sin datos del proyecto) */
window.UI = (function () {
  const ESTADOS = {
    confirmado: 'Confirmado', preliminar: 'Preliminar', revision: 'En revisión', pendiente: 'Pendiente de validación',
    contradictorio: 'Contradictorio entre fuentes', definir: 'Por definir', observacion: 'Observación para revisión'
  };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const badge = e => `<span class="badge st-${e}">${ESTADOS[e] || e}</span>`;
  const fuente = k => { const f = VO.fuentes[k]; return f ? `${esc(f.t)} ${esc(f.ref)} · ${esc(f.v)}` : 'Sin fuente documental'; };
  const fmtM = v => v == null ? 'Por definir' : '$' + v.toLocaleString('es-CO', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' M';
  const fmtN = v => v.toLocaleString('es-CO', { maximumFractionDigits: 2 });

  const I = { // iconografía coherente (trazo 1.8)
    home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
    eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    image: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9.5a1.5 1.5 0 1 0 0-.01',
    stadium: 'M3 12c0-3.3 4-6 9-6s9 2.7 9 6-4 6-9 6-9-2.7-9-6zm5 0c0-1.1 1.8-2 4-2s4 .9 4 2-1.8 2-4 2-4-.9-4-2z',
    users: 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM21 19v-1a4 4 0 0 0-3-3.9M16 4.1a3.5 3.5 0 0 1 0 6.8',
    layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
    heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
    coin: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4v10M9 9.5c0-1 1.3-1.8 3-1.8s3 .8 3 1.8-1.3 1.6-3 1.8-3 .8-3 1.9 1.3 1.8 3 1.8 3-.8 3-1.8',
    route: 'M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7 17h7a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h7',
    alert: 'M12 3l10 17H2L12 3zm0 6v5m0 3v.01',
    doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
    play: 'M8 5v14l11-7z',
    search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm9 3l-4.3-4.3',
    menu: 'M4 7h16M4 12h16M4 17h16',
    arrow: 'M5 12h14m-5-5l5 5-5 5',
    info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 8v5m0-8v.01',
    map: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zm0 0v14m6-12v14',
    zoomin: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm9 3l-4.3-4.3M8 11h6m-3-3v6'
  };
  const icon = (n, c = '') => `<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${I[n] || I.info}"/></svg>`;

  /* ---------- modal ---------- */
  function modal(html, opts = {}) {
    closeModal();
    const ov = document.createElement('div');
    ov.className = 'ov'; ov.id = 'modal-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    ov.innerHTML = `<div class="modal" style="${opts.w ? 'max-width:' + opts.w + 'px' : ''}"><button class="x" aria-label="Cerrar">×</button>${html}</div>`;
    ov.addEventListener('click', e => { if (e.target === ov || e.target.classList.contains('x')) closeModal(); });
    document.body.appendChild(ov);
    $('.x', ov).focus();
    return ov;
  }
  function closeModal() { const o = $('#modal-ov'); if (o) o.remove(); }

  /* ---------- lightbox con zoom y navegación ---------- */
  function lightbox(items, start = 0) {
    let i = start, z = 1, tx = 0, ty = 0;
    const ov = document.createElement('div');
    ov.className = 'lb-ov'; ov.id = 'lb-ov';
    ov.innerHTML = `<button class="lb-x" aria-label="Cerrar">×</button>
      <div class="lb-stage"><img alt=""><button class="lb-nav lb-prev" aria-label="Anterior">‹</button><button class="lb-nav lb-next" aria-label="Siguiente">›</button></div>
      <div class="lb-bar"><div><h3></h3><div class="small lbd"></div></div><div class="zm"><button data-z="-">−</button><button data-z="0">100 %</button><button data-z="+">+</button><span class="small cnt" style="align-self:center;margin-left:8px"></span></div></div>`;
    document.body.appendChild(ov);
    const img = $('img', ov);
    const apply = () => { img.style.transform = `translate(${tx}px,${ty}px) scale(${z})`; img.classList.toggle('z', z > 1); };
    const show = () => {
      const it = items[i]; z = 1; tx = ty = 0; apply();
      img.src = it.src; img.alt = it.t;
      img.onerror = () => { $('.lbd', ov).innerHTML = '<span style="color:#ff9a9a">No fue posible cargar la imagen (archivo no disponible).</span>'; };
      $('h3', ov).textContent = it.t;
      $('.lbd', ov).innerHTML = `${badgeTipo(it.tipo)} ${it.usar === false ? '<span class="badge st-contradictorio">No usar</span> ' : ''}${esc(it.d || '')}`;
      $('.cnt', ov).textContent = `${i + 1} / ${items.length}`;
      $$('.lb-nav', ov).forEach(b => b.style.display = items.length > 1 ? '' : 'none');
    };
    const nav = d => { i = (i + d + items.length) % items.length; show(); };
    const zoom = d => { z = d === 0 ? 1 : Math.min(5, Math.max(1, z * (d > 0 ? 1.4 : 1 / 1.4))); if (z === 1) tx = ty = 0; apply(); };
    $('.lb-prev', ov).onclick = () => nav(-1); $('.lb-next', ov).onclick = () => nav(1);
    $('.lb-x', ov).onclick = close;
    $$('[data-z]', ov).forEach(b => b.onclick = () => zoom(b.dataset.z === '+' ? 1 : b.dataset.z === '-' ? -1 : 0));
    img.onclick = () => { if (z === 1) zoom(1); };
    img.addEventListener('wheel', e => { e.preventDefault(); zoom(e.deltaY < 0 ? 1 : -1); }, { passive: false });
    let drag = null;
    img.addEventListener('pointerdown', e => { if (z > 1) { drag = [e.clientX - tx, e.clientY - ty]; img.setPointerCapture(e.pointerId); } });
    img.addEventListener('pointermove', e => { if (drag) { tx = e.clientX - drag[0]; ty = e.clientY - drag[1]; apply(); } });
    img.addEventListener('pointerup', () => drag = null);
    function key(e) { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') nav(1); if (e.key === 'ArrowLeft') nav(-1); if (e.key === '+') zoom(1); if (e.key === '-') zoom(-1); }
    function close() { ov.remove(); document.removeEventListener('keydown', key, true); }
    document.addEventListener('keydown', key, true);
    show();
  }
  const TIPOS = { render: ['Render conceptual', 'st-observacion'], plano: ['Plano / esquema', 'st-revision'], propuesta: ['Propuesta', 'st-preliminar'], fotografia: ['Fotografía existente', 'st-confirmado'] };
  const badgeTipo = t => `<span class="badge ${(TIPOS[t] || [])[1] || 'st-definir'}">${(TIPOS[t] || [t])[0]}</span>`;

  /* ---------- gráficos (datos reales; sin librerías externas) ---------- */
  function bars(rows, o = {}) {
    const max = o.max || Math.max(...rows.map(r => r[1] || 0), 1);
    const html = `<div class="bars">${rows.map((r, k) => `<div class="row ${o.click ? 'click' : ''}" data-k="${k}"><div class="lab">${esc(r[0])}</div><div class="tr"><div class="fl" data-w="${(100 * (r[1] || 0) / max).toFixed(1)}" style="background:${r[2] || o.color || 'var(--purple)'}"></div></div><div class="v">${o.fmt ? o.fmt(r[1]) : r[1]}</div></div>`).join('')}</div>`;
    return html;
  }
  function animateBars(root = document) { requestAnimationFrame(() => $$('.fl[data-w]', root).forEach(f => f.style.width = f.dataset.w + '%')); }
  function donut(parts, size = 170, center = '') {
    const tot = parts.reduce((a, p) => a + p[1], 0) || 1; let a0 = -Math.PI / 2; const r = size / 2 - 14, c = size / 2;
    const arcs = parts.map(p => {
      const a1 = a0 + 2 * Math.PI * p[1] / tot; const large = a1 - a0 > Math.PI ? 1 : 0;
      const d = `M ${c + r * Math.cos(a0)} ${c + r * Math.sin(a0)} A ${r} ${r} 0 ${large} 1 ${c + r * Math.cos(a1 - 0.0001)} ${c + r * Math.sin(a1 - 0.0001)}`;
      a0 = a1; return `<path d="${d}" stroke="${p[2]}" stroke-width="22" fill="none"><title>${esc(p[0])}: ${p[3] || p[1]}</title></path>`;
    }).join('');
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img">${arcs}<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-weight="800" font-size="17" fill="#16182b">${center}</text></svg>`;
  }

  /* ---------- tabla ordenable ---------- */
  function sortable(table) {
    $$('th.sort', table).forEach((th, idx) => {
      th.addEventListener('click', () => {
        const col = +th.dataset.col; const dir = th.dataset.dir === 'asc' ? 'desc' : 'asc';
        $$('th.sort', table).forEach(t => { t.dataset.dir = ''; $('.ar', t).textContent = '↕'; });
        th.dataset.dir = dir; $('.ar', th).textContent = dir === 'asc' ? '↑' : '↓';
        const tb = $('tbody', table); const rows = $$('tr', tb);
        rows.sort((a, b) => {
          const x = a.children[col].dataset.v ?? a.children[col].textContent, y = b.children[col].dataset.v ?? b.children[col].textContent;
          const nx = parseFloat(x), ny = parseFloat(y);
          const r = (!isNaN(nx) && !isNaN(ny)) ? nx - ny : norm(x).localeCompare(norm(y));
          return dir === 'asc' ? r : -r;
        });
        rows.forEach(r => tb.appendChild(r));
      });
    });
  }
  const th = (cols) => `<tr>${cols.map((c, i) => c.s === false ? `<th>${c.t}</th>` : `<th class="sort" data-col="${i}">${c.t}<span class="ar">↕</span></th>`).join('')}</tr>`;

  return { ESTADOS, esc, norm, $, $$, badge, fuente, fmtM, fmtN, icon, modal, closeModal, lightbox, badgeTipo, bars, animateBars, donut, sortable, th };
})();
