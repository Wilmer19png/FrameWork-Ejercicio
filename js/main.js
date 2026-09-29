// Lógica de Casa Nativa
//Prueba de animación con anime.js
const { animate, stagger } = anime;

// Prueba: el título cae suavemente y el botón aparece
animate('h1', {
  y: [-30, 0],
  opacity: [0, 1],
  duration: 800,
  ease: 'outExpo'
});

animate('.button', {
  scale: [0.8, 1],
  opacity: [0, 1],
  delay: 400,
  duration: 700,
  ease: 'outExpo'
});