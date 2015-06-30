Accounts.onCreateUser(function(options, user) {
	user.profile = {};
	user.profile.img = Meteor.settings.Cloudinary.default_profile_img; 
	return user;
});
