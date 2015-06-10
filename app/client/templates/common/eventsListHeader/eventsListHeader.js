Template.eventsListHeader.onCreated(function () {
	var eventSub, instance = this;
	var params = Router.current().getParams();
	this.autorun(function () {	
		if (eventSub) {
			eventSub.stop();
		}
		var view = params.query.view;
		var sort = params.query.sort_by;
		console.log("refreshed " + view + " " + sort);
		eventSub = instance.subscribe("eventData", view, sort);
	});
});

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
		return Router.current().getParams().query.view;
	},
	sortedBy: function () {
		return Router.current().getParams().query.sort_by;
	}
});

function viewClicked(view) {
	console.log("before " + Router.current().params.query.view);
	Router.current().params.query.view = view;
	console.log("after " + Router.current().params.query.view);
}

function sortClicked(sort) {
	console.log("before " + Router.current().params.query.sort_by);
	Router.current().params.query.sort_by = sort;
	console.log("after " + Router.current().params.query.sort_by);
}

Template.eventsListHeader.events({
	'click #view-feat': function(event, temp) {viewClicked('featured')},
	'click #view-subs': function(event, temp) {viewClicked('subscriptions')},

	'click #sort-popu': function(event, temp) {sortClicked('popularity')},
	'click #sort-late': function(event, temp) {sortClicked('latest')},
	'click #sort-soon': function(event, temp) {sortClicked('soonest')}
});