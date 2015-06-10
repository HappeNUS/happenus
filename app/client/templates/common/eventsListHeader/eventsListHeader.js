Template.eventsListHeader.onRendered(function(){
	$('.dropdown-button').dropdown({
		inDuration: 300,
		outDuration: 300,
		constrain_width: true,
		hover: false,
		gutter: 0,
		belowOrigin: true
	});
});

Template.eventsListHeader.helpers({
	view: function () {
		return Session.get("view");
	},
	sortedBy: function () {
		return Session.get("sort");
	}
});

function viewClicked(view) {
	Session.set("view", view);
}

function sortClicked(sort) {
	Session.set("sort", sort);
}

Template.eventsListHeader.events({
	'click #view-feat': function(event, temp) {viewClicked('featured')},
	'click #view-subs': function(event, temp) {viewClicked('subscriptions')},

	'click #sort-popu': function(event, temp) {sortClicked('popularity')},
	'click #sort-late': function(event, temp) {sortClicked('latest')},
	'click #sort-soon': function(event, temp) {sortClicked('soonest')}
});