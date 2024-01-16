const cacheName = 'my-site-cache-v1';

const filesToCache = [
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
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Ritorna la risorsa dalla cache, se presente
            if (response) {
                return response;
            }

            // Altrimenti, effettua la richiesta di rete e memorizza la risorsa nella cache
            return fetch(event.request).then((response) => {
                // Controllo di validità della risposta
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                const responseToCache = response.clone();

                caches.open(cacheName).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});
