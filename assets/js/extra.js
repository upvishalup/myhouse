

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

      $scope.isMacOs = false;
      if(navigator.userAgent.indexOf('Mac') > 0)
          $scope.isMacOs = true;
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
            //if(navigator.userAgent.indexOf('Mac') > 0)
              $('#custom-radio-nav-button').addClass('mac-os');           
      };

      function getTotalPoiWidth(theDiv){
        var theDiv = $(theDiv);
        var totalWidth = theDiv.width();
        totalWidth += parseInt(theDiv.css("padding-left"), 10) + parseInt(theDiv.css("padding-right"), 10); //Total Padding Width
        totalWidth += parseInt(theDiv.css("margin-left"), 10) + parseInt(theDiv.css("margin-right"), 10); //Total Margin Width
        totalWidth += parseInt(theDiv.css("borderLeftWidth"), 10) + parseInt(theDiv.css("borderRightWidth"), 10); //Total Border Width
        return totalWidth;
      }

      $scope.originalWidthValue = 240;
      $scope.originalWidth = $scope.originalWidthValue+"px";
      $scope.getImageWidth = function(isOpened){
            var id = 0;
            for(var i = 0; i < $scope.pois.length; i++){
                if(!$scope.pois[i].isOpened){
                  id = i;
                  break;
                }
            }
            var outerHeight = getTotalPoiWidth('#poi'+id);
            var poicount = $("#imageresult").innerWidth();
            var fullWidthPoi = (poicount - (poicount - (2*outerWidth))) + "px;";
            $scope.fullWidthPoi = fullWidthPoi;
            console.log($scope.fullWidthPoi);
            return $scope.fullWidthPoi; 
      };
      $scope.getImageWidth();
      
      $scope.toggle = function(index, fromUI){
            $scope.fromUI = true;
            if(fromUI){
              var event1 = new CustomEvent('poi-image-cliked', 
                        {'detail': {index, "loc" : "toggle"} }); 
              window.dispatchEvent(event1);  
            }
            
      };

      $scope.openCloseImage = function(index, fromUI){
        var copiedOpenStatus = angular.copy($scope.pois[index].isOpened);
        if(copiedOpenStatus){
                $scope.closeImages(index);
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
      }

      $scope.closeImages = function(index){
          var total = $scope.pois.length;
          for(var i = 0; i < $scope.pois.length; i++){
                $scope.pois[i].isOpened = false;
                delete $scope.openedAccount[i];
            }
          if(total % 2 != 0){
            $scope.pois[total-1].isOpened = true;
            $scope.openedAccount[total-1] = true;
          }

          if(((total-1) == index) && (total % 2 != 0)){
            $scope.pois[0].isOpened = true;
            $scope.pois[total-1].isOpened = false;
            delete $scope.openedAccount[total-1];
            $scope.openedAccount[0] = true;
          }
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
            return locations;
      }

      window.addEventListener('marker-cliked', function (e) {
          $scope.openCloseImage(Number(e.detail.index), false);
          $scope.$apply();
      });

      $scope.setMenu = function(){
              scrollTo = $(".lod-neighbour-container");
              $('html, body').animate({
                scrollTop: ((scrollTo).offset().top)
              },500);
      };
});




