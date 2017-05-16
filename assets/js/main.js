"use strict";

var bohemia =  angular.module("BohemiaRes", []);

bohemia.controller("LocationSection", function($scope, $window){
	$scope.isMacOs = false;
	if(navigator.userAgent.indexOf('Mac') > 0)
	  $scope.isMacOs = true;

	$scope.openedAccount = {};
	$scope.data = propertyNearBy();
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

	$scope.result = $scope.keys[0];
	$scope.showPoi = function(key){
	    $scope.total = 0;
	    $scope.opened = 0;
	    $scope.pois = [];
	    $scope.result = key;
	    $scope.pois = $scope.data[key];
	    displayMarkers(getLocations());   
	    $scope.$apply();
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

	$scope.toggle = function(index){
		$scope.openCloseImage(index);
		changeMarker(index);
	};

	$scope.openCloseImage = function(index){
	  $scope.pois[index].isOpened = !$scope.pois[index].isOpened;
	  for(var i = 0; i < $scope.pois.length; i++){
	  	if(i !== index){
	  		$scope.pois[i].isOpened = false;
	  	}
	  }
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
              title: $scope.pois[i].title,
              thumbnail:$scope.pois[i].thubnail,
              themeMarker: '<div id="'+i+'" class="marker"><div class="theme-marker-css"></div></div>',
              selectedMarker: '<div id="'+i+'" style="background-image:url('+$scope.pois[i].thubnail+');" class="chf marker-img"><span class="marker-title">'+$scope.pois[i].title+'</span></div><div class="marker-css"></div>'
            } 
           locations.push(locals);
      }
	    return locations;
	}


	window.addEventListener('marker-cliked', function (e) {
	  var myIndex = Number(e.detail.index);
	  $scope.toggle(myIndex);
	  //changeMarker(myIndex);
	  $scope.$apply();
	});

	$scope.setMenu = function(){
	      scrollTo = $(".lod-neighbour-container");
	};
});

bohemia.controller("PropertyDescription", function($scope){
	$scope.descriptions = [
		{
			"name" : "Property 1",
			"img" : "assets/img/chair-mac.jpg",
			"detail" : "Atraktivní nemovitosti zařízené stylovým nábytkem a vybavené moderními domácími spotřebiči. Při rekonstrukci vždy volíme tradiční materiály a postupy s důrazem na zachování původního charakteru a jedinečných architektonických prvků. Nemovitosti se nachází v historických budovách na oblíbených rezidenčních adresách Královských Vinohrad a širšího centra Prahy. Zažijte jedinečnou atmosféru bydlení v okolí zeleně v pěší vzdálenosti od historických památek.",
			"active" : true,
			"features" : [{
					"label" : "Vybavení interiérů",
					"isList" : true,
					"list" : ["Sporák", "Myčka", "Vinotéka", "Pračka", "Sušička", "Wi-Fi"]
				},
				{
					"label" : "Standardní rozměry",
					"isList" : true,
					"list" : ["Obývák 4x5", "Kuchyně 3x4", "Jídelna 3x4", "Ložnice 4x5", "Pracovna 2x2", "Parking 2x5"]
				},
				{
					"label" : "Další informace",
					"isList" : false,
					"list" : ["V případě zájmu lze nemovitost individualně upravit dle vašich přání tak, aby veškeré vybavení perfektně odpovídalo vašemu vkusu, životnímu stylu a hodnotám. Pokud máte zájem získat více informací o možnostech personalizace vaší nemovitosti, neváhejte nás prosím kontaktovat."]
				}
			]
		},
	];

	$scope.images = [];
	$scope.descIndex = 0;
	for(var i = 0; i < $scope.descriptions.length; i++){
		$scope.images.push($scope.descriptions[i].img);
	}

	$scope.next = function(){
		var activeIndex = 0;
		for(var i = 0; i < $scope.descriptions.length; i++){
			if($scope.descriptions[i].active){
				activeIndex = i;
				break;
			}
		}
		$scope.descriptions[activeIndex].active = false;
		if(activeIndex === ($scope.descriptions.length-1)){
			$scope.descriptions[0].active = true;
		}else{
			$scope.descriptions[activeIndex+1].active = true;
		}
	};

	$scope.previous = function(){
		var activeIndex = 0;
		for(var i = 0; i < $scope.descriptions.length; i++){
			if($scope.descriptions[i].active){
				activeIndex = i;
				break;
			}
		}
		$scope.descriptions[activeIndex].active = false;
		if(activeIndex === 0){
			$scope.descriptions[$scope.descriptions.length-1].active = true;
		}else{
			$scope.descriptions[activeIndex-1].active = true;
		}	
	};

	$scope.openedFeature = 0;
	$scope.toggleFeature = function(index){
		$scope.openedFeature = index;
	};
});
