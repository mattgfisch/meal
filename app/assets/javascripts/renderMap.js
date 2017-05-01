function renderMap () {
  $(document).ready(function () {
    initializeGeocoder()
    return getUserLocation()
  })
}
