/* ============================================================
   Cecilia Esposito · Biodecodificación

   ┌──────────────────────────────────────────────────────────┐
   │  TODO LO QUE SE EDITA A MANO ESTÁ EN ESTE PRIMER BLOQUE  │
   └──────────────────────────────────────────────────────────┘
   ============================================================ */

/* --- 1. Contacto ------------------------------------------------------
   El número va en formato internacional, sin +, sin espacios y sin guiones.
   Argentina = 54, celular = 9, Buenos Aires = 11.                        */
const WHATSAPP = '5491136740941';

/* Mensaje con el que se abre el chat según desde dónde toquen.            */
const MENSAJES = {
  general:   'Hola Cecilia, llegué a tu web y me gustaría saber más.',
  sesion:    'Hola Cecilia, quiero pedir una sesión individual.',
  circulo:   'Hola Cecilia, me interesa el Círculo de Mujeres.',
  programas: 'Hola Cecilia, quiero saber cuál de los programas es para mí.',
  retiros:   'Hola Cecilia, quiero que me avises cuando abra el próximo retiro.',
  pregunta:  'Hola Cecilia, tengo una pregunta antes de empezar.',
};

/* --- 2. Fotos ---------------------------------------------------------
   Mientras el valor sea null se ve la ilustración propia del sitio.
   Para poner una foto real: guardala en assets/img/ y escribí acá el
   nombre del archivo entre comillas. Ejemplo:  hero: 'hero.jpg'          */
const FOTOS = {
  hero:     null,   // pradera del comienzo. La foto 'hero.jpg' está guardada acá al lado:
                    // poné  hero: 'hero.jpg'  para usarla en vez de la ilustración.
  retrato:  'retrato.jpg',   // Cecilia en "Sobre mí" de la portada (vertical 3:4)
  'retrato-formacion': 'retrato-mar.jpg',   // Cecilia en "Mi formación" (vertical 3:4)
  sesion:    null,  // tarjeta de Sesión 1 a 1 (horizontal, 1600 × 900)
  circulo:   null,  // tarjeta del Círculo de Mujeres (horizontal, 1600 × 900)
  programas: null,  // tarjeta de los programas Volver a Vos (horizontal, 1600 × 900)
  mar:       null,  // mitad izquierda de la tarjeta de Retiros (vertical, 900 × 1000)
  montana:   null,  // mitad derecha de la tarjeta de Retiros (vertical, 900 × 1000)
};

/* ============================================================
   De acá para abajo no hace falta tocar nada.
   ============================================================ */

(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- WhatsApp ---------- */
  const linkWA = (clave) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAJES[clave] || MENSAJES.general)}`;

  $$('.js-wa').forEach((a) => {
    a.href = linkWA(a.dataset.msg);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---------- Fotos reales sobre la ilustración ---------- */
  $$('.scene__photo').forEach((slot) => {
    const archivo = FOTOS[slot.dataset.slot];
    if (!archivo) return;
    const img = new Image();
    img.onload = () => {
      slot.style.backgroundImage = `url("assets/img/${archivo}")`;
      slot.classList.add('is-on');
      /* una foto real de una persona sí necesita ser nombrada */
      if (slot.dataset.alt) {
        slot.setAttribute('role', 'img');
        slot.setAttribute('aria-label', slot.dataset.alt);
      }
    };
    img.src = `assets/img/${archivo}`;
  });

  /* ---------- Entrada del contenido: emerge de la bruma ----------
     Se mide la posición real en cada cuadro en lugar de esperar a que un
     observador dispare: así un salto por ancla nunca deja una sección
     invisible arriba del viewport.                                        */
  const reveals = $$('.reveal');
  if (quieto) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const pendientes = new Set(reveals);
    let cuadro = false;
    const revisar = () => {
      cuadro = false;
      const limite = window.innerHeight * 0.88;
      let i = 0;
      pendientes.forEach((el) => {
        if (el.getBoundingClientRect().top >= limite) return;
        el.style.transitionDelay = `${Math.min(i++, 5) * 90}ms`;
        el.classList.add('is-in');
        pendientes.delete(el);
      });
    };
    const pedirRevision = () => { if (!cuadro) { cuadro = true; requestAnimationFrame(revisar); } };
    window.addEventListener('scroll', pedirRevision, { passive: true });
    window.addEventListener('resize', pedirRevision);
    window.addEventListener('load', pedirRevision);
    revisar();
  }

  /* ---------- Navegación ---------- */
  const nav = $('#nav');
  const fab = $('.fab');
  const hero = $('.hero');

  const alScrollear = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-stuck', y > 40);
    if (fab) fab.classList.toggle('is-on', y > (hero ? hero.offsetHeight * 0.75 : 600));
  };
  alScrollear();
  window.addEventListener('scroll', alScrollear, { passive: true });

  /* ---------- Menú de celular ---------- */
  const burger = $('#burger');
  const menu = $('#menu');
  const cerrarMenu = () => {
    menu.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir el menú');
    document.body.style.overflow = '';
  };
  burger.addEventListener('click', () => {
    const abierto = burger.getAttribute('aria-expanded') === 'true';
    if (abierto) return cerrarMenu();
    menu.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Cerrar el menú');
    document.body.style.overflow = 'hidden';
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', cerrarMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { cerrarMenu(); burger.focus(); }
  });

  /* ---------- Sección activa en la navegación ----------
     Se observan todas las secciones, no solo las del menú: así, al pasar por
     una que no tiene enlace (el hero, los pasos, el cierre) el subrayado se
     apaga en vez de quedar pegado en la última.                              */
  const enlaces = $$('.nav__links a');
  const todas = $$('main > section');

  if (enlaces.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id ? `#${e.target.id}` : null;
        enlaces.forEach((l) => l.classList.toggle('is-current', l.getAttribute('href') === id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    todas.forEach((sec) => spy.observe(sec));
  }

  /* ---------- Parallax de las capas del bosque ---------- */
  const escenas = $$('[data-parallax]');
  if (!quieto && escenas.length) {
    let pendiente = false;
    const mover = () => {
      escenas.forEach((escena) => {
        const caja = escena.getBoundingClientRect();
        if (caja.bottom < -200 || caja.top > window.innerHeight + 200) return;
        const avance = (caja.top + caja.height / 2 - window.innerHeight / 2) / window.innerHeight;
        $$('.scene__layer', escena).forEach((capa) => {
          const d = Number(capa.dataset.depth || 0);
          capa.style.transform = `translate3d(0, ${(-avance * d).toFixed(2)}px, 0)`;
        });
      });
      pendiente = false;
    };
    const pedir = () => { if (!pendiente) { pendiente = true; requestAnimationFrame(mover); } };
    window.addEventListener('scroll', pedir, { passive: true });
    window.addEventListener('resize', pedir);
    mover();
  }

  /* ---------- Año del pie ---------- */
  const anio = $('#anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
