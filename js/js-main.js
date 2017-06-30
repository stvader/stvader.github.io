window.addEventListener('load', function() {
	var toggle = document.querySelector('.main-nav__toggle');
	var menu = document.querySelector('.main-nav');
	var wrapper = document.querySelector('.main-nav__wrapper');
	var sliderWrapper = document.querySelector('.slider__images-wrapper');
	

	if (document.body.classList.contains('no-js')) {
		document.body.classList.remove('no-js');
	}

	toggle.addEventListener('click', function() {
		if(menu.classList.contains('main-nav--closed')) {
			menu.classList.remove('main-nav--closed');
			menu.classList.add('main-nav--opened');
			wrapper.style.height = (document.documentElement.clientHeight - 60) + 'px';
			document.body.style.overflow = "hidden";
			sliderWrapper.classList.remove('js-slid');
		} else {
			menu.classList.remove('main-nav--opened');
			menu.classList.add('main-nav--closed');
			document.body.style.overflow = "";
			wrapper.style.height = 'auto';
			sliderWrapper.classList.add('js-slid');
		}
	});



});