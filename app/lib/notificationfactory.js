if (Meteor.isServer) {
	NotificationFactory = {
		newNotification: function(targetUserId, title, description, link){
			return Notifications.new({owner: targetUserId, class: title, title: description, link: link});
		},
		eventEditNotif: function(event) {
			var title = "An event you liked, '" + event.name + "', has been edited";
			var description = "at " + moment(new Date()).format('DD/MM/YYYY h:mm a');
			var link = '/event/' + event._id;

			for (var i = 0; i < event.likes.length; i++) {
				var likerId = event.likes[i];
				if (Meteor.userId() !== likerId) {
					var user = Meteor.users.findOne({_id: likerId});
					if (!user.notifSettings || user.notifSettings.edited) {
						Notifications.new({owner: event.likes[i], class: title, title: description, link: link});					
					}
				}
			}
		},
		eventDelNotif: function(event) {
			var user = Meteor.users.findOne({_id: event.userId});
			var title = "An event you liked, '" + event.name + "', has been deleted";
			var description = "at " + moment(new Date()).format('DD/MM/YYYY h:mm a');

			for (var i = 0; i < event.likes.length; i++) {
				var likerId = event.likes[i];
				if (Meteor.userId() !== likerId) {
					var user = Meteor.users.findOne({_id: likerId});
					if (!user.notifSettings || user.notifSettings.deleted) {
						Notifications.new({owner: event.likes[i], class: title, title: description, link: link});					
					}
				}
			}
		},
		eventLikeNotif: function (eventId, likerId) {
			var event = Events.findOne({_id: eventId});
			var likeeId = event.userId;
			if (likerId !== likeeId) {
				var liker = Meteor.users.findOne({_id: likerId});
				var likee = Meteor.users.findOne({_id: likeeId});

				if (!likee.notifSettings || likee.notifSettings.liked) {
					var title = liker.display_name + " liked your event '" + event.name + "'.";
					var description = "at " + moment(new Date()).format('DD/MM/YYYY h:mm a');
					var link = '/profile/' + likerId;
					this.newNotification(likeeId, title, description, link);
				}
			}
			
		},
		commentNotif: function(eventId, userId, comment, parent) {
			var event = Events.findOne({_id: eventId});
			var commentingUser = Meteor.users.findOne({_id: userId});
			var parentComment, parentCommentUser;
			if (parent) {
				parentComment = Comments.findOne({_id: parent});
				if (parentComment.delete) {
					return;
				}
				parentCommentUser = Meteor.users.findOne({_id: parentComment.userId});
			}
			if (event.userId !== userId) {
				var display_name = commentingUser.display_name;
				if (!parentCommentUser || parentCommentUser._id !== event.userId) {
					this.newNotification(event.userId, display_name + " commented on your event, '" + event.name + "'.", "'" + comment + "'", '/event/' + eventId);
				}
			}
			if (parentComment && parentCommentUser && commentingUser._id !== parentCommentUser._id) {
				this.newNotification(
					parentCommentUser._id,
					commentingUser.display_name + " replied to your comment on the event, '" + event.name + "'.",
					"'" + comment + "'",
					'/event/' + eventId);
			}
		},
		welcomeNotif: function(userId) {
			var display_name = Meteor.users.findOne({_id: userId}).display_name;
			this.newNotification(userId, 'Welcome to HappeNUS, ' + display_name + '!', 'Click on this notification to learn more about HappeNUS', '/help');
		}
	};
}