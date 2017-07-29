window.addEventListener('load', function () {
	var parallax_header = document.querySelector('.js-parallax-elem-header');
	

	function appearHeader() {		
		var opacity = 0;

		var timerId = setInterval(function () {
			if (opacity >= 1) clearInterval(timerId);
			parallax_header.style.opacity = opacity;
			opacity += 0.05;			
			//console.log(opacity);
		}, 100);
	}	

	function moveParallax() {	
		var scrollTop = window.pageYOffset;	
		var clientHeight = document.documentElement.clientHeight;

		if (scrollTop > clientHeight - 460) return; //460 = header height + menu height

		parallax_header.style.top = scrollTop * 1.3 + 'px';
	}

	appearHeader();

	window.addEventListener('scroll', function () {
		setTimeout(moveParallax, 300);		
	})
})