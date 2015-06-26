Template.homeTabs.onRendered(function () {
	$('ul.tabs').tabs();
});

/* Sets the view Session variable */
function setView(view) {
	Session.set("view", view);
}

/* Sets the sort Session variable */
function setSort(sort) {
	Session.set("sort", sort);
}

function setLimit() {
	Session.set("limit", 20);
}

Template.homeTabs.events({
	'click #featTab': function(event, template){
		// When the featured tab is clicked
		// Sets view to 'featured' and sort to 'popularity'
		setView('featured');
		setSort('popularity');
		setLimit();
	},
	'click #subsTab': function(event, template){
		// When the subscriptions tab is clicked
		// Sets view to 'subscriptions' and sort to 'latest'
		setView('subscriptions');
		setSort('latest');
		setLimit();
	}
});