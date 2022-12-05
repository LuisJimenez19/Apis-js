/* 
    IndexedDB es una manera de almacenar datos dentro del navegador del usuario. Debido a que permite la creación de aplicaciones con habilidades de consulta 
    enriquecidas, con independencia de la disponibilidad de la red, sus aplicaciones pueden trabajar tanto en línea como fuera de línea.

    El patrón básico que indexedDB propone es:

    Abrir una base de datos.
    Crear un objeto de almacenamiento en la base de datos.
    Iniciar una transacción y hacer una petición para hacer alguna operación de la base de datos, tal como añadir o recuperar datos.
    Espere a que se complete la operación por la escucha de la clase correcta de eventos DOM .
    Hacer algo con el resultado (El cual puede ser encontrado en el objeto de la petición).
*/

/* Hacer un estilo de usuarios con nombre, edad y foto
foto por defecto
file reader para subir foto
 */

/* Crear a travé sdel objeto y el metodo open()
comprobar si la base de datos existe o tiene que ser creada
crear almacén de objetos cone le método createObjetctStore()
Escuchar los eeventos de exito o de error
 */

let themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
let themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    themeToggleLightIcon.classList.remove("hidden");
} else {
    themeToggleDarkIcon.classList.remove("hidden");
}

let themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    // if set via local storage previously
    if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("color-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("color-theme", "light");
        }

        // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("color-theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("color-theme", "dark");
        }
    }
});


export default function indexedDB() {
    /* Instanciamos el objeto */
    const indexedDB = window.indexedDB;
    const tBody = document.querySelector('.tbody')
    const modalForm = document.getElementById('modal-form')

    const table = document.getElementById('table')

    const putBtn = document.getElementById('put-user')
    const deleteBtn = document.getElementById('delete-user');

    if (indexedDB) {
        /* Petición para abrir la base de datos  */
        const request = indexedDB.open("colpatria", 1);

        /* evento que registra que todo salio bien, si todo sale bien llama a la funcion MAIN que contiene toda la interactividad con el cliente, 
        en esta parte estan las conecciones a la BD en algunas funciones se usa callBacks y en otras se devuele el objeto request, tenga entendido que esto es una practica */
        request.addEventListener("success", (e) => {
            main();
        });

        /* Evento que crea la base de datos, unico lugar donde se puede alterar la estructura de la db */
        request.addEventListener("upgradeneeded", (e) => {
            console.log(`La base de datos fue creada correctamente ${e}`);
            const dataBase = request.result; /* responde con la base de datos */
            /* crea un almacen de objetos */
            dataBase.createObjectStore("users", {
                // autoIncrement: true,
                keyPath: "DNI" /* en el 1er parametro el nombre, en 2do las configuraciones, autoIncrement, ketPath */,
            });
        });

        /* Evento que registra un error */
        request.addEventListener("error", (e) => {
            console.log(`Ocurrio un error ${e}`);
        });

        /* función que abre una transacción (nombre del almacen, el modo en el que se abre) 
        esta función va a ser llamada siempre que se quiera hacer una transacción, osea es llamada por las demas funciones*/
        function openTransaction(store, mode) {
            const dataBase = request.result;
            const IDBtransaction = dataBase.transaction(store, mode); /* Se abre la transacción */
            const objectStore = IDBtransaction.objectStore(store);
            return objectStore;
        }

        /* Función que añade a la base de datos (create) */
        function addUser(user, fnRender) {
            const IDBoperation = openTransaction("users", "readwrite");

            const request = IDBoperation.add(user);
            request.onsuccess = function () {
                fnRender(user, true)
            }
            request.onerror = function (e) {
                console.log(e.target.error.message)
                alert('Ya existe un usuario con ese DNI, verifique y vuelva a intentarlo')
            }
        }

        /* Función que trae un objeto con el key asignado */
        function getUser(key) {
            const IDBoperation = openTransaction("users", "readonly");
            const request = IDBoperation.get(key);
            return request
            
        }

        /* Función que trae a los usuarios que esten en la base datos */

        function getUsers(fnRender = undefined) {
            const IDBoperation = openTransaction("users", "readonly");
            const cursor = IDBoperation.openCursor();

            const arrUsers = []

            cursor.onsuccess = () => {
                if (cursor.result) {
                    arrUsers.push(cursor.result.value);
                    cursor.result.continue();

                } else {
                    fnRender(arrUsers)
                }
            };
        }

        /* Función que modifica o crea un objeto */
        function putUser(key, value) {
            const IDBoperation = openTransaction("users", "readwrite");
            const request = IDBoperation.get(key);
            request.addEventListener("success", (e) => {
                if (e.target.result === undefined) {
                    alert("No existe usuario con esa clave");
                } else {
                    IDBoperation.put(value);
                    alert(`usuario ${value.name} modificado correctamente`);
                }
            });
        }

        /* Función que elimina un objeto */
        function deleteUser(key) {
            const IDBoperation = openTransaction("users", "readwrite");
            const request = IDBoperation.get(key);

            request.addEventListener("success", (e) => {
                console.log(e.target.result);
                if (e.target.result === undefined) {
                    alert("No existe usuario con esa clave");
                } else {
                    IDBoperation.delete(key);
                    alert(`usuario eliminado correctamente`);
                }
            });
        }
        function clearDB() {
            const IDBoperation = openTransaction("users", "readwrite")
            const resquest = IDBoperation.clear()
            alert("Datos borrados exitosamente")
            
        }

        /* Función que conecta el front con el back */
        function main() {

            console.log(tBody.children.length)
            if (tBody.children.length === 0) {
                table.classList.add('hidden')
            } else {
                table.classList.remove('hidden')
            }

            const verifyData = () => {
                const IDBoperation = openTransaction("users", "readonly");
                const cursor = IDBoperation.openCursor();
                cursor.onsuccess = () => {
                    if (cursor.result) {
                        if (confirm("Se encontraron datos de colpatria, desea cargarlos?")) {
                            getUsers(renderUsers)
                        }
                    }
                };
            }
            verifyData()

            const form = document.getElementById('form')

            const inputName = document.getElementById('name');
            const inputDni = document.getElementById('dni');
            const inputEmail = document.getElementById('email');
            const inputPass = document.getElementById('pass');
            const inputPhoto = document.getElementById('file')

            /* mostrar o esconder el formulario */
            document.addEventListener('click', (e) => {
                if (e.target.matches('#add-user-modal')) {
                    modalForm.classList.toggle('hidden')

                    inputName.value = ""
                    inputDni.value = ""
                    inputEmail.value = ""
                    inputPass.value = ""

                    document.querySelector(".img-preview").src = "../src/1.jpg"
                    inputName.placeholder = "Introduce tu nombre"
                    inputDni.placeholder = "introduce tu dni"
                    inputDni.removeAttribute("disabled")

                    inputEmail.placeholder = "ejemplo@gmail.com"
                    document.querySelector('#form-title').textContent = `Agregar usuario`

                    document.querySelector('#put-user').classList.add('hidden')
                    document.querySelector('#add-user').classList.remove('hidden')

                }
                if (e.target.matches('#close')) {
                    // modalForm.classList.toggle('hidden')
                    getUsers(renderUsers)
                    document.querySelector('#modal-form').classList.toggle('hidden')
                }
                if (e.target.matches('#get-users')) {
                    getUsers(renderUsers)
                }

                /* Cuando le de click en ver mas hace una petición a la BD, devuelve peticion y espero a que se dispare el evento, otra forma seria con un callback */

                if (e.target.matches('.look-more')) {
                    let request = getUser(e.target.id)
                    request.addEventListener('success', () => {
                        renderModalPut(request.result)
                    })
                }


            })

            /* renderiza los usuarios */
            function renderUsers(arr, one = false) {
                
                if (one === true) {
                    // tBody.innerHTML = ""
                    let tr =
                        `<tr class="bg-zinc-300 border-b dark:bg-gray-800
                                dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600
                                cursor-pointer">
                        <th scope="row" class="py-4 px-6 font-medium text-gray-900
                            whitespace-nowrap dark:text-white flex items-center gap-5">
                            <img width="50" height="50" class="p-1 rounded-full ring-2 ring-gray-300
                            dark:ring-gray-500 th__img" src="${arr.photo}" alt="photo">
                            <p>${arr.name}</p>
                        </th>
                        <td class="py-4 px-6">
                            ${arr.DNI}
                        </td>
                        <td class="py-4 px-6">
                            ${arr.email}
                        </td>
                        <td class="py-4 px-6">
                            <a type="button" class="text-white bg-gradient-to-r
                  from-slate-900 via-slate-800 to-slate-700
                  hover:bg-gradient-to-br
                  dark:bg-gradient-to-r
                  dark:from-teal-900 dark:via-teal-800 dark:to-teal-700 dark:hover:bg-gradient-to-br
                  font-medium rounded-lg text-sm px-5
                  py-2.5 text-center cursor-pointer look-more" id="${arr.DNI}">Ver mas</a>
                        </td>
                    </tr>`

                    tBody.innerHTML += tr
                    modalForm.classList.add('hidden')
                }
                else {
                    tBody.innerHTML = ""
                    arr.map((obj => {

                        let tr =
                            `<tr class="bg-zinc-300 border-b dark:bg-gray-800
                                        dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600
                                        cursor-pointer">
                               <th scope="row" class="py-4 px-6 font-medium text-gray-900
                                    whitespace-nowrap dark:text-white flex items-center gap-5">
                                    <img width="50" height="50" class="p-1 rounded-full ring-2 ring-gray-300
                                    dark:ring-gray-500 th__img" src="${obj.photo}" alt="photo">
                                    <p>${obj.name}</p>
                                </th>
                                <td class="py-4 px-6">
                                    ${obj.DNI}
                                </td>
                                <td class="py-4 px-6">
                                    ${obj.email}
                                </td>
                                <td class="py-4 px-6">
                                    <a type="button" class="text-white bg-gradient-to-r
                                      from-slate-900 via-slate-800 to-slate-700
                                        hover:bg-gradient-to-br
                                        dark:bg-gradient-to-r
                                      dark:from-teal-900 dark:via-teal-800 dark:to-teal-700 dark:hover:bg-gradient-to-br
                                        font-medium rounded-lg text-sm px-5
                                        py-2.5 text-center cursor-pointer look-more" id="${obj.DNI}">Ver mas</a>
                                </td>
                            </tr>`

                        tBody.innerHTML += tr
                    }))

                }
                console.log(tBody.children.length)
                if (tBody.children.length === 0) {
                    table.classList.add('hidden')
                } else {
                    table.classList.remove('hidden')
                }
                return arr
            }




            /* Filtro el input del dni */
            inputDni.addEventListener('keypress', (e => {
                let value = e.target.value
                e.target.value = parseInt(value.toString().slice(0, 7))
            }))


            /* Funcion que guarda la imagen en la DB si no deja por defecto */
            const reader = new FileReader()
            let photo = "../src/1.jpg"
            inputPhoto.addEventListener('change', (e) => {
                reader.readAsDataURL(inputPhoto.files[0]);

                reader.addEventListener("load", (event) => {
                    let fileState = event.currentTarget;
                    if (fileState.readyState == 2) {
                        // photo = URL.createObjectURL(fileState.result)
                        photo = fileState.result
                        if (!photo.includes('image')) {
                            alert('Por favor selecciona una imagen')
                            photo = "../src/1.jpg"
                        } else {
                            document.querySelector(".img-preview").src = photo
                        }
                    }
                });
            })


            /* Añade el usuario a la DB */
            form.addEventListener('submit', (e => {
                e.preventDefault()
                let name = inputName.value
                let DNI = inputDni.value
                let email = inputEmail.value
                let pass = inputPass.value

                if (DNI.length != 8) {
                    alert("Ingrese un DNI valido")
                }
                else {

                    const user = {
                        name,
                        DNI,
                        email,
                        pass,
                        photo
                    }
                    addUser(user, renderUsers);
                    inputName.value = ""
                    inputDni.value = ""
                    inputEmail.value = ""
                    inputPass.value = ""

                }

            }))

            function updateUser(user) {
                let name = inputName.value
                let DNI = user.DNI
                let email = inputEmail.value
                let pass = inputPass.value

                const userPut = {
                    DNI: user.DNI,
                    name,
                    DNI,
                    email,
                    pass,
                    photo
                }
                putUser(user.DNI, userPut)
                document.querySelector('#modal-form').classList.toggle('hidden')
                getUsers(renderUsers)
            }

            /* Renderiza el formulario para actualizar o eliminar el user */
            let b = 0
            function renderModalPut(user) {
                // inputName.value = ""
                // inputDni.value = ""
                // inputEmail.value = ""
                // inputPass.value = ""

                inputName.value = user.name
                inputDni.value = user.DNI
                inputEmail.value = user.email
                inputPass.value = user.pass
                inputDni.setAttribute("disabled", true)
                document.querySelector(".img-preview").src = user.photo

                modalForm.classList.toggle('hidden')
                document.querySelector('#put-user').classList.remove('hidden')
                document.querySelector('#add-user').classList.add('hidden')
                document.querySelector('#form-title').textContent = `Modificar usuario ${user.name}`


                putBtn.onclick = () => {
                    b++
                    console.log(b)
                    updateUser(user)
                }

                deleteBtn.onclick = () => {
                    if (confirm(`Seguro desea eliminar al usuario ${user.name}`)) {
                        deleteUser(user.DNI)
                    }
                    document.querySelector('#modal-form').classList.toggle('hidden')
                    getUsers(renderUsers)
                }
            }

            /* Combinación de teclas que limpia por completo la base de datos */
            document.addEventListener('keypress', (e) => {
                if (e.key === "B" && e.shiftKey) {

                    if (confirm("Esta seguro que desea borrar todos los datos?, no podra recuperarlos")) {
                        if (confirm("Pero de verdad esta seguro que lo desea hacer?")) {
                            if (confirm("ultima palabra?")) {
                                alert("pues no se puede xd")
                            } else {
                                clearDB()
                                getUsers(renderUsers)
                            }
                        }
                    }
                }
            })
        }
    }

}
indexedDB()