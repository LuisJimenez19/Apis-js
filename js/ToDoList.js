/*  */
export default function ToDoList() {
    const inputTask = document.querySelector('#input-task');
    const btnAddTask = document.querySelector('#btn-add-task');

    const taskContainer = document.querySelector('.tasks-to-do');


    const btnRemoveAll = document.querySelector('.btn-remove-all');

    const taskCompletedContainer = document.querySelector('.tasks-completed');

    const btnClearAll = document.querySelector('.btn-clear-all');

    /* index para cada tarea */
    let auxIndex = 1

    /* Array de objetos este se guarda en el localStorage */
    let taskArr = [];

    /* Array de Objetos que estan completados */
    let taskArrCompleted = [];


    /* Objeto tarea */
    let taskObj;
    if (localStorage.length >= 1) {

        if (localStorage.getItem('tasks')) {
            taskArr = localStorage.getItem('tasks')
            taskArr = JSON.parse(taskArr)
            renderizarTask(taskContainer, taskArr)
            auxIndex = taskArr.length + 1
        }


        if (localStorage.getItem('tasksCompleted')) {
            taskArrCompleted = JSON.parse(localStorage.getItem('tasksCompleted'))
            renderizarTask(taskCompletedContainer, taskArrCompleted)

        }

    } else {
        taskArr = [];
        auxIndex = 1
        showBtnClear(taskCompletedContainer)
        showBtnClear(taskContainer)
    }

    /* Limpia la sección de tareas a completar */
    btnRemoveAll.addEventListener('click', () => {
        localStorage.removeItem('tasks')
        taskArr = [];
        auxIndex = 1;
        taskContainer.innerHTML = ''
        showBtnClear(taskContainer)

    })


    /* Limpia la sección de tareas completadas y el local storage */
    btnClearAll.addEventListener('click', () => {

        localStorage.removeItem('tasksCompleted')
        taskArrCompleted = [];
        auxIndex = 1;
        taskCompletedContainer.innerHTML = ''
        showBtnClear(taskCompletedContainer)

    })






    /* Agregar las tareas al arreglo de las tareas después guarda las tareas en el LocalStorage y en renderiza */

    document.addEventListener('keypress',(e)=> {
        
        if (e.key == 'Enter' && document.activeElement == inputTask) {
            addTask()
        }

    })

    btnAddTask.addEventListener('click', addTask)

    function addTask() {
        if (inputTask.value) {
            inputTask.classList.remove('input--empty')
            let task = inputTask.value

            taskObj = {
                index: auxIndex,
                id: Date.now(),
                task,
            }
            auxIndex++;


            taskArr.push(taskObj)
            inputTask.value = ''

            saveTask(taskArr)

        } else {
            inputTask.classList.add('input--empty')
            setTimeout(() => {
                inputTask.classList.remove('input--empty')
            },1000)
        }
    }


    /* funccion que guarda las tareas y  llama a la funcion encargada de renderizar */
    function saveTask(taskArr) {

        localStorage.setItem('tasks', JSON.stringify(taskArr))
        renderizarTask(taskContainer, taskObj, 1)

    }


    /*Los botones escuchan */
    function updateBtns(btns) {
        btns.forEach(btn => {
            if (btn.classList.contains('icon-done')) {
                btn.addEventListener('click', taskCompleted)

            } else/* (btn.classList.contains('icon-close'))  */ {
                btn.addEventListener('click', taskRemove)
            }

        })
    }
    /* Funcion que actualiza las tareas completadas */

    function taskCompleted(e) {
        let taskObjCompleted;
        /* Encuentro la tarea en el array y lo almaceno en la variable para poder almacenarlo en el array de tareas compeltadas y después lo borro del array */
        taskArr.forEach((task) => {
            if (task.id == e.target.id) {
                taskObjCompleted = task
            }
        })

        /* añado la tarea completada al array y la guardo en el localStorage */
        taskArrCompleted.push(taskObjCompleted)

        renderizarTask(taskCompletedContainer, taskObjCompleted, 1)

        localStorage.setItem('tasksCompleted', JSON.stringify(taskArrCompleted))



        /* actualizamos el array de tareas por completar */
        taskArr = taskArr.filter(task => task !== taskObjCompleted)
        localStorage.setItem('tasks', JSON.stringify(taskArr))


        const taskElementCompletada = taskContainer.removeChild(e.target.parentElement)

        showBtnClear(taskCompletedContainer)
        showBtnClear(taskContainer)
    }

    /* Funcion que elimina las tareas completadas y limpia el storage */
    function taskRemove(e) {

        taskArrCompleted = taskArrCompleted.filter(task => task.id !== parseInt(e.target.id))
        localStorage.setItem('tasksCompleted', JSON.stringify(taskArrCompleted))

        taskCompletedContainer.removeChild(e.target.parentElement)

        showBtnClear(taskCompletedContainer)
        showBtnClear(taskContainer)
    }


    /* Si ya hay algo en el localStorage lo dibuja, en el segundo parametro se especifica si solo se va a añadir uno */
    function renderizarTask(container, taskObj, n = 0) {

        let modeIcon = container == taskContainer ? 'done' : 'close'

        if (n == 1) {
            const taskHtml = document.createElement('div')
            taskHtml.className = 'task-to-do'
            taskHtml.innerHTML =
                `
                    <p>
                        <span class="index-task">${taskObj.index}</span>
                        ${taskObj.task}
                    </p>
                    <span id="${taskObj.id}" class="material-symbols-outlined icon icon-${modeIcon}">${modeIcon}</span>
                `
            container.appendChild(taskHtml)

        }

        else {

            taskObj.forEach((task) => {
                const taskHtml = document.createElement('div')
                taskHtml.className = 'task-to-do'
                taskHtml.innerHTML =
                    ` 
                    <p>
                        <span class="index-task">${task.index}</span>
                        ${task.task}
                    </p>
                    <span id="${task.id}" class="material-symbols-outlined icon icon-${modeIcon}">${modeIcon}</span>
                `

                container.appendChild(taskHtml)

            })
        }
        showBtnClear(container)
        /* Traigo a los botones para cuando este completada una tarea */
        let btnsDone = document.querySelectorAll('.icon-done');
        btnsDone = [...btnsDone]

        let btnsClose = document.querySelectorAll('.icon-close');
        btnsClose = [...btnsClose]

        updateBtns(btnsDone)
        updateBtns(btnsClose)
    }



    /* funcion que muestra los botones de eliminar todo */
    function showBtnClear(container) {
        if (!container.children.length) {
            container.nextElementSibling.classList.add('disabled')

        } else {
            container.nextElementSibling.classList.remove('disabled')
        }
    }
}