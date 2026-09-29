
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