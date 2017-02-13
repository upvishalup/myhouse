<!-- ================================================== -->
<!-- =============== START JS OPTIONS ================ -->
<!-- ================================================== -->
	
jQuery(document).ready(function(){
	
	"use strict";

	// For example:
	jQuery(window).stellar({
  	positionProperty: 'transform',
  	horizontalScrolling: false
	});

	<!-- ========== MENU ========== -->
	jQuery('.navbar-toggle').on("click", function(){

		jQuery(this).toggleClass('collapsed');

		jQuery('.menu nav ul').toggleClass('active');
	});
	<!-- ========== END MENU ========== -->

	// FitVides Option
	jQuery("html").fitVids({ customSelector: "iframe"});

	// PrettyPhoto Options
	jQuery(".attachment").find('a > img:not(.attachment-thumbnail)').parent().prettyPhoto({animation_speed:'normal',slideshow:9999, autoplay_slideshow: false});
	
	// "single-post-content" is the class of blog-single content container
	jQuery(".single-post-content").find('a > img').parent().prettyPhoto({animation_speed:'normal',slideshow:9999, autoplay_slideshow: false});

	jQuery(".galleryPopup a").prettyPhoto({animation_speed:'normal',slideshow:9999, autoplay_slideshow: false});
	jQuery(".galleryPopup1 a").prettyPhoto({animation_speed:'normal',slideshow:9999, autoplay_slideshow: false});

	/*Carousel*/

	jQuery(".headerButton").on("click", function(event){
		event.preventDefault();
		jQuery(this).find("i").toggleClass("fa-angle-up");
		jQuery(this).find("i").toggleClass("fa-angle-down");
		jQuery(".topContent").slideToggle();
		return false;
	});

	jQuery(".carouselPresentation").owlCarousel({
		items:1,
		autoHeight:true,
		navigation:true,
		pagination:false,
		navigationText:['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
		responsive: true,
		 singleItem:true,
	    responsiveRefreshRate : 200,
	    responsiveBaseWidth: window
	});

		/*SKILL BAR*/
		jQuery('.skillbar').each(function(){
			jQuery(this).find('.skillbar-bar').animate({
				width:jQuery(this).attr('data-percent')
			},6000);
		});


/*REVOLUTION*/ 

jQuery('#slider').show().revolution(
{
	dottedOverlay:"none",
	delay:16000,
	startwidth:1170,
	startheight:969,
	hideThumbs:200,
	
	thumbWidth:100,
	thumbHeight:50,
	thumbAmount:4,
	
	navigationType:"none",
	navigationArrows:"solo",
	navigationStyle:"preview1",
	
	touchenabled:"on",
	onHoverStop:"on",
	
	swipe_velocity: 0.7,
	swipe_min_touches: 1,
	swipe_max_touches: 1,
	drag_block_vertical: false,
							
							
	keyboardNavigation:"off",
	
	navigationHAlign:"center",
	navigationVAlign:"bottom",
	navigationHOffset:0,
	navigationVOffset:20,

	soloArrowLeftHalign:"left",
	soloArrowLeftValign:"center",
	soloArrowLeftHOffset:20,
	soloArrowLeftVOffset:0,

	soloArrowRightHalign:"right",
	soloArrowRightValign:"center",
	soloArrowRightHOffset:20,
	soloArrowRightVOffset:0,
			
	shadow:0,
	fullWidth:"on",
	fullScreen:"off",

	spinner:"spinner4",
	
	stopLoop:"off",
	stopAfterLoops:-1,
	stopAtSlide:-1,

	shuffle:"off",
	
	autoHeight:"off",						
	forceFullWidth:"on",						
							
							
							
	hideThumbsOnMobile:"off",
	hideNavDelayOnMobile:1500,						
	hideBulletsOnMobile:"off",
	hiderArrows:"off",
	hideArrowsOnMobile:"off",
	hideThumbsUnderResolution:0,
	
	hideSliderAtLimit:0,
	hideCaptionAtLimit:0,
	hideAllCaptionAtLilmit:0,
	startWithSlide:0	
							
					});
					
	/*End slider*/

	/*INVIEW*/
	var fadeL = jQuery('.fadeInL');
        var fadeR = jQuery('.fadeInR');
        var fadeDown = jQuery('.fadeInDown');
        var fadeIn = jQuery('.fadeInIn');
        var fadeUp = jQuery('.fadeInUp');
        var fadeLBig = jQuery('.fadeInL-Big');
        var fadeDownBig = jQuery('.fadeInDown-Big');
        var fadeInBig = jQuery('.fadeInIn-Big');
        var fadeUpBig = jQuery('.fadeInUp-Big');

        var progressBar = jQuery('.progress-inner'); 
        var progressNumbers = jQuery('.progress-numbers'); 
        var scaleIn = jQuery('.scaleIn');
        var rotateLR = jQuery('.rotateLR');
        var rotateIn = jQuery('.rotateIn');
        var rotateInX = jQuery('.rotateInX');

        var browser = false;
        var p = navigator.platform;

        if (p === 'iPad' || p === 'iPhone' || p === 'iPod') {
            browser = true;
        }

        if (browser === false) {

            fadeL.css({visibility: 'hidden'});
            fadeR.css({visibility: 'hidden'});
            fadeDown.css({visibility: 'hidden'});
            fadeIn.css({visibility: 'hidden'});
            fadeUp.css({visibility: 'hidden'});
            fadeLBig.css({visibility: 'hidden'});
            fadeDownBig.css({visibility: 'hidden'});
            fadeInBig.css({visibility: 'hidden'});
            fadeUpBig.css({visibility: 'hidden'}); 

            progressBar.css({visibility: 'hidden'});
            progressNumbers.css({visibility: 'hidden'});
            scaleIn.css({visibility: 'hidden'});
            rotateLR.css({visibility: 'hidden'});
            rotateIn.css({visibility: 'hidden'});
            rotateInX.css({visibility: 'hidden'});

            fadeL.on('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).addClass('fadeL');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            fadeDown.on('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).addClass('fadeDown');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            fadeIn.on('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).addClass('fadeIn');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            fadeUp.on('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).addClass('fadeUp');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            fadeR.on('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).addClass('fadeR');
                    jQuery(this).css({visibility: 'visible'});
                }
            });

            fadeLBig.on('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).addClass('fadeL-Big');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            fadeDownBig.on('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).addClass('fadeDown-Big');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            fadeInBig.on('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).addClass('fadeIn-Big');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            fadeUpBig.on('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).addClass('fadeUp-Big');
                    jQuery(this).css({visibility: 'visible'});
                }
            });



            progressBar.on('inview', function (event, visible) { 
                if (visible) {
                    jQuery(this).addClass('progress-bar-filled');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            progressNumbers.on('inview', function (event, visible) { 
                if (visible) {
                    jQuery(this).addClass('progress-numbers-filled');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            scaleIn.on('inview', function (event, visible) { 
                if (visible) {
                    jQuery(this).addClass('scale-In');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            rotateLR.on('inview', function (event, visible) { 
                if (visible) {
                    jQuery(this).addClass('rotate-LR');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            rotateIn.on('inview', function (event, visible) { 
                if (visible) {
                    jQuery(this).addClass('rotate-In');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            rotateInX.on('inview', function (event, visible) { 
                if (visible) {
                    jQuery(this).addClass('rotate-InX');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
        }

	function isotope() {

	  var container = jQuery('.contentGallery ul');

	  container.imagesLoaded(function() {

	   container.isotope();

	  });

	  container.isotope();

	  var jQueryoptionSets = jQuery('.categories ul'),

	  jQueryoptionLinks = jQueryoptionSets.find('a');

	  jQueryoptionLinks.on("click", function(){

	   var jQuerythis = jQuery(this);

	   if ( jQuerythis.hasClass('selected') ) {

	    return false;

	   }
	   var jQueryoptionSet = jQuerythis.parents('.categories ul');

	   jQueryoptionSet.find('.selected').removeClass('selected');

	   jQuerythis.addClass('selected');

	   var options = {},

	    key = jQueryoptionSet.attr('data-option-key'),

	    value = jQuerythis.attr('data-option-value');

	   value = value === 'false' ? false : value;

	   options[ key ] = value;

	   if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {

	    changeLayoutMode( jQuerythis, options )

	   } else {

	    container.isotope( options );

	   }

	   return false;

	  });

	 };

	 isotope();

	 jQuery(window).resize(function(){

	  isotope();

	 });

	 //Menu Bgk
	 // jQuery(window).scroll(function(){
	 // 	var wh = jQuery(window).height();
	 // 	var actualScroll = jQuery(window).scrollTop();
	 // 	if (actualScroll >= wh){
	 // 		jQuery('.menu').addClass('affix-menu');
	 // 	} 
	 // 	else{
	 // 		jQuery('.menu').removeClass('affix-menu');
	 // 	}
	 // });


	  $(".owl-demo").owlCarousel({
 
      autoPlay: 3000, //Set AutoPlay to 3 seconds
 
      items : 6,
      navigation:true,
      navigationText:false,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]
  });

  // Go to top button
    jQuery(window).load(function(){
    	 $(window).scroll(function(){

	        if($(document).scrollTop() > 300)
	        {    
	            $('.back-to-top').css({bottom:"50px"});
	        }
	        else
	        {  
	           $('.back-to-top').css({bottom:"-80px"});
	        }
    	});	
    	$('#overlay').fadeOut();
    });
     
  $('.back-to-top').on("click",function(){
      $('html, body').animate({scrollTop:0}, 'slow');
      return false;
  }); 
// End button top

function handleSkillBars() {
  
  jQuery('.progress').on('inview', function(event, visible) {
   
   if (visible) {
    
    var skillBarWidth = 0;
    
    jQuery(this).find('.progress-bar').each(function(i) {
     
     skillBarWidth = jQuery(this).attr('aria-valuenow');
     
     jQuery(this).css('width', skillBarWidth + '%');
     
     jQuery(this).find('span.font').text(skillBarWidth + '%')
     
    });
    
   }
   
  });
  
 };

 handleSkillBars();
});








<!-- ================================================== -->
<!-- =============== END JS OPTIONS ================ -->
<!-- ================================================== -->