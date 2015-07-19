Template.homeTabs.onRendered(function () {
	$('ul.tabs').tabs();
});

Template.homeTabs.events({
	'click #featTab': function(event, template){
		// When the featured tab is clicked
		// Sets view to 'featured' and sort to 'popularity'
		ViewModel.byId('eventList').changeBoth({type: 'featured'}, 'popularity');
	},
	'click #subsTab': function(event, template){
		// When the subscriptions tab is clicked
		// Sets view to 'subscriptions' and sort to 'latest'
		ViewModel.byId('eventList').changeBoth({type: 'subscriptions'}, 'latest');
	},
	'click #likedTab': function(event, template){
		// When the liked events tab is clicked
		// Sets view to 'liked-events' and sort to 'soonest'
		ViewModel.byId('eventList').changeBoth({type: 'liked-events'}, 'soonest');
	}
});