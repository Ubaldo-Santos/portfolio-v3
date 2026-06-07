
# Revisión Product Design — Portfolio Ubaldo Santos

Reviso el front entero como tu PD: puntúo cada sección, marco lo que se sale del sistema y propongo un trabajo concreto de aplanado + unificación. Después implemento solo lo que apruebes.

---

## Paleta y sistema (referencia)

Tokens reales en `src/styles.css`:
- `background` warm off-white / `foreground` casi negro cálido
- `surface` (tarjetas/zonas), `hairline` (todas las líneas)
- `muted-foreground` (labels/meta)
- `accent` **lime eléctrico** — debe ser **acento puntual**, no decorativo

Tipos: Fraunces (display + display-italic), Inter (body), JetBrains Mono (mono uppercase/meta).

**Regla**: cualquier color/borde/fondo en componentes que no salga de estos tokens = bug del sistema.

---

## Puntuación por pantalla

### 1. Header — 6.5/10
- ✅ Sticky con blur, lang switcher con `layoutId`, theme toggle limpio.
- ⚠️ El **BrandLogo** mete colores hardcoded (`oklch(0.34_0.01_80)` / `oklch(0.72_0.01_90)`) que **no son tokens** → se sale de la paleta. La marca debería usar `text-foreground` o `text-muted-foreground`.
- ⚠️ El logo (caja CodeSandbox importada) no tiene nada que ver con la identidad — sigue siendo "logo prestado".
- ⚠️ Lockup "Ubaldo / Santos Patón" en nav ocupa mucho ancho a la izquierda y se repite con el footer y con el H1 del hero.

### 2. Hero (`/`) — 7/10
- ✅ Tipo enorme italic, retícula 5/4/3, ticker inferior. Editorial.
- ⚠️ Hay un **error de runtime** al hacer scroll: aparece "Algo ha ido mal / Intentar de nuevo" antes de que aparezcan "Trabajo seleccionado" y "Stack". Probable origen: `LayoutGroup`/`AnimatePresence` en page-transition + Reveal al cruzar viewport. Hay que diagnosticarlo y arreglarlo — un crash visible es lo peor que puede ver un reclutador.
- ⚠️ Wash de fondo accent muy ancho a la derecha en desktop (rojo lime); compite con el texto. Reducir radio/opacidad.
- ⚠️ El bloque "Wiris — Ingeniero de Software · MathType SDK & Assessment (Nubric)" envuelve a 3 líneas en su columna y rompe ritmo con la columna 01.
- ⚠️ Botón "Contáctame" negro píldora + "Ver CV" como link subrayado: dos jerarquías OK, pero el píldora negro se repite literal en `/contact` y en `/cv` con micro-diferencias.

### 3. Experience — 6/10
- ✅ Timeline agrupado por empresa, hitos con bullet lime.
- ⚠️ El badge "PRESENT" usa `border-accent bg-accent/20` — píldora lime brillante junto al título, demasiado peso para un estado.
- ⚠️ Píldoras de tech con `border-hairline` puras: en `/projects` son `bg-background` y en `/experience` sin background → no son la misma píldora.
- ⚠️ `RevealGroup` envuelve directamente un `<ol>`: las variantes stagger no se propagan a los `RevealItem` (un `<ol>` no-motion en medio rompe la cadena). Los hijos solo animan por mount inicial, no escalonado.
- ⚠️ Bullets `mt-2 size-1` + texto = baseline incómoda; se ve un punto demasiado bajo.

### 4. Projects — 6/10
- ✅ Grid 2-up, tarjetas uniformes.
- ⚠️ Mezcla dos sistemas de estado: "ACTIVE" pinta `border-accent bg-accent/20` (lime fuerte) y "ARCHIVED" `border-hairline text-muted` — la diferencia visual es ENORME para un dato secundario.
- ⚠️ Tags de highlights con `bg-background` dentro de `bg-surface/40`: invierte la jerarquía (el chip parece más prominente que la tarjeta).
- ⚠️ Falta thumbnail / mock visual: pura tipo en una grid 2x2 se ve vacía si los proyectos no son muchos.

### 5. Skills — 7/10
- ✅ Cards uniformes por categoría + bloque AI editorial.
- ⚠️ El bloque AI tiene `bg-gradient-to-br from-accent/10 via-background to-background` y `border-accent/40` + chips `border-accent/40` → es la única isla con gradiente accent en todo el sitio. Rompe aplanado.
- ⚠️ Chips de skills usan `bg-background` (no `surface`) dentro de cards `bg-surface/30` — misma inversión que en projects.
- ⚠️ "Stack principal" callout y "Education" usan el mismo `rounded-3xl border-hairline bg-surface/40` pero radios distintos (`2xl` en education): inconsistencia.

### 6. Contact — 5.5/10
- ⚠️ El feature card grande tiene `bg-accent/20 blur-3xl` (otra mancha lime decorativa) y al lado un `InfoCard highlight` totalmente negro (`bg-foreground text-background`) → tres colores fuertes compitiendo en una sola página (lime wash + negro CTA + negro card).
- ⚠️ "Imprimir CV" como InfoCard negro es UX raro: el usuario espera un link a /cv, no un botón fuerte. Debe ser un secundario.
- ⚠️ Social cards llevan un "avatar" `size-10 border-hairline` con las dos primeras letras de la red — feo y no aporta nada (LinkedIn → "LI"). Mejor un ícono lucide consistente.

### 7. CV (`/cv`) — 7.5/10
- ✅ Artículo print A4 Georgia limpio, contact-line, secciones uniformes.
- ⚠️ El botón es **otra vez** la píldora negra `bg-foreground` con icono Printer + ArrowUpRight — y vuelve a `window.print()` aunque pediste descargar el PDF directamente. La función `downloadCv()` y el estilo `btn-neon-cv` que existían **se han perdido** en la última pasada.
- ⚠️ El toolbar dentro de un card `bg-surface/40` con texto explicativo + botón negro a la derecha repite literal el patrón del hero. Si la idea era "diferenciar el CTA de descarga", no se está diferenciando.

### 8. Footer — no revisado en detalle (visible en screenshots, parece OK pero el logo lockup grande repite el del header).

---

## Diagnóstico transversal (lo que rompe el sistema)

1. **El acento lime se usa como decoración**, no como acento. Aparece en wash de hero, en bloque AI (gradient + bordes), en badges (`PRESENT`, `ACTIVE`), en blur de contact, en chip de stack. Resultado: la marca "Awwwards minimal" se diluye en "verde por todos lados".
2. **Píldoras/chips inconsistentes**: 4 variantes distintas para lo mismo (border-hairline pelado, +bg-background, +bg-accent/20, +border-accent). Hay que reducir a 2: neutral y activo.
3. **CTAs duplicados**: la píldora negra `bg-foreground text-background rounded-full` aparece en hero, contact (×2), cv. No hay sistema de Button — se reescribe inline cada vez con clases ligeramente distintas.
4. **Colores hardcoded fuera de tokens**: `BrandLogo` con `oklch(...)` directos. Cualquier cambio de paleta deja la marca rota.
5. **Tarjetas con misma intención pero radios distintos**: `rounded-2xl` vs `rounded-3xl` mezclados sin criterio.
6. **Chips invertidos**: en cards `bg-surface/40` los chips son `bg-background` (más blancos) → llaman más la atención que su contenedor.
7. **`RevealGroup` roto en Experience**: stagger no se propaga porque hay un `<ol>` no-motion entre el contenedor y los items.
8. **Runtime crash al scrollear el Home** ("Algo ha ido mal"). Hay que reproducir y arreglar antes que nada estético.
9. **Regresión `/cv`**: se perdió la descarga directa de PDF y el botón con estilo diferenciado que pediste anteriormente.
10. **Logo de marca aún es un préstamo** (CodeSandbox) — el monograma SVG anterior se reemplazó.

---

## Plan de trabajo (qué propongo hacer)

Lo divido en 4 tandas; tú apruebas el alcance.

### Tanda A — Fundación del sistema (lo más importante)
1. **Crear `src/components/ui/chip.tsx`** con variantes `neutral` / `active` / `outline`. Reemplazar todas las píldoras inline en Experience, Projects, Skills, Hero (`PRESENT`, `ACTIVE`, stack chips, ribbon).
2. **Crear `src/components/ui/cta.tsx`** (o `pill-button`) con variantes `primary` (negro), `ghost` (link subrayado), `outline`. Sustituir las píldoras negras inline en Hero, Contact, CV.
3. **Normalizar radios**: cards = `rounded-2xl` siempre; feature/hero cards = `rounded-3xl`. Quitar mezcla.
4. **Normalizar chips dentro de surface**: chips dentro de `bg-surface/*` van con `bg-background` SOLO si el card es `bg-surface/60+`. En el resto (`/30`-`/40`) van con `border-hairline bg-transparent`. Documentar regla.
5. **Logo de marca**: BrandLogo a tokens (`text-foreground`/`text-muted-foreground` puros). Decidir: ¿seguimos con el cubo CodeSandbox o vuelvo a generar el monograma SVG propio? (te pregunto después).

### Tanda B — Recortar el accent
1. **Hero**: reducir el wash lime (más pequeño, más opacidad baja, o moverlo a una sola posición).
2. **Skills/AI**: quitar gradient `from-accent/10` y `border-accent/40`. El bloque AI se diferencia por tipografía + chip `Sparkles`, no por color.
3. **Contact**: eliminar el blur lime decorativo del feature card y el InfoCard negro "Imprimir CV". Reemplazar por un link ghost al CV.
4. **Badges de estado**: `PRESENT` y `ACTIVE` pasan a chip neutral con punto lime de 6px — lime puntual, no fondo lime.
5. **Bullets**: punto lime queda solo en hitos clave (highlights de experiencia); en listas largas, bullet neutral.

### Tanda C — Arreglos funcionales/UX
1. Reproducir y arreglar el **crash "Algo ha ido mal"** del home.
2. Re-implementar `downloadCv()` (PDF directo) en `/cv` y darle un estilo **claramente diferenciado** del CTA negro (outline con icono Download, sin volver al neon).
3. Arreglar `RevealGroup` en Experience: o `motion.ol` en lugar de `<ol>` envuelto, o eliminar stagger del Group y dejar `Reveal` individuales.
4. Contact: sustituir avatares "LI/GI" por iconos lucide (`Linkedin`, `Github`).
5. Header: quitar el lockup de texto, dejar solo el icono + ocultar el nombre en móvil — el nombre ya es el H1 del hero.

### Tanda D — Pulido fino (opcional)
1. Footer: usar variant compacta del logo (no la grande), igualar densidad al header.
2. Projects: añadir un tag de stack (3 chips) por proyecto y opcionalmente un mock de color/gradient pasivo para que la grid respire.
3. `CV` toolbar: pasar a barra fija de acciones (no card) alineada con el navbar.

---

## Detalles técnicos

- Crear los componentes en `src/components/ui/` siguiendo shadcn (cva + variantes).
- Todo nuevo CSS solo si no se puede hacer con utilidades.
- Cero colores fuera de tokens — si necesito un tinte, lo hago con `color-mix(in oklab, var(--accent) X%, transparent)` en `src/styles.css`, no inline.
- Mantener Reveal/Motion existente; solo arreglar el caso de Experience.
- Sin tocar `cv.ts`, i18n, ni routing.

---

## Preguntas antes de implementar

1. ¿Tanda A + B + C de golpe, o las apruebas una a una?
2. **Logo**: ¿vuelvo a generar el monograma SVG propio (US) o mantengo el cubo CodeSandbox cambiando solo los colores a tokens?
3. **Acento lime**: ¿te lo dejo solo como puntito/underline/selección (más editorial) o quieres conservarlo también en el wash sutil del hero?
