Template.navMenu.onRendered(function(){
	$(".menu-dropdown-btn #dropdown-btn").dropdown({
		constrain_width: false,
		belowOrigin: true,
	});
});

Template.navMenu.events({
	'click a#openBugModal': function(event, temp) {
		ViewModel.byId('bugWindow').openModal();
	},
	'click a#openAboutModal': function(event, temp) {
		ViewModel.byId('aboutWindow').openModal();
	}
});