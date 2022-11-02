'use strict'
/* 
Esta API permite al usuario compartir su ubicación con la app si este lo desea


Se accede a la API de geolocalización a través de una llamada a navigator.geolocation; esto hará que el navegador del usuario le pida
permiso para acceder a sus datos de ubicación. Si aceptan, el navegador utilizará la mejor funcionalidad disponible en el dispositivo 
para acceder a esta información (por ejemplo, GPS).


El desarrollador ahora puede acceder a esta información de ubicación de dos maneras diferentes:

--> Geolocation.getCurrentPosition(): Recupera la ubicación actual del dispositivo.

--> Geolocation.watchPosition(): Registra una función de controlador que se llamará automáticamente cada vez que cambie la posición del dispositivo, 
devolviendo la ubicación actualizada.

En ambos casos, la llamada al método toma hasta tres argumentos.

--> =>Una función obligatoria que será llamada en caso de éxito: si la recuperación de la ubicación es exitosa, la función se ejecuta con un objeto GeolocationPosition como su único parámetro, proporcionando acceso a los datos de ubicación.
--> =>Una función opcional que será llamada en caso de error: si la recuperación de la ubicación no tiene éxito, la función se ejecuta con un objeto GeolocationPositionError (en-US) como su único parámetro, proporcionando información de acceso sobre lo que salió mal.
--> =>Un objeto opcional que proporciona opciones para la recuperación de los datos de posición.

*/

function geo() {

    const latitudElement = document.querySelector('#latitud')
    const longitudElement = document.querySelector('#longitud')
    const altitudElement = document.querySelector('#altitud')

    const btnGetCoords = document.querySelector('.btn-get-coords');
    const btnStop = document.querySelector('.btn-stop-coords')

    let watchID;
    /* instanciamos */
    const geolocation = navigator.geolocation
    console.log(geolocation)

    /* Opciones */
    const options = {
        maximumAge: 0, /* Cuanto tiempo se guarda en cache, cada cuanto solicitar la info */
        timeout: 500, /* tiempo */
        enableHightAccuracy: true /* alta precision */
    }


    /* Hay un error */
    function errPosition(e) {
        console.log(e)
    }


    /* Sale todo bien */
    function resPosition(position) {
        let lat = position.coords.latitude
        let long = position.coords.longitude
        let alt = position.coords.altitude


        latitudElement.textContent = lat
        longitudElement.textContent = long

        /* Por si es un dispositivo que pueda medir la altitud entonces lo va a mostrar */
        if (alt == null) {
            altitudElement.parentElement.classList.add('coord--hide')
        } else {
            altitudElement.parentElement.classList.remove('coord--hide')
        }

        altitudElement.textContent = alt

    }

    btnGetCoords.addEventListener('click', () => {
        watchID = geolocation.watchPosition(resPosition,errPosition,options) /* Se ejecuta cada cierto tiempo */
        // geolocation.getCurrentPosition(resPosition)
    })

    btnStop.addEventListener('click', () => {
        geolocation.clearWatch(watchID)
        latitudElement.textContent = ''
        longitudElement.textContent = ''
        altitudElement.textContent = ''
    })
}


export default geo