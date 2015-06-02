Template.subscriptions.helpers({
	events: function() {
		// Request server for subscribed events
		// Get event
		var allSubs = [];
		var result = [];
		for (var user in allSubs) {
			result.concat(Events.find({userId: user}));
		}
		return result;
	},
	subscribed: function() {
		return [];
	}
});

Template.subscriptions.events({
	'click button': function(event){
		console.log(this.userId);
		console.log(Meteor.user()._id);
		console.log(Meteor.users.findOne({_id: Meteor.user()._id}));
		Meteor.call('update.addSub', Fake.word());
	}
});