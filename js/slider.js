$(document).ready(function(){
	var slider = $('.js-slid');
	var sliderImage = $('.slider__image');

    slider.slick({
    	autoplay: false,
    	autoplaySpeed: 5000,
    	arrows: false,
    	dots: true
    	

    }); 

    for (var i=0; i<sliderImage.length; i++) {
        // var width = sliderImage[i].width();
    };

    $('.main-nav__toggle').click(function(){
    	if (autoPlay) {
    		slider.slick('slickPause');
    		autoPlay = false;
    	}else {
    		slider.slick('slickPlay');
    		autoPlay = true;
    	}
    });

    
});