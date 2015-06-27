Meteor.methods({
	'sub': function(otherUser) {
		if (this.userId !== otherUser) {
			var subscription = Subs.findOne({
				subberId: this.userId,
				subbedId: otherUser
			});
			if (!subscription) {
				Subs.insert({
					subberId: this.userId,
					subbedId: otherUser,
					date: new Date()
				});
			}
		}
	},
	'unsub': function(subbedUser) {
		Subs.remove({
			subberId: this.userId,
			subbedId: subbedUser
		});
	},
	'createEvent': function(details, img_details){
		Events.insert({
			_id: new Meteor.Collection.ObjectID()._str,
			userId: Meteor.userId(),
			name: details.name,
			desc: details.desc,
			img: img_details,
			eventDates: details.eventDates,
			dateCreated: new Date(),
			likeCount: 0,
			likes: [],
			tags: details.tags
		});
	},
	'likeEvent': function (eventId) {
		var userId = this.userId;
		if (userId) {
			Events.update({_id: eventId}, {$addToSet: {likes: userId}, $inc: {likeCount: 1}});
		}
	},
	'unlikeEvent': function(eventId) {
		var userId = this.userId;
		if (userId) {
			Events.update({_id: eventId}, {$pullAll: {likes: [userId]}, $inc: {likeCount: -1}});
		}
	},
	'profileUpload': function(uploadedFile) {
		var user = Meteor.users.findOne({_id: this.userId});
		if (user.profile.img !== Meteor.settings.Cloudinary.default_profile_img) {
			Meteor.call("cloudinary_delete", user.profile.img, function(e,r) {
				if (!e) {
					console.log(r);
				}
			});
		}
		Meteor.users.update({_id: this.userId}, {$set: {'profile.img': uploadedFile.public_id}});
	}
});