

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
      $scope.openedAccount = {};
      $scope.data = initialisedPoi();
      $scope.keys = Object.keys($scope.data);
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
            displayLocInMap(getLocations());              
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
            if(currentIndex >= (total-1)){
                  if(total % 2 != 0){
                    $scope.pois[total-1].isOpened = true;
                  }
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
            
            
      };

      function getLocations() {
          var locations = [];
            for(var i = 0; i < $scope.pois.length; i++){
                  var locals = {
                  locId : i,
                  lat: $scope.pois[i].location[0],
                  lng: $scope.pois[i].location[1],
                  title: $scope.pois[i].title
                  } 
                 locations.push(locals);
           }
            //console.log("Printing all markers:",locations);
            return locations;
      }

      window.addEventListener('marker-cliked', function (e) {
          console.log('printer state changed', e.detail);
          $scope.toggle(Number(e.detail));
          $scope.$apply();
      });

      $scope.setMenu = function(){
           // var container = $('#mapimageresult'),
              scrollTo = $(".lod-neighbour-container");
              $('html, body').animate({
                scrollTop: ((scrollTo).offset().top)
              },500);
      };
});




