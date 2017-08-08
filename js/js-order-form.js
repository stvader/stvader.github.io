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
	var mainEventBlock = document.querySelector('.js-main-event-block');
	

	function showCommentBlock(elem) {
		var parent = elem.closest('.order__subsector');
		var aimBlock = parent.querySelector('.order__accord-comment-wrapper');
		var textarea = parent.querySelector('.order__accord-comment-field');

		if (!elem.classList.contains('order__add-comment-btn--hidden')) {
			elem.classList.add('order__add-comment-btn--hidden');
		}

		if (!aimBlock.classList.contains('order__accord-comment-wrapper--active')) {
			aimBlock.classList.add('order__accord-comment-wrapper--active');
			textarea.focus();
		}
	}

	function sendCommentText(elem) {
		var wrapper = elem.closest('.order__accord-comment-wrapper');
		var textarea = wrapper.querySelector('.order__accord-comment-field');

		
		if (!textarea.value) return;

		if (wrapper.classList.contains('order__accord-comment-wrapper--active')) {
			wrapper.classList.remove('order__accord-comment-wrapper--active');
		}

		if (!wrapper.classList.contains('order__accord-comment-wrapper--disabled')) {
			wrapper.classList.add('order__accord-comment-wrapper--disabled');
		}

		//textarea.placeholder = '';
		textarea.disabled = true;
		textarea.style.height = textarea.scrollHeight + 'px';
	}

	function deteteComment(elem) {
		var wrapper = elem.closest('.order__accord-comment-wrapper');
		var parent = wrapper.closest('.order__subsector');
		var btnAddComment = parent.querySelector('.order__add-comment-btn');
		var textarea = wrapper.querySelector('.order__accord-comment-field');

		if (wrapper.classList.contains('order__accord-comment-wrapper--disabled')) {
			wrapper.classList.remove('order__accord-comment-wrapper--disabled');
		}

		if (btnAddComment.classList.contains('order__add-comment-btn--hidden')) {
			btnAddComment.classList.remove('order__add-comment-btn--hidden');
		}

		textarea.disabled = false;
		textarea.style.height = 'auto';
		textarea.value = null;
		changeLocalStorage();
	}

	function editCommentText(elem) {
		var wrapper = elem.closest('.order__accord-comment-wrapper');
		var textarea = wrapper.querySelector('.order__accord-comment-field');

		if (wrapper.classList.contains('order__accord-comment-wrapper--disabled')) {
			wrapper.classList.remove('order__accord-comment-wrapper--disabled');
		}

		if (!wrapper.classList.contains('order__accord-comment-wrapper--active')) {
			wrapper.classList.add('order__accord-comment-wrapper--active');
		}

		textarea.disabled = false;
		textarea.style.height = 'auto';
		textarea.focus();
	}

	function makePlaceholder(textarea) {
		var wrapper = textarea.closest('.order__accord-comment-wrapper');

		//if (!wrapper.classList.contains('order__accord-comment-wrapper--active') return;

		//textarea.placeholder = '';
	}
	

	function addEventsForCommentsBtn(e) {
	 	//e.preventDefault();
	 	var target = e.target;

	 	if (target.hasAttribute('data-create-comment')) {
	 		showCommentBlock(target);
	 	}

	 	if (target.hasAttribute('data-add-comment')) {
	 		sendCommentText(target);
	 	}

	 	if (target.hasAttribute('data-delete-comment')) {
	 		deteteComment(target);
	 	}

	 	if (target.hasAttribute('data-edit-comment')) {
	 		editCommentText(target);
	 	}

	 	if (target.tagName == 'TEXTAREA') {
	 		makePlaceholder(target);
	 	}

	 	//this.removeEventListener(e.type, addEventsForCommentsBtn);
	} 

	mainEventBlock.addEventListener('click', addEventsForCommentsBtn);	
//});

/*--------------------------
END COMMENTS js
----------------------------*/

/*----------------------------------------
LOCAL STORAGE BEGIN
-----------------------------------------*/


//window.addEventListener('load', function() {
	//var mainEventBlock = document.querySelector('.js-main-event-block');

	var stateForm = {
		inputs: [],
		selects: [],
		textareas: []
	};

	var dataForm = localStorage.getItem('dataFormRDG');

	var allSectorBlocks = document.querySelectorAll('.js-sector-accord'); //OUT
	var allDesktopMenuSectors = document.querySelectorAll('.order__menu-sector'); //OUT
	var desktopSectorBlocks = document.querySelectorAll('.js-desktop-sector-block'); //OUT
	
	var allInputs = Array.prototype.slice.call(document.getElementsByTagName('input'));
	var allSelects = Array.prototype.slice.call(document.getElementsByTagName('select'));
	var allTextareas = Array.prototype.slice.call(document.getElementsByTagName('textarea'));
	

	function changeLocalStorage() {
		var inputValues = allInputs.map(function(item) {			
			if (item.type == 'radio' || item.type == 'checkbox') {
				return item = item.checked;
			} else {
				return item = item.value;
			}			
		});

		var selectIdSelOptions = allSelects.map(function(item) {
			return item = item.selectedIndex;
		});

		var textareaValues = allTextareas.map(function(item) {
			return item = item.value;
		});

		stateForm.inputs = inputValues;
		stateForm.selects = selectIdSelOptions;
		stateForm.textareas = textareaValues;

		localStorage.setItem('dataFormRDG', JSON.stringify(stateForm));
	}

	function makeCommentStyle(textarea) {
		var wrapper = textarea.closest('.order__accord-comment-wrapper');
		var parent = wrapper.closest('.order__subsector');
		var btnAddComment = parent.querySelector('.order__add-comment-btn');
		var addHeight = 0;
				
		if (!btnAddComment.classList.contains('order__add-comment-btn--hidden')) {
			btnAddComment.classList.add('order__add-comment-btn--hidden');
		}
		
		if (!wrapper.classList.contains('order__accord-comment-wrapper--disabled')) {
			wrapper.classList.add('order__accord-comment-wrapper--disabled');
		}

		textarea.disabled = true;
		if (document.documentElement.clientWidth < 1200) addHeight = 100;
		textarea.style.height = textarea.scrollHeight + addHeight + 'px';// 100px for bug with height on mobile
	}

	function renderForm() {
		var i, j, k, l;

		for (i=0; i<allInputs.length; i++) {
			if (stateForm.inputs[i] && typeof stateForm.inputs[i] == 'boolean') {
				allInputs[i].checked = true;
			} else {
				allInputs[i].value = stateForm.inputs[i];
			}
		}

		for (j=0; j<allSelects.length; j++) {
			allSelects[j].selectedIndex = stateForm.selects[j];
		}

		for (k=0; k<allTextareas.length; k++) {
			var currentElem = allTextareas[k]
			if (stateForm.textareas[k]) {
				currentElem.value = stateForm.textareas[k];
				if (currentElem.classList.contains('js-no-changed-style')) continue;
				makeCommentStyle(currentElem);				
			}
		}

		//console.log(allSectorBlocks);

		//fill changed items
		//makeSectorCompleteMobile();// for dif devices

		/*for (l=0; l < allSectorBlocks.length; l++) {
			fillCheckedItems(desktopSectorBlocks[l], allSectorBlocks[l]);
			makeSectorComplete();
		}	*/	
	}

	function changeFormElements(e) {
		var target = e.target;

		if (target.tagName != 'INPUT' && 
			target.tagName != 'SELECT' && 
			target.tagName != 'TEXTAREA') return;

		changeLocalStorage();
	}

	if (dataForm) {
		stateForm = JSON.parse(dataForm);
		renderForm();
	};

	mainEventBlock.addEventListener('change', changeFormElements);	
//});


/*----------------------------------------
LOCAL STORAGE END
-----------------------------------------*/

/*--------------------------
BEGIN ACCORDION BLOCK FORM js
----------------------------*/

//window.addEventListener('load', function() {
	//var mainEventBlock = document.querySelector('.js-main-event-block');
	var asideEventBlock = document.querySelector('.js-aside-event-block');
	var desktopSize = 1200;	
	var clientWidth = document.documentElement.clientWidth;
	//var btsnShowAccordionBlock = document.querySelectorAll('.js-show-accord-block');
	//var btnsHideAccordionBlock = document.querySelectorAll('.js-hide-accord-block');
	//var btnToggleMobite = document.querySelectorAll('.js-toggle-btn');
	var i, j; // maybe delete
	//var allSectorBlocks = document.querySelectorAll('.order__sector');//maybe delete
	//var allSectorBlocks = document.querySelectorAll('.js-sector-accord');//OUT
	//var toggleListsBlocks = document.querySelectorAll('.order__subsector-list'); //OUT
	//var allDesktopMenuSectors = document.querySelectorAll('.order__menu-sector'); //OUT ??????
	//var desktopSectorBlocks = document.querySelectorAll('.js-desktop-sector-block'); //OUT ?????
	//var allSectorBlocks = document.querySelectorAll('.js-sector-accord'); //OUT    !!!!!!!!
	var btnSelect = document.querySelectorAll('.order__btn-select');
	//console.log(btnToggleMobite);

	/*function hideAllAccords() {// maybe delete
		var accordsBlock = document.querySelectorAll('.order__subsector-accord');
		var i;

		for (i=0; i<accordsBlock.length; i++) {
			if (accordsBlock[i].classList.contains('order__subsector-accord--active')) {
				accordsBlock[i].classList.remove('order__subsector-accord--active');
				fillCheckedItems(accordsBlock[i]);
			}
		}
	}*/

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
		var resultArray = [];
		var i, j;

		for (i=0; i<arr.length; i++) {
			var intermediateResult = [];
			var currentSelect = arr[i];
			var selectedId = currentSelect.selectedIndex;
			var selectedOption = currentSelect.options[selectedId];
			var optionValue = selectedOption.value;
			var siblingLabelPrev = currentSelect.previousElementSibling;
			var siblingLabelNext = currentSelect.nextElementSibling;
			var brackets = false;

			if (selectedOption.classList.contains('js-not-show')) continue;//maybe delete

			if (siblingLabelNext && siblingLabelNext.tagName == 'LABEL') {
				intermediateResult.push(siblingLabelNext.innerHTML.trim());
				brackets = true;
			}

			if (siblingLabelPrev && siblingLabelPrev.tagName == 'LABEL') {
				intermediateResult.push(siblingLabelPrev.innerHTML.trim());
				brackets = true;
			}

			if (brackets) {
				intermediateResult.push('(' + optionValue + ')');
			} else {
				intermediateResult.push(optionValue);
			}

			intermediateResult = intermediateResult.join(' ');
			resultArray.push(intermediateResult);			
		}		

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

		//console.log(areas);

		areas.forEach(function(item) {
			for (i=0; i < areas.length; i++) {
				if (areas[i].value.length && 
					(areas[i].disabled === true || 
						areas[i].classList.contains('js-send-undisabled'))) {
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
			valueArray = valueArray.concat(takeTextareaItems(textarea));
			//console.log(textarea);	
		}
		
		return valueArray.join(',</br>');
	}

	function fillCheckedItems(block, dataBlock) {
		
		//var valueString;
		/*var valueBlock;
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
		}	*/

		var valueBlock;
		var i; 

		//var parentBlock = block.closest('.order__subsector'); // for mobile only
		//var formBlock = dataBlock; // dataBlock is only for desctop, for mobile it's his own parent block
		var subsectorInfoBlock = dataBlock.querySelectorAll('.js-form-block');
		

		/*if (!dataBlock) {
			valueBlock = parentBlock.querySelectorAll('.order__subsector-value');
		} else {*/
			valueBlock = block.querySelectorAll('.order__menu-subsector-value');
		//}//try || for it

		//console.log(valueBlock);

		for (i=0; i<subsectorInfoBlock.length; i++) {
			var valueString = getFormValues(subsectorInfoBlock[i]);
			if (!valueString) continue;
			valueBlock[i].innerHTML = valueString;	
		}

	}

	function makeSectorActive(block) {// maybe delete
		var sectorBlock = block.closest('.order__sector');
		
		if (!sectorBlock.classList.contains('order__sector--active')) {
			removeSectorActive();			
			sectorBlock.classList.add('order__sector--active');
		}			
	}

	function removeSectorActive() {

		allSectorBlocks.forEach(function(item) {
			if (item.classList.contains('order__sector--active')) {
				item.classList.remove('order__sector--active');
			}
		});
		
		/*toggleListsBlocks.forEach(function(item) {
			if (item.classList.contains('order__subsector-list--active')) {
				item.classList.remove('order__subsector-list--active');
			}
		});*/

		/*for (i=0; i<allSectorBlocks.length; i++) {
			if (allSectorBlocks[i].classList.contains('order__sector--active')) {
				allSectorBlocks[i].classList.remove('order__sector--active');
			}
		}*/
	}

	function makeSectorComplete() {
		/*var i, j;  !!!! maybe back? but maybe delete

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
		}*/

		var i, j;

		outer: for (i=0; i<allDesktopMenuSectors.length; i++) {
			var block = allDesktopMenuSectors[i];			
			var valueBlocks = block.querySelectorAll('.order__menu-subsector-value');
			
			for (j=0; j<valueBlocks.length; j++) {
				var valueContent = valueBlocks[j].innerHTML.trim();
				if (!valueContent) {
					removeDesctopMenuItemComplete(block);////////
					continue outer;
				}

				if (!block.classList.contains('order__menu-sector--complete')
						&& !block.classList.contains('order__menu-sector--active')) {
					block.classList.add('order__menu-sector--complete');
				}
			}
		}
	}

	function makeSectorCompleteMobile() {
		var i, j;
		outer: for (i=0; i<allSectorBlocks.length; i++) {
			var sector = allSectorBlocks[i];
			var subSector = sector.querySelectorAll('.js-form-block');

			for (j=0; j<subSector.length; j++) {
				var blockFull = getFormValues(subSector[j]).length;
				if (!blockFull) {
					removeSectorComplete(sector);
					continue outer;
				}

				if (!sector.classList.contains('order__sector--complete')
						&& !sector.classList.contains('order__sector--active')) {
					sector.classList.add('order__sector--complete');
				}
			}
		}
	}

	function removeSectorComplete(block) {/// maybe delete | not delete
		if (block.classList.contains('order__sector--complete')) {
			block.classList.remove('order__sector--complete');
		}
	}

	/*function toggleBtnSubsector(btn) {
		
		if (!btn.classList.contains('order__sector-button--open')) {
			btn.classList.add('order__sector-button--open');
		} else {
			btn.classList.remove('order__sector-button--open');
		}
	}*/

	function removeDesktopMenuSectorActive() {	
		var i;

		for (i=0; i<allDesktopMenuSectors.length; i++) {
			if (allDesktopMenuSectors[i].classList.contains('order__menu-sector--active')) {
				allDesktopMenuSectors[i].classList.remove('order__menu-sector--active');
			}
		}
	}

	function makeDesktopMenuSectorActive(block) {
		var sectorBlock = block.closest('.order__menu-sector');
		
		if (!sectorBlock.classList.contains('order__menu-sector--active')) {
			//removeSectorActive();	
			removeDesktopMenuSectorActive();		
			sectorBlock.classList.add('order__menu-sector--active');
		}			
	}

	function removeDesctopMenuItemComplete(block) {//
		if (block.classList.contains('order__menu-sector--complete')) {
			block.classList.remove('order__menu-sector--complete');
		}
	}

	function showDesktopAccord(block) {
		var blockNum = block.getAttribute('data-block-number');
		var purposeAccordBlock = allSectorBlocks[(+blockNum -1)];

		hideDesktopAccord();
		window.scrollTo(0,0);		
	
		if (!purposeAccordBlock.classList.contains('order__sector--active-desk')) {
			purposeAccordBlock.classList.add('order__sector--active-desk');
		}
	
	}

	function hideDesktopAccord() {
		var i;

		for (i=0; i<allSectorBlocks.length; i++) {
			if (allSectorBlocks[i].classList.contains('order__sector--active-desk')) {
				allSectorBlocks[i].classList.remove('order__sector--active-desk');
				fillCheckedItems(desktopSectorBlocks[i], allSectorBlocks[i]);
			}
		}
	}

	
//window.addEventListener('load', function() {
	
	/*------------------------------
	BEGIN BLOCK FORM FOR MOBILE js
	--------------------------------*/
	if (clientWidth < desktopSize) {
		
		function toggleMobileAccord(elem) {
			//var target = e.target;
			//var parentBlock = this.closest('.order__sector');
			// var toggleBlock = parentBlock.querySelector('.order__subsector-list');
			// var toggleBtn = this.querySelector('.order__sector-button');
			var parentBlock = elem.closest('.js-sector-accord');
			//var parentBlock = elem.parentElement;

			//console.log(parentBlock);

			removeSectorComplete(parentBlock);
			//toggleBtnSubsector(toggleBtn);

			if (!parentBlock.classList.contains('order__sector--active')) {
				removeSectorActive();
				parentBlock.classList.add('order__sector--active');

			} else {
				parentBlock.classList.remove('order__sector--active');						
			}


			/*if (!toggleBlock.classList.contains('order__subsector-list--active')) {
				//hideAllAccords();
				removeSectorActive();
				toggleBlock.classList.add('order__subsector-list--active');

			} else {
				toggleBlock.classList.remove('order__subsector-list--active');
				//fillCheckedItems(this);
				//removeSectorActive();			
			}*/

			

			makeSectorCompleteMobile();	

		}

		/*function actionSubsectorPoint(e) {//delete
			var target = e.target;		
			var parentBlock = this.closest('.order__subsector');
			var sector = parentBlock.closest('.order__sector');
			var accordionBlock = parentBlock.querySelector('.order__subsector-list');
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
		}*/

		/*function actionAccordionBlock(e) {// delete
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
		}*/

		function addListenerAccrdionToggle(e) {
			var target = e.target;
			
			while (target != asideEventBlock) {
			    /*if (target.hasAttribute('data-toggle-btn')) {*/
			    if (target.dataset.toggleBtn) {
				    toggleMobileAccord(target);
				    return;
			    }
			    target = target.parentNode;
			}					
		}

		makeSectorCompleteMobile();
		mainEventBlock.addEventListener('click', addListenerAccrdionToggle);


	}

	/*------------------------------
	END BLOCK FORM FOR MOBILE js
	--------------------------------*/

	/*------------------------------
	BEGIN BLOCK FORM FOR DESCTOP js
	--------------------------------*/

	if (clientWidth >= desktopSize) {
		//console.log('444');
		var i;

		function actionSectorBlock(elem) {
			//var target = e.target;
					
			showDesktopAccord(elem);
			removeDesctopMenuItemComplete(elem);
			makeDesktopMenuSectorActive(elem);			
			makeSectorComplete();

		}

		function actionBtnSelect(elem, direct) {
			var sectorAccord = elem.closest('.order__sector');
			var sectorAccordNum = sectorAccord.getAttribute('data-accord-number');
			var sectorMenu; 

			sectorAccordNum = +sectorAccordNum;

			if (direct === 'prev') {
				sectorAccordNum = sectorAccordNum - 2;
			}

			sectorMenu = desktopSectorBlocks[sectorAccordNum];

			
			showDesktopAccord(sectorMenu);
			removeDesctopMenuItemComplete(sectorMenu);
			makeDesktopMenuSectorActive(sectorMenu);
			makeSectorComplete();
			
		}

		function addListenerSelectBlock(e) {
			var target = e.target;
			//var action = target.getAttribute('data-block-number');

			//console.log(target);// write parent find
			while (target != asideEventBlock) {
			    if (target.hasAttribute('data-block-number')) {				    
				    actionSectorBlock(target);
				    return;
			    }
			    target = target.parentNode;
			}			

			/*if (action) {
				actionBtnSelect(target, action);
			}*/

		}

		function addListenetSelectBtn(e) {
			var target = e.target;
			var action = target.getAttribute('data-btn-select');			

			if (action) {
				actionBtnSelect(target, action);
			}
			
		}

		for (i=0; i<allSectorBlocks.length; i++) {
			fillCheckedItems(desktopSectorBlocks[i], allSectorBlocks[i]);
			makeSectorComplete();
		}	

		asideEventBlock.addEventListener('click', addListenerSelectBlock);
		mainEventBlock.addEventListener('click', addListenetSelectBtn);
		
		
	}

	/*------------------------------
	END BLOCK FORM FOR DESCTOP js
	--------------------------------*/
});

/*--------------------------
END ACCORDION BLOCK FORM js
----------------------------*/