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
			shortDesc: details.shortDesc,
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
			NotificationFactory.eventLikeNotif(eventId, Meteor.userId());
			Events.update({_id: eventId}, {$addToSet: {likes: userId}});
		}
	},
	'unlikeEvent': function(eventId) {
		var userId = this.userId;
		if (userId) {
			Events.update({_id: eventId}, {$pullAll: {likes: [userId]}});
		}
	},
	'deleteEvent': function(eventId) {
		var userId = this.userId;
		var eventToDelete = Events.findOne({_id: eventId, userId: userId});
		if (eventToDelete) {
			NotificationFactory.eventDelNotif(eventToDelete);
			Events.remove({_id: eventId, userId: userId});
			Comments.remove({eventId: eventId});
			Meteor.call('deleteEventImages', eventToDelete.img);
		}
	},
	'deleteEventImages': function(img) {
		var callback = function(e,r) {
			if (!e) {
				console.log(r);
			}
		}
		Meteor.call("cloudinary_delete", img.thumbnail, callback);
		Meteor.call("cloudinary_delete", img.card, callback);
		Meteor.call("cloudinary_delete", img.normal, callback);
	},
	'editEvent': function(eventId, detailsChanged) {
		var userId = this.userId;
		var eventToEdit = Events.findOne({_id: eventId, userId: userId});
		if (eventToEdit) {
			NotificationFactory.eventEditNotif(eventToEdit);
			Events.update({_id: eventToEdit._id}, {$set: detailsChanged});
		}
	},
	'changeProfilePic': function(uploadedFile) {
		var user = Meteor.users.findOne({_id: this.userId});
		if (user.profile.img !== Meteor.settings.Cloudinary.default_profile_img) {
			Meteor.call("cloudinary_delete", user.profile.img, function(e,r) {
				if (!e) {
					console.log(r);
				}
			});
		}
		Meteor.users.update({_id: this.userId}, {$set: {'profile.img': uploadedFile.public_id}});
	},
	'updateProfileDesc': function(desc) {
		Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.description': desc}});
	},
	'changeDisplayName': function(newName) {
		Meteor.call('checkDisplayName', newName, function(err){
			if (!err) {
				Meteor.users.update({_id: Meteor.userId()}, {$set: {display_name: newName}});
			} else {
				throw err;
			}
		});
	},
	'checkDisplayName': function(name) {
		var count = Meteor.users.find({display_name: name}).count();
		if (count) {
			throw new Meteor.Error('invalid-display-name', 'Someone is already using this display name!');
		}
		if (!name) {
			throw new Meteor.Error('invalid-display-name', 'Please enter a display name');
		}
	},
	'updateNotifSettings': function(notifSettings) {
		Meteor.users.update({_id: Meteor.userId()}, {$set: {notifSettings: notifSettings}})
	},
	'createComment': function(eventId, userId, data, parent) {
		var _id = new Meteor.Collection.ObjectID()._str;
		comment = {
			_id: _id,
			eventId: eventId,
			userId: userId,
			parent: parent,
			children: [],
			data: data,
			date: new Date()
		}
		Comments.insert(comment);
		NotificationFactory.commentNotif(eventId, userId, data, parent);
		if (parent) {
			Comments.update({_id: parent}, {$addToSet: {children: _id}});
		}
	},
	'deleteComment': function(commentId) {
		var comment = Comments.findOne({_id: commentId});
		if (comment && comment.userId === Meteor.userId() && !comment.deleted) {
			Comments.update({_id: commentId}, {$set: {deleted: true, data: '', userId: ''}});
		}
	},
	'deleteAccount': function() {
		var userId = this.userId;
		if (userId) {
			// Find events owned by user and delete all comments of that event
			Events.direct.find({userId: userId}).forEach(function(event){
				Comments.direct.remove({eventId: event._id});
			});

			// Delete events owned by user
			Events.direct.remove({userId: userId});

			// Delete comments by user
			Comments.direct.find({userId: userId}).forEach(function(comment){
				Meteor.call('deleteComment', comment._id);
			});

			// Delete subscriptions involving user
			Subs.remove({subberId: userId});
			Subs.remove({subbedId: userId});

			// Delete actual account
			Meteor.users.direct.remove({_id: userId});
		}
	}
});