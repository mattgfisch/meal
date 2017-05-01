var geocoder

function initializeGeocoder () {
  geocoder = new google.maps.Geocoder()
}

var lat
var long

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(returnPosition, function(coordinates) {
          debugger
        })
    } else {
        x = "Geolocation is not supported by this browser.";
    }
}

function returnPosition(position, result) {
    lat = position.coords.latitude
    long = position.coords.longitude
    result(lat + ' ' + long)
}
