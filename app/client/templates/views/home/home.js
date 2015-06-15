Template.home.onCreated(function () {
	// Subscribe to the relevant info when Session variables change
	var eventSub, instance = this;
	this.autorun(function () {
		if (eventSub) {
			eventSub.stop();
		} else {
			Session.set("view", "featured");
			Session.set("sort", "popularity");
			Session.set("display", "list");
		}
		var view = Session.get("view");
		var sort = Session.get("sort");
		eventSub = instance.subscribe("eventData", view, sort);
	});
});

Template.home.helpers({
	events: function() {
		// All events to be shown on the page
		var sort = Session.get("sort");
		return Events.find(EventSorter.filterPast, EventSorter[sort]);
	},
	isDisplayList: function() {
		return Session.get("display") === "list";
	},
	isDisplayCards: function() {
		return Session.get("display") === "cards";
	},
});