Template.featured.onCreated(function(){
	this.subscribe("eventData");
});

Template.featured.helpers({
	events: function() {
		var sort = Router.current().getParams().query.sort_by;
		return Events.find(EventSorter.filterPast, EventSorter[sort]);
	}
});