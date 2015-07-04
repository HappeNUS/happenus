Template.navbar.onRendered(function () {
	$('.button-collapse').sideNav();
});

Template.navbar.events({
	'click a': function (event, temp) {
		$('.button-collapse').sideNav('hide');
	},

	'click #toggle-search': function () {
		var search = $('#search');
		if (search.is(":visible")) {
			search.slideUp(100);
		} else {
			search.slideDown(100);
		}
	}
});