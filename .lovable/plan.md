# Portfolio de Ubaldo Santos

Portfolio personal en TanStack Start + Tailwind v4, totalmente estático, con i18n (ES/CA/EN), tema claro/oscuro, y un botón de impresión que genera un CV en PDF con formato **ATS-friendly de una columna** (estilo Harvard reverse-chronological).

## Dirección visual (decidida)

Estilo **editorial-técnico moderno**: tipografía contrastada (display serif + mono para detalles + sans para body), retícula amplia, mucho aire, acentos de color sutiles, animaciones discretas con CSS/Motion al hacer scroll. Inspiración: Linear, Vercel, Rauno, portfolios de Awwwards 2025. Nada de gradientes morados genéricos ni hero "trusted by".

- Fuentes: Instrument Serif (display) + Inter (body) + JetBrains Mono (acentos)
- Paleta: fondo casi-negro / casi-blanco (oklch), un único accent ámbar/verde-eléctrico
- Tema: toggle claro/oscuro con persistencia en localStorage, respeta `prefers-color-scheme`
- Microinteracciones: reveal on scroll, hover en cards, cursor sutil
- Mobile-first, responsive

## Estructura de rutas

```
src/routes/
  __root.tsx              -> layout (header con lang switcher + theme toggle, footer)
  index.tsx               -> Home (hero + about + highlights + CTA)
  experience.tsx          -> Experiencia (timeline work + trainee)
  projects.tsx            -> Proyectos
  skills.tsx              -> Skills + idiomas + educación
  contact.tsx             -> Contacto + enlaces + descarga CV
  cv.tsx                  -> Vista CV imprimible (print-only stylesheet, genera PDF nativo del navegador)
```

Cada ruta con su propio `head()` (title, description, og:title, og:description) en los 3 idiomas según el activo.

## i18n

- Librería: `i18next` + `react-i18next` (estable, sin servidor)
- Detección: navegador → `localStorage` → fallback `es`
- Archivos: `src/i18n/locales/{es,ca,en}.json` con todas las cadenas UI
- Datos del CV en `src/data/cv.{es,ca,en}.ts` (tipados con TypeScript) — el JSON que pasaste se traduce a CA y EN
- Switcher ES / CA / EN en el header

**Añadido confirmado:** experiencia actual en Wiris desde 10 abril 2025 en el equipo de **Assessment**, desarrollando **Nubric** (antes Learning Lemur) en **PHP/Laravel**, equipo de producto especializado en herramientas de assessment matemático. Se añade como nuevo bloque `work` (o como sub-rol dentro de Wiris) manteniendo el anterior rol de Integraciones como histórico interno.

**Investigación añadida (a confirmar contigo):** Nubric/Learning Lemur es la plataforma de assessment matemático de Wiris para crear ejercicios autocorrectivos con MathType integrado, usada por instituciones educativas. Lo mencionaré con cuidado sin inventar métricas.

## CV PDF — ATS-friendly 1 columna

- Ruta dedicada `/cv` con layout en una sola columna, tipografía sistema/serif legible, sin iconos decorativos en texto, sin tablas complejas, sin columnas (los parsers ATS las rompen)
- Secciones en este orden: Contacto · Resumen · Experiencia · Educación · Skills (lista plana) · Idiomas · Proyectos
- Hojas de estilo `@media print` específicas: márgenes A4, `page-break-inside: avoid` por bloque, fuentes embebibles, sin colores de fondo
- Botón **"Imprimir / Descargar CV"** en header y en `/cv` que dispara `window.print()` → el usuario guarda como PDF desde el diálogo nativo (mejor calidad de texto seleccionable, 100% ATS)
- El CV se renderiza en el idioma activo (3 versiones)
- Alternativa descartada: librerías tipo `react-pdf` o `jsPDF` — generan PDFs con texto en imágenes/canvas que ATS no parsea bien

## Tema claro/oscuro

- Tokens en `src/styles.css` con `oklch` (ya configurado)
- Hook `useTheme` con persistencia y respeto a SO
- Toggle accesible (sun/moon, `aria-label` traducido)

## Detalles técnicos

- **Tailwind v4** (ya está en el proyecto, `@theme inline` en styles.css)
- **TanStack Start** con file-based routing
- **Motion** (`framer-motion`) para animaciones de scroll/reveal
- **lucide-react** para iconografía mínima
- **i18next + react-i18next + i18next-browser-languagedetector**
- Imagen `/me.jpg` — necesitaré que la subas o generaré un placeholder profesional
- SEO: meta tags por ruta, JSON-LD `Person` schema en home, sitemap mental con rutas indexables
- Accesibilidad: contraste AA, navegación por teclado, `aria-label` en todo control icon-only

## Entregables

1. Sistema de diseño en `styles.css` (tokens, fuentes, tema)
2. Layout raíz con header (logo + nav + lang switcher + theme toggle) y footer
3. 6 rutas con contenido completo en 3 idiomas
4. Vista `/cv` imprimible ATS-friendly con botón de impresión
5. Datos del CV tipados, con la actualización de Wiris/Nubric/Assessment incluida
6. README mínimo con cómo editar contenidos/idiomas

## Fuera de alcance (te aviso para no asumir)

- No hay formulario de contacto con email real (sería backend) — solo `mailto:` y enlaces
- No hay blog/MDX (puedo añadirlo después si quieres)
- No hay analytics
- La imagen `me.jpg` no la tengo — usaré placeholder hasta que la subas
