<!-- ================================================== -->
<!-- =============== START GOOGLE MAP PLUGIN ================ -->
<!-- ================================================== -->

window.google = window.google || {};

google.maps = google.maps || {};

(function() {
  initialisedPoi();
  function getScript(src) {
    document.write('<' + 'script src="' + src + '"' +
      ' type="text/javascript"><' + '/script>');
  }
  
  var modules = google.maps.modules = {};

  google.maps.__gjsload__ = function(name, text) {
    modules[name] = text;
  };
  
  google.maps.Load = function(apiLoad) {
    delete google.maps.Load;
    getScript("http://maps.googleapis.com/maps/api/js?sensor=true");
  };

  var loadScriptTime = (new Date).getTime();

  getScript("https://maps.gstatic.com/maps-api-v3/api/js/18/15a/main.js");

})();


<!-- ================================================== -->
<!-- =============== END GOOGLE MAP PLUGIN ================ -->
<!-- ================================================== -->

<!-- ================================================== -->
<!-- =============== START GOOGLE MAP SETTINGS ================ -->
<!-- ================================================== -->

var map = null;
var locMarker = [];
jQuery(document).ready(function(){  
  var lat = jQuery('#map-canvas').data('lat');
  var long = jQuery('#map-canvas').data('long');
  var myLatLng = new google.maps.LatLng(lat,long);
  
  function initialize() {
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
    displayLocInMap(getInitLocations());    
    var img = jQuery('#map-canvas').data('img');    
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: img,
      title: ''
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);
  
});
var displayLocInMap = function (markers) {
  if(locMarker !='undefined' && locMarker != null)
  {
    clearMarkers(locMarker);
  }  

  var lat_lng = new Array();
  var latlngbounds = new google.maps.LatLngBounds();
  for (i = 0; i < markers.length; i++) {
    var data = markers[i];
    var myLatlng = new google.maps.LatLng(data.lat, data.lng);
    lat_lng.push(myLatlng);
    
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        id: data.locId,
        title: data.title,
        icon: {
          url: 'https://www.google.com/mapfiles/marker_green.png'
        }
    });

    locMarker.push(marker);    
    var selectedMarker = null;
       
    google.maps.event.addListener(marker, 'click', function() {    
        var divId =   this.id;     
        var event = new CustomEvent('marker-cliked', { 'detail': divId }); 
        window.dispatchEvent(event); 
        var container = $('#imageresult'),
        scrollTo = $("div.loc-img[data-locid = '"+divId+"']");
        $('html, body').animate({
        scrollTop: (scrollTo.offset().top -60)
        },500); 
        if (selectedMarker) {
            selectedMarker.setIcon('https://www.google.com/mapfiles/marker_green.png');
        }
        this.setIcon('https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png');
        selectedMarker = this; 
        if(!map.getBounds().contains(this.getPosition())){
            map.setCenter(this.getPosition());
            map.setZoom(13);
        }

    });   
  } 
  //map.fitBounds(latlngbounds);
  
  $("div.loc-img").click(function(){
      $this = $(this);
      var divId = $this.data("locid"); 
      console.log(divId);
      google.maps.event.trigger(locMarker[divId], 'click');
  }); 
  
}

function clearMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}

<!-- ================================================== -->
<!-- =============== END GOOGLE MAP SETTINGS ================ -->
<!-- ================================================== -->


function initialisedPoi(){
  var poiImageJsonData = {
      "Gastronomy" : [
            {
            "title" : "Aromi",
            "name" : "Náměstí Míru 6, Prague 2",
            "location" : [50.076149, 14.436372],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "Bruxx",
            "name" : "Náměstí Míru 9, Prague 2",
            "location" : [50.075441, 14.438027],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "Yamato",
            "name" : "U Kanálky 14, Prague 2",
            "location" : [50.078406, 14.446084],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "cologne",
            "name" : "Italy 106, Prague 2",
            "location" : [45.57862, 9.9418],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "Vinohrady Brewery",
            "name" : "Korunní 106, Prague 2",
            "location" : [50.075188, 14.457489],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            }
      ],
      "Cafe & Bars" : [
            {
            "title" : "Bar and Books",
            "name" : "Mánesova 64, Prague 2",
            "location" : [50.077595, 14.444172],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "Zizkov Tower Bar",
            "name" : "Mahlerovy sady 1, Prague 3",
            "location" : [50.081047, 14.451099],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "La Bottega Gastronomica",
            "name" : "Ondříčkova 17, Prague 3",
            "location" : [50.079816, 14.450390],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },{
            "title" : "La Boheme Cafe",
            "name" : "Sázavská 32, Prague 2",
            "location" : [50.076713, 14.440858],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "Monolok Cafe",
            "name" : "Moravská 18, Prague 2",
            "location" : [50.074226, 14.442974],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "Prosekarna",
            "name" : "Slezská 48, Prague 2",
            "location" : [50.076143, 14.445368],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            }
      ],
      "Culture" : [
            {
            "title" : "The State Opera",
            "name" : "Wilsonova 4, Prague 1",
            "location" : [50.080435, 14.432975],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "Vinohrady Theatre",
            "name" : "Náměstí Míru 7, Prague 2",
            "location" : [50.076380, 14.437040],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "Farmers markets",
            "name" : "Tylovo náměstí, Prague 2",
            "location" : [50.074982, 14.432051],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },{
            "title" : "Farmers markets and Cultural Events",
            "name" : "Náměstí Jiřího z Poděbrad, Prague 3",
            "location" : [50.078298, 14.449394],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            }
      ],
      "University&Shopping" : [
            {
            "title" : "The Pavilon",
            "name" : "Vinohradská 50, Prague 2",
            "location" : [50.076706, 14.442326],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "Atrium Flora",
            "name" : "Vinohradská 151, Prague 3",
            "location" : [50.078789, 14.461137],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "Prague University of Economy",
            "name" : "náměstí W. Churchilla 4, Prague 3",
            "location" : [50.084199, 14.441162],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            },
            {
            "title" : "University of New York Prague",
            "name" : "Londýnská 41, Prague 2",
            "location" : [50.073458, 14.433983],
            "description" : "",
            "thubnail" : "",
            "image" : "assets/img/content/g1.jpg",
            "isOpened" : false
            }
         ]
      };
  return poiImageJsonData;
}

function getInitLocations() {
    var poisAll = initialisedPoi();
    var key = Object.keys(poisAll)[0];
    var pois = poisAll[key];
    var locations = [];
      for(var i = 0; i < pois.length; i++){
            var locals = {
              locId : i,
              lat: pois[i].location[0],
              lng: pois[i].location[1],
              title: pois[i].title
            } 
           locations.push(locals);
     }
    return locations;
}

