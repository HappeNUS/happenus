var isFABAnimating = false;
var lastScrollTop = 0;
var SHOWN = SHOWN;
var HIDDEN = "-80px";

function toggleFAB () {
	var currentScrollTop = $(this).scrollTop();
	if (!isFABAnimating) {
		if (currentScrollTop > lastScrollTop && $('#createFAB').css('bottom') !== HIDDEN) {
			hideFAB();
		} else if (currentScrollTop < lastScrollTop && $('#createFAB').css('bottom') !== SHOWN) {
			showFAB();
		}
	}
	lastScrollTop = currentScrollTop;
};

function hideFAB() {
	$('#createFAB').stop(true, false).animate({
		bottom: HIDDEN
	}, {
		duration: 250,
		start: function() {
			isFABAnimating = true;
		},
		complete: function() {
			isFABAnimating = false;
		}
	});
}

function showFAB() {
	$('#createFAB').stop(true, false).animate({
		bottom: "23px"
	}, {
		duration: 250,
		start: function() {
			isFABAnimating = true;
		},
		complete: function() {
			isFABAnimating = false;
		}
	});
}

Template.createFAB.onRendered(function(){
	$(window).scroll(function(event) {
		if ($('#createFAB').length) {
			toggleFAB();	
		}
	});
});