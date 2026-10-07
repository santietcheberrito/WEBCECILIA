# Fotos

**La pantalla de inicio usa la ilustración del juncal al amanecer**, no una foto.
La foto de la pradera quedó guardada acá como `hero.jpg` por si algún día la
querés: alcanza con poner `hero: 'hero.jpg'` en `main.js`. Mientras siga en `null`
el navegador nunca la descarga. El original sin comprimir está en `_originales/`.

Guardá acá las fotos reales y después abrí `assets/js/main.js`:
en el bloque `FOTOS` cambiá el `null` por el nombre del archivo entre comillas.

    hero: 'hero.jpg',

Mientras el valor sea `null`, se ve la ilustración propia del sitio.
Nada se rompe si una foto falta.

Medidas sugeridas (JPG, calidad 80, menos de 400 kB cada una):

| clave       | dónde va                           | formato    | medida      |
|-------------|------------------------------------|------------|-------------|
| `hero`      | pantalla de inicio *(opcional)*    | horizontal | 1800 × 1005 |
| `retrato`   | "Sobre mí" **(puesta)**            | vertical   | 1200 × 1600 |
| `sesion`    | tarjeta "Sesión 1 a 1"             | horizontal | 1600 × 900  |
| `circulo`   | tarjeta "Círculo de Mujeres"       | horizontal | 1600 × 900  |
| `programas` | tarjeta "Volver a Vos"             | horizontal | 1600 × 900  |
| `mar`       | mitad izquierda, tarjeta "Retiros" | vertical   | 900 × 1000  |
| `montana`   | mitad derecha, tarjeta "Retiros"   | vertical   | 900 × 1000  |

`og.jpg` (1200 × 630) ya está: es la imagen que se ve cuando alguien comparte el
link por WhatsApp o Instagram. Es una captura del propio inicio, así que el link
previsualiza exactamente lo que se va a ver al entrar. Si cambiás el hero, conviene
volver a generarla.

**Peso:** ninguna foto debería pasar los 400 kB. Si exportás una más pesada, la web
se va a sentir lenta en celular con datos, que es donde entra casi toda la gente.
