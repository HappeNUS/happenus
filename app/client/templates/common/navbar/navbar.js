Template.navbar.onRendered(function () {
	$('.button-collapse').sideNav();
});

Template.navbar.events({
	'click a': function (event, temp) {
		$('.button-collapse').sideNav('hide');
	}
});