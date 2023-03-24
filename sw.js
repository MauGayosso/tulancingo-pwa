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
navigator.setAppBadge(69);

// Push Notifications
/*
self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');

  // Solicitamos permiso para mostrar notificaciones
  self.registration.showNotification('Primera notificacion', {
    body: ' Funciona las notificaciones',
    icon: '/tulancingo-pwa/static/icon.png'
  })
    .then(function (showNotificationResponse) {
      console.log('showNotificationResponse: ', showNotificationResponse);
    })
    .catch(function (error) {
      console.error('Error al mostrar la notificación: ', error);
    });

  // Pedimos permiso para mostrar notificaciones
  self.registration.showNotification('Permiso para mostrar notificacion', {
    body: 'Permiso para mostrar notificacion'
  })
    .then(function (showNotificationResponse) {
      console.log('showNotificationResponse: ', showNotificationResponse);

      // Solicitamos permiso para mostrar notificaciones
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(function (permission) {
          if (permission === 'granted') {
            console.log('Permission granted!');
          } else {
            console.log('Permission denied.');
          }
        });
      }
    })
    .catch(function (error) {
      console.error('Error al mostrar la notificación: ', error);
    });
});
*/

function enviarNotificacion() {
  if (Notification.permission === "granted") {
    var notification = new Notification("NOTIFICACION PRUEBA", {
      body: "Esta es una notificacion de prueba uwu",
      icon : "/tulancingo-pwa/static/icon.png"
    })
  }
}
setInterval(enviarNotificacion, 60 * 1000);