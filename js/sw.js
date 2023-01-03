/* En este service worker voy a guardar los estilos de la pagína para que se vea sin conexión a internet */

let versionCache = "version 2"
/* guardamos en cache al instalarse el serviceWorker */
self.addEventListener("install", e => {
    caches.open(versionCache).then(cache => {
        cache.addAll(["../css/styles.css", "../index.html"]).then(res => {
            console.log(`Se ha cacheado la informacion en ${versionCache}`)
        })
    })
})



/* cuando este activao esto sirve para actualizar el cache */

self.addEventListener("activate", () => {
    /* devuelve una matriz de los datos guardados en cache */
    caches.keys().then((key) => {
        /* retorna una promesa que se resolvera con un mapeo del cache */
        return Promise.all(key.map(cache => {
            /* Si hay otro cache, (otra versión) se borra para no ocupar espacio */
            if (cache !== versionCache) {
                console.log("cache actualizado")
                return caches.delete(cache)
            }
        }))
    })
})


/* Intercepta una petición*/
self.addEventListener("fetch", (e) => {
    /* responder con */
    e.respondWith(async () => {
        /* Si la solicitud esta guardad en cache */
        const resInCache = await caches.match(e.request)
        console.log(resInCache)
        if (resInCache) return resInCache;
        /* si no, responde con la respuesta del servi */
        return e.request;
    })
})