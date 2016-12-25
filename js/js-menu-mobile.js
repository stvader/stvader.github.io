var mainNav = document.querySelector('.main-nav');
var menuToggle = document.querySelector('.js-menu-toggle');

function toggleMenu() {
	
	if (mainNav.classList.contains('main-nav--closed')) {
		mainNav.classList.remove('main-nav--closed');
		mainNav.classList.add('main-nav--opened');
	} else {
		mainNav.classList.remove('main-nav--opened');
		mainNav.classList.add('main-nav--closed');
	}
}

if (mainNav.classList.contains('main-nav--no-js')) {
	mainNav.classList.remove('main-nav--no-js');
}

menuToggle.addEventListener('click', toggleMenu);