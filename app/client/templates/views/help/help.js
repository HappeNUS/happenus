Template.help.onRendered(function () {
	$('.button-collapse').sideNav();
});

Template.help.events({
	'click a': function (event, temp) {
		$('.button-collapse').sideNav('hide');
	}
});