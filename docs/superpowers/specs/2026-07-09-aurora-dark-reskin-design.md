# Re-skin "Aurora Dark" + módulo de animaciones

**Fecha:** 2026-07-09
**Estado:** aprobado en brainstorming (dirección elegida vía companion visual; set de animaciones confirmado).
**Antecedente:** evoluciona el diseño Editorial Luxe (spec 2026-07-03) hacia un look más moderno y joven. Es un **re-skin**: la estructura HTML, el copy ES/EN, el sistema i18n y la lógica de demos no cambian.

## 1. Objetivo

Piel visual "Aurora Dark" (oscuro moderno con gradientes violeta/menta y superficies de vidrio) sobre la estructura ya publicada, más un módulo de animaciones profesionales que capten la vista sin sacrificar rendimiento ni accesibilidad.

## 2. Decisiones tomadas

| Decisión | Elección |
|---|---|
| Alcance | Re-skin: solo piel visual + animaciones. Estructura, copy, i18n y demos.js intactos |
| Dirección | **B · Aurora Dark** (elegida sobre Electric Pop y Acid Editorial) |
| Animaciones | Set firma completo: aurora viva, titulares en cascada, botones magnéticos, glow en tarjetas |
| Stack | Igual: estático sin build, JS vanilla; sin librerías de animación |

## 3. Tokens

Reemplazan por completo a los de Editorial Luxe en `assets/styles.css`:

```css
--void:#0B0B12;            /* fondo */
--surface:rgba(255,255,255,.04);   /* vidrio */
--surface-2:rgba(255,255,255,.07); /* vidrio hover/activo */
--glass-line:rgba(255,255,255,.09);
--glass-line-strong:rgba(255,255,255,.16);
--text:#F2F1F7;
--text-soft:#A5A2BA;
--text-mute:#8F8CA6;
--violet:#7C5CFF;
--violet-soft:#9B7CFF;
--mint:#5CFFD8;
--grad:linear-gradient(90deg,var(--violet),var(--mint));
--sans:'Space Grotesk',system-ui,sans-serif;
--mono:'JetBrains Mono',ui-monospace,monospace;
--maxw:1200px;
```

- Fraunces se elimina (link de Google Fonts y todos los usos). Titulares: Space Grotesk 700, `letter-spacing:-.03em`.
- La palabra clave de cada titular (los `<em>` existentes) pasa de itálica terracota a **texto con gradiente** `--grad` (`background-clip:text`), sin itálica.
- Contraste AA: `--text-soft` sobre `--void` ≈ 7.9:1; `--text-mute` ≈ 6.2:1; `--mint` sobre `--void` ≈ 12:1; `--violet-soft` para texto solo en tamaños grandes. Botón primario: texto blanco sobre gradiente violeta (validar ≥ 4.5:1 en el extremo claro).

## 4. Superficies y tratamiento por sección

Mismo orden y markup; solo cambia la piel:

1. **Fondo global** — `--void` + dos blobs de aurora fijos (`.aurora .aurora-a/.aurora-b`, divs nuevos `aria-hidden` tras `<body>`): radiales violeta y menta, `filter:blur(90px)`, opacidad .35/.18.
2. **Nav** — vidrio (`backdrop-filter:blur`), marca **`rodrigo.fdzr`** en Space Grotesk 700 minúsculas; toggle ES/EN y CTA en píldoras de vidrio.
3. **Hero** — kicker mono en menta con punto vivo; titular con gradiente en el `<em>`; figuras de stats sobre reglas de vidrio; CTA primario gradiente violeta con glow (`box-shadow:0 0 24px -4px`).
4. **Marquee** — franja con bordes de vidrio, texto mono en `--text-mute`, `✱` en menta.
5. **Sobre mí** — marco de foto en vidrio; pie de foto mono; lista 01/02/03 con números en menta.
6. **Servicios** — filas con hover de vidrio; **panel de visión/IA**: tarjeta de vidrio con halo violeta (`box-shadow` + borde `--glass-line-strong`), enlaces en menta.
7. **Proyectos** — mismo grid asimétrico; celdas chicas en vidrio sutil; **celdas destacadas** en vidrio más denso con halo violeta y tag mono en menta; botón demo: píldora borde menta (hover: fondo menta, texto `--void`).
8. **Método + franja de confianza** — números de paso con gradiente; franja en mono `--text-mute`.
9. **Troyan** — ya no necesita inversión (todo es oscuro): se distingue con aurora más intensa local y acentos menta donde había dorado (`.eyebrow-gold`→menta, `.link-gold`→menta, borde de logros en menta).
10. **Contacto** — "¿Hablamos?" gigante con gradiente; correo con subrayado que crece; botón WhatsApp de vidrio.
11. **Footer** — guiño terminal: `~/qro.mx $ ▊` (cursor con blink CSS, pausado bajo reduced motion) junto a las coordenadas.
12. **Modal de demos** (`demos.css`) — re-tint oscuro con las MISMAS variables compat bajo `.modal`: `--accent:#7C5CFF; --accent-2:#5CFFD8; --surface:#1A1A28; --surface-2:#232336; --bg-soft:#12121C; --line/--line-strong` en blancos translúcidos; `--text/--muted` claros; `--ok:#4ADE80; --warn:#FBBF24; --bad:#F87171` (sobre fondos oscuros cumplen AA). demos.js intacto.

## 5. Módulo de animaciones — `assets/motion.js` (nuevo)

Principios: solo `transform`/`opacity`, listeners `passive`, `pointermove` con throttle rAF, gating por `matchMedia('(prefers-reduced-motion: reduce)')` y `(pointer:fine)` donde aplique. Sin librerías.

1. **Aurora viva** — CSS puro (keyframes en styles.css, ~75s, translate+scale alternos por blob, `will-change:transform`). Bajo reduced-motion: `animation:none` (blobs quedan estáticos).
2. **Titulares en cascada** — para cada `h1, h2, .about-lead`: JS divide el contenido en líneas medidas (spans palabra por palabra, agrupadas por `offsetTop`) y envuelve cada línea en un wrapper `overflow:hidden`; las líneas entran con `translateY(110%)→0` escalonado (~90ms) vía IntersectionObserver. Reduced-motion: sin división, reveal estándar.
   - **Interacción con i18n:** `i18n.js` emite `document.dispatchEvent(new CustomEvent('i18n:applied'))` al final de `apply()` (única línea nueva). `motion.js` escucha y re-divide los titulares ya revelados (sin re-animar entrada, aparecen directos). La **cosecha ES ocurre antes de cualquier división** (orden de scripts: `i18n.js` antes que `motion.js`); al cambiar idioma, i18n reescribe `innerHTML` completo, lo que descarta los spans de división — nunca se cosechan spans.
3. **Botones magnéticos** — `.btn`: en `pointermove` dentro de un radio, `translate` hacia el cursor (máx 8px, lerp 0.2); `pointerleave` regresa con transición springy (`cubic-bezier(.2,1.2,.3,1)`). Solo `(pointer:fine)` y sin reduced-motion.
4. **Glow en tarjetas** — `.cell`: `pointermove` fija `--mx/--my`; CSS pinta borde/velo `radial-gradient(160px at var(--mx) var(--my), rgba(124,92,255,.25), transparent)` en un pseudo-elemento. Desactivado en táctil y reduced-motion.

## 6. Archivos

| Archivo | Acción |
|---|---|
| `assets/styles.css` | Reescritura del skin (tokens §3, superficies §4, keyframes de aurora); estructura de selectores se conserva donde el markup no cambia |
| `assets/motion.js` | **Nuevo** (§5) |
| `assets/i18n.js` | +1 línea: evento `i18n:applied` |
| `assets/demos.css` | Re-tint del bloque de variables compat y colores de estado (§4.12) |
| `index.html` | Divs de aurora, marca `rodrigo.fdzr`, quitar Fraunces del link de fonts, `<script motion.js>` tras i18n.js, guiño terminal en footer, `theme-color #0B0B12`, todo a `?v=6` |
| `assets/main.js` | Sin cambios de lógica (reveals/contadores/menú siguen igual) |
| `README.md` | Línea de descripción del diseño → Aurora Dark |

Copy ES/EN, `demos.js`, imágenes: intactos.

## 7. Accesibilidad, SEO y rendimiento

- `prefers-reduced-motion` apaga: aurora, cascada (reveal simple), magnéticos, glow, blink del cursor terminal.
- Foco visible en menta (`outline:2px solid var(--mint)`).
- Contrastes de §3/§4.12 verificados; el gradiente de titulares mantiene ≥ 4.5:1 en su punto más claro sobre `--void` (menta 12:1).
- `backdrop-filter` con fallback: los vidrios definen `background` sólido translúcido válido sin soporte.
- Meta `theme-color #0B0B12`; og sin cambios; `?v=6` en los 5 assets.
- Presupuesto: sin nuevas requests salvo `motion.js` (~4KB); una fuente menos (Fraunces fuera).

## 8. Verificación

- Harness Playwright existente (desktop/tablet/móvil, toggle + persistencia + round-trip, 3 demos, sin-JS) debe seguir pasando.
- Nuevos checks: aurora animando (computed `animationName` ≠ none) y quieta bajo reduced-motion; titulares re-divididos tras toggle (texto EN íntegro, sin spans anidados dobles tras alternar ×4); glow actualiza `--mx/--my`; magnético vuelve a origen en `pointerleave`; contraste spot-check del modal re-tintado.
- Sin errores de consola.

## 9. Fuera de alcance

- Cambios de copy, estructura de secciones o diccionario EN (más allá de cero cambios).
- demos.js, imágenes, favicon.
- Librerías de animación, build tooling, smooth-scroll secuestrado (scroll nativo se respeta).
