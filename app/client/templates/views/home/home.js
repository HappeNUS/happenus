Template.home.onCreated(function () {
	var eventSub, instance = this;
	this.autorun(function () {
		if (eventSub) {
			eventSub.stop();
		} else {
			Session.set("view", "featured");
			Session.set("sort", "popularity");
		}
		var view = Session.get("view");
		var sort = Session.get("sort");
		eventSub = instance.subscribe("eventData", view, sort);
	});
});

Template.home.helpers({
	events: function() {
		var sort = Session.get("sort");
		return Events.find(EventSorter.filterPast, EventSorter[sort]);
	}
});