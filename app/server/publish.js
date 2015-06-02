Meteor.publish("userData", function () {
	return Meteor.users.find();
});

Meteor.publish("subData", function () {
	return Subscriptions.find({subberId: this.userId});
});