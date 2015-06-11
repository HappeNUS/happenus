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
	sortedBy: function () {
		return Session.get("sort");
	}
});

function setSort(sort) {
	Session.set("sort", sort);
}

Template.eventsListHeader.events({
	'click #sort-popu': function(event, temp) {setSort('popularity')},
	'click #sort-late': function(event, temp) {setSort('latest')},
	'click #sort-soon': function(event, temp) {setSort('soonest')}
});