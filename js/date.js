/* Objeto Date */
// Trabaja con la fecha actual, tiene metodos estaticos, y también puede recibir argumentos, como la fecha que queremos usar
// Usa la fecha del navergador, si no, se le puede especificar atraves de los parametros
const date = new Date();

// console.log(date.getDate()) /* => devuelve el dia del mes */
date.getDay() /* => devuelve el indice de dia 0 a 6 -> Domingo a sabado */
date.getMonth() /* => devuelve el mes indice 0 al 11 -> enero a diciembre */
// console.log(date.getFullYear()) /* => Devuelve el año actual ||  .getYear devuelve el año actual menos 1900 */

date.getHours() /* => hora del día actual */
date.getMinutes() /* => minutos de la hora actual */
date.getSeconds() /* => devuelve los segundos del minuto actual */




const fechaActual = date.toDateString()


export default function digitalClock(reloj, playBtn, stopBtn) {
    let clock;
    playBtn.addEventListener('click', () => {
        playBtn.style = 'pointer-events: none;'
        playBtn.classList.add('controll--active')
        clock = setInterval(() => {
            const date = new Date();

            const horaActual = date.toLocaleTimeString().includes('p.')
                ? `${date.toLocaleTimeString().slice(0, 7)}pm`
                : `${date.toLocaleTimeString().slice(0, 8)}am`

            reloj.innerHTML = `${horaActual}`
        }, 1000)

    })

    stopBtn.addEventListener('click', () => {
        clearInterval(clock)
        reloj.innerHTML = `--:--`
        playBtn.style = 'pointer-events: unset;'
        playBtn.classList.remove('controll--active')
    })

}