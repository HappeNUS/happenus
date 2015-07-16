var lastScrollTop = 0, createFAB;

function toggleFAB () {
	var currentScrollTop = $(this).scrollTop();
	if (currentScrollTop > lastScrollTop && !createFAB.hasClass('hidden')) {
		hideFAB();
	} else if (currentScrollTop < lastScrollTop && createFAB.hasClass('hidden')) {
		showFAB();
	}
	lastScrollTop = currentScrollTop;
};

function hideFAB() {
	if (!createFAB.hasClass('hidden')) {
		createFAB.addClass('hidden');
	}
}

function showFAB() {
	if (createFAB.hasClass('hidden')) {
		createFAB.removeClass('hidden');
	}
}

Template.createFAB.onRendered(function(){
	createFAB = this.$('.createFAB #createFAB');
	$(window).scroll(function(event) {
		if ($('.createFAB #createFAB').length) {
			toggleFAB();	
		}
	});
});