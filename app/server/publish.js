Meteor.publish("allUserData", function () {
	return Meteor.users.find();
});

Meteor.publish("subData", function () {
	return Subs.find({subberId: this.userId});
});

Meteor.publish("eventData", function() {
	return Events.find();
});

Meteor.publish("userEventData", function(userId) {
	return Events.find({userId: userId});
});

Meteor.publish("subEventData", function(){
	var subscriptions = Subs.find({subberId: this.userId}).fetch();
	var subbedIds = subscriptions.map(function(curr, idx, arr) {
		return curr.subbedId;
	});
	return Events.find({userId: {$in: subbedIds}});
});

Meteor.publish("specificEventData", function(eventId){
	return Events.find({_id: eventId});
});