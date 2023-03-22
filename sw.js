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

navigator.setAppBadge(42).then(() => {
  console.log("The badge was added");
}).catch(e => {
  console.error("Error displaying the badge", e);
});

// CONTROL CENTER NOTIFICATIONS

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');

  var title = 'Primera notificacion';
  var options = {
    body: 'Prueba notificacion',
    icon: '/tulancingo-pwa/static/icon.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification clicked.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://maugayosso.github.io/tulancingo-pwa/')
  );
});

// PUSH NOTIFICATIONS

button.addEventListener("click", () => {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("The user accepted");
    }
  });
});

const notification = new Notification("Hello World!");