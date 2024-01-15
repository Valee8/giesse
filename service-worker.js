
const imagePrefix = process.env.NODE_ENV === 'production' ? '/giesse/' : '/';

// Passo 1: Evento di installazione - si verifica quando il service worker viene installato per la prima volta
self.addEventListener('install', (event) => {
    event.waitUntil(
        // Apri una cache con il nome 'my-cache'
        caches.open('my-cache').then((cache) => {
            // Aggiungi tutte le immagini che desideri memorizzare nella cache
            return cache.addAll([
                imagePrefix + "img/jumbotron.png",
                imagePrefix + "img/sfondo-faq.png",
                imagePrefix + "img/ringraziamento.png",
                imagePrefix + "img/Prova.jpg",
                imagePrefix + "img/Prova2.jpg",
                imagePrefix + "img/Prova3.jpg",
                imagePrefix + "img/bg-nav-bottom.png",
                imagePrefix + "img/bg-nav-center.png",
                imagePrefix + "img/bg-nav-top.png",
                imagePrefix + "img/zanzariere/alba-laterale.png",
                imagePrefix + "img/zanzariere/alba.png",
                imagePrefix + "img/zanzariere/bora.png",
                imagePrefix + "img/zanzariere/casper.png",
                imagePrefix + "img/zanzariere/fissa.png",
                imagePrefix + "img/zanzariere/giada.png",
                imagePrefix + "img/zanzariere/jolly.png",
                imagePrefix + "img/zanzariere/katia.png",
                imagePrefix + "img/zanzariere/lara-rigata.png",
                imagePrefix + "img/zanzariere/laura.png",
                imagePrefix + "img/zanzariere/levante.png",
                imagePrefix + "img/zanzariere/luna.png",
                imagePrefix + "img/zanzariere/plisse-22.png",
                imagePrefix + "img/zanzariere/porta-a-battente.png",
                imagePrefix + "img/zanzariere/scorri.png",
                imagePrefix + "img/zanzariere/zelig.png",
                "/",
                "/verticali/0",
                "/orizzontali/1",
                "/preventivo",
                "/contatti",
                "/sede",
            ]);
        })
    );
});

// Passo 2: Evento di recupero - si verifica quando viene fatta una richiesta da una pagina
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return fetch(event.request).then((fetchResponse) => {
                if (fetchResponse) {
                    // Chiamare clone solo una volta
                    const responseToCache = fetchResponse.clone();

                    caches.open(cacheName).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return fetchResponse || response;
            });
        })
    );
});
