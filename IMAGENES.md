# Prompts para generar las fotos

El sitio funciona sin fotos: mientras no haya ninguna se ven las ilustraciones
propias. Estos prompts son para cuando quieras reemplazarlas por imágenes
generadas (Midjourney, Flux, Nano Banana, Sora, Ideogram) o por fotos reales.

## Antes que nada

**El retrato de Cecilia tiene que ser una foto real de ella.** Es lo único de esta
lista que no se puede generar: la web entera existe para que alguien decida si
quiere trabajar con esta persona, y una cara inventada rompe exactamente eso.

Para el resto, generar está bien. Lo que hay que sostener en todas es la misma
dirección: **verde profundo, luz de contraluz baja y cálida, cero saturación
artificial, cero gente sonriendo a cámara.**

---

## Instrucción común (pegar al final de cada prompt)

> shot on 35mm film, natural backlight, low warm sun, deep forest green palette,
> shallow depth of field, soft grain, muted and desaturated, no text, no watermark,
> no logo, photorealistic, editorial photography

Si el generador acepta negativos:

> --no text, watermark, logo, oversaturated colors, HDR, teal and orange grading,
> plastic skin, stock-photo smile, crystals, candles, mandalas, lotus flowers

(Esos últimos son el kit visual de "espiritualidad genérica". No van.)

---

## 1. `hero.jpg` — pantalla de inicio · **horizontal 2000 × 1250** · *opcional*

> El inicio hoy usa la **ilustración del juncal al amanecer**, dibujada en SVG por
> `tools/gen-art.mjs`. Esta foto es una alternativa, no un pendiente: si preferís
> una fotografía, seguí este prompt y activala en `main.js`.

> Tall wild grasses and reeds photographed from within the field at golden hour,
> low sun flaring through the stems from the upper right, deep green and near-black
> foreground blades out of focus, misty depth behind, no people, no horizon line
> visible

*Importante:* el texto va abajo a la izquierda, así que **la mitad inferior
izquierda tiene que ser oscura y sin detalle**. Si la imagen tiene algo importante
ahí, no sirve.

## 2. `retrato.jpg` — "Sobre mí" · **vertical 1200 × 1600** · FOTO REAL · *puesta*

> **Ya está la foto de Cecilia frente al mar.** Llegó en 640 × 640, así que en
> pantallas de alta densidad se ve un poco blanda. Si existe el archivo original
> del celular, conviene reemplazarla: mismo nombre, recortada vertical 3:4.
> Lo de abajo queda como guía por si algún día se hace una sesión de fotos.

Guía para la sesión de fotos, no un prompt:

- Al aire libre, con vegetación detrás, a última hora de la tarde.
- Contraluz suave: el sol atrás de ella, no de frente.
- Media distancia, de la cintura para arriba. Que se le vean las manos.
- Mirada a cámara, tranquila. No sonrisa de catálogo.
- Ropa lisa, en verde, tierra, crudo o negro. Sin estampados.
- Que quede espacio de aire arriba de la cabeza: la foto se recorta en arco.

> Las cuatro que siguen van arriba de cada **tarjeta de Propuestas**. No llevan
> texto encima, así que no necesitan zonas oscuras: lo único que importa es que
> lo principal quede en el centro, porque en celular se recortan un poco.

## 3. `sesion.jpg` — tarjeta "Sesión 1 a 1" · **horizontal 1600 × 900**

> Two empty armchairs facing each other in a quiet room with warm afternoon light
> coming through a window, plants nearby, wooden floor, no people, calm and
> unstaged, lived-in

## 4. `circulo.jpg` — tarjeta "Círculo de Mujeres" · **horizontal 1600 × 900**

> Overhead view of a circle of cushions and blankets on a wooden floor around a
> small arrangement of dried branches and leaves, warm low lamplight, no people,
> intimate and simple

Si preferís mostrar mujeres, que sea **de espaldas o en silueta**, nunca posando.

## 5. `programas.jpg` — tarjeta "Volver a Vos" · **horizontal 1600 × 900**

> A narrow footpath winding up through green hills at sunrise, a few stones
> marking the way, soft mist in the valleys, no people, quiet and open

Hoy esa tarjeta tiene un mapa dibujado con un sendero y cinco estaciones, una por
programa. Funciona bien sin foto; esta es solo una alternativa.

## 6. `mar.jpg` y `montana.jpg` — tarjeta "Retiros" · **900 × 1000 cada una**

Van una al lado de la otra, cada una ocupando la mitad de la imagen de la tarjeta.

> **mar.jpg** — Empty coastline at dawn, calm sea, low sun just above the horizon,
> dune grasses in the foreground, cool green water and pale warm sky, no people

> **montana.jpg** — Layered mountain ridges receding into morning mist, dark
> green pine forest in the foreground, pale sky, aerial perspective, no people,
> no buildings, Patagonian Andes

Abajo a la izquierda de cada una va una etiqueta chica ("Mar", "Montaña"): que esa
esquina no tenga nada importante.

## 7. `og.jpg` — imagen para compartir · **horizontal 1200 × 630**

La que se ve cuando alguien manda el link por WhatsApp o Instagram. **Ya está
hecha**: es una captura del propio inicio. Solo hace falta rehacerla si cambia el
hero.

---

## Cómo ponerlas

1. Guardá cada archivo en `assets/img/` con exactamente ese nombre.
2. Abrí `assets/js/main.js` y en el bloque `FOTOS` cambiá el `null` por el nombre:

   ```js
   const FOTOS = {
     hero:     'hero.jpg',
     retrato:  'retrato.jpg',
     ...
   ```

3. Podés poner una sola y dejar el resto en `null`. Las que falten siguen mostrando
   la ilustración.

**Peso:** exportá en JPG calidad 80. Ninguna debería pasar los 400 kB. Si pesan
más, la web se va a sentir lenta en celular con datos, que es exactamente donde va
a entrar la mayoría.
