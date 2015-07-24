Template.userNotifications.helpers({
	allNotifs: function (event, template) {
		// Sort all notifications by date in descending order
		return Notifications.find({},{sort: {date: -1}});
	}
});

Template.userNotifications.events({
	'click a': function (event, template) {
		// Marks a notification as read (both notif click and cancel click)
		Notifications.read(this._id);
	}
});