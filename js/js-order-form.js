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

/*--------------------------
BEGIN COMMENTS js
----------------------------*/

window.addEventListener('load', function() {
	var btnOpenComment = document.querySelectorAll('.order__accord-btn');
	var btnHideComment = document.querySelectorAll('.order__accord-comment-button');
	var i, j;	

	function showCommentBlock(e) {
		e.preventDefault();
		var parent = this.closest('.order__subsector-accord');
		var aimBlock = parent.querySelector('.order__accord-comment-wrapper');
		var textarea = parent.querySelector('.order__accord-comment-field');

		if (!this.classList.contains('order__accord-btn--hidden')) {
			this.classList.add('order__accord-btn--hidden');
		}

		if (!aimBlock.classList.contains('order__accord-comment-wrapper--active')) {
			aimBlock.classList.add('order__accord-comment-wrapper--active');
			textarea.focus();
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
});

/*--------------------------
END COMMENTS js
----------------------------*/

/*--------------------------
BEGIN ACCORDION BLOCK FORM js
----------------------------*/

window.addEventListener('load', function() {
	var desktopSize = 1200;	
	var clientWidth = document.documentElement.clientWidth;
	var btsnShowAccordionBlock = document.querySelectorAll('.js-show-accord-block');
	var btnsHideAccordionBlock = document.querySelectorAll('.js-hide-accord-block');
	var i, j;
	var allSectorBlocks = document.querySelectorAll('.order__sector');
	var desktopSectorBlocks = document.querySelectorAll('.js-desktop-sector-block');
	var desktopSectorAccords = document.querySelectorAll('.js-desktop-sector-accord');
	var btnSelect = document.querySelectorAll('.order__btn-select');
	//console.log(desktopSectorAccord);

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

			

			optionSeleected.forEach(function(item) {
				if (item.selected /*&& !item.classList.contains('js-not-show')*/) {					

					if (siblingLabelNext && siblingLabelNext.tagName == 'LABEL') {
						intermediateResult.push(siblingLabelNext.innerHTML.trim());
						brackets = true;
					}

					if (siblingLabelPrev && siblingLabelPrev.tagName == 'LABEL') {
						intermediateResult.push(siblingLabelPrev.innerHTML.trim());
						brackets = true;
					}

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
			if (areas[i].value.length) {					
				return true;
			}
		}

		return false;
	}

	function takeTextareaItems(arr) {
		var areas = Array.prototype.slice.call(arr);
		var resultArray = [];
		var i;

		areas.forEach(function(item) {
			for (i=0; i < areas.length; i++) {
				if (areas[i].value.length) {
					//console.log(areas[i].value);
					resultArray.push(areas[i].value);
				}
			}
		});

		return resultArray;
	}

	function getFormValues(block) {
		var valueArray = [];
		var selectInputs = block.querySelectorAll('select');
		var radioInputs = block.querySelectorAll('input[type="radio"]');
		var checkInputs = block.querySelectorAll('input[type="checkbox"]');
		var textarea = block.querySelectorAll('textarea');		

		if (selectInputs.length) {
			valueArray = valueArray.concat(takeSelectItems(selectInputs));
		}
		
		if (radioInputs.length) {
			valueArray = valueArray.concat(takeCheckedItems(radioInputs));
		}

		if (checkInputs.length) {
			valueArray = valueArray.concat(takeCheckedItems(checkInputs));
		}

		if (textarea.length) {	
			//console.log('yes');		
			valueArray = valueArray.concat(takeTextareaItems(textarea));
		}
		
		return valueArray.join(',</br>');
	}

	function fillCheckedItems(block, dataBlock) {
		
		//var valueString;
		var valueBlock;
		var i; 

		var parentBlock = block.closest('.order__subsector'); // for mobile only
		var formBlock = dataBlock || parentBlock; // dataBlock is only for desctop, for mobile it's his own parent block
		var subsectorInfoBlock = formBlock.querySelectorAll('.order__subsector-accord');
		
		if (!dataBlock) {
			valueBlock = parentBlock.querySelectorAll('.order__subsector-value');
		} else {
			valueBlock = block.querySelectorAll('.order__subsector-value');
		}//try || for it

		for (i=0; i<subsectorInfoBlock.length; i++) {
			var valueString = getFormValues(subsectorInfoBlock[i]); 
			valueBlock[i].innerHTML = valueString;	
		}		

	}

	function makeSectorActive(block) {
		var sectorBlock = block.closest('.order__sector');
		
		if (!sectorBlock.classList.contains('order__sector--active')) {
			removeSectorActive();			
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

				if (!block.classList.contains('order__sector--complete')
						&& !block.classList.contains('order__sector--active')) {
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

	function toggleBtnSubsector(btn) {
		if (btn.classList.contains('btn-hide')) {
			btn.classList.remove('btn-hide')
		} else {
			btn.classList.add('btn-hide');
		}
	}

	function showDesktopAccord(block) {
		var blockNum = block.getAttribute('data-block-number');
		var purposeAccordBlock = desktopSectorAccords[(+blockNum -1)];

		hideDesktopAccord();
		window.scrollTo(0,0);		
	
		if (!purposeAccordBlock.classList.contains('order__sector--active-desk')) {
			purposeAccordBlock.classList.add('order__sector--active-desk');
		}
	
	}

	function hideDesktopAccord() {
		var i;

		for (i=0; i<desktopSectorAccords.length; i++) {
			if (desktopSectorAccords[i].classList.contains('order__sector--active-desk')) {
				desktopSectorAccords[i].classList.remove('order__sector--active-desk');
				fillCheckedItems(desktopSectorBlocks[i], desktopSectorAccords[i]);
			}
		}
	}

	
	/*------------------------------
	BEGIN BLOCK FORM FOR MOBILE js
	--------------------------------*/
	if (clientWidth < desktopSize) {

		//console.log('!!!');

		function actionSubsectorPoint(e) {
			var target = e.target;		
			var parentBlock = this.closest('.order__subsector');
			var sector = parentBlock.closest('.order__sector');
			var accordionBlock = parentBlock.querySelector('.order__subsector-accord');
			var openBtn = parentBlock.querySelector('.order__subsector-button');

			if (target.tagName == 'BUTTON') {
				e.preventDefault();			
			}

			makeSectorActive(this);
			removeSectorComplete(sector);
			toggleBtnSubsector(openBtn);
			
			if (!accordionBlock.classList.contains('order__subsector-accord--active')) {
				hideAllAccords();
				accordionBlock.classList.add('order__subsector-accord--active');

			} else {
				accordionBlock.classList.remove('order__subsector-accord--active');
				fillCheckedItems(this);
				removeSectorActive();			
			}

			makeSectorComplete();		
		}

		function actionAccordionBlock(e) {
			var target = e.target;
			var parentBlock = this.closest('.order__subsector-accord');
			var subSector = parentBlock.closest('.order__subsector');
			var openBtnSubSector = subSector.querySelector('.order__subsector-button');
			
			
			if (target.tagName == 'BUTTON') {
				e.preventDefault();			
			}

			if (parentBlock.classList.contains('order__subsector-accord--active')) {
				parentBlock.classList.remove('order__subsector-accord--active');
				fillCheckedItems(this);
			}

			removeSectorActive();
			makeSectorComplete();
			toggleBtnSubsector(openBtnSubSector);
		}

		hideAllAccords();
		removeSectorActive();		

		for (i=0; i<btsnShowAccordionBlock.length; i++) {
			btsnShowAccordionBlock[i].addEventListener('click', actionSubsectorPoint);
		}

		for (j=0; j<btnsHideAccordionBlock.length; j++) {
			btnsHideAccordionBlock[j].addEventListener('click', actionAccordionBlock);
		}

	}

	/*------------------------------
	END BLOCK FORM FOR MOBILE js
	--------------------------------*/

	/*------------------------------
	BEGIN BLOCK FORM FOR DESCTOP js
	--------------------------------*/

	if (clientWidth >= desktopSize) {
		//console.log('444');
		var i, j;

		function actionSectorBlock(e) {
			var target = e.target;

			if (target.tagName == 'BUTTON') {
				e.preventDefault();			
			}
			//console.log(this);
			
			showDesktopAccord(this);
			removeSectorComplete(this);
			makeSectorActive(this);			
			makeSectorComplete();

		}

		function actionBtnSelect(e) {
			e.preventDefault();

			var sectorAccord = this.closest('.order__sector');
			var sectorAccordNum = sectorAccord.getAttribute('data-accord-number');
			var sectorMenu; 

			sectorAccordNum = +sectorAccordNum;

			if (this.classList.contains('order__btn-select--prev')) {
				sectorAccordNum = sectorAccordNum - 2;
			}

			sectorMenu = desktopSectorBlocks[sectorAccordNum];

			
			showDesktopAccord(sectorMenu);
			removeSectorComplete(sectorMenu);
			makeSectorActive(sectorMenu);
			makeSectorComplete();
			
		}

		for (i=0; i < desktopSectorBlocks.length; i++) {
			desktopSectorBlocks[i].addEventListener('click', actionSectorBlock);
		}

		for (j=0; j < btnSelect.length; j++) {
			btnSelect[j].addEventListener('click', actionBtnSelect);
		}
		
	}

	/*------------------------------
	END BLOCK FORM FOR DESCTOP js
	--------------------------------*/
});

/*--------------------------
END ACCORDION BLOCK FORM js
----------------------------*/