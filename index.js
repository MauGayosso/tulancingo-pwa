var ubiStart = { lat: 20.0858, lng: -98.3633 };
var zoomStart = 13;
var moreZoom = 18;
var disableDefaultUI = true;
var user;
var proximityThreshold = 400; // en kilómetros

var dangerousDistance = proximityThreshold * .01;

console.log(dangerousDistance)

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    user_latitude = position.coords.latitude;
    user_longitude = position.coords.longitude;
    addMarker(user_latitude, user_longitude);
  });
} else {
  console.log("La geolocalización no está disponible en este navegador.");
}

var markers = [
  {
    title: "Asalto cerca del zologico",
    position: { lat: 20.082699, lng: -98.359942 },
    content: "Asalto cerca del zologico",
  },
  {
    title: "Robo a mano Armada",
    position: { lat: 20.0793, lng: -98.368813 },
    content: "Robo a mano Armada en Juan C. Doria e Independencia",
  },
  {
    title: "Crimen Cerca",
    position: {lat: 20.053663, lng: -98.717538},
    content: 
    'Huye perra'
  },
  {
    title: "Suicidio",
    position:{lat:20.0500877,lng:-98.3378842},
    content : 'https://www.elsoldetulancingo.com.mx/policiaca/menor-se-quito-la-vida-en-cuautepec-9936188.html'
  },
  {
    title: "Robo",
    position:{lat:20.0806518, lng:-98.3694567},
    content : 'https://www.noticiastulancingo.com/detienen-a-uno-por-robo-en-dulces-cravioto-en-el-centro-de-tulancingo/'
  },
  {
    title: "Narcomenudeo",
    position : {lat:20.0554348,lng:-98.3522486},
    content: 'https://www.noticiastulancingo.com/dictan-prision-preventiva-a-cuatro-sujetos-por-narcomenudeo-en-cuautepec/'
  },
  {
    title : "Incendio",
    position : {lat:20.0709417,lng:-98.3944257},
    content : 'https://www.facebook.com/reel/200716696071057'
  },
  {
    title : "Asesinato",
    position : {lat:20.0225924,lng:-98.2038383},
    content : 'https://www.elsoldetulancingo.com.mx/policiaca/ejecutan-a-dos-dentro-de-una-camioneta-en-cuautepec-9926831.html'
  },
  {
    title : "Accidente Automovilistico",
    position : {lat:20.0836897,lng:-98.3788405},
    content : 'https://www.elsoldetulancingo.com.mx/policiaca/choca-su-auto-contra-poste-y-se-da-a-la-fuga-9934066.html'
  },
  {
    title : "Campaña de Salud",
    position : {lat:20.1057283,lng:-98.3864503},
    content : 'https://www.ultranoticias.com.mx/theme-features/hidalgo-portada/panorama-general-hidalgo/item/121833-se-abre-la-convocatoria-respectiva-para-participar-%20.html'
  }
];
var map;
function addMarker(user_latitude, user_longitude) {
  if (!user) {
    //lat 20.0522364 lng -98.716718
    markerUser = new google.maps.Marker({
      position: { lat: user_latitude, lng: user_longitude },
      map: map,
      icon: "./static/user.png",
      title: "You",
      clickable: true,
    });
    markerNearUser = new google.maps.Marker({
      position: { lat: user_latitude-0.000099, lng: user_longitude },
      map: map,
      icon: "./static/error.png",
      title: "near you",
      clickable: true,
    });
    var infowindow = new google.maps.InfoWindow({
      content: "you",
    });
    markerUser.addListener("click", function () {
      map.setZoom(18);
      map.setCenter(markerUser.getPosition());
      infowindow.open(map, markerUser);
    });
    console.log("lat " + user_latitude + " lng " + user_longitude);
    var userLocation = { lat: user_latitude, lng: user_longitude };
    for (var i = 0; i < markers.length; i++) {
      var result = calculateDistanceBetweenTwoPoints(
        userLocation,
        markers[i].position
      );
      console.log(result);
      if (result <= dangerousDistance) {
        if (Notification.permission === "granted") {
          new Notification("Con cuidado!", {
            body: "Se ha producido un acto delictivo en las cercanías, Titulo de la noticia '"+ markers[i].title+"'",
            icon: "./static/error.png",
          });
        } else {
          Notification.requestPermission();
        }
      }
    }
  }
}

// solicita permiso para mostrar notificaciones
Notification.requestPermission().then(function (result) {
  console.log(result);
});

function calculateDistanceBetweenTwoPoints(userLocation, target) {
  return Math.sqrt(
    Math.pow(target.lng - userLocation.lng, 2) +
      Math.pow(target.lat - userLocation.lat, 2)
  );
}
async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: ubiStart.lat, lng: ubiStart.lng },
    zoom: zoomStart,
    disableDefaultUI: disableDefaultUI,
    styles: [
      {
        featureType: "poi",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ],
  });
  var icons = {
    url: "./static/error.png",
    scaledSize: new google.maps.Size(30, 30),
  };
  for (var i = 0; i < markers.length; i++) {
    var marker = new google.maps.Marker({
      position: markers[i].position,
      map: map,
      icon: icons,
      title: markers[i].title,
      clickable: true,
    });
    // Crea la ventana de información
    var infowindow = new google.maps.InfoWindow({
      content: '<a href="'+markers[i].content+'">'+markers[i].title+'</a>'
    });

    // Crea una función de cierre para pasar la referencia correcta al evento click
    (function (marker, infowindow) {
      // Agrega un evento click al marcador para mostrar la ventana de información
      marker.addListener("click", function () {
        map.setZoom(moreZoom);
        map.setCenter(marker.getPosition());
        infowindow.open(map, marker);
      });
    })(marker, infowindow);
  }
}

function resetMap() {
  map.setZoom(zoomStart);
  map.setCenter({ lat: ubiStart.lat, lng: ubiStart.lng });
}
