
const { animate, stagger } = anime;

// ===== Header: menú móvil y estado al hacer scroll =====
const header = document.querySelector('.site-header');
const botonMenu = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu-principal');

function abrirCerrarMenu(abrir) {
  menu.classList.toggle('abierto', abrir);
  botonMenu.setAttribute('aria-expanded', String(abrir));
  botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
}

botonMenu.addEventListener('click', () => {
  const estaAbierto = botonMenu.getAttribute('aria-expanded') === 'true';
  abrirCerrarMenu(!estaAbierto);
});

// Cierra el menú al elegir un enlace
menu.querySelectorAll('a').forEach((enlace) => {
  enlace.addEventListener('click', () => abrirCerrarMenu(false));
});

// Cierra el menú con la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') abrirCerrarMenu(false);
});

// Fondo sólido del header al bajar
function actualizarHeader() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', actualizarHeader, { passive: true });
actualizarHeader();
// ===== Hero: parallax =====
const capasParallax = document.querySelectorAll('[data-velocidad]');
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
let esperandoFrame = false;

function moverCapas() {
  const y = window.scrollY;
  capasParallax.forEach((capa) => {
    const velocidad = parseFloat(capa.dataset.velocidad);
    capa.style.transform = `translate3d(0, ${y * velocidad}px, 0)`;
  });
  esperandoFrame = false;
}

function alHacerScroll() {
  if (sinMovimiento.matches || esperandoFrame) return;
  esperandoFrame = true;
  requestAnimationFrame(moverCapas);
}

window.addEventListener('scroll', alHacerScroll, { passive: true });
// ===== Experiencia: mapa de lugares =====
// Lugares ficticios (proyecto demo) cerca de Pereira
const ICONOS = {
  casa: 'M6 32L32 10L58 32 M14 27V54H50V27 M26 54V38H38V54',
  mirador: 'M6 54L24 24L34 40L42 28L58 54Z',
  sendero: 'M10 56C10 40 30 44 30 30S50 30 50 12',
  jardin: 'M32 32a3 3 0 0 1 6 0a7 7 0 0 1-14 0a11 11 0 0 1 22 0a15 15 0 0 1-30 0',
  poza: 'M6 24l8-8l8 8l8-8l8 8l8-8l8 8 M6 40l8-8l8 8l8-8l8 8l8-8l8 8'
};

const lugares = [
  {
    id: 'casa',
    nombre: 'La casa principal',
    coords: [4.8015, -75.7420],
    icono: 'casa',
    foto: 'assets/img/casa.jpg',
    alt: 'Fachada de la casa principal rodeada de jardín',
    descripcion: 'Nuestra casa de hospedaje: habitaciones con vista al valle, un corredor para el café de la tarde y la cocina donde preparamos el desayuno.',
    actividades: ['Bienvenida con bebida local', 'Café en el corredor al atardecer', 'Descanso en las hamacas']
  },
  {
    id: 'mirador',
    nombre: 'El mirador',
    coords: [4.8072, -75.7365],
    icono: 'mirador',
    foto: 'assets/img/mirador.jpg',
    alt: 'Vista abierta a las montañas desde el mirador',
    descripcion: 'Un mirador a pocos minutos caminando de la casa, con vista abierta a las montañas y a las luces de la ciudad al anochecer.',
    actividades: ['Ver el amanecer', 'Fotografía de paisaje', 'Observación de aves']
  },
  {
    id: 'sendero',
    nombre: 'Sendero del guadual',
    coords: [4.7968, -75.7331],
    icono: 'sendero',
    foto: 'assets/img/sendero.jpg',
    alt: 'Sendero rodeado de guadua y helechos',
    descripcion: 'Un sendero suave entre guaduales y helechos, ideal para caminar sin afán.',
    actividades: ['Caminata guiada de 40 minutos', 'Observación de flora nativa', 'Ruta a pie hasta la poza']
  },
  {
    id: 'jardin',
    nombre: 'Jardín del café',
    coords: [4.7990, -75.7475],
    icono: 'jardin',
    foto: 'assets/img/jardin.jpg',
    alt: 'Jardín con plantas de café y bancas a la sombra',
    descripcion: 'Plantas de café, flores y bancas a la sombra para leer o conversar.',
    actividades: ['Recorrido corto sobre el cultivo del café', 'Lectura bajo los árboles', 'Picnic con productos de la región']
  },
  {
    id: 'poza',
    nombre: 'La poza',
    coords: [4.7935, -75.7398],
    icono: 'poza',
    foto: 'assets/img/poza.jpg',
    alt: 'Poza de agua clara en la quebrada entre piedras',
    descripcion: 'Una poza de agua fresca en la quebrada, rodeada de piedras y vegetación.',
    actividades: ['Refrescarte en la quebrada', 'Descansar sobre las rocas', 'Tomar fotografías']
  }
];

const contenedorMapa = document.querySelector('#mapa');
const listaLugares = document.querySelector('#lista-lugares');
const panelLugar = document.querySelector('#lugar-panel');

if (contenedorMapa && typeof L !== 'undefined') {
  const mapa = L.map(contenedorMapa, {
    scrollWheelZoom: false,          // no secuestra el scroll de la página
    dragging: !L.Browser.mobile      // en celular, un dedo sigue moviendo la página
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  // El zoom con la rueda se activa al hacer clic en el mapa
  mapa.on('click', () => mapa.scrollWheelZoom.enable());
  mapa.on('mouseout', () => mapa.scrollWheelZoom.disable());

  const marcadores = {};

  function seleccionarLugar(id, moverMapa = false) {
    const lugar = lugares.find((l) => l.id === id);
    if (!lugar) return;

    // Estado activo en chips y marcadores
    listaLugares.querySelectorAll('.lugar-chip').forEach((chip) => {
      const activo = chip.dataset.id === id;
      chip.classList.toggle('activo', activo);
      chip.setAttribute('aria-pressed', String(activo));
    });
    Object.entries(marcadores).forEach(([clave, marcador]) => {
      const activo = clave === id;
      const elemento = marcador.getElement();
      if (elemento) elemento.classList.toggle('activo', activo);
      marcador.setZIndexOffset(activo ? 1000 : 0);
    });

    // Panel con foto, descripción y actividades
    panelLugar.innerHTML = `
      <div class="lugar-foto"><img src="${lugar.foto}" alt="${lugar.alt}" loading="lazy"></div>
      <h3>${lugar.nombre}</h3>
      <p>${lugar.descripcion}</p>
      <h4>Qué puedes hacer aquí</h4>
      <ul class="lugar-actividades">
        ${lugar.actividades.map((a) => `<li>${a}</li>`).join('')}
      </ul>`;

    // Si la foto no existe todavía, se muestra un bloque de color
    const foto = panelLugar.querySelector('img');
    foto.addEventListener('error', () => {
      foto.parentElement.classList.add('sin-foto');
    });

    if (!sinMovimiento.matches) {
      animate(panelLugar, { opacity: [0, 1], y: [14, 0], duration: 450, ease: 'outQuad' });
    }
    if (moverMapa) mapa.panTo(lugar.coords);
  }

  // Marcadores con glifo rupestre y chips de la lista
  lugares.forEach((lugar) => {
    const icono = L.divIcon({
      className: 'marcador',
      html: `<div class="marcador-cara"><svg viewBox="0 0 64 64" aria-hidden="true"><path d="${ICONOS[lugar.icono]}"/></svg></div>`,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });
    const marcador = L.marker(lugar.coords, { icon: icono, title: lugar.nombre }).addTo(mapa);
    marcador.on('click', () => seleccionarLugar(lugar.id));
    marcadores[lugar.id] = marcador;

    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'lugar-chip';
    chip.dataset.id = lugar.id;
    chip.textContent = lugar.nombre;
    chip.addEventListener('click', () => seleccionarLugar(lugar.id, true));
    listaLugares.appendChild(chip);
  });

  mapa.fitBounds(L.latLngBounds(lugares.map((l) => l.coords)), { padding: [50, 50] });
  seleccionarLugar('casa');
}
// ===== Experiencia: galería y visor =====
const fotos = [
  { archivo: 'galeria-01.jpg', titulo: 'Habitación con vista al valle', categoria: 'Alojamiento' },
  { archivo: 'galeria-02.jpg', titulo: 'Corredor con hamacas', categoria: 'Alojamiento' },
  { archivo: 'galeria-03.jpg', titulo: 'Desayuno con productos locales', categoria: 'Alojamiento' },
  { archivo: 'galeria-04.jpg', titulo: 'Amanecer en el mirador', categoria: 'Naturaleza' },
  { archivo: 'galeria-05.jpg', titulo: 'Guadual y helechos', categoria: 'Naturaleza' },
  { archivo: 'galeria-06.jpg', titulo: 'La poza en la quebrada', categoria: 'Naturaleza' },
  { archivo: 'galeria-07.jpg', titulo: 'Caminata por el sendero', categoria: 'Actividades' },
  { archivo: 'galeria-08.jpg', titulo: 'Café en el jardín', categoria: 'Actividades' },
  { archivo: 'galeria-09.jpg', titulo: 'Picnic bajo los árboles', categoria: 'Actividades' }
];
const CATEGORIAS = ['Todas', 'Alojamiento', 'Naturaleza', 'Actividades'];

const galeria = document.querySelector('#galeria');
const filtrosGaleria = document.querySelector('#filtros-galeria');
const visor = document.querySelector('#visor');

if (galeria && filtrosGaleria && visor) {
  const visorImg = visor.querySelector('#visor-img');
  const visorTexto = visor.querySelector('#visor-texto');
  const visorFigura = visor.querySelector('.visor-figura');
  let itemActual = null;

  const itemsVisibles = () => [...galeria.querySelectorAll('.galeria-item:not([hidden])')];

  // --- Visor ---
  function mostrarFoto(item) {
    const foto = fotos[item.dataset.indice];
    visorFigura.classList.remove('sin-foto');
    visorImg.src = `assets/img/galeria/${foto.archivo}`;
    visorImg.alt = foto.titulo;
    visorTexto.textContent = `${foto.titulo} · ${foto.categoria}`;
    if (!sinMovimiento.matches) {
      animate(visorImg, { opacity: [0, 1], scale: [0.96, 1], duration: 350, ease: 'outQuad' });
    }
  }

  function abrirVisor(item) {
    itemActual = item;
    mostrarFoto(item);
    if (!visor.open) visor.showModal();
  }

  function moverVisor(paso) {
    const lista = itemsVisibles();
    const posicion = lista.indexOf(itemActual);
    itemActual = lista[(posicion + paso + lista.length) % lista.length];
    mostrarFoto(itemActual);
  }

  visorImg.addEventListener('error', () => visorFigura.classList.add('sin-foto'));
  visor.querySelector('.visor-cerrar').addEventListener('click', () => visor.close());
  visor.querySelector('.visor-prev').addEventListener('click', () => moverVisor(-1));
  visor.querySelector('.visor-next').addEventListener('click', () => moverVisor(1));
  visor.addEventListener('click', (e) => {
    if (e.target === visor) visor.close();       // clic en el fondo oscuro
  });
  visor.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moverVisor(-1);
    if (e.key === 'ArrowRight') moverVisor(1);
  });

  // --- Filtros ---
  function filtrar(categoria, animar = true) {
    filtrosGaleria.querySelectorAll('.lugar-chip').forEach((chip) => {
      const activo = chip.dataset.categoria === categoria;
      chip.classList.toggle('activo', activo);
      chip.setAttribute('aria-pressed', String(activo));
    });

    galeria.querySelectorAll('.galeria-item').forEach((item) => {
      item.hidden = !(categoria === 'Todas' || item.dataset.categoria === categoria);
    });

    if (animar && !sinMovimiento.matches) {
      animate(itemsVisibles(), {
        opacity: [0, 1],
        y: [18, 0],
        delay: stagger(70),
        duration: 500,
        ease: 'outQuad'
      });
    }
  }

  // --- Construcción ---
  CATEGORIAS.forEach((categoria) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'lugar-chip';          // reutiliza el estilo de los chips del mapa
    chip.dataset.categoria = categoria;
    chip.textContent = categoria;
    chip.addEventListener('click', () => filtrar(categoria));
    filtrosGaleria.appendChild(chip);
  });

  fotos.forEach((foto, indice) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'galeria-item';
    item.dataset.indice = indice;
    item.dataset.categoria = foto.categoria;
    item.setAttribute('aria-label', `Ampliar foto: ${foto.titulo}`);
    item.innerHTML = `
      <img src="assets/img/galeria/${foto.archivo}" alt="" loading="lazy">
      <span class="galeria-etiqueta">${foto.titulo}</span>`;
    item.querySelector('img').addEventListener('error', () => item.classList.add('sin-foto'));
    item.addEventListener('click', () => abrirVisor(item));
    galeria.appendChild(item);
  });

  filtrar('Todas', false);
}