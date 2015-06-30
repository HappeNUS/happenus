NotificationFactory = {
	newNotification: function(targetUserId, title, description, link){
		return Notifications.new({owner: targetUserId, class: title, title: description, link: link});
	},
	massNotification: function(userIds, title, description, link) {
		for (var i = 0; i < userIds.length; i++) {
			if (Meteor.userId() !== userIds[i]) {
				Notifications.new({owner: userIds[i], class: title, title: description, link: link});
			}
		}
	},
	eventEditNotif: function(event) {
		var user = Meteor.users.findOne({_id: event.userId});
		var title = "An event you liked, '" + event.name + "', has been edited";
		var description = "at " + moment(new Date()).format('DD/MM/YYYY h:mm a');
		var link = '/event/' + event._id;
		this.massNotification(event.likes, title, description, link);
	},
	eventDelNotif: function(event) {
		var user = Meteor.users.findOne({_id: event.userId});
		var title = "An event you liked, '" + event.name + "', has been deleted";
		var description = "at " + moment(new Date()).format('DD/MM/YYYY h:mm a');
		this.massNotification(event.likes, title, description, '');
	}
};