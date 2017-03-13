

window.onload = function(){
  document.getElementById("agent-email-1").onmouseover = function(){
      document.getElementById("agent-email-1").style.display = "none";
      document.getElementById("agent-email-2").style.display = "block";
  }

  document.getElementById("agent-email-2").onmouseleave = function(){
      document.getElementById("agent-email-2").style.display = "none";
      document.getElementById("agent-email-1").style.display = "block";
  }

  document.getElementById("agent-phone-1").onmouseover = function(){
      document.getElementById("agent-phone-1").style.display = "none";
      document.getElementById("agent-phone-2").style.display = "block";
  }

  document.getElementById("agent-phone-2").onmouseleave = function(){
      document.getElementById("agent-phone-2").style.display = "none";
      document.getElementById("agent-phone-1").style.display = "block";
  }

}

var app = angular.module("Location", []);

app.controller("LocationController", function($scope){
      
      $scope.data = {
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
      $scope.openedAccount = {};
      $scope.pois = [];
      $scope.total = 0;
      $scope.opened = 0;
      $scope.keys = Object.keys($scope.data);
      $scope.pois = $scope.data[$scope.keys[0]];

      if($scope.pois.length % 2 !== 0){
            $scope.pois[$scope.pois.length - 1].isOpened = true;
            $scope.openedAccount[$scope.pois.length-1] = true;
      }


      $scope.showPoi = function(key){
            $scope.total = 0;
            $scope.opened = 0;
            $scope.pois = [];
            $scope.pois = $scope.data[key];
            if($scope.pois.length % 2 !== 0){
                  $scope.pois[$scope.pois.length - 1].isOpened = true;
                  $scope.openedAccount[$scope.pois.length-1] = true;
            }
            $("#imageresult").scrollTop = ($("#imageresult").scrollTop + 40);
      };

      
      $scope.originalWidth = "280px";
      $scope.getImageWidth = function(isOpened){
            var poicount = $("#imageresult").innerWidth();
            var fullWidthPoi = (poicount - (poicount - (2*$scope.originalWidth))) + "px;";
            $scope.fullWidthPoi = "width:"+fullWidthPoi;
            console.log($scope.fullWidthPoi);
      };
      $scope.getImageWidth();
      
      $scope.toggle = function(index){
            if($scope.pois[index].isOpened){
                  return;
            }
            $scope.pois[index].isOpened = !$scope.pois[index].isOpened;
            var isImageOpened = $scope.pois[index].isOpened;
            if(isImageOpened){
                  $scope.openedAccount[index] = isImageOpened;
            }else{
                  delete $scope.openedAccount[index];
            }
            for(var i = 0; i < $scope.pois.length; i++){
                  if(index !== i){
                        $scope.pois[i].isOpened = false;
                        delete $scope.openedAccount[index];
                  }
            }
            $scope.checkImageDisplay(0);
      };

      $scope.checkImageDisplay = function(currentIndex){
            var total = $scope.pois.length;
            if(currentIndex >= total){
                  return;
            }
            if(($scope.pois[currentIndex].isOpened && $scope.pois[currentIndex+1].isOpened) ||
                  (!$scope.pois[currentIndex].isOpened && !$scope.pois[currentIndex+1].isOpened)){
                  currentIndex = currentIndex + 2;
            }else if(!$scope.pois[currentIndex].isOpened && $scope.pois[currentIndex+1].isOpened){
                  $scope.pois[currentIndex].isOpened = true;
                  currentIndex = currentIndex + 2;
            }else if($scope.pois[currentIndex].isOpened && !$scope.pois[currentIndex+1].isOpened){
                  $scope.pois[currentIndex+1].isOpened = true;
                  currentIndex = currentIndex +2;
            }
            
            $scope.checkImageDisplay(currentIndex);      
            
            
      }
});




