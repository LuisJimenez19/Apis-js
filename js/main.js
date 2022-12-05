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
