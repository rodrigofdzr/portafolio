# Rediseño del portafolio — "Editorial Luxe"

**Fecha:** 2026-07-03
**Estado:** aprobado en brainstorming (dirección visual, layout de proyectos y estructura validadas con Rodrigo vía companion visual y terminal).

## 1. Objetivo

Reescribir por completo el portafolio (visual + copy) para que se sienta **premium, único y pulido** — un estudio boutique editorial, no el típico portafolio dev dark-tech. Audiencia: **clientes de negocio** (dueños y tomadores de decisión), **bilingüe ES/EN** con español como idioma principal.

## 2. Decisiones tomadas

| Decisión | Elección |
|---|---|
| Alcance | Rediseño visual completo + reescritura del copy |
| Audiencia | Clientes de negocio, bilingüe ES/EN (ES por defecto) |
| Dirección visual | **A · Editorial Luxe** (papel claro, serif expresiva, terracota) con la audacia tipográfica de la opción C (titulares gigantes, cinta marquee) |
| Layout de proyectos | **Grid asimétrico**: 3 celdas grandes oscuras (proyectos con demo) + 9 celdas claras compactas |
| Stack | Estático sin build (HTML + CSS + JS vanilla), GitHub Pages |
| Demos interactivos | Se conservan (`demos.js`), re-vestidos con el nuevo sistema |
| Datos factuales | Sin cambios: 15+ sistemas, sector aeronáutico, logros Troyan, contactos |

## 3. Sistema de diseño

### Color

```css
--paper:      #F4F1EA;  /* fondo base */
--paper-soft: #EDE9DF;  /* superficies alternas, hover de filas */
--ink:        #141310;  /* texto y panel oscuro invertido */
--ink-soft:   #54514A;  /* texto secundario sobre papel */
--ink-mute:   #6B675C;  /* etiquetas, metadatos */
--terracotta: #8A4B26;  /* único acento sobre papel */
--gold:       #C7A469;  /* acento sobre paneles oscuros */
--cream-dark: #B7B2A6;  /* texto secundario sobre oscuro */
--line:       rgba(20,19,16,.18);  /* reglas finas sobre papel */
--line-dark:  rgba(255,255,255,.14); /* reglas sobre oscuro */
```

Ritmo claro/oscuro: la página es papel, con **dos inversiones a tinta** (panel de visión/IA dentro de Servicios, y sección Troyan) más las 3 celdas grandes del grid de proyectos.

### Tipografía

- **Fraunces** (Google Fonts, `opsz` + itálicas): titulares. Hero `clamp(3rem, 8vw, 6rem)`, secciones `clamp(2rem, 5vw, 3.2rem)`. Peso 400–600, itálica en terracota para la palabra clave de cada titular.
- **Space Grotesk**: cuerpo e interfaz (400/500/700).
- **JetBrains Mono**: solo etiquetas pequeñas (numeración `01`, tags, coordenadas, `▶ DEMO`).
- Carga: `preconnect` + `display=swap`; fallbacks `Georgia, serif` / `system-ui, sans-serif`.

### Lenguaje visual

- Numeración editorial (`01 —`), reglas horizontales de 1px, etiquetas MAYÚSCULAS con `letter-spacing: .14em`, paréntesis decorativos `( así )`, pie de foto tipo `Fig. 01`.
- **Sin emojis en la UI.** Iconos actuales (🎯🛠️🤝🔒⚡📱🔧🌐🔗) se sustituyen por numeración o pictogramas SVG de línea (stroke 1.5, color tinta).
- Bordes `1px solid var(--line)`, radios discretos (10–12px) solo en tarjetas y botones píldora; nada de glassmorphism ni glows.
- Botón primario: tinta sólida, texto papel, píldora; hover con micro-desplazamiento de la flecha `↗`. Secundario: subrayado fino que se engrosa al hover.

## 4. Estructura de la página

Un solo `index.html`, en este orden:

1. **Nav** — sticky, papel translúcido con blur, borde inferior fino al hacer scroll. "Rodrigo Fernández" en Fraunces (se elimina el `</>`), enlaces (Servicios, Proyectos, Método, Troyan), **toggle ES/EN** píldora, CTA "Hablemos".
2. **Hero** — etiqueta `( Desarrollo de software a la medida — Querétaro, MX )`, badge de disponibilidad (punto verde pulsante), titular *"Software que trabaja como tu negocio lo necesita."* (itálica terracota en "como tu negocio"), lead de 2 líneas, CTAs (primario "Iniciar un proyecto ↗", secundario "Ver casos reales"), y 3 **figuras editoriales**: número Fraunces grande + regla + etiqueta (15+ sistemas en producción / 8 sistemas conectados / 100% a tu medida). Contador animado al entrar en viewport.
3. **Cinta marquee** — franja fina entre reglas: `Apps a la medida ✱ Automatización ✱ Integración de sistemas ✱ Visión por computadora ✱ IA aplicada` en mono pequeño, desplazamiento lento continuo.
4. **Sobre mí** — dos columnas: foto (`assets/rodrigo.jpg`, marco fino, pie `Fig. 01 — Rodrigo, founder de Troyan Robotics`; fallback monograma "RF" si falta la imagen) + texto con párrafo de apertura grande estilo lead. Los 3 diferenciadores como lista numerada `01/02/03` con reglas. Redes sociales como fila de iconos SVG línea. CTA texto subrayado.
5. **Servicios** — lista editorial numerada (4 filas: título Fraunces + descripción; hover expande fondo `--paper-soft`). Al final, **panel oscuro destacado** de Visión por computadora e IA: badge, titular, 3 capacidades (lectura automática / inspección de calidad / conteo y detección) y enlace ancla a Troyan.
6. **Proyectos — grid asimétrico** — encabezado con contexto ("15+ sistemas para el sector aeronáutico, en uso diario"). Grid CSS: 3 **celdas grandes oscuras** (vacaciones, reservas, tickets) con tag mono dorado, título Fraunces, beneficio y botón `▶ Probar demo`; 9 **celdas claras** compactas (tag, título, beneficio de una línea). Todo visible sin "ver más" (se elimina `#moreProjects`). Nota final "+ otros sistemas internos a la medida".
7. **Método y confianza (fusión)** — los 4 pasos (Conversamos / Propuesta y plan / Lo construimos / Lanzamiento y soporte) como proceso editorial con números grandes; debajo, franja fina de una línea con los 4 sellos de confianza (Seguro · Rápido y confiable · En todos lados · Fácil de crecer). Sustituye a las secciones separadas "Confianza" y "Proceso".
8. **Troyan Robotics** — sección oscura: logo, eyebrow `( Proyecto founder )`, tagline entre comillas editoriales, texto (UAQ, visión, "troyanrobotics.com también es diseño mío"), tags de tecnología en mono, y 4 logros como figuras editoriales (único equipo mexicano BFMC 2026 / Best United Team FIRA 2025 / 1er lugar autónomo / robots construidos por estudiantes). CTA puente: "¿Esta tecnología en tu negocio? Hablemos ↗".
9. **Contacto** — *"¿Hablamos?"* gigante en Fraunces itálica, subtítulo de una línea, correo `rodrigofdzr@icloud.com` en grande con subrayado fino (mailto), botón WhatsApp secundario.
10. **Footer** — firma en Fraunces, "Desarrollo de software a medida · © 2026" y `QRO, MX — 20°35'N 100°23'W` en mono.
11. **Modal de demos** — misma lógica (`demos.js`), re-vestido: papel, encabezado con regla, badge `● DEMO EN VIVO` en terracota, nota de datos ficticios en mono pequeño.

## 5. Bilingüe (i18n)

- Un solo `index.html`; **español por defecto**.
- `assets/i18n.js`: diccionario `{ es: {...}, en: {...} }` con claves por sección; elementos marcados con `data-i18n="clave"`. Al cambiar idioma se sustituye `textContent` (o `innerHTML` solo en las claves que llevan marcado inline como itálicas del titular).
- Toggle `ES/EN` en nav (y en menú móvil). Persiste en `localStorage('lang')`; al cargar aplica el idioma guardado y actualiza `<html lang>`.
- Atributos también traducidos: `aria-label`, `alt`, `content` de `meta description` y og: (vía JS al alternar; el HTML estático queda en español para SEO principal).
- El copy EN es **voz nativa**, no traducción literal (p. ej. *"Software that works the way your business does."*).
- Los textos internos de los demos (`demos.js`) quedan en español en esta fase (los demos representan sistemas reales hechos en español); fuera de alcance traducirlos.

## 6. Voz del copy

- Confiada, concreta, sin jerga: frases cortas, beneficio medible primero ("De días de papeleo a minutos").
- Prohibido: "soluciones innovadoras", "pasión por la tecnología", buzzwords.
- Primera persona singular. Se escribe para el dueño del negocio, no para otro dev.
- Datos factuales exactos (proyectos, logros, contactos) — solo cambia cómo se cuentan.

## 7. Movimiento y pulido

- **Reveal on scroll**: `IntersectionObserver` (como hoy), fade + translate sutil (12px, 500ms, ease-out), escalonado por fila.
- **Contadores** del hero animados al entrar en viewport.
- **Marquee**: animación CSS lineal infinita (~40s), pausa en hover.
- **Hovers**: filas de servicios expanden fondo; celdas de proyecto elevan sombra suave y desplazan la flecha; enlaces con subrayado que crece.
- `prefers-reduced-motion: reduce` → desactiva marquee, contadores saltan al valor final, reveals sin translate.
- Sin librerías de animación; todo CSS + el observer existente.

## 8. SEO, accesibilidad y rendimiento

- `<title>` y metas reescritos: "Rodrigo Fernández — Software a la medida | Custom Software". OG actualizado. `theme-color` → `#F4F1EA`.
- Contraste AA garantizado: `--ink-soft` sobre `--paper` ≥ 4.5:1; verificar dorado sobre tinta solo en tamaños grandes/etiquetas.
- Foco visible en todos los interactivos (outline terracota 2px), modal con `aria-modal`, cierre con Escape (ya existe), toggle de idioma con `aria-pressed`.
- Sin JS el sitio queda completo y legible en español; los botones de demo se ocultan por defecto y se muestran vía JS (progressive enhancement). Imagen de Rodrigo mantiene fallback a monograma.
- Fuentes con `preconnect` y `display=swap`; sin imágenes pesadas nuevas; versionado de assets `?v=5`.

## 9. Archivos

| Archivo | Acción |
|---|---|
| `index.html` | Reescritura completa (estructura de §4, atributos `data-i18n`) |
| `assets/styles.css` | Reescritura desde cero con los tokens de §3 |
| `assets/main.js` | Reescritura: nav scroll, menú móvil, reveals, contadores, marquee pause, año |
| `assets/i18n.js` | **Nuevo**: diccionario ES/EN + toggle + persistencia |
| `assets/demos.css` | Restyle a tokens nuevos (lógica intacta) |
| `assets/demos.js` | Sin cambios de lógica; solo si alguna clase renombrada lo exige |
| `README.md` | Actualizar descripción de estructura |

## 10. Verificación

- Servir local (`python3 -m http.server`) y revisar con screenshots: desktop (1440), tablet (768) y móvil (390) — hero, proyectos, Troyan, contacto.
- Toggle ES/EN: cambia todo el contenido visible, persiste al recargar, `<html lang>` correcto.
- Los 3 demos abren, funcionan y cierran (clic, backdrop, Escape).
- Navegación por anclas y menú móvil.
- `prefers-reduced-motion` respetado (emular en DevTools).
- Contraste AA spot-check en las combinaciones de §8.

## 11. Fuera de alcance

- Build tooling, frameworks, CMS.
- Traducir el contenido interno de los demos.
- Nuevas secciones de contenido (blog, testimonios) o cambios en datos factuales.
- Dominio propio / analytics.
