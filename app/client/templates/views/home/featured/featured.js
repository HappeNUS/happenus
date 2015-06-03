Template.featured.onCreated(function(){
	this.subscribe("eventData");
});

Template.featured.helpers({
	events: function() {
		return Events.find();
	}
});