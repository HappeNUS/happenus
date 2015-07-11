function setDefaultProfileItems (user) {
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
}

function isUniqueDisplayName(displayName){
	return Meteor.users.direct.find({display_name: displayName}).count() === 0;
}

function generateDisplayName(displayName){
	return displayName + Math.floor(Math.random() * 10);
}

function setDisplayName (user) {
	var displayName;
	if (user.username) {
		displayName = user.username;
	} else if (user.services.google) {
		displayName = user.services.google.name;
	} else if (user.services.facebook) {
		displayName = user.services.facebook.name;
	}
	if (displayName) {
		while (!isUniqueDisplayName(displayName)) {
			displayName = generateDisplayName(displayName);
		}
	}
	Meteor.users.direct.update({_id: user._id}, {$set: {display_name: displayName}});
}

function sendWelcomeNotif (user) {
	if (Meteor.isServer) {
		NotificationFactory.welcomeNotif(user._id);
	}
}

Meteor.users.after.insert(function (userId, user) {
	setDefaultProfileItems(user);
	setDisplayName(user);
	sendWelcomeNotif(user);
});

Events.after.update(function (userId, doc, fieldNames, modifier, options) {
	Events.direct.update({_id: doc._id}, {$set: {likeCount: doc.likes.length}});
}, {fetchPrevious: false});