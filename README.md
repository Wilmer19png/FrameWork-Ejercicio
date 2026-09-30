# Casa Nativa

Landing page responsive de **Casa Nativa**, una casa de hospedaje rural ubicada en Pereira, Risaralda. Proyecto académico del Taller de exploración de frameworks CSS (Aplicaciones móviles y web · Diseño Crossmedia).

**Autor:** Wilmer Alejandro Buritica Alvira - Con ayuda de CLAUDE
**Repositorio:** (https://github.com/Wilmer19png/FrameWork-Ejercicio.git)

## Framework asignado

**Nombre:** Milligram CSS (v1.4.1), un framework minimalista de unos 2 kb comprimido que ofrece estilos base y un grid flexbox, sin componentes de interfaz.

**Forma de instalación:** por CDN, sin instalar paquetes. En el `<head>` de `index.html` se cargan, en este orden: Google Fonts, Normalize.css 8.0.1, Milligram 1.4.1 (ambos desde cdnjs) y, al final, `css/styles.css` con los estilos propios.

**Tres características que resultaron útiles:**
1. **Grid flexbox responsive** (`.container`, `.row`, `.column-*`): las columnas se apilan solas en pantallas pequeñas, lo que simplificó el diseño móvil.
2. **Estilos base ya resueltos** para tipografía, botones, listas y formularios, que dan un punto de partida limpio.
3. **Peso mínimo**: al traer casi nada de diseño, deja espacio para construir una identidad visual propia sin pelear contra el framework.

**Tres componentes o utilidades de Milligram usados:**
1. **Grid:** `.container`, `.row`, `.column-60` y `.column-40` en el hero.
2. **Botones:** `.button` y `.button-outline` en la navegación y el hero.
3. **Formularios:** label, input (texto, correo, teléfono, fecha, número) y textarea con los estilos base de Milligram, personalizados en color.

### Qué es de Milligram y qué es propio

Milligram no incluye barra de navegación, tarjetas, modales ni componentes con JavaScript. Por eso estas partes son desarrollo propio, construido sobre el grid y los botones del framework:

| Elemento | Origen |
|---|---|
| Grid y columnas | Milligram |
| Botones | Milligram (colores personalizados) |
| Barra de navegación y menú móvil (hamburguesa) | CSS y JS propios |
| Header que cambia al hacer scroll | CSS y JS propios |
| Paisaje en capas con parallax | SVG, CSS y JS propios |
| Símbolos rupestres | SVG propios |
| Paleta, tipografías y textura | CSS propio (sobrescribe el morado por defecto de Milligram) |
| Grid de cuatro columnas de servicios (`.column-25`) | Milligram |
| Tarjetas de servicio y glifos rupestres | CSS y SVG propios |
| Distribución mapa / panel (`.column-60` y `.column-40`) | Milligram |
| Mapa, marcadores y panel de lugares | Leaflet + JS y CSS propios |
| Cuadrícula de la galería | CSS Grid propio (Milligram no la cubre) |
| Filtros por categoría y visor ampliado | JS propio con el elemento `<dialog>` |
| Distribución del formulario (`.row` y `.column-50`) | Milligram |
| Campos del formulario (`label`, `input`, `textarea`) y botón | Milligram (colores personalizados) |
| Validación en español y fechas coherentes | JS propio |

## Identidad visual

Concepto: **petroglifo minimalista**. Líneas simples como grabadas en piedra, colores de pigmentos rupestres y símbolos de sol, espiral, ciervo, mano y agua.

| Rol | Color |
|---|---|
| Fondo (hueso) | `#F3E9D8` |
| Fondo alterno (arena) | `#E6D5BA` |
| Acento (ocre) | `#C98A2B` |
| Botones y detalles (rojo óxido) | `#A8442A` |
| Texto (carbón) | `#2B211B` |
| Naturaleza (musgo) | `#5F6B3A` |

**Tipografías:** Fraunces (títulos) y Nunito (texto).

## Animaciones

Se usa **Anime.js v4** (por CDN) como motor de animación. Las animaciones en el menú y en los servicios se documentarán al integrarlas.
Anime.js también se usa en la transición del panel de lugares, en la entrada escalonada de la galería al filtrar y en el visor de fotos.

## Librerías externas

- **Anime.js v4** (jsDelivr): motor de animación.
- **Leaflet 1.9.4** (cdnjs) con mosaicos de **OpenStreetMap**: mapa interactivo de la sección Experiencia. El mapa incluye la atribución requerida por OpenStreetMap.
- **Google Fonts:** Fraunces y Nunito.

Los lugares del mapa, sus coordenadas y sus descripciones son **ficticios** (proyecto demo).

## Estructura del proyecto

```
casa-nativa/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── img/
└── README.md
```

## Cómo ejecutarlo

No requiere instalación ni backend. Abre `index.html` en el navegador o usa una extensión como Live Preview de Visual Studio Code. Necesita conexión a internet para cargar las librerías y las fuentes desde CDN.
> El formulario de reserva no tiene backend: valida los datos en el navegador y muestra una confirmación, pero no se envía ninguna información.

## Estado del proyecto

- [x] Estructura base y Milligram integrado
- [x] Anime.js cargado
- [x] Identidad visual
- [x] Header con menú responsive
- [x] Hero con parallax
- [x] Servicios con tarjetas
- [x] Experiencia: mapa y galería
- [x] Formulario de reserva
- [ ] Footer
- [ ] Animaciones con Anime.js en menú y servicios
- [ ] Ajustes de responsive y accesibilidad

---
© 2026 Casa Nativa. Proyecto académico.