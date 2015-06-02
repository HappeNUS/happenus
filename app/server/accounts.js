Accounts.onCreateUser(function(options, user) {
	return user;
});

Meteor.users.deny({
	update: function() {
		return true;
	}
});