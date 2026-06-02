# Rodrigofdzr — Portafolio

Sitio de portafolio personal para servicios de desarrollo de software a medida.
Página única, estática (HTML + CSS + JS), sin dependencias de build. Estilo dark-tech.

## Estructura

```
index.html          # Página principal
assets/styles.css   # Estilos
assets/main.js      # Interacciones (animaciones, contadores, menú móvil)
```

## Ver localmente

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8080
# luego visita http://localhost:8080
```

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube estos archivos (ver comandos abajo).
3. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `/ (root)`**.
4. El sitio quedará en `https://<usuario>.github.io/<repo>/`.

> El archivo `.nojekyll` evita que GitHub Pages procese el sitio con Jekyll.

### Dominio propio (opcional)
Pon tu dominio en el archivo `CNAME` y configúralo en Settings → Pages.

---

© Rodrigofdzr — Desarrollo de software a medida.
