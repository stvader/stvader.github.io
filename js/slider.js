$(document).ready(function(){
	var slider = $('.js-slid');
	var autoPlay = true;

    slider.slick({
    	autoplay: true,
    	autoplaySpeed: 5000,
    	arrows: false,
    	dots: true
    	dotsClass: 'slider__pagination'

    });

   

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