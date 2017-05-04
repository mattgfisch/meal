function getRestaurants (latitude, longitude) {
  if (latitude && longitude) {
    var center = {lat: latitude, lng: longitude}
    var map = new google.maps.Map(document.getElementsByClassName('map')[0], {
      center: center,
      zoom: 15
    })
    var service = new google.maps.places.PlacesService(map)
    service.nearbySearch({
      location: center,
      radius: 500,
      type: ['restaurant']
    }, callback)
  }
}

function callback (results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    debugger;
    var collection = '<div><h3>Restaurants</h3></div>'
    for (var i = 0; i < results.length; i++) {
      let restaurantName = results[i].name
      let url = 'https://www.google.com/maps/place/' + restaurantName.replace(/\s/g, '+')
      collection += ('<p>' + '<a href=' + url + '>' + restaurantName + '</p>')
    }
    $('.restaurants-list').html(collection)
  }
}
