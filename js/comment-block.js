(function() {

  // проверяем поддержку
  if (!Element.prototype.matches) {

    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;

  }

})();

(function() {

  	if (!Element.prototype.closest) {

    
	    Element.prototype.closest = function(css) {
	        var node = this;

	        while (node) {
	            if (node.matches(css)) return node;
	            else node = node.parentElement;
	        }
	        
	        return null;
	    };
	}

})();

window.addEventListener('load', function() {
	var btnOpenComment = document.querySelectorAll('.order__accord-btn');
	var btnHideComment = document.querySelectorAll('.order__accord-comment-button');
	var i, j;	

	function showCommentBlock(e) {
		e.preventDefault();
		var parent = this.closest('.order__subsector-accord');
		var aimBlock = parent.querySelector('.order__accord-comment-wrapper');

		if (!this.classList.contains('order__accord-btn--hidden')) {
			this.classList.add('order__accord-btn--hidden');
		}

		if (!aimBlock.classList.contains('order__accord-comment-wrapper--active')) {
			aimBlock.classList.add('order__accord-comment-wrapper--active');
		}
	}

	function hideCommentBlock(e) {
		e.preventDefault();
		var wrapper = this.closest('.order__accord-comment-wrapper');
		var parentBlock = this.closest('.order__subsector-accord');
		var blockBtn = parentBlock.querySelector('.order__accord-btn');
		var textarea = parentBlock.querySelector('.order__accord-comment-field');
		
		if (textarea.value) {
			textarea.value = null;
		}

		if (wrapper.classList.contains('order__accord-comment-wrapper--active')) {
			wrapper.classList.remove('order__accord-comment-wrapper--active');
		}

		if (blockBtn.classList.contains('order__accord-btn--hidden')) {
			blockBtn.classList.remove('order__accord-btn--hidden');
		}
	}
	
	for (i=0; i<btnOpenComment.length; i++) {
		btnOpenComment[i].addEventListener('click', showCommentBlock);		
	}

	for (j=0; j<btnHideComment.length; j++) {
		btnHideComment[j].addEventListener('click', hideCommentBlock);
	}
});// comment block hide-show

window.addEventListener('load', function() {
	var btsnShowAccordionBlock = document.querySelectorAll('.js-show-accord-block');
	var btnsHideAccordionBlock = document.querySelectorAll('.js-hide-accord-block');
	var i, j;
	var allSectorBlocks = document.querySelectorAll('.order__sector');



	function hideAllAccords() {		
		var accordsBlock = document.querySelectorAll('.order__subsector-accord');
		var i;

		for (i=0; i<accordsBlock.length; i++) {
			if (accordsBlock[i].classList.contains('order__subsector-accord--active')) {
				accordsBlock[i].classList.remove('order__subsector-accord--active');
				fillCheckedItems(accordsBlock[i]);
			}
		}
	}

	function takeCheckedItems(arr) {
		var inputs = Array.prototype.slice.call(arr);
		var resultArray = [];

		inputs.forEach(function(item) {
			if (item.checked) {
				var inputLabel = item.nextElementSibling.innerHTML;
				inputLabel = inputLabel.trim();
				resultArray.push(inputLabel);
			}
		});

		return resultArray;
	}

	function takeSelectItems(arr) {
		var selectBlocks = Array.prototype.slice.call(arr);
		var resultArray = [];

		selectBlocks.forEach(function(item) {
			var intermediateResult = [];
			var optionSeleected = item.querySelectorAll('option');
			var siblingLabelPrev = item.previousElementSibling;
			var siblingLabelNext = item.nextElementSibling;
			var brackets = false;

			if (siblingLabelNext && siblingLabelNext.tagName == 'LABEL') {
				intermediateResult.push(siblingLabelNext.innerHTML.trim());
				brackets = true;
			}

			if (siblingLabelPrev && siblingLabelPrev.tagName == 'LABEL') {
				intermediateResult.push(siblingLabelPrev.innerHTML.trim());
				brackets = true;
			}

			optionSeleected.forEach(function(item) {
				if (item.selected) {
					if (brackets) {
						intermediateResult.push('(' + item.value + ')');
					} else {
						intermediateResult.push(item.value);
					}
				}
			});

			intermediateResult = intermediateResult.join(' ');
			resultArray.push(intermediateResult);
		});

		return resultArray;
	}

	function checkTextarea(arr) {
		var areas = Array.prototype.slice.call(arr);
		var i;

		for (i=0; i < areas.length; i++) {
			if (areas[i].value.length && areas[i].classList.contains('js-needing-for-display')) {					
				return true;
			}
		}		

		return false;
	}

	function takeTextareaItems(arr) {
		var areas = Array.prototype.slice.call(arr);
		var resultArray = [];

		areas.forEach(function(item) {

		});
	}

	function fillCheckedItems(block) {
		var valueArray = [];
		var valueString;
		var parentBlock = block.closest('.order__subsector');
		var valueBlock = parentBlock.querySelector('.order__subsector-value');
		var selectInputs = parentBlock.querySelectorAll('select');
		var radioInputs = parentBlock.querySelectorAll('input[type="radio"]');
		var checkInputs = parentBlock.querySelectorAll('input[type="checkbox"]');
		var textarea = parentBlock.querySelectorAll('textarea');
		
		
		if (selectInputs.length) {
			valueArray = valueArray.concat(takeSelectItems(selectInputs));
		}
		
		if (radioInputs.length) {
			valueArray = valueArray.concat(takeCheckedItems(radioInputs));
		}

		if (checkInputs.length) {
			valueArray = valueArray.concat(takeCheckedItems(checkInputs));
		}

		if (checkTextarea(textarea)) {			
			valueArray = valueArray.concat(takeTextareaItems(textarea));
		}
		
		valueString = valueArray.join(',</br>');
		valueBlock.innerHTML = valueString;	

	}

	function makeSectorActive(block) {
		var sectorBlock = block.closest('.order__sector');

		//removeSectorComplete(sectorBlock);

		if (!sectorBlock.classList.contains('order__sector--active')) {
			sectorBlock.classList.add('order__sector--active');
		}			
	}

	function removeSectorActive() {		
		var i;



		for (i=0; i<allSectorBlocks.length; i++) {
			if (allSectorBlocks[i].classList.contains('order__sector--active')) {
				allSectorBlocks[i].classList.remove('order__sector--active');
			}
		}


	}

	function makeSectorComplete() {
		var i, j;

		outer: for (i=0; i<allSectorBlocks.length; i++) {
			var block = allSectorBlocks[i];			
			var valueBlocks = block.querySelectorAll('.order__subsector-value');
			//console.log(valueBlocks);

			for (j=0; j<valueBlocks.length; j++) {
				var valueContent = valueBlocks[j].innerHTML.trim();
				if (!valueContent) {
					removeSectorComplete(block);
					continue outer;
				}

				if (!block.classList.contains('order__sector--complete')) {
					block.classList.add('order__sector--complete');
				}
			}
		}
	}

	function removeSectorComplete(block) {
		if (block.classList.contains('order__sector--complete')) {
			block.classList.remove('order__sector--complete');
		}
	}

	function showAccordionBlock(e) {
		var target = e.target;
		var _self = this;
		var parentBlock = _self.closest('.order__subsector');
		var sector = parentBlock.closest('.order__sector');
		var accordionBlock = parentBlock.querySelector('.order__subsector-accord');

		if (target.tagName == 'BUTTON') {
			e.preventDefault();			
		}

		removeSectorActive();
		makeSectorActive(_self);
		makeSectorComplete();
		//removeSectorComplete(sector);
		

		if (!accordionBlock.classList.contains('order__subsector-accord--active')) {
			hideAllAccords();
			accordionBlock.classList.add('order__subsector-accord--active');			
		} else {
			//accordionBlock.classList.remove('order__subsector-accord--active');
			fillCheckedItems(this);
			removeSectorActive();
			//makeSectorComplete();
		}			
	}

	function hideAccordionBlock(e) {
		var target = e.target;
		var parentBlock = this.closest('.order__subsector-accord');
		
		
		if (target.tagName == 'BUTTON') {
			e.preventDefault();			
		}

		if (parentBlock.classList.contains('order__subsector-accord--active')) {
			parentBlock.classList.remove('order__subsector-accord--active');
			fillCheckedItems(this);
		}

		removeSectorActive();
		makeSectorComplete();
	}

	hideAllAccords();
	removeSectorActive();		

	for (i=0; i<btsnShowAccordionBlock.length; i++) {
		btsnShowAccordionBlock[i].addEventListener('click', showAccordionBlock);
	}

	for (j=0; j<btnsHideAccordionBlock.length; j++) {
		btnsHideAccordionBlock[j].addEventListener('click', hideAccordionBlock);
	}
});// accordion