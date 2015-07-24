var isDropdownAnimating;

function isDropdownShowing (dropdown) {
	return dropdown.css('display') === 'block' && dropdown.css('opacity') === '1';
}

function showDropdown (dropdown) {
	if (!isDropdownAnimating) {
		dropdown.css('display', 'block');
		dropdown.addClass('active');
		dropdown.stop(true, false).animate({'opacity': '1'}, {
			duration: 225,
			start: function(){
				isDropdownAnimating = true;
			},
			complete: function(){isDropdownAnimating = false}
		});
	}
}

function hideDropdown (dropdown) {
	if (!isDropdownAnimating) {
		dropdown.stop(true, false).animate({'opacity': '0'}, {
			duration: 225,
			start: function() {
				isDropdownAnimating = true;
			},
			complete: function() {
				dropdown.css('display', 'none');
				dropdown.removeClass('active');
				isDropdownAnimating = false;
			}
		});
	}
}


Template.navNotifications.onRendered(function(){
	isDropdownAnimating = false;
	$('*').click(function(event){
		var dropdown = $('#notif-dropdown.active');
		hideDropdown(dropdown);
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

Template.navNotifications.events({
	'click .dd-btn': function (event, template) {
		var dropdown = template.$('#notif-dropdown');
		if (isDropdownShowing(dropdown)) {
			hideDropdown(dropdown);
		} else {
			showDropdown(dropdown);
		}
	}
})