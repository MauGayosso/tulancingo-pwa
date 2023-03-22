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
function isNewNotificationSupported() {
  if (!window.Notification || !Notification.requestPermission)
      return false;
  if (Notification.permission == 'granted')
      throw new Error('You must only call this *before* calling Notification.requestPermission(), otherwise this feature detect would bug the user with an actual notification!');
  try {
      new Notification('');
  } catch (e) {
      if (e.name == 'TypeError')
          return false;
  }
  return true;
}

if (window.Notification && Notification.permission == 'granted') {
  // We would only have prompted the user for permission if new
  // Notification was supported (see below), so assume it is supported.
  doStuffThatUsesNewNotification();
} else if (isNewNotificationSupported()) {
  // new Notification is supported, so prompt the user for permission.
  showOptInUIForNotifications();
}