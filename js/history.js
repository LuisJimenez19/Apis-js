/*
    Manipulando el historial del navegador
El objeto DOM window proporciona acceso al historial del navegador a través del objeto history . 
Este da acceso a métodos y propiedades útiles que permiten avanzar y retroceder a través del historial del usuario, así como --a partir de HTML5-- manipular el contenido del historial.

    Viajando a través del historial
Retroceder y avanzar a través del historial del usuario utilizando los métodos back(), forward() y go().
        back => vuelve a la pagina anterior
        forward => la pagina siguiente
        go() => se le indica a que pagina ir relativamente partiendo desde la pagina actual [0] 

        // history.length para ver cuantas paginas estan en la pila


    metodods que reciben 3 parametros 
        history.pushState( {clave : "valor"}, "titulo de la pagina", "url") => crea una nueva entrada para el historial 
//                             obj estado  ,     titulo,      url    => se puede ver el estado con el 'evento popstate'


    history.replaceState()  => recibe los mismo parametros, modifica la url pero no la conserva


 */

function historial() {
    // history.back()
}

export default historial;