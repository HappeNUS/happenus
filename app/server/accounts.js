Accounts.onCreateUser(function(options, user) {
	user.subs = ['testing'];
	return user;
});