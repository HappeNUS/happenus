Meteor.users.deny({
	update: function() {
		return true;
	}
});

function isSameUser (userId1, userId2) {
	return userId1 === userId2;
}

Meteor.methods({
	'update.addSub': function(otherUser) {
		if (!isSameUser(this.userId, otherUser)) {
			Meteor.users.update(this.userId, {
				$addToSet: {subs: otherUser}
			});
		}
	},
	'update.removeSub': function(subbedUser) {
		Meteor.users.update(this.userId, {
			$pullAll: {subs: [subbedUser]}
		});
	}
});