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
		var parent = this.closest('.order__subsector-accord');
		var aimBlock = parent.querySelector('.order__accord-comment-wrapper');

		if (!this.classList.contains('order__accord-btn--hidden')) {
			this.classList.add('order__accord-btn--hidden');
		}

		if (!aimBlock.classList.contains('order__accord-comment-wrapper--active')) {
			aimBlock.classList.add('order__accord-comment-wrapper--active');
		}
	}

	function hideCommentBlock() {
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

	for (i=0; i<btnHideComment.length; i++) {
		btnHideComment[i].addEventListener('click', hideCommentBlock);
	}
});