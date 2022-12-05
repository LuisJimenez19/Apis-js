/* 
El objeto FileReader permite que las aplicaciones web lean ficheros (o información en buffer) almacenados en el cliente de forma asíncrona,
usando los objetos File o Blob dependiendo de los datos que se pretenden leer.


    _Propiedades_

        FileReader.error 

Un DOMError que representa el error que ocurrió al momento de leer el archivo.

        FileReader.readyState 

Devuelve un entero que indica el estado de FileReader. Puede ser uno de los siguientes:
    0 = Empty
    1 = loading
    2 = Done

        FileReader.result 

El contenido del fichero. 
Esta propiedad es válida solo cuando la propiedad FileReader.readyState es 2, es decir, cuando la lectura ha finalizado.
El formato de la información depende de los métodos usados al iniciar la operación de lectura.

*/

export default function readerFn() {
	const reader = new FileReader(); /* Intanciamos */
	const inputFile = document.querySelector('input[type="file"]');

	inputFile.addEventListener("change", (e) => {
		const typeFile = inputFile.files[0].name;
		/* Por si es un txt o una imagen */
		if (typeFile.includes(".txt")) {
			readFile(inputFile.files[0], "txt");
		} else if (
			typeFile.includes(".jpg") ||
			typeFile.includes(".gif") ||
			typeFile.includes(".png")
		) {
			readFile(inputFile.files[0], "img");
		} else {
			readFile(inputFile.files[0], "video");
		}
	});

	/* Recibe el archivo a leer y el tipo de archivo */
	function readFile(fileToRead, type) {
		if (type === "txt") {
			reader.readAsText(fileToRead);
			reader.addEventListener("load", (event) => {
				let fileState = event.currentTarget;
				if (fileState.readyState == 2) {
					renderFile(fileState.result, type);
				}
			});
		} else if (type === "img") {
			reader.readAsDataURL(fileToRead);
			reader.addEventListener("load", (event) => {
				let fileState = event.currentTarget;
				if (fileState.readyState == 2) {
					renderFile(fileState.result, type);
				}
			});
        } else if (type === "video") {
            
            reader.readAsArrayBuffer(fileToRead);

			reader.addEventListener("load", (event) => {
				let fileState = event.currentTarget;
				if (fileState.readyState == 2) {
					renderFile(fileState.result, type);
				}
			});
        }
        /* Barra de progreso */
        const barProgress = document.querySelector('.bar-progress')
        reader.addEventListener("progress", (e) => {
            let load = e.loaded / fileToRead.size * 100
            console.log(load.toFixed(0))
            barProgress.classList.add('loaded')
            barProgress.style.width = `${load.toFixed(0)}%`
		});
		
		/* Cuando termine se le da el 100% si o si */
		reader.onloadend((e) => {
			barProgress.style.width = `100%`
		})
	}

	const resultFile = document.querySelector(".result-file");
    function renderFile(file, typeAr) {
        
        if (typeAr === "txt") {
            
            resultFile.innerHTML = `<p>${file}</p>`;
            
        } else if (typeAr === "img") {
            
			const $img = document.createElement("img");
			$img.src = file;
			resultFile.appendChild($img);

        } else if (typeAr === "video") {
            let videoAr = new Blob([new Uint8Array(file)], { type: 'video/mp4' , type: 'video/avi' })
            let url = URL.createObjectURL(videoAr)
            let $video = document.createElement('video')
            $video.src = url
            $video.play()
            resultFile.innerHTML = `<video src="${url}" controls>`;
        }
	}
}
