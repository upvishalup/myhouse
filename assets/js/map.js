<!-- ================================================== -->
<!-- =============== START GOOGLE MAP PLUGIN ================ -->
<!-- ================================================== -->

window.google = window.google || {};

google.maps = google.maps || {};

(function() {

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
          disableDefaultUI: true,
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: false,
          draggable: false,
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'usroadatlas']
          }
        };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    initialiseMarker();
    displayLocInMap();
    
   // var img = jQuery('#map-canvas').data('img');
   /* 
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: img,
      title: ''
    });
    
    var contentString = '<div style="max-width: 300px" id="content">'+
        '<div id="bodyContent">'+
      '<h5 class="color-primary"><strong>StylishThemes</strong></h5>' +
        '<p style="font-size: 12px">Lorem ipsum dolor sit amet,' +
        'incididunt ut labore et dolore psum dolor magna aliqua.</p>'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    
    

    var styledMapOptions = {
      name: 'US Road Atlas'
    };*/
/*
    var usRoadMapType = new google.maps.StyledMapType(
        roadAtlasStyles, styledMapOptions); 

    map.mapTypes.set('usroadatlas', usRoadMapType);
    map.setMapTypeId('usroadatlas');
    */
  }

  google.maps.event.addDomListener(window, 'load', initialize);
    
});

// Pop-up Location marker in Google map  
var markers = [];
function initialiseMarker(){
  var locDetail = {};
  $( ".loc-img" ).each(function( index ) {
    locDetail = {"lat": $( this ).attr("data-lat"),
        "lng": $( this ).attr("data-lang"),
        "locId": $( this ).attr("data-locid")};
    markers.push(locDetail);          
});
}

var displayLocInMap = function () {
var infoWindow = new google.maps.InfoWindow();
var lat_lng = new Array();
var latlngbounds = new google.maps.LatLngBounds();
for (i = 0; i < markers.length; i++) {
  var data = markers[i]
  var myLatlng = new google.maps.LatLng(data.lat, data.lng);
  lat_lng.push(myLatlng);
  var marker = new google.maps.Marker({
  position: myLatlng,
  map: map,
  id: data.locId
  });
  google.maps.event.addListener(marker, 'click', function() {    
        var divId =   this.id;     
        var divObj = $("div.loc-img[data-locid = '"+divId+"']"); 
        divObj.css("border", "3px solid black");

        }); 
  }
}

<!-- ================================================== -->
<!-- =============== END GOOGLE MAP SETTINGS ================ -->
<!-- ================================================== -->