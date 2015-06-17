Template.eventsListOptions.onRendered(function(){
	$('.dropdown-button').dropdown({
		inDuration: 300,
		outDuration: 300,
		constrain_width: true,
		hover: false,
		gutter: 0,
		belowOrigin: true
	});
});

Template.eventsListOptions.helpers({
	sortedBy: function () {
		return Session.get("sort");
	},
	display: function() {
		return Session.get("display");
	}
});

function setSort(sort) {
	Session.set("sort", sort);
}

function setDisplay(display) {
	Session.set("display", display);
}

Template.eventsListOptions.events({
	'click #sort-popu': function(event, temp) {setSort('popularity')},
	'click #sort-late': function(event, temp) {setSort('latest')},
	'click #sort-soon': function(event, temp) {setSort('soonest')},

	'click #disp-list': function(event, temp) {setDisplay('list')},
	'click #disp-card': function(event, temp) {setDisplay('cards')},
});