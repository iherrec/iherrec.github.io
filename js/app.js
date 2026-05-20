/* ============================================================
   app.js — Alejandro The Barber
   Proyecto 1º DAW
   ============================================================
   Índice:
   1. Menú hamburguesa (abrir/cerrar en móvil)
   2. Navbar con efecto al hacer scroll
   3. Link activo según la sección visible
   4. Scroll Reveal (animación al aparecer en pantalla)
   5. Validación del formulario
   6. Fecha mínima en el campo de fecha
   ============================================================ */


/* ============================================================
   1. MENÚ HAMBURGUESA
   Al hacer clic en el botón ≡ se muestra/oculta el menú lateral
   ============================================================ */

// Seleccionamos los elementos del HTML que necesitamos
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

// Escuchamos el evento 'click' en el botón hamburguesa
hamburger.addEventListener('click', function () {
  // toggle() añade la clase si no existe, o la quita si existe
  hamburger.classList.toggle('activo');
  navLinks.classList.toggle('abierto');
});

// Cerrar el menú al hacer clic en cualquier enlace de navegación
const todosLosLinks = document.querySelectorAll('.nav-link');

todosLosLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('activo');
    navLinks.classList.remove('abierto');
  });
});


/* ============================================================
   2. NAVBAR CON EFECTO AL HACER SCROLL
   Añade fondo oscuro al navbar cuando el usuario baja en la página
   ============================================================ */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    // Si hemos bajado más de 60px, añadimos la clase 'scrolled'
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // También actualizamos el link activo cada vez que se hace scroll
  actualizarLinkActivo();
});


/* ============================================================
   3. LINK ACTIVO SEGÚN SECCIÓN VISIBLE
   Resalta el enlace del menú correspondiente a la sección actual
   ============================================================ */

function actualizarLinkActivo() {
  // Obtenemos todas las secciones que tienen un id
  var secciones = document.querySelectorAll('section[id]');
  var posicionActual = window.scrollY;

  secciones.forEach(function (seccion) {
    var altoSeccion  = seccion.offsetHeight;
    var topSeccion   = seccion.offsetTop - 120; // -120 para activar un poco antes
    var idSeccion    = seccion.getAttribute('id');

    if (posicionActual >= topSeccion && posicionActual < topSeccion + altoSeccion) {
      // Quitamos 'activo' de todos los links
      todosLosLinks.forEach(function (link) {
        link.classList.remove('activo');
      });

      // Añadimos 'activo' al link que apunta a esta sección
      var linkCorrespondiente = document.querySelector('.nav-link[href="#' + idSeccion + '"]');
      if (linkCorrespondiente) {
        linkCorrespondiente.classList.add('activo');
      }
    }
  });
}


/* ============================================================
   4. SCROLL REVEAL
   Los elementos aparecen con una animación suave cuando entran
   en el campo de visión del usuario al hacer scroll
   ============================================================ */

// Añadimos la clase 'reveal' a los elementos que queremos animar
// (podríamos añadirla en el HTML, pero aquí lo hacemos con JS)
var selectoresReveal = [
  '.seccion-titulo',
  '.servicio-card',
  '.galeria-item',
  '.reserva-info',
  '.reserva-formulario',
  '.footer-col'
];

selectoresReveal.forEach(function (selector) {
  var elementos = document.querySelectorAll(selector);

  elementos.forEach(function (elemento, indice) {
    elemento.classList.add('reveal');

    // Añadimos un pequeño retraso escalonado a las tarjetas y fotos
    // para que aparezcan una detrás de otra, no todas a la vez
    if (selector === '.servicio-card' || selector === '.galeria-item') {
      elemento.style.transitionDelay = (indice * 0.1) + 's';
    }
  });
});

// IntersectionObserver: detecta cuando un elemento entra en pantalla
// Es más eficiente que escuchar el evento 'scroll' para esto
var observador = new IntersectionObserver(
  function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        // El elemento es visible → añadimos 'visible' para activar la animación CSS
        entrada.target.classList.add('visible');
        // Dejamos de observar ese elemento (ya no necesitamos seguir vigilándolo)
        observador.unobserve(entrada.target);
      }
    });
  },
  {
    threshold:   0.1,              // se activa cuando el 10% del elemento es visible
    rootMargin: '0px 0px -40px 0px' // un poco antes del borde inferior de la pantalla
  }
);

// Empezamos a observar todos los elementos con clase 'reveal'
document.querySelectorAll('.reveal').forEach(function (elemento) {
  observador.observe(elemento);
});


/* ============================================================
   5. VALIDACIÓN DEL FORMULARIO
   Comprobamos los campos antes de "enviar" (no hay backend)
   ============================================================ */

var formulario    = document.getElementById('formulario-reserva');
var exitoMensaje  = document.getElementById('exito-mensaje');

formulario.addEventListener('submit', function (evento) {
  // Evitamos el comportamiento por defecto (recargar la página)
  evento.preventDefault();

  // Solo si todos los campos son correctos, simulamos el envío
  if (validarFormulario()) {
    simularEnvio();
  }
});

function validarFormulario() {
  var todoOk = true; // asumimos que todo está bien y comprobamos cada campo

  // --- Nombre ---
  var campoNombre  = document.getElementById('nombre');
  var errorNombre  = document.getElementById('error-nombre');

  if (campoNombre.value.trim() === '') {
    mostrarError(campoNombre, errorNombre, 'Por favor, introduce tu nombre.');
    todoOk = false;
  } else {
    quitarError(campoNombre, errorNombre);
  }

  // --- Teléfono ---
  var campoTelefono = document.getElementById('telefono');
  var errorTelefono = document.getElementById('error-telefono');
  // Expresión regular: teléfono español (empieza por 6, 7, 8 o 9, seguido de 8 dígitos)
  var regexTel = /^[6-9]\d{8}$/;
  var telSinEspacios = campoTelefono.value.replace(/\s/g, ''); // quitamos espacios

  if (telSinEspacios === '') {
    mostrarError(campoTelefono, errorTelefono, 'Por favor, introduce tu teléfono.');
    todoOk = false;
  } else if (!regexTel.test(telSinEspacios)) {
    mostrarError(campoTelefono, errorTelefono, 'Teléfono no válido (ej: 612 345 678).');
    todoOk = false;
  } else {
    quitarError(campoTelefono, errorTelefono);
  }

  // --- Email (opcional, pero si se rellena debe tener formato correcto) ---
  var campoEmail = document.getElementById('email');
  var errorEmail = document.getElementById('error-email');
  var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (campoEmail.value.trim() !== '' && !regexEmail.test(campoEmail.value)) {
    mostrarError(campoEmail, errorEmail, 'El formato del email no es válido.');
    todoOk = false;
  } else {
    quitarError(campoEmail, errorEmail);
  }

  // --- Servicio ---
  var campoServicio = document.getElementById('servicio');
  var errorServicio = document.getElementById('error-servicio');

  if (campoServicio.value === '') {
    mostrarError(campoServicio, errorServicio, 'Por favor, selecciona un servicio.');
    todoOk = false;
  } else {
    quitarError(campoServicio, errorServicio);
  }

  // --- Fecha ---
  var campoFecha = document.getElementById('fecha');
  var errorFecha = document.getElementById('error-fecha');

  if (campoFecha.value === '') {
    mostrarError(campoFecha, errorFecha, 'Por favor, selecciona una fecha.');
    todoOk = false;
  } else {
    // Comprobamos que la fecha no sea en el pasado
    var hoy            = new Date();
    hoy.setHours(0, 0, 0, 0); // ponemos la hora a 00:00 para comparar solo la fecha
    var fechaElegida   = new Date(campoFecha.value + 'T00:00:00'); // evitar zona horaria

    if (fechaElegida < hoy) {
      mostrarError(campoFecha, errorFecha, 'La fecha debe ser hoy o posterior.');
      todoOk = false;
    } else {
      quitarError(campoFecha, errorFecha);
    }
  }

  return todoOk;
}

// Muestra el mensaje de error debajo del campo
function mostrarError(campo, spanError, mensaje) {
  campo.classList.add('invalido');
  spanError.textContent = mensaje;
}

// Borra el mensaje de error y quita el estilo de error
function quitarError(campo, spanError) {
  campo.classList.remove('invalido');
  spanError.textContent = '';
}

// Simula el envío del formulario (no hay backend real)
function simularEnvio() {
  var boton = formulario.querySelector('button[type="submit"]');

  // Deshabilitamos el botón y mostramos un spinner mientras "carga"
  boton.disabled = true;
  boton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

  // Después de 1.5 segundos simulamos que se ha enviado correctamente
  setTimeout(function () {
    formulario.style.display = 'none';       // ocultamos el formulario
    exitoMensaje.classList.add('visible');   // mostramos el mensaje de éxito
  }, 1500);
}


/* ============================================================
   6. FECHA MÍNIMA
   Evitamos que el usuario pueda seleccionar una fecha pasada
   ============================================================ */

var inputFecha = document.getElementById('fecha');

// Construimos la fecha de hoy en formato YYYY-MM-DD (el que espera el input type="date")
var ahora = new Date();
var anio  = ahora.getFullYear();
var mes   = String(ahora.getMonth() + 1).padStart(2, '0'); // getMonth() empieza en 0
var dia   = String(ahora.getDate()).padStart(2, '0');

inputFecha.min = anio + '-' + mes + '-' + dia;
