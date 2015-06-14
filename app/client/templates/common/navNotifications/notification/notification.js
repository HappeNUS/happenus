Template.notification.events({
	'click a': function (event, template) {
		Notifications.read(this._id);
	}
});