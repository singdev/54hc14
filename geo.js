var str = window.location.href;
var url = new URL(str);
var LATARV = url.searchParams.get("arlat");
var LONGARV = url.searchParams.get("arlong");

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    // x.innerHTML = "Geolocation is not supported by this browser.";
  }

  function showPosition(position) {
    var latt = position.coords.latitude;
    var loon = position.coords.longitude;

    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lat: 0.4170966, lng: 9.4550096 },
    });
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer, latt, loon);
    document.getElementById("mode").addEventListener("change", () => {
      calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        latt,
        loon
      );
    });
  }
  /////
}

function calculateAndDisplayRoute(
  directionsService,
  directionsRenderer,
  latt,
  loon
) {
  const selectedMode = document.getElementById("mode").value;

  directionsService.route(
    {
      origin: { lat: parseFloat(latt), lng: parseFloat(loon) },
      destination: {
        lat: parseFloat(LATARV),
        lng: parseFloat(LONGARV),
      },
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode],
    },
    (response, status) => {
      if (status == "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
