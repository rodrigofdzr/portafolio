// Módulo de animaciones Aurora Dark: cascada de titulares,
// botones magnéticos y glow en tarjetas. La aurora de fondo es CSS puro.
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;

  /* ===== Cascada de titulares ===== */
  const CASCADE_SEL = 'h1, .section-head h2, .about-body h2, .troyan-head h2, .contact-title, .about-lead';
  const cascadeEls = Array.from(document.querySelectorAll(CASCADE_SEL));

  // Divide el contenido en palabras enmascaradas SIN re-parentar el marcado
  // inline (em/strong conservan su anidación); el stagger se agrupa por línea
  // leyendo offsetTop, así el efecto es "línea por línea".
  function wrapWords(el) {
    if (el.dataset.split === '1') return;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const mask = document.createElement('span');
        mask.className = 'w-mask';
        const w = document.createElement('span');
        w.className = 'w';
        w.textContent = part;
        mask.appendChild(w);
        frag.appendChild(mask);
      });
      node.parentNode.replaceChild(frag, node);
    });
    el.dataset.split = '1';
    staggerByLine(el);
  }

  function staggerByLine(el) {
    let lastTop = null, line = -1;
    el.querySelectorAll('.w').forEach(w => {
      const top = w.parentNode.offsetTop;
      if (top !== lastTop) { line++; lastTop = top; }
      w.style.transitionDelay = (line * 90) + 'ms';
    });
  }

  if (!reduced) {
    cascadeEls.forEach(wrapWords);
    const cio = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('cascade-in'); cio.unobserve(en.target); }
      });
    }, { threshold: 0.3 });
    cascadeEls.forEach(el => cio.observe(el));

    // El toggle de idioma reescribe innerHTML (borra los spans): re-dividir.
    // Los elementos ya revelados conservan .cascade-in, así que las palabras
    // nuevas aparecen directas, sin re-animar.
    document.addEventListener('i18n:applied', () => {
      cascadeEls.forEach(el => { delete el.dataset.split; wrapWords(el); });
    });

    // Al cambiar el ancho cambian las líneas: recalcular solo el stagger.
    let rt = 0;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => cascadeEls.forEach(staggerByLine), 200);
    }, { passive: true });
  }

  /* ===== Botones magnéticos ===== */
  if (fine && !reduced) {
    document.querySelectorAll('.btn').forEach(btn => {
      let raf = 0, last = null;
      btn.addEventListener('pointermove', e => {
        last = e;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = btn.getBoundingClientRect();
          const dx = (last.clientX - r.left - r.width / 2) / (r.width / 2);
          const dy = (last.clientY - r.top - r.height / 2) / (r.height / 2);
          btn.style.transform = 'translate(' + (dx * 8).toFixed(1) + 'px,' + (dy * 8).toFixed(1) + 'px)';
        });
      }, { passive: true });
      btn.addEventListener('pointerleave', () => {
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        btn.style.transform = '';
      });
    });
  }

  /* ===== Glow que sigue al cursor en las celdas ===== */
  if (fine && !reduced) {
    document.querySelectorAll('.cell').forEach(cell => {
      let raf = 0, last = null;
      cell.addEventListener('pointermove', e => {
        last = e;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = cell.getBoundingClientRect();
          cell.style.setProperty('--mx', (last.clientX - r.left) + 'px');
          cell.style.setProperty('--my', (last.clientY - r.top) + 'px');
        });
      }, { passive: true });
    });
  }
})();
