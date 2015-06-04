function getCurrentEvent() {
	return Events.findOne({_id: Router.current().params._id});
}

Template.event.onCreated(function(){
	SidebarController.clearSidebar();
	
	var userId = getCurrentEvent().userId;
	this.subscribe("specificUserData", userId);
});

Template.event.helpers({
	currentEvent: function(){
		return getCurrentEvent();
	},
	userData: function(){
		var curr = getCurrentEvent();
		return Meteor.users.findOne({_id: curr.userId});
	}
});