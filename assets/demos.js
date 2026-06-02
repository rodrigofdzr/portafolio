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
    reservas:   { title: 'Reservas de vuelo',      render: renderReservas },
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
    let step = 1;
    let flight = null, seat = null;
    const FLIGHTS = [
      { id: 'TA-204', from: 'MEX', to: 'CUN', dep: '07:40', arr: '09:55', dur: '2h 15m', price: 1890 },
      { id: 'TA-318', from: 'MEX', to: 'CUN', dep: '13:10', arr: '15:20', dur: '2h 10m', price: 2150 },
      { id: 'TA-452', from: 'MEX', to: 'CUN', dep: '19:25', arr: '21:35', dur: '2h 10m', price: 1740 },
    ];
    const OCC = new Set(['1A','1C','2F','3B','4D','4E','5A','6C','7F','8B','8E','9A','10D']);

    function stepper() {
      const labels = ['Vuelo','Asiento','Confirmación'];
      return `<div class="stepper">${labels.map((l, i) => {
        const n = i + 1, cls = n === step ? 'active' : (n < step ? 'done' : '');
        const bar = i < 2 ? '<span class="bar"></span>' : '';
        return `<div class="st ${cls}"><span class="dot">${n < step ? '✓' : n}</span><span>${l}</span></div>${bar}`;
      }).join('')}</div>`;
    }

    function render() {
      root.innerHTML = stepper() + `<div id="rvBody"></div>`;
      const b = root.querySelector('#rvBody');
      if (step === 1) renderSearch(b);
      else if (step === 2) renderSeats(b);
      else renderConfirm(b);
    }

    function renderSearch(b) {
      b.innerHTML = `
        <div class="d-row" style="margin-bottom:18px;align-items:flex-end">
          <div class="d-field"><label>Origen</label><select class="d-select"><option>Ciudad de México (MEX)</option></select></div>
          <div class="d-field"><label>Destino</label><select class="d-select"><option>Cancún (CUN)</option></select></div>
          <div class="d-field"><label>Fecha</label><input class="d-input" type="date" value="2026-07-15"></div>
        </div>
        <div class="d-sub">3 vuelos disponibles · selecciona uno para continuar</div>
        <div id="rvFlights"></div>`;
      const fl = b.querySelector('#rvFlights');
      FLIGHTS.forEach(f => {
        const card = el('div', 'flight' + (flight && flight.id === f.id ? ' sel' : ''));
        card.innerHTML = `
          <div class="route">
            <div><div class="time">${f.dep}</div><div class="path">${f.from}</div></div>
            <div class="path">${f.dur}<span class="line">✈ ───────</span>${f.id}</div>
            <div><div class="time">${f.arr}</div><div class="path">${f.to}</div></div>
          </div>
          <div class="price">$${f.price.toLocaleString('es-MX')}<small>MXN</small></div>`;
        card.addEventListener('click', () => { flight = f; seat = null; step = 2; render(); });
        fl.appendChild(card);
      });
    }

    function renderSeats(b) {
      b.innerHTML = `
        <div class="d-title">Elige tu asiento · Vuelo ${flight.id}</div>
        <div class="d-sub">${flight.from} → ${flight.to} · ${flight.dep}</div>
        <div class="plane"><div class="plane-cabin" id="cabin"></div>
          <div class="seat-legend">
            <span><i style="background:var(--surface-2);border:1px solid var(--line-strong)"></i>Libre</span>
            <span><i style="background:rgba(255,107,107,.2)"></i>Ocupado</span>
            <span><i style="background:linear-gradient(120deg,var(--accent),var(--accent-2))"></i>Tu asiento</span>
          </div>
        </div>
        <div class="d-row" style="margin-top:20px;justify-content:space-between">
          <button class="d-btn d-btn-ghost" id="rvBack">‹ Cambiar vuelo</button>
          <button class="d-btn" id="rvNext" ${seat ? '' : 'disabled'}>Continuar ${seat ? '· ' + seat : ''} ›</button>
        </div>`;
      const cabin = b.querySelector('#cabin');
      const cols = ['A','B','C','D','E','F'];
      for (let r = 1; r <= 10; r++) {
        const row = el('div', 'seat-row');
        row.appendChild(el('span', 'rn', r));
        cols.forEach((c, i) => {
          if (i === 3) row.appendChild(el('span', 'seat-aisle'));
          const code = r + c;
          const occ = OCC.has(code);
          const s = el('div', 'seat' + (occ ? ' occ' : '') + (seat === code ? ' sel' : ''), c);
          if (!occ) s.addEventListener('click', () => { seat = code; renderSeats(b); });
          row.appendChild(s);
        });
        cabin.appendChild(row);
      }
      b.querySelector('#rvBack').addEventListener('click', () => { step = 1; render(); });
      b.querySelector('#rvNext').addEventListener('click', () => { if (seat) { step = 3; render(); } });
    }

    function renderConfirm(b) {
      const code = 'TA' + Math.floor(1000 + Math.random() * 8999) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
      b.innerHTML = `
        <div class="conf">
          <div class="conf-ico">✓</div>
          <h4>¡Reserva confirmada!</h4>
          <p>Tu lugar está asegurado. Recibirías tu pase de abordar por correo.</p>
          <div class="conf-card">
            <div class="conf-line"><span class="k">Código de reserva</span><span class="v conf-code">${code}</span></div>
            <div class="conf-line"><span class="k">Vuelo</span><span class="v">${flight.id}</span></div>
            <div class="conf-line"><span class="k">Ruta</span><span class="v">${flight.from} → ${flight.to}</span></div>
            <div class="conf-line"><span class="k">Salida</span><span class="v">${flight.dep}</span></div>
            <div class="conf-line"><span class="k">Asiento</span><span class="v">${seat}</span></div>
            <div class="conf-line"><span class="k">Total</span><span class="v">$${flight.price.toLocaleString('es-MX')} MXN</span></div>
          </div>
          <button class="d-btn d-btn-ghost" id="rvReset" style="margin-top:20px">Hacer otra reserva</button>
        </div>`;
      b.querySelector('#rvReset').addEventListener('click', () => { step = 1; flight = null; seat = null; render(); });
    }

    render();
  }

})();
