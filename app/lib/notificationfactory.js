NotificationFactory = {
	newNotification: function(targetUserId, title, description, link){
		return Notifications.new({owner: targetUserId, class: title, title: description, link: link});
	}
};