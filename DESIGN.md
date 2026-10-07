---
name: Cecilia Esposito — Biodecodificación
description: Landing de acompañamiento. Juncal al amanecer, marfil que respira, romana clásica y una sola acción.
colors:
  forest: "#16281D"
  pine: "#1E3626"
  moss: "#33513A"
  fern: "#4A6B4E"
  sage: "#8FA98B"
  sage-pale: "#C3D2BC"
  bone: "#F5F2EA"
  bone-deep: "#EBE6D9"
  bone-veil: "#FBF9F4"
  sun: "#E0B472"
  sun-pale: "#F0D9AE"
  dusk: "#A79BB0"
  ink: "#14201A"
  ink-soft: "#3C4B41"
  ink-veil: "rgb(8 16 11)"
  ink-shadow: "rgb(20 32 24)"
typography:
  display:
    fontFamily: "Marcellus, 'Times New Roman', serif"
    fontSize: "clamp(2.75rem, 1.4rem + 6vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  display-sub:
    fontFamily: "Marcellus, 'Times New Roman', serif"
    fontSize: "0.5em"
    fontWeight: 400
    lineHeight: 1.22
    letterSpacing: "0.01em"
  section-title:
    fontFamily: "Marcellus, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 1.35rem + 2.7vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.004em"
  quote:
    fontFamily: "Marcellus, 'Times New Roman', serif"
    fontSize: "clamp(1.75rem, 1.05rem + 3vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.006em"
  offer-title:
    fontFamily: "Marcellus, 'Times New Roman', serif"
    fontSize: "clamp(1.6rem, 1.2rem + 1.4vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "normal"
  faq-question:
    fontFamily: "Marcellus, 'Times New Roman', serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  step-title:
    fontFamily: "Marcellus, 'Times New Roman', serif"
    fontSize: "clamp(1.3rem, 1.1rem + 0.8vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.24
    letterSpacing: "normal"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "0.004em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.955rem + 0.22vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: "0.004em"
  card-body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.004em"
  meta:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.08em"
  skip:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
  nav:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.1em"
  kicker:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.22em"
  button-sm:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.16em"
  micro:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.5625rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.26em"
  menu-link:
    fontFamily: "Marcellus, 'Times New Roman', serif"
    fontSize: "clamp(1.5rem, 7vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "14px"
  lg: "28px"
  arch: "50% 50% 14px 14px / 38% 38% 14px 14px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "44px"
  xl: "80px"
  section: "clamp(88px, 11vw, 168px)"
components:
  button-primary:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.bone-veil}"
    typography: "{typography.kicker}"
    rounded: "{rounded.pill}"
    padding: "20px 34px"
  button-primary-hover:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.bone-veil}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.pine}"
    typography: "{typography.kicker}"
    rounded: "{rounded.pill}"
    padding: "20px 34px"
  button-on-dark:
    backgroundColor: "{colors.bone-veil}"
    textColor: "{colors.forest}"
    typography: "{typography.kicker}"
    rounded: "{rounded.pill}"
    padding: "20px 34px"
  panel-dark:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.bone}"
    rounded: "{rounded.lg}"
    padding: "clamp(32px, 5vw, 72px)"
  offer-card:
    backgroundColor: "{colors.bone-veil}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "clamp(26px, 3vw, 44px)"
  offer-tag:
    backgroundColor: "transparent"
    textColor: "{colors.moss}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
---

# Design System: Cecilia Esposito — Biodecodificación

## Overview

**La tesis.** Un juncal al amanecer, visto desde adentro. La página alterna entre bloques profundos de verde —donde la imagen manda y el texto es poco y grande— y bandas de marfil donde se lee sin esfuerzo. El verde no es un acento: es el material del sitio y ocupa cerca de la mitad de la superficie. El marfil existe para que el verde respire.

**Carácter material.** Ilustración plana por capas, no fotografía. Un solo idioma para todas las escenas: bandas de color con perspectiva aérea, una línea de horizonte encendida, un sol bajo con halo continuo, y textura de **trazos horizontales** —rectángulos cortos y tenues— que sirve igual para el reflejo en el agua, para las nubes y para la luz rasante entre los juncos. Cada escena se arma con azar sembrado desde `tools/gen-art.mjs`, así que es reproducible y editable. Grano fino y viñeteo sobre toda superficie verde: nada plano.

**El juncal.** El motivo que ordena el sitio: juncos de espadaña y hojas en cinta, en tres profundidades —lejanos y pálidos contra la luz, medios de color, cercanos en silueta casi negra—. Aparece en el inicio, en la tarjeta de Sesión 1 a 1 y en la llamada final, siempre con el mismo sol saliendo. Es lo que hace que el sitio se reconozca de un vistazo.

**Postura de imagen.** El sitio funciona entero con ilustración propia; ninguna foto es un pendiente. Toda fotografía que se agregue entra por el mismo filtro para no romper la
paleta: `saturate(.9) contrast(1.02)`, un baño verde plano al 16% y un velo de tres
tramos (arriba para la navegación, abajo para el texto, más viñeteo). Por eso una
foto luminosa y una ilustración oscura conviven sin que el sitio cambie de tono, y
por eso **la mitad inferior de cualquier foto tiene que ser prescindible**.

Ninguna imagen decorativa. Cada escena muestra **lo que pasa** en la propuesta que ilustra, contado en clave holística: dos mujeres sentadas frente a frente, de perfil, con un retoño entre ellas del que salen ondas de luz (Sesión 1 a 1); la ronda alrededor del fuego en la hora azul, con anillos de luz, pétalos y un lobo aullándole a la luna (Círculo); una espiral de luz que vuelve al centro, con cinco piedras —una por programa— y alguien caminando hacia adentro (Volver a Vos); una mujer meditando frente al mar y otra de perfil sobre una roca entre la bruma (Retiros). Ninguna foto de banco genérica, ninguna mano sobre una vela.

**El lenguaje holístico de las escenas de servicio.** Luz dorada que atraviesa todo (halo desenfocado y, donde suma, un abanico de rayos suaves; nunca en todas), bruma entre planos, botánica desenfocada que enmarca desde las esquinas, ondas concéntricas sobre el suelo para lo que circula entre personas, motas de luz, flores chicas en el pasto, y el malva crepuscular en el cielo. Cada figura lleva detrás un aura: su misma silueta en luz, agrandada y desenfocada. Todo se dibuja en `tools/gen-art.mjs` con ayudas reutilizables (`rayos`, `ondas`, `ramo`, `flor`, `motas`, `perfil`, `aura`).

**La regla de la figura de espaldas.** Las personas dibujadas son siempre siluetas, de espaldas o de perfil, sin cara y sin pose. La única cara del sitio es la de Cecilia, en su foto.

**Gramática de movimiento.** Un solo gesto autoral: el contenido *emerge de la bruma*. Los elementos entran desde 18px abajo, con `blur(10px)` que se disuelve y opacidad que sube, escalonados de a 90ms, con salida exponencial. Nada rebota, nada gira, nada aparece dos veces. Con `prefers-reduced-motion` todo está visible y quieto desde el primer frame.

**Firma reutilizable.** El *panel*: un bloque de esquinas muy redondeadas (28px) recortado hacia adentro del margen de la página, con la escena a sangre por dentro. El hero y la llamada final son paneles; abren y cierran la página con la misma escena.

## Colors

Estrategia: **paleta completa con verde dominante**. Cuatro roles con nombre — bosque, marfil, sol, crepúsculo — donde el verde gobierna regiones enteras y los demás aparecen en cantidades decrecientes.

### Primary
- **Bosque** (`#16281D`): el verde más profundo. Fondo de los paneles oscuros, texto de titulares sobre marfil. Es el negro del sitio; no existe un negro real.
- **Pino** (`#1E3626`): superficie del botón primario y de las tarjetas verdes sobre marfil.
- **Musgo** (`#33513A`) y **Helecho** (`#4A6B4E`): masas medias del follaje dibujado y bordes vivos dentro de los paneles.

### Secondary
- **Salvia** (`#8FA98B`): texto secundario sobre verde profundo. Cumple 4.5:1 sobre bosque. Nunca gris.
- **Salvia clara** (`#C3D2BC`): filetes, marcos botánicos y trazos de la ilustración de línea.

### Tertiary
- **Sol** (`#E0B472`) y **Sol claro** (`#F0D9AE`): la luz. Aparece como floración detrás del follaje, como filete bajo un kicker y como subrayado del enlace activo. Nunca como fondo de un botón.
- **Crepúsculo** (`#A79BB0`): un malva apagado que existe **solo dentro de la ilustración** (cielo del Círculo de Mujeres, bruma del retiro de montaña). Nunca es color de interfaz.

### Neutral
- **Marfil** (`#F5F2EA`) fondo de página, **Marfil profundo** (`#EBE6D9`) bandas alternas, **Marfil velo** (`#FBF9F4`) tarjetas claras.
- **Tinta** (`#14201A`) titulares sobre claro; **Tinta suave** (`#3C4B41`) cuerpo sobre claro (7.9:1).

### Named Rules
- **La regla del verde que manda.** Ninguna pantalla completa puede scrollearse sin que un bloque verde profundo entre en cuadro. Si una zona quedó toda marfil por más de dos secciones, falta un panel.
- **La regla del gris prohibido.** No existe un gris neutro en el sistema. Todo texto apagado se tiñe del verde o del marfil que tiene debajo.
- **La regla del sol escaso.** El sol ilumina; no rellena. Si el ámbar ocupa más que un filete, un trazo o un halo, se pasó.

## Typography

Dos familias, roles estrictos.

- **Marcellus** (romana clásica de proporción capitular, 400): todo lo que se lee grande. Elegida por sus mayúsculas de proporción romana, que sostienen un titular enorme sin ponerse decorativas, y por una minúscula de eje humanista que no cae en la ampulosidad de una didona.
- **Archivo** (grotesca editorial, 400/500/600): cuerpo, navegación, botones, etiquetas. Elegida por su ojo grande a 17px y por comportarse bien en versalitas muy espaciadas.

### Hierarchy
- **Display** — Marcellus `clamp(2.75rem, 6.4vw, 5.25rem)`, interlínea 1.04, tracking -0.005em. Titular del hero y del cierre.
- **Display caps** — Marcellus en mayúsculas, tracking +0.02em. Títulos de sección.
- **Cita** — Marcellus en caja baja, `clamp(1.75rem, 3.9vw, 3.25rem)`, interlínea 1.3. Solo para las frases textuales de Cecilia; hoy, el titular de la llamada final.
- **Cuerpo** — Archivo 17–18px, interlínea 1.72, medida 62–70ch.
- **Kicker** — Archivo 11px, 500, tracking 0.22em, mayúsculas.

### Named Rules
- **La regla de un solo kicker por acto.** El kicker en versalitas espaciadas nombra secciones informativas; jamás encabeza una banda de cita ni un panel de imagen. Si aparece en cada sección, dejó de ser sistema.
- **La regla de la frase intacta.** Las frases de Cecilia se componen literalmente, sin comillas tipográficas de adorno, sin puntuación agregada y sin partirlas para que entren.

## Layout

### Recorrido de la página

Es una landing, no un folleto: cada sección tiene un solo trabajo y el orden es el de una decisión.

1. **Hero** — la promesa ("Volver a vos…") y la acción.
2. **Franja** — la oferta entera en una línea.
3. **¿Te pasa esto?** — el problema, en situaciones donde alguien se reconoce.
4. **Qué es** — la Biodecodificación en tres ideas, con su aclaración de que no reemplaza tratamientos.
5. **Propuestas** — las cuatro formas de trabajar, comparables de un vistazo.
6. **Sobre mí** — quién acompaña.
7. **Cómo empezamos** — el plan en tres pasos.
8. **Preguntas** — las objeciones, contestadas sin inventar datos.
9. **Llamada final** — la segunda frase de Cecilia como titular, y la acción.

Los fondos alternan para que cada tramo se lea como uno: oscuro (hero) · marfil profundo · marfil · **bosque** · marfil · marfil profundo · **bosque** · marfil · oscuro (cierre). Toda propuesta vive en la sección Propuestas: ninguna tiene una sección propia con un diseño propio, porque eso es lo que convierte una landing en un folleto.

### Segunda página: Formación

`formacion.html` ("Mi formación") usa el mismo sistema, más corta: un inicio de 68svh (no de pantalla completa) sobre la escena de la montaña, "Cómo llegué" con el retrato en arco (el arco sigue apareciendo una sola vez por página), el camino de aprendizaje sobre bosque, "Cómo acompaño" sobre marfil profundo y el mismo cierre. La navegación apunta a `index.html#…` y marca la página actual con `aria-current="page"`, que la subraya.

- **Hito** (`.hito`): un tramo del camino, no un renglón de currículum. Punto de luz en sol claro sobre un trazo vertical; nombre del tramo en versalitas, una frase en Marcellus, y un párrafo donde las disciplinas aparecen nombradas dentro del relato (en Marcellus, marfil). El último, "Hoy", es lo que sigue en curso: su punto late despacio (quieto con movimiento reducido).

### Medidas

Página de un solo ancho: `min(1240px, 100% - 2 * clamp(20px, 5vw, 64px))`. Dentro, tres medidas de contenido: ancho completo (paneles), columna de lectura (68ch) y columna estrecha de cita (24ch para que corte donde el sentido corta).

Ritmo vertical único: `clamp(88px, 11vw, 168px)` entre secciones; el doble de aire arriba de un título que abajo. Los paneles se recortan hacia adentro del ancho de página en escritorio y van a sangre completa por debajo de 640px, donde el radio baja de 28px a 20px.

Las secciones de texto (¿Te pasa esto?, Cómo empezamos, Preguntas, y el encabezado de Qué es) comparten una sola grilla 5/7: título y acción a la izquierda, contenido a la derecha. En escritorio, la columna izquierda queda fija (`position: sticky`) mientras se lee la derecha. Debajo de 1024px colapsa a una columna.

Las tarjetas iguales existen **una sola vez**: en Propuestas, porque ahí el contenido es de verdad paralelo y se tiene que poder comparar. Dos por fila, misma anatomía, el botón siempre al pie. En cualquier otro lugar, nada de grillas de tarjetas.

## Elevation & Depth

La profundidad es **atmosférica, no de sombra**. Se construye con perspectiva aérea: las capas lejanas del follaje pierden contraste y ganan bruma, las cercanas se desenfocan. Sobre cada panel verde va grano fino (~3% de opacidad) y un viñeteo radial suave.

### Shadow Vocabulary
- **Reposo del panel**: `0 24px 60px -32px rgba(20, 32, 24, .45)`. Desplazamiento y difuminado reales.
- **Tarjeta clara**: `0 2px 4px -2px rgba(20,32,24,.06), 0 12px 28px -18px rgba(20,32,24,.18)`.
- **Foco**: anillo de 2px en sol (`#E0B472`) con 3px de separación. Nunca `outline: none` sin reemplazo.

### Named Rules
- **La regla del halo prohibido.** Ninguna sombra sin desplazamiento vertical. Un resplandor de color centrado es decoración, no profundidad.

## Shapes

Esquinas generosas y un arco. Radios: 6px (foco), 14px (esquinas del arco), 28px (paneles y tarjetas de propuesta), píldora total (botones y etiquetas). El **arco** —medio punto arriba, esquinas suaves abajo— está reservado al retrato y aparece una sola vez en la página, para que siga siendo un gesto.

La **piedra** es la forma de las imágenes de servicio: un canto rodado hecho con `border-radius` asimétrico en porcentajes (cada lado suma 100%, así no queda ningún tramo recto). Cada propuesta tiene la suya. Alrededor lleva un contorno de 1px en helecho con **otra** forma de piedra, corrido unos píxeles: las dos líneas se cruzan como un campo. Al pasar el mouse, piedra y contorno intercambian sus formas en 2s; con movimiento reducido, quedan quietas.

### Named Rules
- **La regla de la imagen sin esquinas.** Ninguna imagen de servicio es un rectángulo. Si una propuesta nueva entra al sitio, entra con su propia piedra.

Los filetes son de 1px en salvia clara al 40%. No existe ningún borde de color de más de 1px, ni ningún borde lateral grueso.

## Components

- **Botón primario**: píldora pino, texto marfil velo, Archivo 11px tracking 0.22em, 20/34px, con una flecha que avanza 4px al hover. Sobre paneles verdes invierte a marfil sólido con texto bosque.
- **Botón fantasma**: mismo tamaño, sin relleno, filete de 1px, subrayado que crece desde la izquierda al hover.
- **Panel**: bloque de radio 28px con escena a sangre, grano, viñeteo y contenido sobre una columna de 60ch como máximo. Solo el hero y la llamada final.
- **Tarjeta de propuesta** (`.oferta`): marfil velo, radio 28px, filete de 1px y sombra de tarjeta clara. Anatomía fija, en este orden: escena en forma de piedra (16:10) sobre un aura de salvia apenas visible · tipo en versalitas (Individual, Grupal…) · nombre en Marcellus · texto · un dato en etiqueta de píldora *o* una lista de renglones · botón de WhatsApp al pie. Al pasar el mouse, la piedra respira (cambia de forma) y la escena se acerca un 4.5%; la tarjeta no se mueve. En Retiros, dos piedras se superponen —mar y montaña— separadas por un borde de 4px del color de la tarjeta.
- **Lista de renglones** (`.oferta__programas`): nombres propios en Marcellus separados por filete; a la derecha, en versalitas chicas, el dato que los distingue ("con Estela Fitere", "Frente al agua").
- **Pilar** (`.pilar`): glifo de línea en sol claro, título y texto, con filete superior. Solo en Qué es, sobre bosque.
- **Paso** (`.paso`): número grande en Marcellus sol claro a la izquierda, título y texto a la derecha. Acá el número sí informa: es el orden en que pasan las cosas.
- **Pregunta** (`.faq__item`): `<details>` nativo, uno abierto por vez (`name="faq"`). Pregunta en Marcellus, un + de 14px que gira 45° al abrir, respuesta con un fundido corto. No se anima la altura.
- **Navegación**: transparente sobre el hero, con `--nav-top` (14–34px) de aire arriba para no quedar pegada al borde del panel. Al scrollear adopta marfil con `backdrop-filter: blur(14px)` y un filete inferior, y ese aire desaparece con un desplazamiento del contenido —nunca animando la altura—. En móvil, panel completo marfil con los enlaces en Marcellus grandes.
- **Acción de sección**: ninguna sección termina en un link subrayado; todas las que piden algo terminan en un botón de WhatsApp. Sobre marfil, el botón pino; sobre verde, el marfil sólido. En celular, toda acción principal va a todo el ancho y nunca corta su texto en dos renglones.
- **Botón de WhatsApp**: todo botón que abre el chat lleva el logotipo de WhatsApp a 17px antes del texto, desde un único `<symbol>` en el documento. No hay botón de contacto sin ese logo.
- **Lista de reconocimiento** (`.paraquien__list`): la única lista larga del sitio. Filas separadas por filete de 1px en salvia, cada una precedida por un guion de 18px en sol, texto a tamaño de bajada sobre marfil. Sirve para que alguien se reconozca en una situación; nunca para enumerar beneficios ni características.
- **Escena del hero** (`.scene--hero`): cuatro capas SVG con `data-depth` creciente, movidas por scroll. El horizonte vive en el 36% de la altura en las cuatro, y el sol en el 65% del ancho; en pantallas de menos de 640px el encuadre se corre a `object-position: 68%` para que el recorte no se coma el sol. Cualquier escena nueva del hero tiene que respetar esos dos números.
- **Marca**: monograma botánico dibujado en SVG + "Cecilia Esposito" en Marcellus espaciado. Sin rótulo debajo. No hay tipografía script.

## Do's and Don'ts

### Do:
- Dejar que el verde ocupe regiones enteras, no bordes ni acentos.
- Dibujar cada ilustración en la gramática del sitio: línea botánica de trazo fino, nunca un set de íconos genérico.
- Componer las frases de Cecilia grandes, solas y con aire alrededor: una abre la página (hero) y la otra la cierra (llamada final). Nunca la misma dos veces.
- Terminar todo camino en el mismo mensaje de WhatsApp.
- Tratar cada `<img>` como un slot: la escena SVG queda detrás y aguanta sola si la foto no llega.
- Cortar las frases de Cecilia donde corta el sentido, con una línea por unidad, no donde llega el ancho de la caja.

### Don't:
- Inventar precios, fechas, cupos, años de experiencia, testimonios ni cantidad de personas acompañadas. Si no está confirmado, se invita a preguntar.
- Prometer curación, diagnóstico ni resultados. Se acompaña un proceso.
- Usar gris neutro, texto con degradado, vidrio esmerilado decorativo ni sombras sin desplazamiento.
- Repetir la misma entrada animada en cada sección, ni animar nada si el sistema pide movimiento reducido.
- Poner un kicker en versalitas arriba de cada sección. Hoy hay dos en la portada: Propuestas y Sobre mí. El hero no lleva.
- Darle a una propuesta su propia sección con su propio diseño. Si aparece una propuesta nueva, es una tarjeta más en Propuestas.
- Inventar testimonios. La sección está armada y comentada en el HTML, esperando textos reales con permiso.
