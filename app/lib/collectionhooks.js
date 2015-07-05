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
});

Events.after.update(function (userId, doc, fieldNames, modifier, options) {
	Events.direct.update({_id: doc._id}, {$set: {likeCount: doc.likes.length}});
}, {fetchPrevious: false});