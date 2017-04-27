"use strict";

var bohemia =  angular.module("BohemiaRes", []);

bohemia.controller("LocationSection", function($scope, $window){
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
	    if(navigator.userAgent.indexOf('Mac') > 0)
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

	$scope.toggle = function(index){
	// $this = $(this);
	// var divId = $this.data("locid"); 
	google.maps.event.trigger(locMarker[index], 'click');     
	};

	$scope.openCloseImage = function(index){
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
	  $scope.openCloseImage(Number(e.detail.index));
	  $scope.$apply();
	});

	$scope.setMenu = function(){
	      scrollTo = $(".lod-neighbour-container");
	      $('html, body').animate({
	        scrollTop: ((scrollTo).offset().top)
	      },500);
	};
});

bohemia.controller("PropertyDescription", function($scope){
	$scope.descriptions = [
		{
			"name" : "New Delhi",
			"img" : "assets/img/chair-mac.jpg",
			"detail" : "New Delhi is the capital of India and one of Delhi city's 11 districts. Although colloquially Delhi and New Delhi are used interchangeably to refer to the National Capital Territory of Delhi, these are two distinct entities, with New Delhi forming a small part of Delhi. The National Capital Region is a much larger entity comprising the entire National Capital Territory of Delhi along with adjoining districts.",
			"active" : true,
			"features" : [{
				"label" : "Interior Features",
				"list" : ["IF List1", "IF List 2", "IF List3", "IF List 4", "IF List 5", "IF List 6"]
				},
				{
					"label" : "Dimenions",
					"list" : ["D List1", "D List 2", "D List3", "D List 4", "D List 5", "D List 9"]
				},
				{
					"label" : "Other Info",
					"list" : ["Of List1", "Of List 2", "Of List3", "Of List 4", "Of List 5", "Of List 9"]
				}
			]
		},
		{
			"name" : "Bangalore",
			"img" : "assets/img/dummy_bng.jpg",
			"detail" : "Bangalore  officially known as Bengaluru, is the capital of the Indian state of Karnataka. It has a population of about 8.42 million and a metropolitan population of about 8.52 million, making it the third most populous city and fifth most populous urban agglomeration in India. It is located in southern India on the Deccan Plateau. Its elevation is over 900 m (3,000 ft) above sea level, the highest of India's major cities.",
			"active" : false,
			"features" : [{
				"label" : "Interior Features",
				"list" : ["B IF List1", "B IF List 2", "B IF List3", "B IF List 4", "B IF List 5", "IF List 6"]
				},
				{
					"label" : "Dimenions",
					"list" : ["D List1", "B D List 2", "D List3", "B D List 4", "D List 5", "D List 9"]
				},
				{
					"label" : "Other Info",																																																																																																																		
					"list" : ["Of List1", "B Of List 2", "B Of List3", "B Of List 4", "Of List 5", "Of List 9"]
				}
			]
		}
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
