Accounts.onCreateUser(function(options, user) {
	user.profile_img = Meteor.settings.Cloudinary.default_profile_img; 
	return user;
});
