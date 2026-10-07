# Web de Cecilia Esposito

Sitio de una sola página, estático. **No necesita compilarse ni instalar nada.**
Son archivos sueltos: se abren, se editan con cualquier editor de texto y se suben.

---

## Verla en la compu

Doble clic en `index.html`. Listo.

Si querés verla como se va a ver publicada (con las rutas resueltas igual que en el
servidor), abrí una terminal en esta carpeta y corré:

```bash
npx -y serve -l 4321 .
```

Después entrá a `http://localhost:4321`.

---

## Publicarla

Cualquiera de estas tres sirve y las tres son gratis para un sitio así:

**Netlify (la más simple).** Entrá a [app.netlify.com/drop](https://app.netlify.com/drop)
y arrastrá **esta carpeta entera** a la ventana. En treinta segundos te da una
dirección. Después, desde el panel, se le puede conectar el dominio propio.

**Vercel.** Igual: `vercel.com/new`, arrastrar la carpeta.

**GitHub Pages.** Subir la carpeta a un repositorio y activar Pages sobre la rama
`main`, carpeta raíz.

No hay build, no hay variables de entorno, no hay backend.

> La carpeta `_originales/` guarda las fotos sin comprimir. La página no las usa
> nunca. Podés borrarla antes de publicar; son 4,5 MB de más en el servidor.

---

## Lo que se edita a mano

### 1. El WhatsApp y los mensajes

Están en `assets/js/main.js`, en las primeras líneas del archivo:

```js
const WHATSAPP = '5491136740941';
```

El número va en formato internacional, **sin `+`, sin espacios y sin guiones**:
`54` (Argentina) + `9` (celular) + `11` (Buenos Aires) + el número.

Justo debajo está `MENSAJES`: el texto con el que se abre el chat según desde qué
botón hayan tocado. Se puede cambiar cualquiera.

### 2. Las fotos

Ver `assets/img/README.md`. Resumen: guardás la foto en `assets/img/` y en
`main.js`, dentro del bloque `FOTOS`, cambiás el `null` por el nombre del archivo.

La foto de Cecilia ya está en "Sobre mí" (`retrato.jpg`). Las demás están en
`null`: el resto del sitio se ve con las ilustraciones propias, incluido el inicio
(el juncal al amanecer). No se rompe nada si nunca se completan.

La foto llegó en 640 × 640: si existe el original del celular, conviene
reemplazarla para que se vea nítida en pantallas de alta densidad.

La foto de la pradera quedó guardada en `assets/img/hero.jpg` por si algún día la
querés en el inicio: poné `hero: 'hero.jpg'` y listo. Mientras siga en `null`,
nadie la descarga.

Cualquier foto que pongas se integra sola a la paleta: el sitio le baja la
saturación, le pasa un baño verde y le pone un velo oscuro abajo para que el texto
se lea encima. Por eso conviene que la mitad inferior de cada foto no tenga nada
importante.

### 3. Los textos

Están todos en `index.html`, en castellano, con comentarios que marcan cada sección
(`<!-- ============ 4. PROPUESTAS · la oferta, comparable ============ -->`). Se
cambian directamente ahí.

La página sigue el recorrido de una landing, en este orden:

1. **Hero** — "Volver a vos es el camino más verdadero" y el botón de WhatsApp.
2. **Franja** — la oferta en una línea.
3. **¿Te pasa esto?** — situaciones en las que alguien se reconoce.
4. **Qué es la Biodecodificación** — tres ideas y la aclaración médica.
5. **Propuestas** — las cuatro, en tarjetas iguales para poder compararlas.
6. **Sobre mí** — quién acompaña.
7. **Cómo empezamos** — tres pasos.
8. **Preguntas frecuentes**.
9. **Llamada final** — "Lo que es tuyo no se pierde con el ruido…".

**Si aparece una propuesta nueva**, se copia una de las cuatro tarjetas
(`<article class="oferta">`) y se cambian los textos. No se le arma una sección propia.

**Testimonios:** la sección ya está armada pero apagada, dentro de un comentario
justo después de "Sobre mí". Cuando haya testimonios reales —con permiso de quien
los escribió— se reemplazan los textos y se borran las dos líneas del comentario.

### 4. El Instagram

Aparece dos veces en `index.html`. Buscá `instagram.com` y reemplazá.

---

## Lo que falta confirmar con Cecilia

### La página "Mi formación"

`formacion.html` ya tiene el camino de aprendizaje de Cecilia, contado en tramos
y no como currículum. Conviene que ella confirme:

- **Los nombres tal como los quiere ver**: "Escuela de Barbara Brennan",
  "Humano Puente", "5 Leyes Biológicas" con Bodhi Medicine, "Respiración y Trauma"
  con Heart Breath Method, "escritura psicosomática" con Sofía Villalonga, Fundación
  Creavida. En la lista original decía "escritura psomática" y "heartbreathmethod":
  interpreté "psicosomática" y "Heart Breath Method".
- **Los textos de cada tramo**: lo que cada formación le dejó está escrito por mí,
  en primera persona. Que lo haga suyo.
- **El agrupamiento**: los tramos juntan formaciones afines, sin fechas. Si prefiere
  un orden cronológico, se reordenan los bloques `<li class="hito">`.



Estas cosas están escritas por mí y conviene que ella las lea antes de publicar:

- **"Qué es la Biodecodificación"** — la definición y las tres ideas (el síntoma
  como mensaje, la historia familiar, el proceso a tu ritmo). Es la sección más
  delicada: tiene que decir lo que ella diría, con sus palabras.
- **Los párrafos de "Sobre mí"** — están en primera persona siguiendo su tono, pero
  son míos. Que los haga suyos. Si quiere sumar formación o trayectoria, va acá.
- **Las seis líneas de "Quizás llegaste hasta acá porque…"** — es el bloque que más
  va a decidir si alguien escribe o no; conviene revisarlas una por una.
- **Las cinco preguntas frecuentes y sus respuestas.** Ninguna da un dato que no
  tenga (ni precio, ni duración, ni dirección): todas invitan a escribir. Si ella
  quiere publicar alguno de esos datos, se agrega.
- **Los textos de las cuatro tarjetas de Propuestas.**
- **Los tres pasos de "Cómo empezamos"** — describen el flujo por WhatsApp.

Lo que **no** está inventado en ningún lado: precios, fechas, cupos, duraciones,
años de experiencia, formación, testimonios ni cantidad de personas acompañadas.
Nada de eso aparece porque no lo tenía confirmado. Si se quiere agregar, se agrega
con el dato real.

La línea *"El acompañamiento no reemplaza ningún tratamiento médico ni psicológico"*
aparece en "Qué es", en las preguntas frecuentes y en el pie. Conviene dejarla.

---

## Estructura

```
index.html                 la página entera, con los textos
assets/css/styles.css      todo el diseño
assets/js/main.js          WhatsApp, fotos, menú y animaciones
assets/art/*.svg           las ilustraciones (generadas, ver tools/)
assets/img/                acá van las fotos reales
tools/gen-art.mjs          regenera las ilustraciones: node tools/gen-art.mjs
DESIGN.md                  el sistema visual (colores, tipografías, reglas)
PRODUCT.md                 a quién le habla la web y qué no puede afirmar
IMAGENES.md                los prompts para generar las fotos con IA
```

---

## Antes de publicar, revisar

- [ ] El número de WhatsApp abre el chat correcto (probalo desde el celular).
- [ ] El link de Instagram va a la cuenta correcta.
- [ ] Cecilia leyó y aprobó los textos marcados arriba.
- [ ] Está la imagen `assets/img/og.jpg` (1200 × 630), que es la que se ve cuando
      alguien comparte el link por WhatsApp. *(ya está)*
- [ ] Borraste `_originales/` si no querés subirla.
