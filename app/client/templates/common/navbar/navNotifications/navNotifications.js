Template.navNotifications.onRendered(function(){
	$("#notif-dropdown-btn").dropdown({
		constrain_width: false,
		belowOrigin: true,
	});

	var originalCount = 0;
	this.autorun(function() {
		var newCount = Notifications.find({read: false}).count();
		if (newCount > originalCount) {
			Materialize.toast('You have a new notification!', 3000);
		}
		originalCount = newCount;
	});
});

Template.navNotifications.helpers({
	newNotifsCount: function() {
		return Notifications.find({read: false}).count();
	},
	userNotifs: function() {
		var notifs = Notifications.find({read: false},{sort: {date: -1}, limit: 5});
		return notifs;
	}
});