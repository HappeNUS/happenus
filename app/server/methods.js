Meteor.methods({
	'sub': function(otherUser) {
		if (this.userId !== otherUser) {
			var subscription = Subscriptions.findOne({
				subberId: this.userId,
				subbedId: otherUser
			});
			if (!subscription) {
				Subscriptions.insert({
					subberId: this.userId,
					subbedId: otherUser,
					date: new Date()
				});
			}
		}
	},
	'unsub': function(subbedUser) {
		Subscriptions.remove({
			subberId: this.userId,
			subbedId: subbedUser
		});
	}
});