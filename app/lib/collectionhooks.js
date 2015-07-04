Meteor.users.after.insert(function (userId, user) {
	Meteor.users.update({_id: user._id},
		{$set:
			{
				profile: {
					img: Meteor.settings.Cloudinary.default_profile_img,
					description: ''
				}
			}
		}
	);
});