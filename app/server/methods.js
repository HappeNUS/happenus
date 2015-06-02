Meteor.methods({
	'sub': function(otherUser) {
		if (this.userId !== otherUser) {
			Subscriptions.insert({
				subberId: this.userId,
				subbedId: otherUser,
				date: new Date()
			});
		}
	},
	'unsub': function(subbedUser) {
		Subscriptions.remove({
			subberId: this.userId,
			subbedId: subbedUser
		});
	}
});