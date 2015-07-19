Template.navbar.onRendered(function () {
	$('.button-collapse').sideNav();
});

Template.navbar.events({
	'click a': function (event, temp) {
		$('.button-collapse').sideNav('hide');
	},
	'click a#searchbtn': function(event, temp) {
		ViewModel.byId('search').openSearch(event);
	}
});