'use strict'
/* Api posibilita arrastrar y solar elementos, archivos etc.. */
/* 
--Eventos del objeto    --objeto a arrastrar--
    -dragstar           --es agarrado
    -drag               -- Esta siendo arrastrado
    -dragend            -- es soltado

-- Eventos de la zona   -- zone drop--
    -dragenter          -- entra
    -dragover           -- el objeto esta por encima de la zona --> prevenir el evento para permitir el drop
    -drop               -- el objeto es soltado
    -dragleave          -- el objeto sale de la zona

-- propiedad dataTransfer
    --setData('clave', 'valor')  -- en el dragstar para poder compartir la información

    --getData('clave')           -- en el drop 

*/



/* Traer imagenes de una api para poder usarlas de fondo y sea mas dinamico */
export default function dragDrop() {
    let auxintentos = 0;

    const zoneDrop = document.querySelector('.drop-zone')
    let texturas = document.querySelectorAll('.textura');
    texturas = [...texturas]

    const btnRefresh = document.querySelector('.btn-refresh');
    const modalError = document.querySelector('.modal-error');

    /* Funcion que hace una petición y trae una imagen random en la url se puede especificar el tamaño de la imagen */
    async function getImg() {
        try {
            let img = await axios('https://picsum.photos/1200')
            let url = await img.request.responseURL /* Url de la imagen */

            return await url;
        } catch (e) {
            showError(e)
        }

    }

    // Funcion que se envarga de primero añadir un fondo a cada textura
    function handlerBg() {
        console.log(navigator.onLine)
        // si tiene internet que haga las peticiones
        if (navigator.onLine) {
            auxintentos = 10;
            texturas.forEach(async (textura) => {

                let url = await getImg()
                textura.style = `background-image:url(${url});`
                // segundo emvia la url de la imagen
                textura.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("url", url)
                    btnRefresh.classList.add('show')
                })

            })
            // de lo contrario añade un colo de fondo aleatorio
        } else {
            showError()
            texturas.forEach((textura) => {

                let bgColor = Math.round(Math.random() * 999999)
                console.log(bgColor)
                textura.style = `background-color:#${bgColor};`
                // segundo emvia la url de la imagen

                textura.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("bgColor", bgColor)
                    btnRefresh.classList.add('show')
                })

            })
        }


        zoneDrop.addEventListener('dragover', (e) => {
            e.preventDefault()
        })

        /* pone el mismo fondo de la caja que fue solada encima del contendor  */
        zoneDrop.addEventListener('drop', (e) => {
            auxintentos = 0
            if (navigator.onLine) {
                let url = e.dataTransfer.getData('url')
                zoneDrop.style = `background-image:url(${url}); outline: 5px solid #eee;`
            } else {
                let bgColor = e.dataTransfer.getData("bgColor")
                console.log(bgColor)
                zoneDrop.style = `background-color:#${bgColor};`
            }
        })

    }

    /* Trae otra imagenes y reinica el borde de la zoneDrop */
    btnRefresh.addEventListener('click', () => {
        handlerBg()
        zoneDrop.style = `outline: 5px dashed #eee;`
    })

    /* Por si ocurre un error se muestra este modal que se quita a los 2 segundos */
    function showError(err) {
        modalError.classList.add('show')
        setTimeout(() => { modalError.classList.remove('show') }, 2000)
    }
    

    /* Que solo llame a la función cuando el ususario este en la sección */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && auxintentos <= 1) {
                auxintentos++
                handlerBg()
            }
        })
    })
    observer.observe(zoneDrop)

}
