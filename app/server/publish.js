Meteor.publish("allUserData", function () {
	return Meteor.users.find();
});

Meteor.publish("subData", function () {
	return Subscriptions.find({subberId: this.userId});
});

Meteor.publish("eventData", function() {
	return Events.find();
});