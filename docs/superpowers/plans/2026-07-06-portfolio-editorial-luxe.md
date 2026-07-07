# Rediseño "Editorial Luxe" — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescribir el portafolio (HTML, CSS, JS y copy) con la identidad "Editorial Luxe" bilingüe ES/EN, según el spec `docs/superpowers/specs/2026-07-03-portfolio-redesign-design.md`.

**Architecture:** Sitio estático de una página sin build (GitHub Pages). `index.html` contiene el contenido en español con atributos `data-i18n`; `assets/i18n.js` cosecha el español del DOM al cargar y alterna con un diccionario EN. Los demos (`assets/demos.js`) NO se tocan; `assets/demos.css` se reescribe visualmente manteniendo todos los nombres de clase e IDs que `demos.js` genera.

**Tech Stack:** HTML5, CSS3 (custom properties, grid), JS vanilla (IntersectionObserver, localStorage). Fuentes Google: Fraunces, Space Grotesk, JetBrains Mono.

## Global Constraints

- Sin build, sin dependencias, sin frameworks. Compatible con GitHub Pages tal cual.
- Idioma por defecto: **español** (`<html lang="es">`). EN solo vía toggle.
- Tokens exactos del spec §3: `--paper:#F4F1EA`, `--paper-soft:#EDE9DF`, `--ink:#141310`, `--ink-soft:#54514A`, `--ink-mute:#6B675C`, `--terracotta:#8A4B26`, `--gold:#C7A469`, `--cream-dark:#B7B2A6`, `--line:rgba(20,19,16,.18)`, `--line-dark:rgba(255,255,255,.14)`.
- **Sin emojis en la UI.** Se permiten los caracteres tipográficos `✱ ▶ ● ↗ · —` (no son emoji).
- Datos factuales intactos: 15+ sistemas, sector aeronáutico, logros Troyan, `rodrigofdzr@icloud.com`, WhatsApp `524424158901`, redes.
- Assets versionados `?v=5`.
- **Contratos de demos.js (NO romper):** IDs `#demoModal`, `#demoTitle`, `#demoBody`; atributos `[data-demo]` (valores `vacaciones`, `reservas`, `tickets`) y `[data-close]`; clase `.modal.open`; clases generadas por JS: `.d-title .d-sub .d-btn .d-row .d-field .d-input .d-select .vac-* .cal-* .kb-* .rb-* .tag .tag.pend .tag.appr`; variables CSS `--accent --accent-2 --surface --surface-2 --bg-soft --line --line-strong --text --muted` (demos.js las usa en estilos inline).
- `demos.js` y `assets/troyan-logo.svg` y `assets/rodrigo.jpg` no se modifican.
- Commits frecuentes, mensajes en español, con `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

**Verificación local en todas las tareas:** servir con `python3 -m http.server 8080` desde la raíz del repo (lanzar una vez en background al inicio, `curl` para checks).

---

### Task 1: `index.html` — estructura y copy en español

**Files:**
- Modify: `index.html` (reescritura completa)

**Interfaces:**
- Produces (consumido por Tasks 2–6): IDs `#nav #navToggle #navLinks #langToggle #year #demoModal #demoTitle #demoBody`; clases `.reveal .fig-num[data-count] .marquee-track .marquee-seq .demo-btn[data-demo] .cell .cell-feature .cell-right .lang-toggle .lang-opt[data-lang] .brand .btn .link-underline .eyebrow .kicker .section .section-dark`; ~115 atributos `data-i18n` cuyas claves debe cubrir el diccionario EN de Task 5.

- [ ] **Step 1: Reemplazar `index.html` completo con este contenido**

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rodrigo Fernández — Software a la medida · Custom Software</title>
<meta name="description" content="Estudio de desarrollo de software a la medida: aplicaciones web, automatización e integración de sistemas, con visión por computadora e IA aplicada. Querétaro, MX.">
<meta name="theme-color" content="#F4F1EA">
<meta property="og:title" content="Rodrigo Fernández — Software a la medida">
<meta property="og:description" content="Convierto procesos manuales en herramientas digitales que tu equipo usa todos los días.">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/styles.css?v=5">
<link rel="stylesheet" href="assets/demos.css?v=5">
</head>
<body>

<!-- Nav -->
<header class="nav" id="nav">
  <div class="container nav-inner">
    <a href="#top" class="brand">Rodrigo Fernández</a>
    <nav class="nav-links" id="navLinks">
      <a href="#servicios" data-i18n="nav.servicios">Servicios</a>
      <a href="#proyectos" data-i18n="nav.proyectos">Proyectos</a>
      <a href="#metodo" data-i18n="nav.metodo">Método</a>
      <a href="#troyan">Troyan</a>
      <button class="lang-toggle" id="langToggle" type="button" aria-pressed="false" aria-label="Switch to English / Cambiar idioma">
        <span class="lang-opt is-active" data-lang="es">ES</span><span class="lang-sep">/</span><span class="lang-opt" data-lang="en">EN</span>
      </button>
      <a href="#contacto" class="btn btn-sm" data-i18n="nav.cta">Hablemos</a>
    </nav>
    <button class="nav-toggle" id="navToggle" aria-label="Menú" data-i18n-aria="a11y.menu" aria-expanded="false"><span></span><span></span></button>
  </div>
</header>

<main id="top">

<!-- Hero -->
<section class="hero">
  <div class="container">
    <p class="kicker reveal" data-i18n="hero.kicker">( Desarrollo de software a la medida — Querétaro, MX )</p>
    <h1 class="reveal" data-i18n="hero.title">Software que trabaja <em>como tu negocio</em> lo necesita.</h1>
    <p class="lead reveal" data-i18n="hero.lead">Convierto procesos manuales en herramientas digitales que tu equipo usa todos los días. Menos errores, cero captura doble, más horas para lo que importa.</p>
    <div class="hero-cta reveal">
      <a href="#contacto" class="btn btn-lg"><span data-i18n="hero.cta1">Iniciar un proyecto</span> <span class="btn-arrow" aria-hidden="true">↗</span></a>
      <a href="#proyectos" class="link-underline" data-i18n="hero.cta2">Ver casos reales</a>
    </div>
    <p class="hero-badge reveal"><span class="dot-live" aria-hidden="true"></span> <span data-i18n="hero.badge">Disponible para nuevos proyectos</span></p>
    <dl class="hero-stats reveal">
      <div class="figure"><dt><span class="fig-num" data-count="15">0</span><span class="fig-plus">+</span></dt><dd data-i18n="hero.stat1">sistemas en producción</dd></div>
      <div class="figure"><dt><span class="fig-num" data-count="8">0</span></dt><dd data-i18n="hero.stat2">sistemas conectados entre sí</dd></div>
      <div class="figure"><dt><span class="fig-num" data-count="100">0</span><span class="fig-plus">%</span></dt><dd data-i18n="hero.stat3">a tu medida</dd></div>
    </dl>
  </div>
</section>

<!-- Cinta marquee -->
<div class="marquee" aria-hidden="true">
  <div class="marquee-track">
    <span class="marquee-seq" data-i18n="marquee">Apps a la medida ✱ Automatización ✱ Integración de sistemas ✱ Visión por computadora ✱ IA aplicada ✱&nbsp;</span>
    <span class="marquee-seq" data-i18n="marquee">Apps a la medida ✱ Automatización ✱ Integración de sistemas ✱ Visión por computadora ✱ IA aplicada ✱&nbsp;</span>
  </div>
</div>

<!-- Sobre mí -->
<section id="sobre-mi" class="section">
  <div class="container">
    <div class="about">
      <figure class="about-media reveal">
        <div class="about-frame">
          <span class="about-mono" aria-hidden="true">RF</span>
          <img src="assets/rodrigo.jpg" alt="Rodrigo Fernández" loading="lazy" onerror="this.remove()">
        </div>
        <figcaption class="fig-caption" data-i18n="about.fig">Fig. 01 — Rodrigo, founder de Troyan Robotics</figcaption>
        <div class="about-socials">
          <a href="https://github.com/rodrigofdzr" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">
            <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/rodrigofdezr/" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.7H9.1V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM6.8 20.4H3.2V9h3.6v11.4ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z"/></svg>
          </a>
          <a href="mailto:rodrigofdzr@icloud.com" aria-label="Correo" title="Correo">
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/></svg>
          </a>
          <a href="https://wa.me/524424158901" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp">
            <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4ZM12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Z"/></svg>
          </a>
          <a href="https://instagram.com/rodrigofdzr" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
          </a>
        </div>
      </figure>
      <div class="about-body">
        <p class="eyebrow reveal" data-i18n="about.eyebrow">( Sobre mí )</p>
        <h2 class="reveal" data-i18n="about.title">Hola, soy <em>Rodrigo</em>.</h2>
        <p class="about-lead reveal" data-i18n="about.lead">Ayudo a las empresas a trabajar mejor con software hecho a la medida de cómo operan.</p>
        <p class="reveal" data-i18n="about.p1">Tomo esos procesos que hoy quitan tiempo —los que viven en hojas de cálculo y WhatsApp— y los convierto en herramientas simples y confiables. En los últimos años puse en marcha más de 15 sistemas para una empresa del sector aeronáutico; su equipo opera con ellos todos los días.</p>
        <p class="reveal" data-i18n="about.p2">También soy founder de <strong>Troyan Robotics</strong>, donde lidero un equipo que compite en robótica autónoma a nivel internacional. Me gusta resolver problemas reales y entregar cosas que funcionan de verdad.</p>
        <ol class="about-points">
          <li class="reveal"><span class="point-num" aria-hidden="true">01</span><div><b data-i18n="about.pt1t">Primero entiendo tu negocio</b><span data-i18n="about.pt1d">Escucho cómo trabajas y luego propongo la solución, no al revés.</span></div></li>
          <li class="reveal"><span class="point-num" aria-hidden="true">02</span><div><b data-i18n="about.pt2t">Un solo responsable de todo</b><span data-i18n="about.pt2d">Diseño, desarrollo y puesta en marcha: me encargo del proyecto completo.</span></div></li>
          <li class="reveal"><span class="point-num" aria-hidden="true">03</span><div><b data-i18n="about.pt3t">No desaparezco al entregar</b><span data-i18n="about.pt3d">Te acompaño con soporte y mejoras conforme tu negocio crece.</span></div></li>
        </ol>
        <a href="#contacto" class="link-underline reveal" data-i18n="about.cta">Trabajemos juntos ↗</a>
      </div>
    </div>
  </div>
</section>

<!-- Servicios -->
<section id="servicios" class="section section-tight">
  <div class="container">
    <header class="section-head reveal">
      <p class="eyebrow" data-i18n="serv.eyebrow">( Servicios )</p>
      <h2 data-i18n="serv.title">Lo que puedo hacer <em>por tu negocio</em>.</h2>
    </header>
    <ol class="service-list">
      <li class="service reveal">
        <span class="service-num" aria-hidden="true">01</span>
        <h3 data-i18n="serv.s1t">Aplicaciones a la medida</h3>
        <p data-i18n="serv.s1d">Sistemas hechos para tu forma de trabajar, no plantillas genéricas. Fáciles de usar y disponibles desde cualquier dispositivo.</p>
      </li>
      <li class="service reveal">
        <span class="service-num" aria-hidden="true">02</span>
        <h3 data-i18n="serv.s2t">Conecto tus herramientas</h3>
        <p data-i18n="serv.s2d">Tu CRM, tu correo, tus plataformas: trabajando juntos y compartiendo información solos, sin captura doble.</p>
      </li>
      <li class="service reveal">
        <span class="service-num" aria-hidden="true">03</span>
        <h3 data-i18n="serv.s3t">Automatizo tus procesos</h3>
        <p data-i18n="serv.s3d">Vacaciones, soporte, inventario, reservas… Tareas manuales y hojas de cálculo se vuelven procesos automáticos que ahorran horas cada semana.</p>
      </li>
      <li class="service reveal">
        <span class="service-num" aria-hidden="true">04</span>
        <h3 data-i18n="serv.s4t">Te acompaño de principio a fin</h3>
        <p data-i18n="serv.s4d">De la idea a tenerlo funcionando, y después con soporte y mejoras. Tú te enfocas en tu negocio; yo, en la tecnología.</p>
      </li>
    </ol>
    <aside class="feature-panel reveal">
      <div class="feature-main">
        <p class="eyebrow eyebrow-gold" data-i18n="serv.f.eyebrow">( Capacidad avanzada )</p>
        <h3 data-i18n="serv.f.title">Visión por computadora <em>e IA</em> para tu operación.</h3>
        <p data-i18n="serv.f.desc">Que una cámara haga por ti el trabajo repetitivo. La misma tecnología que aplico en robótica de competencia en <a href="#troyan">Troyan Robotics</a>, al servicio de tu negocio.</p>
      </div>
      <ul class="feature-list">
        <li><b data-i18n="serv.f.i1t">Lectura automática</b><span data-i18n="serv.f.i1d">Placas, folios y documentos leídos desde imágenes, sin capturar a mano.</span></li>
        <li><b data-i18n="serv.f.i2t">Inspección de calidad</b><span data-i18n="serv.f.i2d">Defectos detectados con una cámara, sin revisar pieza por pieza.</span></li>
        <li><b data-i18n="serv.f.i3t">Conteo y detección</b><span data-i18n="serv.f.i3d">Personas o vehículos contados en automático, con avisos cuando algo pasa.</span></li>
      </ul>
    </aside>
  </div>
</section>

<!-- Proyectos -->
<section id="proyectos" class="section">
  <div class="container">
    <header class="section-head reveal">
      <p class="eyebrow" data-i18n="proj.eyebrow">( Proyectos )</p>
      <h2 data-i18n="proj.title">Casos reales, <em>en producción</em>.</h2>
      <p class="section-sub" data-i18n="proj.sub">Más de 15 sistemas desarrollados para un cliente del sector aeronáutico, en uso diario por su equipo para operar la empresa.</p>
    </header>
    <div class="proj-grid">

      <article class="cell cell-feature reveal">
        <p class="cell-tag" data-i18n="proj.p1tag">RRHH</p>
        <h3 data-i18n="proj.p1t">Gestión de vacaciones</h3>
        <p class="cell-desc" data-i18n="proj.p1d">Solicitud, aprobación por jerarquía y cálculo automático de días de vacaciones y home office. De días de papeleo a minutos.</p>
        <button class="demo-btn" data-demo="vacaciones" type="button"><span aria-hidden="true">▶</span> <span data-i18n="proj.demo">Probar demo</span></button>
      </article>

      <article class="cell reveal">
        <p class="cell-tag" data-i18n="proj.p2tag">Comunicación</p>
        <h3 data-i18n="proj.p2t">Avisos de cambios de vuelo</h3>
        <p class="cell-desc" data-i18n="proj.p2d">Notificación masiva a pasajeros sobre demoras, reprogramaciones o cancelaciones, con registro de todo lo enviado.</p>
      </article>

      <article class="cell reveal">
        <p class="cell-tag" data-i18n="proj.p3tag">Beneficios</p>
        <h3 data-i18n="proj.p3t">Pases de viaje para empleados</h3>
        <p class="cell-desc" data-i18n="proj.p3d">Solicitud, autorización y control de pases y boletos para empleados y sus beneficiarios, sin papel.</p>
      </article>

      <article class="cell cell-feature cell-right reveal">
        <p class="cell-tag" data-i18n="proj.p4tag">Operación</p>
        <h3 data-i18n="proj.p4t">Reserva de salas de reuniones</h3>
        <p class="cell-desc" data-i18n="proj.p4d">Reserva con calendario sincronizado al corporativo: tu equipo aparta salas en segundos y nunca se empalman dos juntas.</p>
        <button class="demo-btn" data-demo="reservas" type="button"><span aria-hidden="true">▶</span> <span data-i18n="proj.demo">Probar demo</span></button>
      </article>

      <article class="cell reveal">
        <p class="cell-tag" data-i18n="proj.p5tag">Inteligencia comercial</p>
        <h3 data-i18n="proj.p5t">Análisis de pasajeros frecuentes</h3>
        <p class="cell-desc" data-i18n="proj.p5d">Reportes y segmentación de pasajeros y empresas según su comportamiento de vuelo y rutas preferidas.</p>
      </article>

      <article class="cell reveal">
        <p class="cell-tag" data-i18n="proj.p6tag">Atención al cliente</p>
        <h3 data-i18n="proj.p6t">Bandeja de correo compartida</h3>
        <p class="cell-desc" data-i18n="proj.p6d">Un solo lugar donde el equipo recibe, asigna y responde los correos de clientes, con notas internas.</p>
      </article>

      <article class="cell cell-feature reveal">
        <p class="cell-tag" data-i18n="proj.p7tag">Soporte TI</p>
        <h3 data-i18n="proj.p7t">Mesa de tickets</h3>
        <p class="cell-desc" data-i18n="proj.p7d">Solicitudes de soporte centralizadas, con accesos automáticos y flujos de aprobación integrados. Nada se pierde.</p>
        <button class="demo-btn" data-demo="tickets" type="button"><span aria-hidden="true">▶</span> <span data-i18n="proj.demo">Probar demo</span></button>
      </article>

      <article class="cell reveal">
        <p class="cell-tag" data-i18n="proj.p8tag">Talento</p>
        <h3 data-i18n="proj.p8t">Gestión de talento (RRHH)</h3>
        <p class="cell-desc" data-i18n="proj.p8d">Expedientes, asistencia, permisos, desempeño y nómina de toda la empresa en un solo sistema.</p>
      </article>

      <article class="cell reveal">
        <p class="cell-tag" data-i18n="proj.p9tag">Activos TI</p>
        <h3 data-i18n="proj.p9t">Control de equipos y accesos</h3>
        <p class="cell-desc" data-i18n="proj.p9d">Qué equipo y qué accesos tiene cada empleado, con auditoría y reportes de alta y baja en segundos.</p>
      </article>

      <article class="cell reveal">
        <p class="cell-tag" data-i18n="proj.p10tag">Integración</p>
        <h3 data-i18n="proj.p10t">Sincronización de cuentas</h3>
        <p class="cell-desc" data-i18n="proj.p10d">Cuentas y datos de empleados al día entre el correo (Zoho) y el CRM (Bitrix24), automáticamente.</p>
      </article>

      <article class="cell reveal">
        <p class="cell-tag" data-i18n="proj.p11tag">Inventario TI</p>
        <h3 data-i18n="proj.p11t">Inventario de equipos de cómputo</h3>
        <p class="cell-desc" data-i18n="proj.p11d">Cada computadora por empleado, área y departamento, con búsqueda al instante e importación de datos.</p>
      </article>

      <article class="cell reveal">
        <p class="cell-tag" data-i18n="proj.p12tag">Conocimiento</p>
        <h3 data-i18n="proj.p12t">Wiki corporativa</h3>
        <p class="cell-desc" data-i18n="proj.p12d">Documentación y procesos de la empresa, editables y fáciles de encontrar para toda la organización.</p>
      </article>

    </div>
    <p class="proj-note reveal" data-i18n="proj.note">+ otros sistemas internos a la medida del cliente: control de accesos, permisos y más.</p>
  </div>
</section>

<!-- Método -->
<section id="metodo" class="section section-tight">
  <div class="container">
    <header class="section-head reveal">
      <p class="eyebrow" data-i18n="met.eyebrow">( Método )</p>
      <h2 data-i18n="met.title">De la idea <em>a producción</em>.</h2>
    </header>
    <ol class="steps">
      <li class="reveal"><span class="step-num" aria-hidden="true">01</span><h3 data-i18n="met.s1t">Conversamos</h3><p data-i18n="met.s1d">Entiendo tu negocio, tus procesos y qué necesitas lograr. Definimos juntos las prioridades.</p></li>
      <li class="reveal"><span class="step-num" aria-hidden="true">02</span><h3 data-i18n="met.s2t">Propuesta y plan</h3><p data-i18n="met.s2d">Una solución clara y un plan de entregas por etapas, sin sorpresas.</p></li>
      <li class="reveal"><span class="step-num" aria-hidden="true">03</span><h3 data-i18n="met.s3t">Lo construimos</h3><p data-i18n="met.s3d">Desarrollo mostrándote avances con frecuencia, para ajustar sobre la marcha.</p></li>
      <li class="reveal"><span class="step-num" aria-hidden="true">04</span><h3 data-i18n="met.s4t">Lanzamiento y soporte</h3><p data-i18n="met.s4d">Tu sistema queda funcionando y te acompaño después con soporte y mejoras.</p></li>
    </ol>
    <p class="trust-strip reveal" data-i18n="met.trust">Seguro · Rápido y confiable · En computadora, tablet y celular · Listo para crecer</p>
  </div>
</section>

<!-- Troyan Robotics -->
<section id="troyan" class="section section-dark">
  <div class="container">
    <header class="troyan-head reveal">
      <img class="troyan-logo" src="assets/troyan-logo.svg" alt="Logo Troyan Robotics" loading="lazy">
      <div>
        <p class="eyebrow eyebrow-gold" data-i18n="troyan.eyebrow">( Proyecto founder )</p>
        <h2>Troyan Robotics</h2>
        <p class="troyan-tagline" data-i18n="troyan.tagline">«Competimos en el mundo — construimos el equipo aquí.»</p>
      </div>
    </header>
    <div class="troyan-grid">
      <div class="troyan-about reveal">
        <p data-i18n="troyan.p1">Soy founder de Troyan Robotics, el equipo de robótica autónoma de la Facultad de Informática de la Universidad Autónoma de Querétaro (Campus Juriquilla). Construimos vehículos y robots autónomos desde cero, con inteligencia artificial, visión por computadora y sistemas embebidos.</p>
        <p data-i18n="troyan.p2">Nuestra visión: ser un referente nacional en tecnologías robóticas autónomas y contribuir al avance científico en México.</p>
        <p data-i18n="troyan.p3">El sitio troyanrobotics.com también es diseño y desarrollo míos, de principio a fin.</p>
        <ul class="troyan-tech">
          <li>IA</li><li data-i18n="troyan.tech1">Visión por computadora</li><li data-i18n="troyan.tech2">Fusión de sensores</li><li>Jetson Nano</li><li>STM32</li><li data-i18n="troyan.tech3">Sistemas embebidos</li><li data-i18n="troyan.tech4">Sensores ToF</li>
        </ul>
        <a class="link-underline link-gold" href="https://troyanrobotics.com" target="_blank" rel="noopener">troyanrobotics.com ↗</a>
      </div>
      <ol class="troyan-feats">
        <li class="reveal"><b data-i18n="troyan.f1t">Único equipo mexicano</b><span data-i18n="troyan.f1d">Clasificados al Bosch Future Mobility Challenge 2026 — entre 75 equipos globales (semifinal, Rumania).</span></li>
        <li class="reveal"><b data-i18n="troyan.f2t">Best United Team</b><span data-i18n="troyan.f2d">FIRA RoboWorld Cup 2025 · Corea del Sur. Además, Audience Award en el BFMC.</span></li>
        <li class="reveal"><b data-i18n="troyan.f3t">1er lugar autónomo</b><span data-i18n="troyan.f3d">Nuestro vehículo logró el primer lugar aplicando IA y visión por computadora en entorno urbano simulado.</span></li>
        <li class="reveal"><b data-i18n="troyan.f4t">Robots construidos por estudiantes</b><span data-i18n="troyan.f4d">Flota de robots autónomos diseñada y construida 100% por la nueva generación de Troyan.</span></li>
      </ol>
    </div>
    <div class="troyan-cta reveal">
      <p data-i18n="troyan.cta">¿Esta tecnología —visión por computadora e IA— trabajando en tu negocio?</p>
      <a class="btn btn-gold" href="#contacto"><span data-i18n="troyan.ctabtn">Hablemos de tu proyecto</span> <span class="btn-arrow" aria-hidden="true">↗</span></a>
    </div>
  </div>
</section>

<!-- Contacto -->
<section id="contacto" class="section section-contact">
  <div class="container">
    <p class="eyebrow reveal" data-i18n="con.eyebrow">( Contacto )</p>
    <h2 class="contact-title reveal" data-i18n="con.title"><em>¿Hablamos?</em></h2>
    <p class="section-sub reveal" data-i18n="con.sub">Cuéntame qué necesitas y te respondo con una propuesta. Sin compromiso.</p>
    <div class="contact-actions reveal">
      <a class="contact-mail" href="mailto:rodrigofdzr@icloud.com?subject=Nuevo%20proyecto%20de%20software">rodrigofdzr@icloud.com</a>
      <a class="btn" href="https://wa.me/524424158901?text=Hola%20Rodrigo,%20me%20interesa%20un%20proyecto" target="_blank" rel="noopener">WhatsApp <span class="btn-arrow" aria-hidden="true">↗</span></a>
    </div>
  </div>
</section>

</main>

<footer class="footer">
  <div class="container footer-inner">
    <span class="footer-brand">Rodrigo Fernández</span>
    <span class="footer-meta"><span data-i18n="footer.meta">Desarrollo de software a medida</span> · © <span id="year">2026</span></span>
    <span class="footer-coords">QRO, MX — 20°35'N 100°23'W</span>
  </div>
</footer>

<!-- Modal de demos -->
<div class="modal" id="demoModal" aria-hidden="true">
  <div class="modal-backdrop" data-close></div>
  <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="demoTitle">
    <header class="modal-head">
      <div class="modal-head-l">
        <span class="modal-badge" data-i18n="modal.badge">● DEMO EN VIVO</span>
        <h3 id="demoTitle">Demo</h3>
      </div>
      <button class="modal-close" data-close aria-label="Cerrar demo" data-i18n-aria="a11y.close">✕</button>
    </header>
    <div class="modal-note" data-i18n="modal.note">Recreación interactiva con datos ficticios — no conectada a ningún sistema real ni a datos de clientes.</div>
    <div class="modal-body" id="demoBody"></div>
  </div>
</div>

<script src="assets/main.js?v=5" defer></script>
<script src="assets/i18n.js?v=5" defer></script>
<script src="assets/demos.js?v=5" defer></script>
</body>
</html>
```

- [ ] **Step 2: Verificar estructura**

```bash
python3 -m http.server 8080 &   # solo la primera vez; queda corriendo
sleep 1
curl -s http://localhost:8080/ -o /dev/null -w "%{http_code}\n"
grep -c 'data-i18n' index.html
grep -c 'data-demo=' index.html
grep -c 'class="cell ' index.html
grep -c 'moreProjects\|projGrid\|proj-extra\|bg-grid\|bg-glow' index.html || true
grep -c '🎯\|🛠️\|🌐\|🔗\|⚡\|🤝\|🔒\|📱\|🔧\|👁️\|🌍\|🏆\|🥇\|🤖\|💡\|✉' index.html || true
```

Expected: `200`; data-i18n ≥ 110; data-demo = 3; cells = 12; los dos últimos greps = 0 (exit 1 de grep es lo esperado).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Rediseño: nueva estructura editorial de index.html (ES + data-i18n)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: `assets/styles.css` — fundación (tokens, base, nav, hero, marquee)

**Files:**
- Modify: `assets/styles.css` (reescritura; esta tarea escribe la primera mitad, la página queda parcialmente estilizada y sin errores)

**Interfaces:**
- Consumes: clases de Task 1.
- Produces: tokens CSS `:root` (§Global Constraints), clases base (`.container .btn .btn-sm .btn-lg .btn-gold .btn-arrow .link-underline .link-gold .eyebrow .eyebrow-gold .section .section-tight .section-dark .section-head .section-sub .reveal .in`) usadas por Task 3.

- [ ] **Step 1: Reemplazar `assets/styles.css` completo con este contenido**

```css
/* ============================================================
   Editorial Luxe — Rodrigo Fernández
   Tokens y fundación
   ============================================================ */
:root{
  --paper:#F4F1EA;
  --paper-soft:#EDE9DF;
  --ink:#141310;
  --ink-soft:#54514A;
  --ink-mute:#6B675C;
  --terracotta:#8A4B26;
  --gold:#C7A469;
  --cream-dark:#B7B2A6;
  --line:rgba(20,19,16,.18);
  --line-dark:rgba(255,255,255,.14);
  --serif:'Fraunces',Georgia,serif;
  --sans:'Space Grotesk',system-ui,sans-serif;
  --mono:'JetBrains Mono',ui-monospace,monospace;
  --maxw:1200px;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:var(--sans);
  background:var(--paper);
  color:var(--ink);
  line-height:1.65;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
button{font-family:inherit}
.container{width:100%;max-width:var(--maxw);margin:0 auto;padding:0 28px}
::selection{background:var(--terracotta);color:var(--paper)}
:focus-visible{outline:2px solid var(--terracotta);outline-offset:3px}
.section-dark :focus-visible{outline-color:var(--gold)}

/* ===== Tipografía ===== */
h1,h2,h3{font-family:var(--serif);font-weight:530;line-height:1.06;letter-spacing:-.01em}
h1 em,h2 em,h3 em{font-style:italic;color:var(--terracotta)}
.section-dark h2 em,.section-dark h3 em,.feature-panel h3 em,.cell-feature h3 em{color:var(--gold)}
.eyebrow{font-family:var(--mono);font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--terracotta);margin-bottom:18px}
.eyebrow-gold{color:var(--gold)}
.kicker{font-family:var(--mono);font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-mute);margin-bottom:28px}

/* ===== Secciones ===== */
.section{padding:110px 0}
.section-tight{padding:90px 0}
.section-dark{background:var(--ink);color:var(--paper)}
.section-head{max-width:760px;margin-bottom:56px}
.section-head h2{font-size:clamp(2rem,5vw,3.2rem)}
.section-sub{color:var(--ink-soft);margin-top:16px;font-size:1.05rem;max-width:620px}
.section-dark .section-sub{color:var(--cream-dark)}

/* ===== Botones y enlaces ===== */
.btn{
  display:inline-flex;align-items:center;gap:9px;
  background:var(--ink);color:var(--paper);
  font-weight:500;font-size:.95rem;
  border:1px solid var(--ink);border-radius:999px;
  padding:14px 26px;cursor:pointer;white-space:nowrap;
  transition:background .25s,color .25s;
}
.btn:hover{background:var(--terracotta);border-color:var(--terracotta)}
.btn .btn-arrow{transition:transform .25s}
.btn:hover .btn-arrow{transform:translate(3px,-3px)}
.btn-sm{padding:9px 18px;font-size:.85rem}
.btn-lg{padding:16px 30px;font-size:1rem}
.btn-gold{background:var(--gold);border-color:var(--gold);color:var(--ink)}
.btn-gold:hover{background:var(--paper);border-color:var(--paper);color:var(--ink)}
.link-underline{
  font-weight:500;padding-bottom:3px;
  background-image:linear-gradient(currentColor,currentColor);
  background-size:100% 1px;background-position:0 100%;background-repeat:no-repeat;
  transition:background-size .25s;
}
.link-underline:hover{background-size:100% 2px}
.link-gold{color:var(--gold)}

/* ===== Nav ===== */
.nav{
  position:sticky;top:0;z-index:50;
  background:rgba(244,241,234,.85);backdrop-filter:blur(14px);
  border-bottom:1px solid transparent;transition:border-color .3s;
}
.nav.scrolled{border-bottom-color:var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:76px}
.brand{font-family:var(--serif);font-size:1.25rem;font-weight:600;letter-spacing:-.01em}
.nav-links{display:flex;align-items:center;gap:30px}
.nav-links a:not(.btn){font-size:.9rem;color:var(--ink-soft);transition:color .2s}
.nav-links a:not(.btn):hover{color:var(--ink)}
.lang-toggle{
  display:inline-flex;align-items:center;gap:2px;
  font-family:var(--mono);font-size:.72rem;letter-spacing:.06em;
  color:var(--ink-mute);background:none;
  border:1px solid var(--line);border-radius:999px;
  padding:7px 12px;cursor:pointer;transition:border-color .2s;
}
.lang-toggle:hover{border-color:var(--ink-mute)}
.lang-opt.is-active{color:var(--ink);font-weight:700}
.lang-sep{opacity:.4}
.nav-toggle{display:none;background:none;border:0;cursor:pointer;width:42px;height:42px}
.nav-toggle span{display:block;width:20px;height:2px;background:var(--ink);margin:5px auto;transition:transform .25s}

/* ===== Hero ===== */
.hero{padding:110px 0 70px}
.hero h1{font-size:clamp(3rem,8vw,6rem);max-width:1050px;margin-bottom:30px}
.lead{font-size:clamp(1.05rem,1.8vw,1.25rem);color:var(--ink-soft);max-width:620px;margin-bottom:38px}
.hero-cta{display:flex;align-items:center;gap:30px;flex-wrap:wrap;margin-bottom:28px}
.hero-badge{
  display:inline-flex;align-items:center;gap:9px;
  font-family:var(--mono);font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;
  color:var(--ink-mute);margin-bottom:70px;
}
.dot-live{width:8px;height:8px;border-radius:50%;background:#2E7D4F;animation:pulse 2s ease-in-out infinite}
@keyframes pulse{50%{opacity:.35}}
.hero-stats{display:flex;border-top:1px solid var(--ink)}
.figure{flex:1;padding:24px 28px 0 0;border-right:1px solid var(--line)}
.figure + .figure{padding-left:28px}
.figure:last-child{border-right:0;padding-right:0}
.figure dt{font-family:var(--serif);font-size:clamp(2.4rem,4vw,3.4rem);line-height:1;display:flex;align-items:baseline}
.fig-plus{color:var(--terracotta);font-size:.55em;margin-left:3px}
.figure dd{font-size:.85rem;color:var(--ink-mute);margin-top:10px;max-width:200px}

/* ===== Marquee ===== */
.marquee{border-top:1px solid var(--line);border-bottom:1px solid var(--line);overflow:hidden;padding:14px 0}
.marquee-track{display:flex;width:max-content;animation:marquee 40s linear infinite}
.marquee:hover .marquee-track{animation-play-state:paused}
.marquee-seq{
  font-family:var(--mono);font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;
  color:var(--ink-mute);white-space:nowrap;padding-right:12px;
}
@keyframes marquee{to{transform:translateX(-50%)}}

/* ===== Reveal (progresivo: sin JS todo es visible) ===== */
html.js .reveal{opacity:0;transform:translateY(12px);transition:opacity .5s ease-out,transform .5s ease-out}
html.js .reveal.in{opacity:1;transform:none}

/* ===== Movimiento reducido ===== */
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .marquee-track{animation:none}
  .dot-live{animation:none}
  html.js .reveal{opacity:1;transform:none;transition:none}
  .btn .btn-arrow{transition:none}
}
```

- [ ] **Step 2: Verificar carga y tokens**

```bash
curl -s http://localhost:8080/assets/styles.css -o /dev/null -w "%{http_code}\n"
grep -c -- '--paper:#F4F1EA\|--ink:#141310\|--terracotta:#8A4B26\|--gold:#C7A469' assets/styles.css
grep -c 'prefers-reduced-motion' assets/styles.css
```

Expected: `200`; tokens = 4; reduced-motion = 1. Abrir `http://localhost:8080` en el navegador: nav, hero y marquee ya con estilo papel/tinta (las secciones inferiores aún sin estilizar — esperado).

- [ ] **Step 3: Commit**

```bash
git add assets/styles.css
git commit -m "Rediseño: sistema de diseño Editorial Luxe (tokens, base, nav, hero, marquee)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: `assets/styles.css` — secciones (about, servicios, proyectos, método, Troyan, contacto, footer, responsive)

**Files:**
- Modify: `assets/styles.css` (añadir al final del archivo de Task 2)

**Interfaces:**
- Consumes: tokens y utilidades de Task 2; clases del HTML de Task 1.
- Produces: layout completo de todas las secciones, incl. `.proj-grid` con `grid-auto-flow:dense` y `.cell-feature`/`.cell-right`.

- [ ] **Step 1: Añadir al final de `assets/styles.css`**

```css
/* ===== Sobre mí ===== */
.about{display:grid;grid-template-columns:340px 1fr;gap:70px;align-items:start}
.about-frame{position:relative;aspect-ratio:4/5;border:1px solid var(--line);padding:10px;background:#fff}
.about-frame img{position:relative;z-index:1;width:100%;height:100%;object-fit:cover}
.about-mono{
  position:absolute;inset:10px;display:flex;align-items:center;justify-content:center;
  font-family:var(--serif);font-size:4rem;font-style:italic;color:var(--ink-mute);background:var(--paper-soft);
}
.fig-caption{font-family:var(--mono);font-size:.7rem;letter-spacing:.08em;color:var(--ink-mute);margin-top:12px}
.about-socials{display:flex;gap:18px;margin-top:18px}
.about-socials a{color:var(--ink-mute);transition:color .2s}
.about-socials a:hover{color:var(--terracotta)}
.about-body h2{font-size:clamp(2rem,4.5vw,3rem);margin-bottom:24px}
.about-lead{font-family:var(--serif);font-size:clamp(1.25rem,2.4vw,1.6rem);line-height:1.35;margin-bottom:20px}
.about-body > p:not(.about-lead):not(.eyebrow){color:var(--ink-soft);margin-bottom:16px;max-width:580px}
.about-points{list-style:none;margin:36px 0;border-top:1px solid var(--ink)}
.about-points li{display:flex;gap:22px;padding:20px 0;border-bottom:1px solid var(--line)}
.point-num{font-family:var(--mono);font-size:.75rem;color:var(--terracotta);padding-top:5px}
.about-points b{display:block;font-family:var(--serif);font-size:1.15rem;font-weight:560;margin-bottom:4px}
.about-points span{color:var(--ink-soft);font-size:.95rem}

/* ===== Servicios ===== */
.service-list{list-style:none;border-top:1px solid var(--ink)}
.service{
  display:grid;grid-template-columns:70px 1fr 1.2fr;gap:28px;align-items:baseline;
  padding:32px 10px;border-bottom:1px solid var(--line);transition:background .25s;
}
.service:hover{background:var(--paper-soft)}
.service-num{font-family:var(--mono);font-size:.75rem;color:var(--terracotta)}
.service h3{font-size:clamp(1.4rem,2.6vw,1.9rem)}
.service p{color:var(--ink-soft)}
.feature-panel{
  margin-top:60px;background:var(--ink);color:var(--paper);border-radius:12px;
  padding:56px;display:grid;grid-template-columns:1.1fr 1fr;gap:56px;
}
.feature-panel h3{font-size:clamp(1.6rem,3vw,2.3rem);margin-bottom:16px}
.feature-main p{color:var(--cream-dark)}
.feature-main a{color:var(--gold);border-bottom:1px solid currentColor}
.feature-list{list-style:none}
.feature-list li{padding:18px 0;border-bottom:1px solid var(--line-dark)}
.feature-list li:first-child{border-top:1px solid var(--gold)}
.feature-list b{display:block;font-family:var(--serif);font-size:1.1rem;font-weight:560;margin-bottom:4px}
.feature-list span{color:var(--cream-dark);font-size:.92rem}

/* ===== Proyectos: grid asimétrico ===== */
.proj-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-flow:dense;gap:16px}
.cell{
  display:flex;flex-direction:column;gap:10px;
  border:1px solid var(--line);border-radius:12px;padding:26px;
  transition:transform .25s,box-shadow .25s,border-color .25s;
}
.cell:hover{transform:translateY(-3px);box-shadow:0 18px 40px -24px rgba(20,19,16,.35);border-color:var(--ink-mute)}
.cell-tag{font-family:var(--mono);font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--terracotta)}
.cell h3{font-size:1.25rem;font-weight:560}
.cell-desc{color:var(--ink-soft);font-size:.95rem;flex:1}
.cell-feature{
  grid-column:span 2;grid-row:span 2;
  background:var(--ink);border-color:var(--ink);color:var(--paper);
  padding:40px;gap:14px;
}
.cell-feature:hover{border-color:var(--ink);box-shadow:0 24px 50px -24px rgba(20,19,16,.5)}
.cell-feature .cell-tag{color:var(--gold)}
.cell-feature h3{font-size:clamp(1.6rem,3vw,2.2rem)}
.cell-feature .cell-desc{color:var(--cream-dark);font-size:1.02rem;max-width:500px}
.cell-right{grid-column:2 / span 2}
.proj-note{font-family:var(--mono);font-size:.75rem;letter-spacing:.1em;color:var(--ink-mute);margin-top:28px}

/* ===== Método ===== */
.steps{list-style:none;display:grid;grid-template-columns:repeat(4,1fr);gap:36px;border-top:1px solid var(--ink);padding-top:38px}
.step-num{font-family:var(--serif);font-style:italic;font-size:2.6rem;line-height:1;color:var(--terracotta)}
.steps h3{font-size:1.2rem;margin:14px 0 8px}
.steps p{color:var(--ink-soft);font-size:.93rem}
.trust-strip{
  margin-top:60px;padding:16px 0;text-align:center;
  border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  font-family:var(--mono);font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-mute);
}

/* ===== Troyan ===== */
.troyan-head{display:flex;gap:28px;align-items:center;margin-bottom:56px}
.troyan-logo{width:84px;height:84px;object-fit:contain;flex-shrink:0}
.troyan-head h2{font-size:clamp(2rem,5vw,3.2rem)}
.troyan-tagline{font-family:var(--serif);font-style:italic;color:var(--gold);margin-top:8px;font-size:1.1rem}
.troyan-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:70px}
.troyan-about p{color:var(--cream-dark);margin-bottom:16px}
.troyan-tech{list-style:none;display:flex;flex-wrap:wrap;gap:8px;margin:26px 0 30px}
.troyan-tech li{
  font-family:var(--mono);font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;
  color:var(--cream-dark);border:1px solid var(--line-dark);border-radius:999px;padding:6px 13px;
}
.troyan-feats{list-style:none;border-top:1px solid var(--gold)}
.troyan-feats li{padding:20px 0;border-bottom:1px solid var(--line-dark)}
.troyan-feats b{display:block;font-family:var(--serif);font-size:1.2rem;font-weight:560;margin-bottom:5px}
.troyan-feats span{color:var(--cream-dark);font-size:.93rem}
.troyan-cta{
  margin-top:64px;padding-top:38px;border-top:1px solid var(--line-dark);
  display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;
}
.troyan-cta p{font-family:var(--serif);font-size:clamp(1.2rem,2.4vw,1.6rem);max-width:540px}

/* ===== Contacto ===== */
.section-contact{padding:150px 0;text-align:center}
.contact-title{font-size:clamp(3.4rem,10vw,7rem);margin:6px 0 18px}
.section-contact .section-sub{margin:0 auto 46px}
.contact-actions{display:flex;flex-direction:column;align-items:center;gap:24px}
.contact-mail{
  font-family:var(--serif);font-size:clamp(1.3rem,3.4vw,2.1rem);
  border-bottom:1px solid var(--ink);padding-bottom:4px;
  transition:color .2s,border-color .2s;
}
.contact-mail:hover{color:var(--terracotta);border-color:var(--terracotta)}

/* ===== Footer ===== */
.footer{border-top:1px solid var(--line);padding:34px 0}
.footer-inner{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.footer-brand{font-family:var(--serif);font-size:1.05rem}
.footer-meta,.footer-coords{font-family:var(--mono);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-mute)}

/* ===== Responsive ===== */
@media(max-width:960px){
  .about{grid-template-columns:1fr;gap:44px}
  .about-media{max-width:340px}
  .feature-panel{grid-template-columns:1fr;gap:36px;padding:40px 28px}
  .troyan-grid{grid-template-columns:1fr;gap:44px}
  .steps{grid-template-columns:repeat(2,1fr)}
  .proj-grid{grid-template-columns:repeat(2,1fr)}
  .cell-feature{grid-column:span 2}
  .cell-right{grid-column:span 2}
  .service{grid-template-columns:56px 1fr}
  .service p{grid-column:2}
}
@media(max-width:860px){
  .nav-toggle{display:block}
  .nav-links{
    position:absolute;top:76px;left:0;right:0;
    background:var(--paper);border-bottom:1px solid var(--line);
    flex-direction:column;align-items:flex-start;padding:26px 28px;gap:20px;display:none;
  }
  .nav-links.open{display:flex}
}
@media(max-width:640px){
  .container{padding:0 20px}
  .section{padding:80px 0}
  .section-tight{padding:64px 0}
  .hero{padding:70px 0 50px}
  .hero-stats{flex-direction:column}
  .figure{border-right:0;border-bottom:1px solid var(--line);padding:18px 0}
  .figure + .figure{padding-left:0}
  .figure:last-child{border-bottom:0}
  .proj-grid{grid-template-columns:1fr}
  .cell-feature,.cell-right{grid-column:auto;grid-row:auto}
  .cell-feature{padding:30px 24px}
  .steps{grid-template-columns:1fr}
  .feature-panel{padding:34px 22px}
  .troyan-cta{flex-direction:column;align-items:flex-start}
  .section-contact{padding:100px 0}
}
```

- [ ] **Step 2: Verificar layout**

```bash
grep -c 'grid-auto-flow:dense' assets/styles.css
grep -c 'cell-right' assets/styles.css
```

Expected: 1 y ≥ 3. Abrir `http://localhost:8080`: página completa estilizada; en Proyectos las 3 celdas oscuras grandes alternan izquierda/derecha/izquierda con las claras rellenando huecos. Redimensionar a ~900px y ~500px: el grid colapsa a 2 y 1 columnas.

- [ ] **Step 3: Commit**

```bash
git add assets/styles.css
git commit -m "Rediseño: estilos de secciones, grid asimétrico de proyectos y responsive

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: `assets/main.js` — interacciones

**Files:**
- Modify: `assets/main.js` (reescritura completa)

**Interfaces:**
- Consumes: IDs/clases de Task 1 (`#nav #navToggle #navLinks #year`, `.reveal`, `.fig-num[data-count]`).
- Produces: clase `js` en `<html>` (usada por CSS de Task 2 y demos.css de Task 6).

- [ ] **Step 1: Reemplazar `assets/main.js` completo con este contenido**

```js
// Progressive enhancement: sin JS todo el contenido queda visible
document.documentElement.classList.add('js');

// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Nav: borde al hacer scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Menú móvil
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), reduced ? 0 : (i % 6) * 60);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contadores de figuras del hero
const counters = document.querySelectorAll('.fig-num');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    cio.unobserve(el);
    if (reduced) { el.textContent = target; return; }
    const dur = 1400, start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.5 });
counters.forEach(c => cio.observe(c));
```

- [ ] **Step 2: Verificar en navegador**

Abrir `http://localhost:8080` con la consola abierta: sin errores JS; los reveals aparecen al hacer scroll; los contadores del hero animan hasta 15 / 8 / 100; el menú móvil (ancho < 860px) abre y cierra. Con DevTools → Rendering → "Emulate prefers-reduced-motion": el marquee queda quieto y los contadores saltan directo al valor final.

- [ ] **Step 3: Commit**

```bash
git add assets/main.js
git commit -m "Rediseño: interacciones (reveals, contadores, menú móvil, clase js)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: `assets/i18n.js` — toggle bilingüe ES/EN

**Files:**
- Create: `assets/i18n.js`

**Interfaces:**
- Consumes: atributos `data-i18n` y `#langToggle` de Task 1.
- Produces: `localStorage['lang']` (`'es' | 'en'`), `<html lang>` actualizado, `aria-pressed` en el toggle. El español se **cosecha del DOM** al cargar (única fuente de verdad: el HTML); el diccionario solo contiene EN.

- [ ] **Step 1: Crear `assets/i18n.js` con este contenido**

```js
// Bilingüe ES/EN. El español vive en el HTML (se cosecha al cargar);
// este archivo solo define el inglés.
(function () {
  'use strict';

  const EN = {
    'nav.servicios': 'Services',
    'nav.proyectos': 'Projects',
    'nav.metodo': 'Method',
    'nav.cta': "Let's talk",

    'hero.kicker': '( Custom software development — Querétaro, MX )',
    'hero.title': 'Software that works <em>the way your business</em> does.',
    'hero.lead': 'I turn manual processes into digital tools your team uses every day. Fewer errors, no double data entry, more hours for the work that matters.',
    'hero.cta1': 'Start a project',
    'hero.cta2': 'See real work',
    'hero.badge': 'Available for new projects',
    'hero.stat1': 'systems in production',
    'hero.stat2': 'systems talking to each other',
    'hero.stat3': 'built around you',

    'marquee': 'Custom apps ✱ Automation ✱ System integration ✱ Computer vision ✱ Applied AI ✱&nbsp;',

    'about.eyebrow': '( About )',
    'about.fig': 'Fig. 01 — Rodrigo, founder of Troyan Robotics',
    'about.title': "Hi, I'm <em>Rodrigo</em>.",
    'about.lead': 'I help companies work better with software built around the way they operate.',
    'about.p1': "I take the processes that eat up your team's time — the ones living in spreadsheets and WhatsApp — and turn them into simple, reliable tools. Over the past few years I shipped 15+ systems for a company in the aviation industry; their team runs on them every single day.",
    'about.p2': "I'm also the founder of <strong>Troyan Robotics</strong>, where I lead a team competing in autonomous robotics internationally. I like solving real problems and shipping things that truly work.",
    'about.pt1t': 'I understand your business first',
    'about.pt1d': 'I listen to how you work, then propose the solution — not the other way around.',
    'about.pt2t': 'One person in charge of everything',
    'about.pt2d': 'Design, development and rollout: I own the whole project.',
    'about.pt3t': "I don't vanish after delivery",
    'about.pt3d': 'I stay close with support and improvements as your business grows.',
    'about.cta': "Let's work together ↗",

    'serv.eyebrow': '( Services )',
    'serv.title': 'What I can do <em>for your business</em>.',
    'serv.s1t': 'Custom applications',
    'serv.s1d': 'Systems built for the way you work, not generic templates. Easy to use, available on any device.',
    'serv.s2t': 'I connect your tools',
    'serv.s2d': 'Your CRM, your email, your platforms — working together and sharing data on their own, no double entry.',
    'serv.s3t': 'I automate your processes',
    'serv.s3d': 'Time off, support, inventory, bookings… Manual tasks and spreadsheets become automatic workflows that save hours every week.',
    'serv.s4t': 'With you from start to finish',
    'serv.s4d': 'From the idea to a running system, then support and improvements. You focus on your business; I handle the technology.',
    'serv.f.eyebrow': '( Advanced capability )',
    'serv.f.title': 'Computer vision <em>and AI</em> for your operation.',
    'serv.f.desc': 'Let a camera do the repetitive work for you. The same technology I apply in competitive robotics at <a href="#troyan">Troyan Robotics</a>, now serving your business.',
    'serv.f.i1t': 'Automatic reading',
    'serv.f.i1d': 'Plates, folios and documents read from images — no manual typing.',
    'serv.f.i2t': 'Quality inspection',
    'serv.f.i2d': 'Defects detected with a camera, without checking piece by piece.',
    'serv.f.i3t': 'Counting & detection',
    'serv.f.i3d': 'People or vehicles counted automatically, with alerts when something happens.',

    'proj.eyebrow': '( Projects )',
    'proj.title': 'Real systems, <em>in production</em>.',
    'proj.sub': '15+ systems built for a client in the aviation industry, used daily by their team to run the company.',
    'proj.demo': 'Try the demo',
    'proj.p1tag': 'HR', 'proj.p1t': 'Vacation management',
    'proj.p1d': 'Requests, hierarchy-based approvals and automatic day counting for vacations and home office. From days of paperwork to minutes.',
    'proj.p2tag': 'Communication', 'proj.p2t': 'Flight change alerts',
    'proj.p2d': 'Mass notifications to passengers about delays, reschedules and cancellations, with a log of everything sent.',
    'proj.p3tag': 'Benefits', 'proj.p3t': 'Employee travel passes',
    'proj.p3d': 'Request, approval and control of passes and tickets for employees and their beneficiaries, paper-free.',
    'proj.p4tag': 'Operations', 'proj.p4t': 'Meeting room booking',
    'proj.p4d': 'Calendar-synced booking: your team reserves rooms in seconds and meetings never overlap.',
    'proj.p5tag': 'Business intelligence', 'proj.p5t': 'Frequent flyer analytics',
    'proj.p5d': 'Reports and segmentation of passengers and companies by flight behavior and preferred routes.',
    'proj.p6tag': 'Customer care', 'proj.p6t': 'Shared inbox',
    'proj.p6d': 'One place where the team receives, assigns and answers customer email, with internal notes.',
    'proj.p7tag': 'IT support', 'proj.p7t': 'Ticket desk',
    'proj.p7d': 'Support requests centralized, with automatic access and built-in approval flows. Nothing gets lost.',
    'proj.p8tag': 'Talent', 'proj.p8t': 'HR platform',
    'proj.p8d': 'Records, attendance, leave, performance and payroll for the whole company in a single system.',
    'proj.p9tag': 'IT assets', 'proj.p9t': 'Equipment & access control',
    'proj.p9d': 'Which device and which access each employee has, with audits and instant on/offboarding reports.',
    'proj.p10tag': 'Integration', 'proj.p10t': 'Account sync',
    'proj.p10d': 'Employee accounts and data kept aligned between email (Zoho) and the CRM (Bitrix24), automatically.',
    'proj.p11tag': 'IT inventory', 'proj.p11t': 'Computer inventory',
    'proj.p11d': 'Every computer by employee, area and department, with instant search and data import.',
    'proj.p12tag': 'Knowledge', 'proj.p12t': 'Corporate wiki',
    'proj.p12d': 'Company documentation and processes, editable and easy to find for the whole organization.',
    'proj.note': '+ other internal systems tailored to the client: access control, permissions and more.',

    'met.eyebrow': '( Method )',
    'met.title': 'From idea <em>to production</em>.',
    'met.s1t': 'We talk',
    'met.s1d': 'I get to know your business, your processes and what you need. We set priorities together.',
    'met.s2t': 'Proposal & plan',
    'met.s2d': 'A clear solution and a staged delivery plan — no surprises.',
    'met.s3t': 'We build it',
    'met.s3d': 'I develop and show progress often, adjusting along the way.',
    'met.s4t': 'Launch & support',
    'met.s4d': 'Your system goes live and I stay close with support and improvements.',
    'met.trust': 'Secure · Fast and reliable · Desktop, tablet and phone · Ready to grow',

    'troyan.eyebrow': '( Founder project )',
    'troyan.tagline': '“We compete around the world — we build the team here.”',
    'troyan.p1': "I'm the founder of Troyan Robotics, the autonomous robotics team of the Informatics Faculty at the Autonomous University of Querétaro (Juriquilla Campus). We build autonomous vehicles and robots from scratch with AI, computer vision and embedded systems.",
    'troyan.p2': 'Our vision: to become a national reference in autonomous robotics and contribute to scientific progress in Mexico.',
    'troyan.p3': 'The troyanrobotics.com site is also my design and development, end to end.',
    'troyan.tech1': 'Computer vision',
    'troyan.tech2': 'Sensor fusion',
    'troyan.tech3': 'Embedded systems',
    'troyan.tech4': 'ToF sensors',
    'troyan.f1t': 'Only Mexican team',
    'troyan.f1d': 'Qualified for the Bosch Future Mobility Challenge 2026 — among 75 teams worldwide (semifinal, Romania).',
    'troyan.f2t': 'Best United Team',
    'troyan.f2d': 'FIRA RoboWorld Cup 2025 · South Korea. Plus the Audience Award at the BFMC.',
    'troyan.f3t': '1st place, autonomous',
    'troyan.f3d': 'Our vehicle took first place applying AI and computer vision in a simulated urban environment.',
    'troyan.f4t': 'Robots built by students',
    'troyan.f4d': 'A fleet of autonomous robots designed and built 100% by the new Troyan generation.',
    'troyan.cta': 'Want this technology — computer vision and AI — working in your business?',
    'troyan.ctabtn': "Let's talk about your project",

    'con.eyebrow': '( Contact )',
    'con.title': '<em>Shall we talk?</em>',
    'con.sub': "Tell me what you need and I'll reply with a proposal. No strings attached.",

    'footer.meta': 'Custom software',
    'a11y.menu': 'Menu',
    'a11y.close': 'Close demo',
    'modal.badge': '● LIVE DEMO',
    'modal.note': 'Interactive recreation with fictional data — not connected to any real system or client data.',
    'meta.description': 'Custom software studio: web applications, process automation and system integration, with computer vision and applied AI. Querétaro, MX.'
  };

  const els = document.querySelectorAll('[data-i18n]');
  const ariaEls = document.querySelectorAll('[data-i18n-aria]');
  const metaDesc = document.querySelector('meta[name="description"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const btn = document.getElementById('langToggle');

  // Cosechar el español del HTML
  const ES = { 'meta.description': metaDesc.getAttribute('content') };
  els.forEach(el => {
    const k = el.dataset.i18n;
    if (!(k in ES)) ES[k] = el.innerHTML;
  });
  ariaEls.forEach(el => {
    const k = el.dataset.i18nAria;
    if (!(k in ES)) ES[k] = el.getAttribute('aria-label');
  });

  const DICTS = { es: ES, en: EN };

  function apply(lang) {
    const dict = DICTS[lang];
    els.forEach(el => {
      const v = dict[el.dataset.i18n];
      if (v != null) el.innerHTML = v;
    });
    ariaEls.forEach(el => {
      const v = dict[el.dataset.i18nAria];
      if (v != null) el.setAttribute('aria-label', v);
    });
    metaDesc.setAttribute('content', dict['meta.description']);
    if (ogDesc) ogDesc.setAttribute('content', dict['meta.description']);
    document.documentElement.lang = lang;
    btn.setAttribute('aria-pressed', String(lang === 'en'));
    btn.querySelectorAll('.lang-opt').forEach(o =>
      o.classList.toggle('is-active', o.dataset.lang === lang)
    );
    try { localStorage.setItem('lang', lang); } catch (e) { /* modo privado */ }
  }

  btn.addEventListener('click', () => {
    apply(document.documentElement.lang === 'es' ? 'en' : 'es');
  });

  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* modo privado */ }
  if (saved === 'en') apply('en');
})();
```

- [ ] **Step 2: Verificar cobertura de claves ES↔EN**

```bash
# Claves usadas en el HTML que faltan en el diccionario EN:
grep -o 'data-i18n="[^"]*"' index.html | sed 's/data-i18n="//;s/"//' | sort -u > /tmp/html-keys.txt
grep -o "'[a-z0-9.]*':" assets/i18n.js | sed "s/[':]//g" | sort -u > /tmp/en-keys.txt
comm -23 /tmp/html-keys.txt /tmp/en-keys.txt
```

Expected: sin salida (toda clave del HTML existe en EN). Si aparece alguna, añadirla al diccionario.

- [ ] **Step 3: Verificar en navegador**

En `http://localhost:8080`: clic en el toggle → todo el contenido visible pasa a inglés y `document.documentElement.lang === 'en'` en consola; recargar → sigue en inglés (localStorage); clic de nuevo → regresa a español idéntico al original (round-trip sin pérdidas, incluidas las itálicas `<em>`).

- [ ] **Step 4: Commit**

```bash
git add assets/i18n.js
git commit -m "Rediseño: i18n ES/EN con cosecha del DOM y persistencia

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: `assets/demos.css` — re-vestir demos y modal

**Files:**
- Modify: `assets/demos.css` (reescritura completa; `demos.js` NO se toca)

**Interfaces:**
- Consumes: contratos de demos.js (§Global Constraints) y clase `html.js` de Task 4.
- Produces: variables compat (`--accent` → terracota, etc.) scoped a `.modal`, para que los estilos inline de demos.js hereden la paleta editorial.

- [ ] **Step 1: Verificar que las clases que se eliminan no se usan**

```bash
grep -c 'stepper\|flight\|plane\|seat\|conf-' assets/demos.js || true
```

Expected: 0 (exit 1). Estos bloques (`.stepper .flight .plane* .seat* .conf*`) son restos de un demo retirado y se eliminan.

- [ ] **Step 2: Reemplazar `assets/demos.css` completo con este contenido**

```css
/* ============================================================
   Demos interactivos — restyle Editorial Luxe.
   demos.js genera este DOM y usa var(--accent) etc. en estilos
   inline: las variables compat de .modal son obligatorias.
   ============================================================ */

/* Sin JS no hay demos: los botones solo aparecen con html.js */
html:not(.js) .demo-btn{display:none}

/* Botón "Probar demo" (vive dentro de las celdas oscuras del grid) */
.demo-btn{
  margin-top:18px;align-self:flex-start;
  display:inline-flex;align-items:center;gap:8px;
  font-family:'JetBrains Mono',ui-monospace,monospace;
  font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;
  color:var(--gold);background:none;cursor:pointer;
  border:1px solid var(--gold);border-radius:999px;padding:10px 18px;
  transition:background .2s,color .2s;
}
.demo-btn:hover{background:var(--gold);color:var(--ink)}

/* ===== Modal (paleta compat para demos.js) ===== */
.modal{
  --accent:#8A4B26;
  --accent-2:#C7A469;
  --surface:#FFFFFF;
  --surface-2:#EDE9DF;
  --bg-soft:#F4F1EA;
  --line:rgba(20,19,16,.12);
  --line-strong:rgba(20,19,16,.24);
  --text:#141310;
  --muted:#6B675C;
  --ok:#2E7D4F;
  --warn:#9A6B00;
  --bad:#B3261E;
  position:fixed;inset:0;z-index:100;display:none;
  font-family:'Space Grotesk',system-ui,sans-serif;color:var(--text);
}
.modal.open{display:block}
.modal-backdrop{position:absolute;inset:0;background:rgba(20,19,16,.55);backdrop-filter:blur(4px)}
.modal-dialog{
  position:relative;z-index:1;
  width:min(940px,calc(100vw - 32px));max-height:calc(100vh - 48px);
  margin:24px auto;display:flex;flex-direction:column;
  background:var(--bg-soft);border:1px solid var(--line-strong);
  border-radius:14px;overflow:hidden;
  box-shadow:0 40px 90px -30px rgba(20,19,16,.5);
  animation:modalIn .28s cubic-bezier(.2,.8,.2,1);
}
@keyframes modalIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.modal-dialog{animation:none}}
.modal-head{
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 22px;border-bottom:1px solid var(--line);background:var(--surface);
}
.modal-head-l{display:flex;align-items:center;gap:14px}
.modal-head h3{font-family:'Fraunces',Georgia,serif;font-size:1.2rem;font-weight:560}
.modal-badge{
  font-family:'JetBrains Mono',ui-monospace,monospace;font-size:.66rem;letter-spacing:.1em;
  color:var(--accent);border:1px solid currentColor;border-radius:999px;padding:4px 10px;white-space:nowrap;
}
.modal-close{
  background:none;border:1px solid var(--line);color:var(--muted);
  width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:1rem;transition:.2s;flex-shrink:0;
}
.modal-close:hover{color:var(--text);border-color:var(--text)}
.modal-note{
  padding:10px 22px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:.68rem;
  letter-spacing:.04em;color:var(--muted);border-bottom:1px solid var(--line);
}
.modal-body{padding:24px 22px;overflow-y:auto}

/* ===== Primitivas compartidas ===== */
.d-row{display:flex;gap:14px;flex-wrap:wrap}
.d-field{display:flex;flex-direction:column;gap:6px;flex:1;min-width:140px}
.d-field label{font-size:.78rem;color:var(--muted);font-weight:500}
.d-input,.d-select{
  background:var(--surface);border:1px solid var(--line-strong);color:var(--text);
  border-radius:9px;padding:10px 12px;font-family:inherit;font-size:.92rem;width:100%;
}
.d-input:focus,.d-select:focus{outline:none;border-color:var(--accent)}
.d-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:7px;
  font-family:inherit;font-weight:500;font-size:.9rem;cursor:pointer;
  background:var(--text);color:var(--bg-soft);
  border:0;border-radius:999px;padding:11px 20px;transition:background .2s;
}
.d-btn:hover{background:var(--accent)}
.d-btn[disabled]{opacity:.4;cursor:not-allowed;background:var(--text)}
.d-title{font-family:'Fraunces',Georgia,serif;font-size:1.1rem;font-weight:560;margin-bottom:4px}
.d-sub{font-size:.85rem;color:var(--muted);margin-bottom:18px}
.d-divider{height:1px;background:var(--line);margin:20px 0}
.tag{font-size:.7rem;font-weight:600;padding:3px 10px;border-radius:999px}
.tag.pend{color:var(--warn);border:1px solid currentColor;background:rgba(154,107,0,.08)}
.tag.appr{color:var(--ok);border:1px solid currentColor;background:rgba(46,125,79,.08)}

/* ===== Demo: Vacaciones ===== */
.vac-wrap{display:grid;grid-template-columns:1.1fr 1fr;gap:26px}
.vac-balance{display:flex;gap:12px;margin-bottom:16px}
.vac-stat{flex:1;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px}
.vac-stat .n{font-family:'Fraunces',Georgia,serif;font-size:1.7rem;font-weight:600;line-height:1}
.vac-stat .n.av{color:var(--ok)}.vac-stat .n.us{color:var(--accent)}.vac-stat .n.rq{color:var(--accent-2)}
.vac-stat .l{font-size:.68rem;color:var(--muted);margin-top:5px;text-transform:uppercase;letter-spacing:.06em}
.cal{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px}
.cal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.cal-head .m{font-family:'Fraunces',Georgia,serif;font-weight:560;font-size:.98rem;text-transform:capitalize}
.cal-nav{background:none;border:1px solid var(--line-strong);color:var(--text);width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:.9rem}
.cal-nav:hover{border-color:var(--accent);color:var(--accent)}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.cal-dow{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:.62rem;color:var(--muted);text-align:center;padding:4px 0;text-transform:uppercase}
.cal-day{
  aspect-ratio:1;display:flex;align-items:center;justify-content:center;
  font-size:.82rem;border-radius:8px;cursor:pointer;border:1px solid transparent;transition:.12s;color:var(--text);
}
.cal-day:hover:not(.muted):not(.we){background:var(--surface-2)}
.cal-day.muted{color:transparent;pointer-events:none}
.cal-day.we{color:var(--muted);opacity:.45;cursor:not-allowed}
.cal-day.in-range{background:rgba(138,75,38,.14)}
.cal-day.edge{background:var(--accent);color:#fff;font-weight:700}
.cal-legend{display:flex;gap:14px;margin-top:12px;font-size:.7rem;color:var(--muted);flex-wrap:wrap}
.cal-legend i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;vertical-align:middle}
.vac-req-info{background:var(--surface);border:1px dashed var(--line-strong);border-radius:10px;padding:14px;margin-bottom:14px;font-size:.88rem}
.vac-req-info b{color:var(--accent)}
.vac-list{display:flex;flex-direction:column;gap:8px;margin-top:14px;max-height:200px;overflow-y:auto}
.vac-item{display:flex;align-items:center;justify-content:space-between;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:10px 12px;font-size:.85rem}
.vac-item .rng{color:var(--text)}.vac-item .dd{color:var(--muted);font-size:.78rem}

/* ===== Demo: Tickets (Kanban) ===== */
.kb-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;flex-wrap:wrap}
.kb-board{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.kb-col{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:12px;min-height:260px;transition:.15s}
.kb-col.drag-over{border-color:var(--accent);background:rgba(138,75,38,.05)}
.kb-col-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding:0 2px}
.kb-col-head .t{font-family:'Fraunces',Georgia,serif;font-weight:560;font-size:.92rem}
.kb-count{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:.68rem;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:2px 9px;min-width:24px;text-align:center}
.kb-card{background:var(--bg-soft);border:1px solid var(--line-strong);border-radius:10px;padding:12px;margin-bottom:9px;cursor:grab;transition:.15s}
.kb-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.kb-card.dragging{opacity:.5;cursor:grabbing}
.kb-card .id{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:.68rem;color:var(--muted)}
.kb-card .ti{font-size:.88rem;font-weight:500;margin:5px 0 9px}
.kb-card-foot{display:flex;align-items:center;justify-content:space-between}
.kb-prio{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:.62rem;font-weight:500;padding:2px 8px;border-radius:6px;border:1px solid currentColor}
.kb-prio.alta{color:var(--bad);background:rgba(179,38,30,.06)}
.kb-prio.media{color:var(--warn);background:rgba(154,107,0,.06)}
.kb-prio.baja{color:var(--ok);background:rgba(46,125,79,.06)}
.kb-who{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:700;color:#fff;background:var(--accent)}
.kb-hint{font-size:.76rem;color:var(--muted);margin-top:14px;text-align:center}

/* ===== Demo: Reserva de salas ===== */
.rb-wrap{display:grid;grid-template-columns:270px 1fr;gap:26px}
.rb-rooms{display:flex;flex-direction:column;gap:8px}
.rb-room{display:flex;gap:12px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:11px 13px;cursor:pointer;transition:.15s}
.rb-room:hover{border-color:var(--accent)}
.rb-room.sel{border-color:var(--accent);background:rgba(138,75,38,.06)}
.rb-room-ico{font-size:1.2rem}
.rb-room b{display:block;font-size:.9rem}
.rb-room span{font-size:.76rem;color:var(--muted)}
.rb-slots{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:14px 0}
.rb-slot{padding:11px 0;text-align:center;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:.78rem;border-radius:9px;cursor:pointer;background:var(--surface);border:1px solid var(--line-strong);color:var(--text);transition:.12s}
.rb-slot:hover:not(.occ){border-color:var(--accent)}
.rb-slot.occ{background:rgba(179,38,30,.06);border-color:rgba(179,38,30,.3);color:rgba(179,38,30,.6);cursor:not-allowed;text-decoration:line-through}
.rb-slot.in{background:rgba(138,75,38,.14);border-color:transparent}
.rb-slot.edge{background:var(--accent);color:#fff;font-weight:700;border-color:transparent}
.rb-info{background:var(--surface);border:1px dashed var(--line-strong);border-radius:10px;padding:11px 13px;margin-bottom:12px;font-size:.88rem}
.rb-info b{color:var(--accent)}
.rb-list{display:flex;flex-direction:column;gap:8px;margin-top:16px}
.rb-list-h{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
.rb-item{display:flex;align-items:center;justify-content:space-between;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:10px 12px;font-size:.85rem}
.rb-item .rng{font-weight:500}.rb-item .dd{color:var(--muted);font-size:.78rem}

/* ===== Responsive demos ===== */
@media(max-width:760px){
  .vac-wrap{grid-template-columns:1fr}
  .kb-board{grid-template-columns:1fr;gap:10px}
  .kb-col{min-height:auto}
  .rb-wrap{grid-template-columns:1fr}
  .modal-body{padding:18px 16px}
}
```

- [ ] **Step 3: Verificar los 3 demos en navegador**

En `http://localhost:8080`: abrir cada demo (`Probar demo` en las 3 celdas oscuras) y ejercitarlos — vacaciones: seleccionar rango y solicitar (pasa de Pendiente a Aprobado); tickets: arrastrar tarjeta entre columnas y crear ticket; reservas: elegir sala, horas y reservar. Cerrar con ✕, con el backdrop y con Escape. Sin errores en consola. Paleta del modal: papel/terracota, sin azules.

- [ ] **Step 4: Commit**

```bash
git add assets/demos.css
git commit -m "Rediseño: demos y modal re-vestidos con la paleta editorial

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: README + verificación final

**Files:**
- Modify: `README.md` (sección de estructura)

**Interfaces:**
- Consumes: todo lo anterior.

- [ ] **Step 1: Actualizar la sección "Estructura" del README**

Reemplazar el bloque de estructura actual por:

```markdown
Página única, estática (HTML + CSS + JS), sin dependencias de build. Diseño "Editorial Luxe" (papel/tinta/terracota), bilingüe ES/EN.

## Estructura

​```
index.html          # Página principal (español + atributos data-i18n)
assets/styles.css   # Sistema de diseño y estilos
assets/main.js      # Interacciones (reveals, contadores, menú móvil)
assets/i18n.js      # Toggle bilingüe ES/EN (localStorage)
assets/demos.css    # Estilos de los demos interactivos
assets/demos.js     # Lógica de los demos (datos ficticios)
​```
```

(Quitar los acentos invertidos de escape `​` al copiar.) También actualizar la línea inicial "Estilo dark-tech" si existe.

- [ ] **Step 2: Verificación final completa (checklist del spec §10)**

Con el servidor corriendo, verificar y anotar resultados:

1. Desktop (~1440px): hero, servicios (hover de filas), grid asimétrico, panel IA, Troyan, contacto. Tipografía Fraunces cargando (inspeccionar computed font-family de un h1).
2. Tablet (~768px) y móvil (~390px): grid colapsa, menú hamburguesa funciona, nada desborda horizontalmente.
3. Toggle ES/EN: cambia todo, persiste al recargar, round-trip exacto, `<html lang>` correcto.
4. Los 3 demos abren/funcionan/cierran (clic, backdrop, Escape).
5. Anclas de navegación (`#servicios #proyectos #metodo #troyan #contacto`).
6. `prefers-reduced-motion` (DevTools → Rendering): marquee quieto, contadores instantáneos, reveals sin translate.
7. Sin JS (DevTools → desactivar JS): todo el contenido visible en español, botones de demo ocultos.
8. Consola sin errores en carga ni al interactuar.

```bash
# checks rápidos de regresión
grep -c '?v=5' index.html          # → 5 (styles, demos.css, main, i18n, demos.js)
grep -c '?v=4' index.html || true  # → 0
```

- [ ] **Step 3: Commit final**

```bash
git add README.md
git commit -m "Rediseño: README actualizado al nuevo diseño Editorial Luxe

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 4: Cerrar** — detener el servidor (`kill %1` o el PID de `http.server`) y usar la skill superpowers:finishing-a-development-branch.
