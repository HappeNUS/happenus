Template.navbar.onRendered(function () {
	$('.button-collapse').sideNav();
	//$('.modal-trigger').leanModal();
	$('#search').hide();
});

Template.navbar.events({
	'click a': function (event, temp) {
		$('.button-collapse').sideNav('hide');
	},

	'click #toggle-search': function () {
		var search = $('#search');
		if (search.is(":visible")) {
			search.slideUp();
		} else {
			search.slideDown();
		}
	}
});