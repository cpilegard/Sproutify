////////
// MAP
function Map(element, lat, lng) {
  this.element = element;
  this.lat = lat;
  this.lng = lng;
  this.markers = [];
  this.generate();
}

Map.prototype = {
  generate: function() {
    var latLng = new google.maps.LatLng(this.lat, this.lng);
    var mapOptions = {
      zoom: 12,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.element, mapOptions);
    console.log('made it here');
    this.info_window = new google.maps.InfoWindow({
      content: "placeholder"
    });
  },
  placeGarden: function(garden) {
    var gardenMarker = new GardenMarker(this.map, garden)
    this.markers.push(gardenMarker);
  }
}

//////////
// MARKER
function GardenMarker(map, garden) {
  this.map = map;
  this.garden = garden;
  this.place(map, garden.lat(), garden.lng());
}

GardenMarker.prototype = {
  place: function(map, lat, lng) {
    var latLng = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({
        map: map,
        position: latLng,
        title: this.garden.username()
    });
  }
}