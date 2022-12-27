"user strict"
import dragDrop from "./drag&drop.js";
import digitalClock from "./date.js";
import ToDoList from "./ToDoList.js";
import geo from "./geolocation.js";
import historial from "./history.js";
import readerFn from "./fileReader.js";
import indexedDB from "./indexedDB.js";



/* <------------- DOM---------------------> */
const btnHamburguer = document.querySelector(".hamburger");
const aside = document.querySelector(".aside-bg");
const nav = document.querySelector(".nav");

let navLinks = document.querySelectorAll(".nav__item");
navLinks = [...navLinks];


/* >------------observer---------------> */
const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const navLink = document.querySelector(`.nav__item a[href="#${id}"]`);

        if (entry.isIntersecting) {
            if (document.querySelector('.nav__item.link--active')) {
                document.querySelector('.nav__item.link--active').classList.remove('link--active')
            }
            navLink.parentElement.classList.add("link--active");
        }
    });
}, {
    rootMargin: "-30% 0px -30%"
});

/* Menu Hamburguesa */
btnHamburguer.addEventListener("click", (e) => {
    btnHamburguer.classList.toggle("is-active");
    aside.classList.toggle("d-none");
    nav.classList.toggle("nav--active");
});

/* Cuando se le da click a un link del nav se esconde el nav, da la animación al menu, solo en menos de 768px */
//   if (e.target.matches(".nav__item *")) {
// LinkActive(e.target.parentElement);

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
            btnHamburguer.classList.toggle("is-active");
            aside.classList.toggle("d-none");
            nav.classList.toggle("nav--active");
        }
    });
    const hash = link.firstElementChild.getAttribute("href");
    const target = document.querySelector(hash)

    if (target) {
        observer.observe(target) /* Llamo al observador y le paso lo links para que observer */
    }
});

aside.addEventListener('click', (e) => {
    if (e.target.className == 'aside-bg') {
        btnHamburguer.classList.toggle("is-active");
        aside.classList.toggle("d-none");
        nav.classList.toggle("nav--active");

    }
})
/* Holla */

/* <----------------------------------------------> */
/* >------reloj-------< */
const reloj = document.querySelector("#reloj");
const playBtn = document.querySelector("#play-reloj");
const stopBtn = document.querySelector("#stop-reloj");

/* funcion para ejecutar el reloj */
digitalClock(reloj, playBtn, stopBtn);


/* ToDoList */
ToDoList()


/* drag and drop */
dragDrop()



/* Geolocalización */
geo()



/* History */
historial()


/* FileReader */
readerFn()

/* IndexedDB */
// indexedDB()

/* No voy a crear otro archivo para probar matchMedia */

// console.log(matchMedia("")); Función que permite verificar si una cierta consulta de medios es verdadera o no

const mq = matchMedia("(max-width:500px)")
/* En este caso estoy usando el resize de la ventana osea siempre va a mostrar el resultado de matches, pero si escucho el evento 'change' de mq, solo se dispararia cuando matches cambie su valor */
window.onresize = (e) => {
    
    if (mq.matches) {
        document.querySelector('.😍').src = document.querySelector('.😍').getAttribute("data-src")
    } else {
        document.querySelector('.😍').src = "../src/godmillion.jpg"
    }
    
}
if (mq.matches) {
    document.querySelector('.😍').src = document.querySelector('.😍').getAttribute("data-src")
} else {
    document.querySelector('.😍').src = "../src/godmillion.jpg"
}




/* ---------------------------intersectionObserver------------ */
/* Esta API permite monitorear elementos HTML dependiendo de si estos estan a la vista en el viewport y ejecutar codigo en función de esto
yo lo use para darle estilos a los items del sidebar dependiendo de la sección actual, también se puede usar para hacer un "lazy load" , "infinte scroll" y mas. */


/* -------------------Notifications----------------------------------- */

// Para utilizar una API de notificaciones, primero debes obtener permiso del usuario para enviarle notificaciones.Luego, puedes utilizar JavaScript para enviar una solicitud a la API y especificar el contenido de la notificación.

/* Primero verificamos que el navegador del usuario soporte esta API de lo contrario no servira */

if (!"Notification" in window) {
    console.table("Su navegador no soporta la API de Notifications")
} else {
    console.table("Si sirve esa monda")
    /* Primero pedimos permiso */
    Notification.requestPermission(() => {
        /* Recibe un callback, aunque también se puede trabajar con promesas */
        if (Notification.permission == "granted") {
            /*Por si es aceptada  */
            new Notification("Hola mundo", {
                body: "Mi primera notificación usando JS",
                icon: "../src/1.jpg"
            })
        }

    })

}




/* ----------------------Web Workers------- */
/* Un Web Worker es una característica de JavaScript que permite ejecutar código en un hilo separado del hilo principal del navegador. Esto puede ser útil para realizar tareas intensivas en el procesamiento de datos o para realizar tareas en segundo plano que no necesitan interactuar con la interfaz de usuario.
Para utilizar un Web Worker en una aplicación web, se debe crear un archivo de JavaScript que contenga el código que se desea ejecutar en el hilo separado. Luego, se puede crear una instancia del Web Worker en el código principal de la aplicación y enviarle mensajes para iniciar su ejecución. El Web Worker ejecutará el código en un hilo separado y puede enviar mensajes de vuelta al hilo principal para proporcionar resultados o notificar el progreso. */

const worker = new Worker('./worker.js')
console.log(worker)