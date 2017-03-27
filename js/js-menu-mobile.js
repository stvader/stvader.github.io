window.addEventListener('load', function() {
	var toggle = document.querySelector('.main-nav__toggle');
	var menu = document.querySelector('.main-nav');
	var wrapper = document.querySelector('.main-nav__wrapper');

	toggle.addEventListener('click', function() {
		if(menu.classList.contains('main-nav--closed')) {
			menu.classList.remove('main-nav--closed');
			menu.classList.add('main-nav--opened');
			wrapper.style.height = (document.documentElement.clientHeight - 60) + 'px';
			document.body.style.overflow = "hidden";
		} else {
			menu.classList.remove('main-nav--opened');
			menu.classList.add('main-nav--closed');
			document.body.style.overflow = ""
		}
	});

});