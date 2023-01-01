"user strict";
import dragDrop from "./drag&drop.js";
import digitalClock from "./date.js";
import ToDoList from "./ToDoList.js";
import geo from "./geolocation.js";
import historial from "./history.js";
import readerFn from "./fileReader.js";

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
            if (document.querySelector(".nav__item.link--active")) {
                document.querySelector(".nav__item.link--active").classList.remove("link--active");
            }
            navLink.parentElement.classList.add("link--active");
        }
    });
},
    {
        rootMargin: "-30% 0px -30%",
    }
);

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
    const target = document.querySelector(hash);

    if (target) {
        observer.observe(target); /* Llamo al observador y le paso lo links para que observer */
    }
});

aside.addEventListener("click", (e) => {
    if (e.target.className == "aside-bg") {
        btnHamburguer.classList.toggle("is-active");
        aside.classList.toggle("d-none");
        nav.classList.toggle("nav--active");
    }
});
/* Holla */

/* <----------------------------------------------> */
/* >------reloj-------< */
const reloj = document.querySelector("#reloj");
const playBtn = document.querySelector("#play-reloj");
const stopBtn = document.querySelector("#stop-reloj");

/* funcion para ejecutar el reloj */
digitalClock(reloj, playBtn, stopBtn);

/* ToDoList */
ToDoList();

/* drag and drop */
dragDrop();

/* Geolocalización */
geo();

/* History */
historial();

/* FileReader */
readerFn();

/* IndexedDB */
// indexedDB()

/* No voy a crear otro archivo para probar matchMedia */

// console.log(matchMedia("")); Función que permite verificar si una cierta consulta de medios es verdadera o no

const mq = matchMedia("(max-width:500px)");
/* En este caso estoy usando el resize de la ventana osea siempre va a mostrar el resultado de matches, pero si escucho el evento 'change' de mq, solo se dispararia cuando matches cambie su valor */
window.onresize = (e) => {
    if (mq.matches) {
        document.querySelector(".😍").src = document.querySelector(".😍").getAttribute("data-src");
    } else {
        document.querySelector(".😍").src = "./src/1.jpg";
    }
};
if (mq.matches) {
    document.querySelector(".😍").src = document.querySelector(".😍").getAttribute("data-src");
} else {
    document.querySelector(".😍").src = "./src/1.jpg";
}

/* ---------------------------intersectionObserver------------ */
/* Esta API permite monitorear elementos HTML dependiendo de si estos estan a la vista en el viewport y ejecutar codigo en función de esto
yo lo use para darle estilos a los items del sidebar dependiendo de la sección actual, también se puede usar para hacer un "lazy load" , "infinte scroll" y mas. */

/* -------------------Notifications----------------------------------- */

// Para utilizar una API de notificaciones, primero debes obtener permiso del usuario para enviarle notificaciones.Luego, puedes utilizar JavaScript para enviar una solicitud a la API y especificar el contenido de la notificación.

/* Primero verificamos que el navegador del usuario soporte esta API de lo contrario no servira */

if (!"Notification" in window) {
    console.table("Su navegador no soporta la API de Notifications");
} else {
    /* Primero pedimos permiso */
    Notification.requestPermission(() => {
        /* Recibe un callback, aunque también se puede trabajar con promesas */
        if (Notification.permission == "granted") {
            /*Por si es aceptada  */
            new Notification("Hola mundo", {
                body: "Mi primera notificación usando JS",
                icon: "../src/1.jpg",
            });
        }
    });
}

/* ----------------------Web Workers------- */
/* Un Web Worker es una característica de JavaScript que permite ejecutar código en un hilo separado del hilo principal del navegador. Esto puede ser útil para realizar tareas intensivas en el procesamiento de datos o para realizar tareas en segundo plano que no necesitan interactuar con la interfaz de usuario.
Para utilizar un Web Worker en una aplicación web, se debe crear un archivo de JavaScript que contenga el código que se desea ejecutar en el hilo separado. Luego, se puede crear una instancia del Web Worker en el código principal de la aplicación y enviarle mensajes para iniciar su ejecución. El Web Worker ejecutará el código en un hilo separado y puede enviar mensajes de vuelta al hilo principal para proporcionar resultados o notificar el progreso. */

/* Para usar esta funcionalidad de JS voy a crearlo en un archivo por separado 
que se podra acceder a el con un ancla */


/* -----------------------Objeto navigator------------------- */
/* Claro, aquí está un resumen de algunas de las propiedades y métodos más comunes del objeto navigator en JavaScript:

Propiedades:
    -navigator.appName: nombre de la aplicación del navegador (por ejemplo, "Netscape").
    -navigator.appVersion: versión de la aplicación del navegador.
    -navigator.language: idioma del navegador.
    -navigator.platform: plataforma del sistema operativo del navegador (por ejemplo, "MacIntel", "Win32").
    -navigator.userAgent: cadena de agente de usuario del navegador.

Métodos:
  -navigator.getBattery(): devuelve una promesa que se resuelve con un objeto BatteryManager, que proporciona información sobre la batería del dispositivo (si está disponible). Por ejemplo:
Copy code
  -navigator.getBattery().then(function(battery) {
  console.log("La batería está actualmente al " + battery.level * 100 + "% de su capacidad.");
});
  -navigator.sendBeacon(url, data): envía una petición HTTP asíncrona al servidor en segundo plano. Esto puede ser útil para enviar datos de seguimiento o métricas al servidor sin interrumpir la experiencia del usuario. Por ejemplo:
Copy code
  -navigator.sendBeacon("/track", "event=click&id=123"); 
navigator.vibrate(pattern): hace vibrar el dispositivo. El patrón de vibración puede especificarse como un array de números, donde cada número representa un período de vibración en milisegundos. Por ejemplo:
Copy code
  -navigator.vibrate([200, 100, 200]);  // Vibrar durante 200ms, luego 100ms de pausa, luego 200ms de vibración.

Hay muchas otras propiedades y métodos disponibles en el objeto navigator, pero estos son algunos de los más comunes y útiles. Espero que esto te haya ayudado a tener una idea general de lo que puede hacer navigator en JavaScript. ¡Cualquier pregunta adicional, no dudes en preguntar! */



/* ------------------------------Memorization-------------------- */
/* La técnica de "memorization" se refiere a la práctica de almacenar en memoria el resultado de una operación o cálculo para poder utilizarlo más tarde sin tener que volver a realizar el cálculo. Esto puede ser útil cuando una operación es costosa en términos de tiempo de ejecución o cuando se realiza con mucha frecuencia. */


let memorization = {}

function memoizer(key) {
    if (localStorage.getItem("memorization")) {
        memorization = localStorage.getItem("memorization")
        memorization = JSON.parse(memorization)
    }
    if (memorization[key]) return [true, memorization[key]]
    return [false, 1]
}


const operacionQueSeDemora = (num) => {

    const check = memoizer(num)

    if (check[0]) return check[1]

    const a = 13;
    const b = 31;
    let res = 0
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < i; j++) {
            res += a * b
        }
    }
    memorization[num] = res
    localStorage.setItem("memorization", JSON.stringify(memorization))
    return res

}
console.log(operacionQueSeDemora(100000))
console.log(operacionQueSeDemora(20000))
console.log(operacionQueSeDemora(110000))
console.log(operacionQueSeDemora(50000))





/* const inicio = new Date();
console.log(operacionQueSeDemora(100));
console.log(`El tiempo que se tardo en realizar la operacion fue ${new Date() - inicio} milisegundos`)
const inicio1 = new Date();
console.log(operacionQueSeDemora(100));
console.log(`El tiempo que se tardo en realizar la operacion fue ${new Date() - inicio1} milisegundos`)
const inicio2 = new Date();
console.log(operacionQueSeDemora(100));
console.log(`El tiempo que se tardo en realizar la operacion fue ${new Date() - inicio2} milisegundos`)
const inicio3 = new Date();
console.log(operacionQueSeDemora(100));
console.log(`El tiempo que se tardo en realizar la operacion fue ${new Date() - inicio3} milisegundos`) */



/* -------------------------memoria cache--------------------------- */
/*La memoria cache es una memoria de alta velocidad que se encuentra cerca del procesador de una computadora y se utiliza para almacenar temporalmente los datos que se usan con más frecuencia. Su objetivo es reducir el tiempo de acceso a los datos y mejorar el rendimiento del sistema.

La memoria cache se divide en varios niveles, desde la memoria cache de nivel 1 (L1), que se encuentra dentro del propio procesador y es la más rápida, hasta la memoria cache de nivel 3 (L3), que se encuentra fuera del procesador pero todavía es más rápida que la memoria principal (RAM).  */


/* En la web, la memoria cache se utiliza principalmente para mejorar el rendimiento de las aplicaciones y sitios web almacenando en ella elementos que se utilizan con frecuencia, como imágenes, scripts y estilos, de modo que se puedan recuperar más rápidamente la próxima vez que se necesiten. De esta manera, se reduce la cantidad de datos que se tienen que descargar desde el servidor cada vez que se accede a una página, lo que permite cargar las páginas más rápidamente y mejora la experiencia del usuario. */

/*  Se abre como indexedDB osea un DB */

caches.open("archivos-estaticos").then(cache => {
    /* Devuelve una promesa con el obj cache, este tiene varios metodos Los cuales también se resuelven con Promise */
    // ruta del archivo, osea hace un fetch y guarda el response
    /* cache.add( URL ) */

    /* cache.addAll([arrayConLosArchivos, "index.html", "main.js"]) */

    /* cache.match("key").then(res => { Aquí tendriamos el valor del fetch que se hizo cuando se guardo, osea el valor})*/

    /* cache.matchAll("index.html").then(res => {devuelve un array con las concidencias del parametro}) */

    /* cache.put("script", res) debe ir dentro del res de un fetch y como segundo parametro el res del fetc */

    /* cache.delete("index.htmk") */

    /* cache.keys().then(res => { devuelve una matriz con todos los datos que estan en cache}) */
    cache.add("../css/tailwind.css")

    cache.match("https://picsum.photos/500").then(res => {
        // console.log(res);
        let url = ""
        if (!res) {
            url = "https://picsum.photos/500"
            cache.add(url);
        } else {
            url = res.url
        }
        const img = document.createElement("img")
        img.src = url
        img.style = "width:60%; display:block; max-width:500px; margin:auto;"
        document.querySelector('.cache-section').appendChild(img)
    })


})

