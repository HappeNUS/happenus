Template.userNotifications.helpers({
	allNotifs: function (event, template) {
		return Notifications.find({},{sort: {date: -1}});
	}
});

Template.userNotifications.events({
	'click a.dismiss': function (event, template) {
		Notifications.read(this._id);
	}
});