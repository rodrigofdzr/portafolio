/* =========================================================
   Demos sandbox interactivos — datos 100% ficticios.
   Sin backend, sin auth, sin datos reales de clientes.
   ========================================================= */
(function () {
  'use strict';

  const modal = document.getElementById('demoModal');
  const body  = document.getElementById('demoBody');
  const title = document.getElementById('demoTitle');

  const DEMOS = {
    vacaciones: { title: 'Gestión de vacaciones', render: renderVacaciones },
    tickets:    { title: 'Mesa de tickets',        render: renderTickets },
    reservas:   { title: 'Reserva de salas de reuniones', render: renderReservas },
  };

  // ---- Modal control ----
  function openDemo(key) {
    const d = DEMOS[key];
    if (!d) return;
    title.textContent = d.title;
    body.innerHTML = '';
    d.render(body);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDemo() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    body.innerHTML = '';
  }

  document.querySelectorAll('[data-demo]').forEach(btn =>
    btn.addEventListener('click', () => openDemo(btn.dataset.demo))
  );
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeDemo));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeDemo();
  });

  // ---- Helpers ----
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const fmt = d => `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  const businessDays = (a, b) => {
    let n = 0, cur = new Date(a);
    while (cur <= b) { const w = cur.getDay(); if (w !== 0 && w !== 6) n++; cur.setDate(cur.getDate()+1); }
    return n;
  };

  /* =========================================================
     DEMO 1 — VACACIONES
     ========================================================= */
  function renderVacaciones(root) {
    const TOTAL = 20;
    let used = 5;
    let start = null, end = null;
    let view = new Date(); view.setDate(1);
    const requests = [];

    root.innerHTML = `
      <div class="vac-wrap">
        <div class="vac-left"></div>
        <div class="vac-right">
          <div class="d-title">Nueva solicitud</div>
          <div class="d-sub">Selecciona el rango de fechas en el calendario. Los fines de semana no cuentan.</div>
          <div class="vac-req-info" id="vacInfo"></div>
          <button class="d-btn" id="vacSubmit" style="width:100%" disabled>Solicitar vacaciones</button>
          <div class="vac-list" id="vacList"></div>
        </div>
      </div>`;

    const left = root.querySelector('.vac-left');
    const info = root.querySelector('#vacInfo');
    const submit = root.querySelector('#vacSubmit');
    const list = root.querySelector('#vacList');

    function renderBalance() {
      const av = TOTAL - used;
      const reqDays = (start && end) ? businessDays(start, end) : 0;
      left.querySelector('.vac-balance').innerHTML = `
        <div class="vac-stat"><div class="n av">${av}</div><div class="l">Disponibles</div></div>
        <div class="vac-stat"><div class="n us">${used}</div><div class="l">Usados</div></div>
        <div class="vac-stat"><div class="n rq">${reqDays}</div><div class="l">Solicitando</div></div>`;
    }

    function renderInfo() {
      const av = TOTAL - used;
      if (!start) { info.innerHTML = 'Haz clic en una fecha para iniciar la selección.'; submit.disabled = true; return; }
      if (!end)   { info.innerHTML = `Inicio: <b>${fmt(start)}</b> · elige la fecha de regreso.`; submit.disabled = true; return; }
      const days = businessDays(start, end);
      const ok = days <= av;
      info.innerHTML = `<b>${fmt(start)}</b> → <b>${fmt(end)}</b><br>${days} día(s) hábil(es)` +
        (ok ? '' : ` · <span style="color:#ff6b6b">excede tu saldo (${av})</span>`);
      submit.disabled = !ok;
    }

    function renderCal() {
      const y = view.getFullYear(), m = view.getMonth();
      const first = new Date(y, m, 1);
      const startDow = (first.getDay() + 6) % 7; // lunes=0
      const days = new Date(y, m + 1, 0).getDate();
      let cells = '';
      ['L','M','M','J','V','S','D'].forEach(d => cells += `<div class="cal-dow">${d}</div>`);
      for (let i = 0; i < startDow; i++) cells += `<div class="cal-day muted"></div>`;
      for (let d = 1; d <= days; d++) {
        const date = new Date(y, m, d);
        const w = date.getDay(), we = (w === 0 || w === 6);
        let cls = 'cal-day';
        if (we) cls += ' we';
        if (start && end && date >= start && date <= end) cls += ' in-range';
        if ((start && +date === +start) || (end && +date === +end)) cls += ' edge';
        cells += `<div class="${cls}" data-d="${d}">${d}</div>`;
      }
      left.querySelector('.cal').innerHTML = `
        <div class="cal-head">
          <button class="cal-nav" data-nav="-1">‹</button>
          <span class="m">${MESES[m]} ${y}</span>
          <button class="cal-nav" data-nav="1">›</button>
        </div>
        <div class="cal-grid">${cells}</div>
        <div class="cal-legend">
          <span><i style="background:linear-gradient(120deg,var(--accent),var(--accent-2))"></i>Selección</span>
          <span><i style="background:rgba(91,140,255,.2)"></i>Rango</span>
          <span><i style="background:var(--surface-2)"></i>Fin de semana (no cuenta)</span>
        </div>`;
    }

    left.innerHTML = `<div class="vac-balance"></div><div class="cal"></div>`;
    renderBalance(); renderCal(); renderInfo();

    left.addEventListener('click', e => {
      const nav = e.target.closest('.cal-nav');
      if (nav) { view.setMonth(view.getMonth() + Number(nav.dataset.nav)); renderCal(); return; }
      const cell = e.target.closest('.cal-day[data-d]');
      if (!cell || cell.classList.contains('we')) return;
      const date = new Date(view.getFullYear(), view.getMonth(), Number(cell.dataset.d));
      if (!start || (start && end)) { start = date; end = null; }
      else if (date < start) { start = date; }
      else { end = date; }
      renderCal(); renderInfo(); renderBalance();
    });

    function renderList() {
      list.innerHTML = requests.map(r => `
        <div class="vac-item">
          <div><div class="rng">${fmt(r.a)} → ${fmt(r.b)}</div><div class="dd">${r.d} día(s)</div></div>
          <span class="tag ${r.status === 'Pendiente' ? 'pend' : 'appr'}">${r.status}</span>
        </div>`).join('');
    }

    submit.addEventListener('click', () => {
      if (!start || !end) return;
      const req = { a: start, b: end, d: businessDays(start, end), status: 'Pendiente' };
      requests.unshift(req);
      renderList();
      start = end = null;
      renderCal(); renderInfo(); renderBalance();
      setTimeout(() => {
        req.status = 'Aprobado';
        used += req.d;
        renderList(); renderBalance();
      }, 1400);
    });
  }

  /* =========================================================
     DEMO 2 — TICKETS (Kanban con drag & drop)
     ========================================================= */
  function renderTickets(root) {
    const COLS = [
      { id: 'abierto',  t: 'Abierto' },
      { id: 'progreso', t: 'En progreso' },
      { id: 'resuelto', t: 'Resuelto' },
    ];
    let seq = 1048;
    const tickets = [
      { id: 'TK-1042', ti: 'Error al exportar reporte mensual', prio: 'alta',  who: 'JM', col: 'abierto' },
      { id: 'TK-1043', ti: 'Solicitud de acceso a módulo de nómina', prio: 'media', who: 'AL', col: 'abierto' },
      { id: 'TK-1039', ti: 'Lentitud en panel de reservas', prio: 'alta',  who: 'RF', col: 'progreso' },
      { id: 'TK-1037', ti: 'Actualizar firma de correo corporativo', prio: 'baja', who: 'SC', col: 'progreso' },
      { id: 'TK-1031', ti: 'Restablecer contraseña de usuario', prio: 'baja', who: 'JM', col: 'resuelto' },
    ];

    root.innerHTML = `
      <div class="kb-top">
        <div>
          <div class="d-title">Tablero de soporte</div>
          <div class="d-sub" style="margin:0">Arrastra las tarjetas entre columnas para cambiar su estado.</div>
        </div>
        <button class="d-btn" id="kbNew">+ Nuevo ticket</button>
      </div>
      <div id="kbForm"></div>
      <div class="kb-board"></div>
      <div class="kb-hint">💡 Tip: arrastra una tarjeta de "Abierto" a "Resuelto".</div>`;

    const boardEl = root.querySelector('.kb-board');

    function render() {
      boardEl.innerHTML = '';
      COLS.forEach(c => {
        const items = tickets.filter(t => t.col === c.id);
        const col = el('div', 'kb-col');
        col.dataset.col = c.id;
        col.innerHTML = `<div class="kb-col-head"><span class="t">${c.t}</span><span class="kb-count">${items.length}</span></div>`;
        items.forEach(t => {
          const card = el('div', 'kb-card');
          card.draggable = true;
          card.dataset.id = t.id;
          card.innerHTML = `
            <div class="id">${t.id}</div>
            <div class="ti">${t.ti}</div>
            <div class="kb-card-foot">
              <span class="kb-prio ${t.prio}">${t.prio.toUpperCase()}</span>
              <span class="kb-who">${t.who}</span>
            </div>`;
          card.addEventListener('dragstart', () => { card.classList.add('dragging'); window.__drag = t.id; });
          card.addEventListener('dragend', () => card.classList.remove('dragging'));
          col.appendChild(card);
        });
        col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('drag-over'); });
        col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
        col.addEventListener('drop', e => {
          e.preventDefault(); col.classList.remove('drag-over');
          const t = tickets.find(x => x.id === window.__drag);
          if (t) { t.col = c.id; render(); }
        });
        boardEl.appendChild(col);
      });
    }
    render();

    // Nuevo ticket
    const formSlot = root.querySelector('#kbForm');
    root.querySelector('#kbNew').addEventListener('click', () => {
      if (formSlot.innerHTML) { formSlot.innerHTML = ''; return; }
      formSlot.innerHTML = `
        <div class="d-row" style="margin-bottom:16px;align-items:flex-end">
          <div class="d-field" style="flex:2"><label>Título del ticket</label>
            <input class="d-input" id="ntTitle" placeholder="Describe el problema…"></div>
          <div class="d-field"><label>Prioridad</label>
            <select class="d-select" id="ntPrio"><option value="baja">Baja</option><option value="media" selected>Media</option><option value="alta">Alta</option></select></div>
          <button class="d-btn" id="ntAdd">Crear</button>
        </div>`;
      const ti = formSlot.querySelector('#ntTitle');
      ti.focus();
      formSlot.querySelector('#ntAdd').addEventListener('click', () => {
        const val = ti.value.trim();
        if (!val) { ti.focus(); return; }
        seq++;
        tickets.unshift({ id: 'TK-' + seq, ti: val, prio: formSlot.querySelector('#ntPrio').value, who: 'RF', col: 'abierto' });
        formSlot.innerHTML = '';
        render();
      });
    });
  }

  /* =========================================================
     DEMO 3 — RESERVAS DE VUELO
     ========================================================= */
  function renderReservas(root) {
    const ROOMS = [
      { id: 'norte',     name: 'Sala Norte',     cap: 8,  ico: '🪟' },
      { id: 'sur',       name: 'Sala Sur',       cap: 4,  ico: '🛋️' },
      { id: 'ejecutiva', name: 'Sala Ejecutiva', cap: 12, ico: '👔' },
      { id: 'creativa',  name: 'Sala Creativa',  cap: 6,  ico: '🎨' },
    ];
    const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    const OCC = {
      norte:     new Set([9, 10, 14]),
      sur:       new Set([11, 12, 16]),
      ejecutiva: new Set([8, 13, 15]),
      creativa:  new Set([10, 11, 12]),
    };
    let room = ROOMS[0].id, date = '2026-07-15', selStart = null, selEnd = null;
    const bookings = [];
    const lbl = h => String(h).padStart(2, '0') + ':00';
    const occSet = () => OCC[room];

    function render() {
      root.innerHTML = `
        <div class="rb-wrap">
          <div class="rb-left">
            <div class="d-field" style="margin-bottom:16px"><label>Fecha</label>
              <input class="d-input" type="date" id="rbDate" value="${date}"></div>
            <div class="d-sub" style="margin-bottom:10px">Elige una sala</div>
            <div class="rb-rooms" id="rbRooms"></div>
          </div>
          <div class="rb-right">
            <div class="d-title" id="rbTitle"></div>
            <div class="d-sub">Toca la hora de inicio y la de fin. Las ocupadas están en rojo.</div>
            <div class="rb-slots" id="rbSlots"></div>
            <div class="rb-info" id="rbInfo"></div>
            <button class="d-btn" id="rbBook" style="width:100%" disabled>Reservar sala</button>
            <div class="rb-list" id="rbList"></div>
          </div>
        </div>`;
      renderRooms(); renderTitle(); renderSlots(); renderInfo(); renderList();
      root.querySelector('#rbDate').addEventListener('change', e => {
        date = e.target.value; selStart = selEnd = null; renderSlots(); renderInfo();
      });
      root.querySelector('#rbBook').addEventListener('click', book);
    }

    function renderRooms() {
      const wrap = root.querySelector('#rbRooms');
      wrap.innerHTML = '';
      ROOMS.forEach(r => {
        const c = el('div', 'rb-room' + (r.id === room ? ' sel' : ''));
        c.innerHTML = `<span class="rb-room-ico">${r.ico}</span><div><b>${r.name}</b><span>Capacidad ${r.cap} personas</span></div>`;
        c.addEventListener('click', () => {
          room = r.id; selStart = selEnd = null;
          renderRooms(); renderTitle(); renderSlots(); renderInfo();
        });
        wrap.appendChild(c);
      });
    }

    function renderTitle() {
      const r = ROOMS.find(x => x.id === room);
      root.querySelector('#rbTitle').textContent = `${r.name} · disponibilidad del día`;
    }

    function renderSlots() {
      const wrap = root.querySelector('#rbSlots');
      wrap.innerHTML = '';
      HOURS.forEach(h => {
        const occ = occSet().has(h);
        const inRange = selStart != null && selEnd != null && h >= selStart && h <= selEnd;
        const isEdge = h === selStart || h === selEnd;
        const cls = 'rb-slot' + (occ ? ' occ' : '') + (inRange ? ' in' : '') + (isEdge ? ' edge' : '');
        const s = el('div', cls, lbl(h));
        if (!occ) s.addEventListener('click', () => pick(h));
        wrap.appendChild(s);
      });
    }

    function pick(h) {
      if (selStart == null || selEnd != null) { selStart = h; selEnd = null; }
      else if (h < selStart) { selStart = h; }
      else {
        let ok = true;
        for (let x = selStart; x <= h; x++) if (occSet().has(x)) ok = false;
        if (ok) selEnd = h; else { selStart = h; selEnd = null; }
      }
      renderSlots(); renderInfo();
    }

    function renderInfo() {
      const info = root.querySelector('#rbInfo');
      const btn = root.querySelector('#rbBook');
      if (selStart == null) { info.innerHTML = 'Selecciona la hora de inicio.'; btn.disabled = true; return; }
      if (selEnd == null) { info.innerHTML = `Inicio: <b>${lbl(selStart)}</b> · elige la hora de fin.`; btn.disabled = true; return; }
      const hrs = (selEnd - selStart) + 1;
      info.innerHTML = `<b>${lbl(selStart)}</b> → <b>${lbl(selEnd + 1)}</b> · ${hrs} h reservada(s)`;
      btn.disabled = false;
    }

    function book() {
      if (selStart == null || selEnd == null) return;
      const r = ROOMS.find(x => x.id === room);
      const from = lbl(selStart), to = lbl(selEnd + 1);
      for (let x = selStart; x <= selEnd; x++) occSet().add(x);
      bookings.unshift({ room: r.name, date, from, to });
      selStart = selEnd = null;
      renderSlots(); renderInfo(); renderList();
    }

    function renderList() {
      const list = root.querySelector('#rbList');
      if (!bookings.length) { list.innerHTML = ''; return; }
      list.innerHTML = '<div class="rb-list-h">Reservas confirmadas</div>' + bookings.map(b => `
        <div class="rb-item">
          <div><div class="rng">${b.room}</div><div class="dd">${b.date} · ${b.from}–${b.to}</div></div>
          <span class="tag appr">Confirmada</span>
        </div>`).join('');
    }

    render();
  }

})();
