// Esperar a que el HTML se cargue por completo antes de ejecutar scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica del Robot ---
    const robot = document.getElementById('robot-interactivo');

    if (robot) {
        robot.addEventListener('mouseenter', () => {
            robot.setAttribute('camera-controls', '');
        });

        robot.addEventListener('mouseleave', () => {
            robot.removeAttribute('camera-controls');
        });

        robot.addEventListener('touchstart', () => {
            robot.setAttribute('camera-controls', '');
        }, {passive: true});
    }

    // --- Lógica del Carrusel ---
    let index = 0;
    const slide = document.getElementById('carrusel-slide');
    const contenedorCarrusel = document.getElementById('contenedor-carrusel');
    
    if (slide && contenedorCarrusel) {
        const imagenes = slide.querySelectorAll('img');
        const totalImagenes = imagenes.length;
        let intervaloCarrusel;

        // Hacer la función global para que los botones HTML ("onclick") la encuentren
        window.moverCarrusel = function(direccion) {
            index += direccion;
            if (index >= totalImagenes) index = 0;
            else if (index < 0) index = totalImagenes - 1;
            slide.style.transform = `translateX(${-index * 100}%)`;
        };

        function iniciarAutoplay() {
            intervaloCarrusel = setInterval(() => window.moverCarrusel(1), 3500); 
        }

        function detenerAutoplay() {
            clearInterval(intervaloCarrusel);
        }

        iniciarAutoplay();
        contenedorCarrusel.addEventListener('mouseenter', detenerAutoplay);
        contenedorCarrusel.addEventListener('mouseleave', iniciarAutoplay);
    }

    // --- Animaciones al Scroll ---
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('show-scroll');
            }
        });
    }, { threshold: 0.2 });

    const elementosOcultos = document.querySelectorAll('.hidden-scroll');
    elementosOcultos.forEach((el) => observador.observe(el));

    // --- Lógica del Botón para Ocultar/Mostrar Contenido (Iconos Profesionales) ---
    const btnFondo = document.getElementById('toggle-bg-btn');
    
    // Guardamos los códigos SVG en variables para que sea más limpio
    const iconoVisible = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const iconoOculto = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

    if (btnFondo) {
        btnFondo.addEventListener('click', () => {
            // Añade o quita la clase 'content-hidden' del body
            document.body.classList.toggle('content-hidden');
            
            // Cambia el icono del botón dependiendo del estado
            if (document.body.classList.contains('content-hidden')) {
                btnFondo.innerHTML = iconoOculto; // Ojo tachado
                btnFondo.title = 'Mostrar contenido';
            } else {
                btnFondo.innerHTML = iconoVisible; // Ojo normal
                btnFondo.title = 'Ver fondo';
            }
        });
    }

});