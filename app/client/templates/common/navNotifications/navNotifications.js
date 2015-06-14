Template.navNotifications.onRendered(function(){
	$("#notif-dropdown-btn").dropdown({
		constrain_width: false,
		belowOrigin: true,
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