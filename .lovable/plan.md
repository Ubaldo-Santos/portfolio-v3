# Revisión de Product Design — Portfolio Ubaldo Santos

Me pongo el sombrero de PD. He revisado `/`, `/experience`, `/projects`, `/skills`, `/contact`, `/cv`, header, footer, logo y tokens. Puntúo, comento y propongo retoques **solo visuales**: nada de tocar rutas, datos, animaciones funcionales ni i18n.

---

## Puntuación global

| Área | Nota | Comentario corto |
|---|---|---|
| Sistema de color / tokens | **8.5** | Paleta cálida + lime es sólida y coherente. Bien centralizada en `styles.css`. |
| Tipografía (Fraunces + Inter + Mono) | **9** | Pareja editorial bien resuelta, jerarquía clara. |
| Header / Logo | **6.5** | Logo CodeSandbox + nombre se siente "prestado", compite con el wordmark. |
| Hero (home) | **8** | Ritmo cinemático correcto; los dos *glows* lime acaparan demasiado. |
| Selected work / Stack (home) | **8.5** | Limpio, editorial. OK. |
| Experience | **7.5** | Buen timeline. El pill "Present" lime sobre lime es ruidoso. |
| Projects | **8** | Cards consistentes. Mismo pill "Active" ruidoso. |
| Skills | **6** | Bloque AI rompe el sistema: gradiente lime, radius distinto, peso visual desbalanceado vs resto. |
| Contact | **7** | Card grande con *blob* lime XXL desproporcionado. |
| CV (paper) | **9** | ATS-friendly, tipografía Georgia: muy bien. No tocar. |
| CV toolbar (pantalla) | **7.5** | OK, pero el botón negro pill no rima con el resto de CTAs de la web. |
| Footer | **8.5** | Sobrio y bien estructurado. |

**Nota media: 7.8 / 10.** Portfolio con personalidad y disciplina; pierde puntos por **inconsistencias del accent lime** (a veces *halo*, a veces borde, a veces gradiente, a veces pill) y por el **logo del header**.

---

## Problemas transversales (lo que rompe la unidad)

1. **El accent lime se usa con 5 dialectos distintos**: `bg-accent/[0.07]` blur gigante (hero), `bg-accent/20` blur (contact), `border-accent bg-accent/20` pill (experience, projects), `border-accent/40 bg-gradient-to-br from-accent/10` (skills AI), punto sólido (timeline). Hay que **reducir a 2 dialectos**: (a) halo de fondo sutil para hero/contact y (b) pill/borde para estados activos. Sin gradientes lime.
2. **Radios mezclados**: `rounded-3xl` en hero callouts y skills-AI, `rounded-2xl` en cards de skills/projects/contact, `rounded-full` en pills, `rounded-xl` en footer. Unificar a una escala de 3: `2xl` (cards), `full` (pills/CTAs), `xl` (chips internas).
3. **Pills "Present" / "Active"** con `bg-accent/20` saturan. Mejor `border-accent/60` + texto accent sobre fondo transparente, dejando el lime como tinta, no como mancha.
4. **Logo del header** (CodeSandbox SVG + nombre repetido) es el punto más débil. El SVG es genérico y el wordmark "Ubaldo / Santos Patón" en el logo **duplica** lo que aparece gigante en el hero. Solución: monograma propio `US` minimal en Fraunces, sin icono prestado, lockup horizontal.
5. **Glows del hero**: en desktop el lime ocupa ~680px con `bg-accent/20` y compite con el nombre. Bajar intensidad a `bg-accent/10` y `blur-[120px]`.
6. **Skills — bloque AI**: el gradiente `from-accent/10 via-background` es el único gradiente lime de toda la web. Aplanarlo a un card normal `border-hairline bg-surface/40` con un *kicker* lime tipográfico (icono + label en `text-accent`).
7. **Contact — blob lime**: `size-72 bg-accent/20 blur-3xl` es desproporcionado. Reducir a `size-40 bg-accent/10` o sustituir por un *hairline* decorativo.
8. **CV toolbar**: el botón `bg-foreground` pill rompe con el lenguaje de la página `/cv` (Georgia, B/N). Cambiar a botón `border border-hairline bg-background` con icono, sin pill negro saturado.
9. **Posibles restos**: `.btn-neon-cv` y `@keyframes neon-breathe` viven en `styles.css` pero ya nadie los importa tras quitar el botón del navbar. Borrar el CSS huérfano.

---

## Retoques propuestos (mínimos, solo visual)

Todo lo siguiente respeta tokens existentes (`--accent`, `--hairline`, `--surface`, `--foreground`) — nada de hex sueltos.

### 1. Header / Logo (`src/components/logo/index.tsx`)
- Reemplazar `code-sandbox.svg` por un **monograma SVG propio**: glifo "US" en Fraunces 800, con un punto lime diminuto (`--accent`) como acento, encerrado en una forma squircle hairline. Sin `dark:invert`.
- Mantener API del componente (`variant: 'nav' | 'footer'`, `iconClassName`) intacta para no romper header/footer.
- Borrar `code-sandbox.svg` de `src/components/logo/` y `public/`.

### 2. Hero (`src/routes/index.tsx`)
- Glows: `bg-accent/15 blur-[120px]` (desktop) y `bg-accent/[0.05]` (mobile). Reducir tamaño del segundo blob.
- CTA "Contáctame" mantenerla. Añadir un microajuste: el secundario "Ver CV" gana un `inline-flex` más alineado con la línea base de la primaria.

### 3. Experience (`src/routes/experience.tsx`)
- Pill "Present": `border border-accent/60 text-accent bg-transparent` (no fondo lime).
- Punto activo del timeline (`bg-accent`) se queda — es el único uso "sólido" justificado.

### 4. Projects (`src/routes/projects.tsx`)
- Pill "Active": misma regla que arriba — `border-accent/60 text-accent` sin `bg-accent/20`.
- Mantener el resto.

### 5. Skills (`src/routes/skills.tsx`) — el cambio más grande
- Bloque AI: quitar `bg-gradient-to-br from-accent/10 via-background` y `border-accent/40`. Convertirlo en un card hermano de los demás: `rounded-3xl border border-hairline bg-surface/40 p-8 sm:p-12`.
- Mantener `Sparkles` + kicker en `text-accent` como única firma lime.
- Chips de tags AI: `border-hairline` en vez de `border-accent/40`, para que rimen con el resto de chips de la página.

### 6. Contact (`src/routes/contact.tsx`)
- Reducir blob: `size-40 bg-accent/10 blur-2xl` (de `size-72 bg-accent/20 blur-3xl`).
- Card "highlight" del CV (`/cv` shortcut): mantener `bg-foreground text-background` (es la única CTA fuerte y aporta jerarquía).

### 7. CV toolbar (`src/routes/cv.tsx`, bloque `no-print`)
- Botón "Imprimir CV": cambiar `bg-foreground … text-background` por `border border-hairline bg-background hover:bg-surface text-foreground`, mismo icono + arrow. Más sobrio y coherente con la página papel.

### 8. `src/styles.css` — limpieza
- Eliminar `.btn-neon-cv`, `@keyframes neon-breathe` y cualquier regla `prefers-reduced-motion` asociada (ya no se usan tras retirar el botón "Get CV" del navbar).
- Resto del archivo intacto (tokens, CV print, custom cursor, konami).

### 9. Radios — pasada de unificación
- `rounded-3xl` → mantener solo en bloques "feature" grandes (hero callouts del home, contact hero card, skills AI tras aplanar).
- Cards estándar (projects, skills groups, education, languages, footer links) → `rounded-2xl`.
- Chips/tags → `rounded-full` (ya está, verificar).

---

## Lo que NO toco (explícitamente)

- Rutas, loaders, head/SEO, `routeHead`.
- i18n / claves de traducción.
- `cv.ts` (datos).
- Lógica del CV: `downloadCv()`, `html2pdf`, `Section`, `Job`, `formatPrintDate`.
- Animaciones de `Reveal`, `motion`, `TechRibbon`, custom cursor, easter egg.
- Tokens de color/tipografía base (siguen exactamente igual).
- Layout / breakpoints / responsive existente.

---

## Resultado esperado

Después de estos retoques: una sola voz visual — papel cálido + lime como **tinta de acento** (kickers, puntos, bordes finos), nunca como **mancha** (gradientes, *halos* XXL, fondos saturados). Logo propio en lugar del prestado. Pills planas y consistentes. CV con dos botones que pertenecen a la misma familia. Y `styles.css` sin código muerto.

¿Apruebas el plan o quieres que ajuste prioridades (por ejemplo: hacer solo logo + accent, o solo skills + contact)?
