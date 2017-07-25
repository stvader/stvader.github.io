function changeMenuPoint(classBlock, classItem, additionClass) {
	var block = document.querySelector('.' + classBlock);
	var items = block.querySelectorAll('.' + classItem);


	function changeItem(event) {

		var target = event.target;
		var targetParent = target.parentNode;
		var i;
		var itemParent;

		if (target.tagName != 'A' 
			|| !target.classList.contains(classItem)
			|| targetParent.classList.contains(additionClass)) return;

		event.preventDefault();
		
		for (i=0; i<items.length; i++) {
			itemParent = items[i].parentNode;			
			if (itemParent.classList.contains(additionClass)) {
				itemParent.classList.remove(additionClass);
			}

		targetParent.classList.add(additionClass);
		}		
	}

	block.addEventListener('click', changeItem);
};

window.addEventListener('load', function() {
	changeMenuPoint('gallery-menu__list', 'gallery-menu__link', 'gallery-menu__item--active');
})