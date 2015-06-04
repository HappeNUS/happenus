Template.event.onCreated(function(){
	this.subscribe("specificEventData", Router.current().params._id);
});

Template.event.helpers({
	currentEvent: function(){
		return Events.findOne({_id: Router.current().params._id});
	}
});