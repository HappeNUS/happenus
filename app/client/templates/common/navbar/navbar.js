Template.navbar.onRendered(function () {
	$('.button-collapse').sideNav();
	//$('.modal-trigger').leanModal();
});

Template.navbar.events({
	'click a': function (event, temp) {
		$('.button-collapse').sideNav('hide');
	}
});