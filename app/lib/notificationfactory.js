NotificationFactory = {
	newNotification: function(targetUserId, title, description, link){
		return Notifications.new({owner: targetUserId, class: title, title: description, link: link});
	},
	massNotification: function(userIds, title, description) {
		for (var i = 0; i < userIds.length; i++) {
			if (Meteor.userId() !== userIds[i]) {
				Notifications.new({owner: userIds[i], class: title, title: description});
			}
		}
	},
	eventDelNotif: function(event) {
		var user = Meteor.users.findOne({_id: event.userId});
		var title = "An event you liked, '" + event.name + "', has been deleted";
		var description = "Deleted by " + user.username;
		this.massNotification(event.likes, title, description);
	}
};