Template.navbar.onRendered(function () {
	$('.button-collapse').sideNav();
});

Template.navbar.events({
	'click a': function (event, temp) {
		$('.button-collapse').sideNav('hide');
	}
});

Template.navbar.viewmodel({
	openSearch: function(event) {
		ViewModel.byId('search').openSearch(event);
	}
})