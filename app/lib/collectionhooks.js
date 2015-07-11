Meteor.users.after.insert(function (userId, user) {
	Meteor.users.update({_id: user._id},
		{$set:
			{
				profile: {
					img: Meteor.settings.Cloudinary.default_profile_img,
					description: ''
				},
				notifSettings: {
					edited: true,
					deleted: true,
					liked: true 
				}
			}
		}
	);
	var displayName;
	if (user.username) {
		displayName = user.username;
	} else if (user.services.google) {
		displayName = user.services.google.name;
	}
	Meteor.users.direct.update({_id: user._id}, {$set: {display_name: displayName}});
	if (Meteor.isServer) {
		NotificationFactory.welcomeNotif(user._id);
	}
});

Events.after.update(function (userId, doc, fieldNames, modifier, options) {
	Events.direct.update({_id: doc._id}, {$set: {likeCount: doc.likes.length}});
}, {fetchPrevious: false});