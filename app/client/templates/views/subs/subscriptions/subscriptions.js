Template.subscriptions.onCreated(function(){
	var instance = this;
	instance.subscribe("subData");
	instance.subscribe("subEventData");
});

Template.subscriptions.helpers({
	subEvents: function() {
		var sort = Router.current().getParams().query.sort_by;
		return Events.find(EventSorter.filterPast, EventSorter[sort]);
	}
});