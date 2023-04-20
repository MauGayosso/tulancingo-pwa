if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/tulancingo-pwa/sw.js').then(function (registration) {
      console.log('ServiceWorker registrado con éxito: ', registration.scope);
    }, function (err) {
      console.log('Error en el registro de ServiceWorker: ', err);
    });
  });
}

// Instalar el Service Worker
self.addEventListener('install', function (event) {
  console.log('ServiceWorker instalado correctamente');
  event.waitUntil(
    caches.open('cache-v1').then(function (cache) {
      return cache.addAll([
        '/tulancingo-pwa',
        '/tulancingo-pwa/index.html',
        '/tulancingo-pwa/css/style.css',
        '/tulancingo-pwa/js/index.js',
      ]);
    })
  );
});

// Activar el Service Worker
self.addEventListener('activate', function (event) {
  console.log('ServiceWorker activado correctamente');
});

// Escuchar las solicitudes de recuperación
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

if (navigator.setAppBadge) {
  console.log("The App Badging API is supported!");
}

// To display an empty badge
navigator.setAppBadge();

// To display a number in the badge
navigator.setAppBadge(69);
