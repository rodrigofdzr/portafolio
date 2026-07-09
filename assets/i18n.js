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
    'troyan.tagline': '"We compete around the world — we build the team here."',
    'troyan.p1': "I'm the founder of Troyan Robotics, the autonomous robotics team of the Informatics Faculty at the Autonomous University of Querétaro (Juriquilla Campus). We build autonomous vehicles and robots from scratch with AI, computer vision and embedded systems.",
    'troyan.p2': 'Our vision: to become a national reference in autonomous robotics and contribute to scientific progress in Mexico.',
    'troyan.p3': 'The troyanrobotics.com site is also my design and development, end to end.',
    'troyan.tech0': 'AI',
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
    document.dispatchEvent(new CustomEvent('i18n:applied', { detail: { lang: lang } }));
  }

  btn.addEventListener('click', () => {
    apply(document.documentElement.lang === 'es' ? 'en' : 'es');
  });

  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* modo privado */ }
  if (saved === 'en') apply('en');
})();
