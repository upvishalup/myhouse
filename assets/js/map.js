google.maps.event.addDomListener(window, 'load', initialize);


function toggleMarker(){
  customMarkers[0].toggle();
}

function changeMarker(index){
  var self = customMarkers[index];
  var newDiv = self.div;
  if(!self.isSelected){
    newDiv.innerHTML = self.args.selectedMarker;
    newDiv.style.position = "absolute";
  }else{
    newDiv.innerHTML = self.args.themeMarker;
    newDiv.style.position = "absolute";
    newDiv.style.backgroundImage='url("")';
  }
  self.isSelected = !self.isSelected;
  //google.maps.event.trigger(self, "click");
  closeMarkers(index);
}

function closeMarkers(index){
  for(var i = 0; i < customMarkers.length; i++){
    if(i !== index){
      var newDiv = customMarkers[i].div;
      customMarkers[i].isSelected = false;
      newDiv.innerHTML = customMarkers[i].args.themeMarker;
      newDiv.style.position = "absolute";
      newDiv.style.backgroundImage='url("")';   
    }
  }
}

var map = null;
var customMarkers=[];
function initialize() {
  var lat = jQuery('#map-canvas').data('lat');
  var long = jQuery('#map-canvas').data('long');
  var myLatLng = new google.maps.LatLng(lat,long);
  var listenerFlag = null;
    var roadAtlasStyles = [      
    ];
    var mapOptions = {
      zoom: 13,
      center: myLatLng,
      disableDefaultUI: false,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: true,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'usroadatlas']
      }
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    displayMarkers(getMarkers());    
    var img = jQuery('#map-canvas').data('img');   
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: img,
        title: ''
    });
}

function displayMarkers(markers){
  if(customMarkers){
    clearMarkers(customMarkers);  
  }
  for(var i=0; i < markers.length; i++){
    var theLatLng = new google.maps.LatLng(markers[i].lat, markers[i].lng);
    customMarkers[i] = new CustomMarker(theLatLng, map, markers[i]);
  }
}

function clearMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null); 
    }
    markers.length = 0;
}

function CustomMarker(latlng, map, args) {
  console.log(latlng);
  this.latlng = latlng; 
  this.args = args;
  this.map_ = map;
  this.isSelected = false;  
  this.setMap(map); 
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.onAdd = function(){
  var self = this;
  
  var div = this.div;
  
  if (!div) {
  
    div = this.div = document.createElement('div');
    
    div.innerHTML = self.args.themeMarker;
    div.style.position = "absolute";
    if (typeof(self.args.marker_id) !== 'undefined') {
      div.dataset.marker_id = self.args.locId;
    }
    
    google.maps.event.addDomListener(div, "click", function(event) {
      var newDiv = self.div;
      var divId = newDiv.firstChild.id;
      var event = new CustomEvent('marker-cliked', { 'detail': {"index" :divId, "loc" : "map" }}); 
      window.dispatchEvent(event); 
    });
    
    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }
}

CustomMarker.prototype.draw = function() {
  var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
  var div = this.div;
  if (point) {
    div.style.left = (point.x - 10) + 'px';
    div.style.top = (point.y - 20) + 'px';
  }
};

CustomMarker.prototype.remove = function() {
  if (this.div) {
    this.div.parentNode.removeChild(this.div);
    this.div = null;
  } 
};

CustomMarker.prototype.getPosition = function() {
  return this.latlng; 
};

CustomMarker.prototype.hide = function() {
  if (this.div) {
    // The visibility property must be a string enclosed in quotes.
    this.div.style.visibility = 'hidden';
  }
};

CustomMarker.prototype.show = function() {
  if (this.div) {
    this.div.style.visibility = 'visible';
  }
};

CustomMarker.prototype.toggleDOM = function(){
  if (this.getMap()) {
      this.setMap(null);
    } else {
      this.setMap(this.map_);
    }
}

CustomMarker.prototype.toggle = function() {
  if (this.div) {
    if (this.div.style.visibility === 'hidden') {
      this.show();
    } else {
      this.hide();
    }
  }
};



function propertyNearBy(){
  var allFeatures = {
      "Gastronomy" : [
            {
            "title" : "Aromi",
            "name" : "Náměstí Míru 6, Prague 2",
            "location" : [50.076149, 14.436372],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "Bruxx",
            "name" : "Náměstí Míru 9, Prague 2",
            "location" : [50.075441, 14.438027],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "Yamato",
            "name" : "U Kanálky 14, Prague 2",
            "location" : [50.078406, 14.446084],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "cologne",
            "name" : "Italy 106, Prague 2",
            "location" : [45.57862, 9.9418],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "Vinohrady Brewery",
            "name" : "Korunní 106, Prague 2",
            "location" : [50.075188, 14.457489],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "My Random",
            "name" : "Korunní 106, Prague 2",
            "location" : [50.075186, 14.457486],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            }
      ],
      "Cafe & Bars" : [
            {
            "title" : "Bar and Books",
            "name" : "Mánesova 64, Prague 2",
            "location" : [50.077595, 14.444172],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "Zizkov Tower Bar",
            "name" : "Mahlerovy sady 1, Prague 3",
            "location" : [50.081047, 14.451099],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "La Bottega Gastronomica",
            "name" : "Ondříčkova 17, Prague 3",
            "location" : [50.079816, 14.450390],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },{
            "title" : "La Boheme Cafe",
            "name" : "Sázavská 32, Prague 2",
            "location" : [50.076713, 14.440858],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "Monolok Cafe",
            "name" : "Moravská 18, Prague 2",
            "location" : [50.074226, 14.442974],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "Prosekarna",
            "name" : "Slezská 48, Prague 2",
            "location" : [50.076143, 14.445368],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            }
      ],
      "Culture" : [
            {
            "title" : "The State Opera",
            "name" : "Wilsonova 4, Prague 1",
            "location" : [50.080435, 14.432975],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "Vinohrady Theatre",
            "name" : "Náměstí Míru 7, Prague 2",
            "location" : [50.076380, 14.437040],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "Farmers markets",
            "name" : "Tylovo náměstí, Prague 2",
            "location" : [50.074982, 14.432051],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },{
            "title" : "Farmers markets",
            "name" : "Náměstí Jiřího z Poděbrad, Prague 3",
            "location" : [50.078298, 14.449394],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            }
      ],
      "University&Shopping" : [
            {
            "title" : "The Pavilon",
            "name" : "Vinohradská 50, Prague 2",
            "location" : [50.076706, 14.442326],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "Atrium Flora",
            "name" : "Vinohradská 151, Prague 3",
            "location" : [50.078789, 14.461137],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "Prague University of Economy",
            "name" : "náměstí W. Churchilla 4, Prague 3",
            "location" : [50.084199, 14.441162],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            },
            {
            "title" : "University of New York Prague",
            "name" : "Londýnská 41, Prague 2",
            "location" : [50.073458, 14.433983],
            "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "thubnail" : "assets/img/poi.jpg",
            "image" : "assets/img/poi.jpg",
            "isOpened" : false
            }
         ]
      };
  return allFeatures;
}

function getMarkers() {
    var poisAll = propertyNearBy();
    var key = Object.keys(poisAll)[0];
    var pois = poisAll[key];
    var locations = [];
      for(var i = 0; i < pois.length; i++){
            var locals = {
              locId : i,
              lat: pois[i].location[0],
              lng: pois[i].location[1],
              title: pois[i].title,
              thumbnail:pois[i].thubnail,
              themeMarker: '<div id="'+i+'" class="marker"><div class="theme-marker-css"></div></div>',
              selectedMarker: '<div id="'+i+'" style="background-image:url('+pois[i].thubnail+');" class="chf marker-img"><span class="marker-title">'+pois[i].title+'</span></div><div class="marker-css"></div>'
            } 
           locations.push(locals);
     }
    return locations;
}