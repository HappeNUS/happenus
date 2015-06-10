Template.featured.helpers({
	events: function() {
		var sort = Session.get("sort");
		return Events.find(EventSorter.filterPast, EventSorter[sort]);
	}
});