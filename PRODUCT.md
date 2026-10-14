# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Mujeres adultas hispanohablantes (Argentina, principalmente AMBA), en general entre 30 y 60 años, que atraviesan un momento de dolor, síntoma físico recurrente, duelo, crisis vincular o agotamiento, y buscan un acompañamiento que no sea clínico-farmacológico. Llegan casi siempre por recomendación boca a boca o desde Instagram, muchas veces desde el celular, y lo que quieren resolver en la web es una sola cosa: entender si esta persona es la indicada para acompañarlas, y cómo escribirle.

Audiencia secundaria: mujeres que ya conocen a Cecilia y vuelven a la web para ver qué programa, círculo o retiro está abierto.

## Product Purpose

Sitio de dos páginas de Cecilia Esposito —la landing y una página de Formación—, profesional de biodecodificación. La web existe para transmitir su mirada y su tono, mostrar con claridad las formas de trabajar con ella (sesión individual, círculos, programas, retiros) y convertir esa lectura en un primer mensaje por WhatsApp. El éxito se mide en mensajes iniciados, no en tiempo de permanencia.

## Positioning

Biodecodificación entendida como acompañamiento de procesos, no como técnica de diagnóstico ni promesa de cura. La frase que ordena todo el discurso es "Volver a vos": el trabajo es de reconexión con lo propio, no de intervención externa. Dos ejes diferenciales confirmados: el trabajo grupal de mujeres a partir de "Mujeres que corren con los lobos" (co-coordinado con Estela Fitere) y los retiros de mar y montaña.

## Operating Context

- Sesiones individuales presenciales o virtuales.
- Círculos y programas con cupo, en general por cohortes.
- Co-coordinación con Estela Fitere en el Círculo de Mujeres, Espacio de Reconexión e Hilos invisibles.
- Retiros presenciales de mar y de montaña.
- Contacto y coordinación operan íntegramente por WhatsApp e Instagram; no hay sistema de reservas ni pagos online.

## Capabilities and Constraints

- Sitio estático de dos páginas (`index.html` y `formacion.html`), sin backend, sin base de datos y sin build step: debe poder publicarse en Netlify, Vercel o GitHub Pages arrastrando una carpeta.
- Idioma único: español rioplatense (voseo).
- CTA único y global: WhatsApp al +54 9 11 3674 0941 (`wa.me/5491136740941`) con mensaje pre-escrito. No hay formulario, no hay email público.
- Instagram: https://www.instagram.com/ceciliaesposito2/
- Dos fotografías reales de Cecilia: `assets/img/retrato.jpg` (bajo un lapacho en flor, usada en "Sobre mí" y en "Mi formación") y `assets/img/retrato-mar.jpg` (frente al mar, guardada sin usar). Originales en `_originales/`. Todo lo demás se resuelve con arte propio o queda como slot explícito y reemplazable desde un único lugar.
- Mobile-first: la mayoría del tráfico llega desde Instagram en celular.
- Fechas, precios, cupos y duraciones: **no confirmados**. No deben inventarse ni insinuarse.

## Brand Commitments

- **El término es "Biodecodificación"** (pedido de la clienta, octubre 2026). Nunca "Biodescodificación", tampoco en nombres de programas ni metadatos.
- El logo es el monograma y el nombre "Cecilia Esposito", sin rótulo debajo.
- Sobre Estela Fitere se dice que Cecilia **coordina en conjunto con ella** (el Círculo de Mujeres, Espacio de Reconexión e Hilos invisibles), no que "trabaja junto a" ella.

- Nombre: Cecilia Esposito.
- Frases textuales de la profesional, de uso literal:
  - "Volver a vos es el camino más verdadero."
  - "Lo que es tuyo no se pierde con el ruido, solo necesita que vuelvas."
  - "Te acompaño en tu proceso de crecimiento y transformación."
  - "Acompañar procesos también es aprender a escuchar lo invisible."
- Nombres propios de la oferta que no se renombran: Círculo de Mujeres; Programas "Volver a Vos"; Senderos de Sanación; Mapas de Sanación; Espacio de Reconexión; Hilos invisibles; La Mirada de la Biodecodificación en la Vida Cotidiana; Retiros de Mar y de Montaña.
- Crédito obligatorio a Estela Fitere en las propuestas que co-coordina.
- Voz: cercana, en segunda persona del voseo, pausada, sin jerga terapéutica dura, sin lenguaje de marketing agresivo ni urgencia comercial.

## Evidence on Hand

- Copy provisto por la profesional: dos frases de identidad, el bloque "Mi Mirada", la descripción de Modalidad y el listado de círculos, programas y retiros.
- Referencias visuales aportadas por el cliente: shot "Holistic Healing Website" de Dribbble y la categoría mindful-wellness web design.
- **Retratos de Cecilia**: uno en una vereda arbolada bajo un lapacho en flor; otro al aire libre, frente al mar con montañas nevadas detrás. No se sabe dónde fue tomada; no nombrar el lugar.
- **Formación (confirmada por la clienta, octubre 2026)**: Sanación energética, Escuela de Barbara Brennan · Biodecodificación, Humano Puente · 5 Leyes Biológicas, Bodhi Medicine · Respiración y Trauma, Heart Breath Method · Escritura psicosomática, Sofía Villalonga · Grupo de mujeres con «Mujeres que corren con los lobos», Fundación Creavida (lo integró durante 20 años: es la experiencia que más peso tiene y va primero en su tramo) · Eutonía y mindfulness · Bioenergética (cursando). Sin años ni orden cronológico: no se inventan.
- **No existen**: testimonios, cantidad de personas acompañadas, años de experiencia, precios, fechas, sedes, otras fotografías ni logotipo. Nada de esto puede fabricarse ni sugerirse como si existiera.

## Product Principles

1. **Confianza antes que oferta.** La persona decide por tono y presencia; el listado de talleres sirve solo después de que se sintió leída.
2. **No prometer resultados.** Se acompaña un proceso; no se cura, no se diagnostica, no se garantiza.
3. **Un solo camino de salida.** Todo lo que se toca conduce al mismo mensaje de WhatsApp.
4. **Cero contenido inventado.** Si un dato no está confirmado, la web no lo insinúa; se resuelve invitando a preguntar.
5. **Liviana y editable.** La clienta o quien la ayude debe poder cambiar textos y reemplazar imágenes sin herramientas ni conocimiento técnico.

## Accessibility & Inclusion

Público mayormente adulto leyendo en celular, a veces en contextos de angustia: tamaño de texto generoso, contraste real (AA como piso), objetivos táctiles amplios, y respeto estricto de `prefers-reduced-motion` — el sitio usa movimiento ambiental y no debe marear a nadie.
