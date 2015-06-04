Template.subscriptions.onCreated(function(){
	this.subscribe("subEventData");
	this.subscribe("subData");
});

Template.subscriptions.helpers({
	subEvents: function() {
		return Events.find();
	}
});