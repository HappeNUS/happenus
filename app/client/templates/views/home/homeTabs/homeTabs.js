Template.homeTabs.onRendered(function () {
	$('ul.tabs').tabs();
});

function setView(view) {
	Session.set("view", view);
}

function setSort(sort) {
	Session.set("sort", sort);
}

Template.homeTabs.events({
	'click #featTab': function(event, template){
		setView('featured');
		setSort('popularity');
	},
	'click #subsTab': function(event, template){
		setView('subscriptions');
		setSort('latest');
	}
});