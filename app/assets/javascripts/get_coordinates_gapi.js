var geocoder

function initializeGeocoder () {
  geocoder = new google.maps.Geocoder()
}

var lat
var long

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = "Latitude: " + position.coords.latitude
    long = "Longitude: " + position.coords.longitude
    debugger;
}
