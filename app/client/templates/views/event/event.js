function getCurrentEvent() {
	return Events.findOne({_id: Router.current().params._id});
}

function isEventLiked (likes) {
	return likes.indexOf(Meteor.userId()) !== -1;
}

Template.event.onCreated(function(){
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
	},
	likeCount: function(){
		return this.likeCount;
	},
	isEventLiked: function(){
		return isEventLiked(this.likes);
	}
});

Template.event.events({
	'click .like-btn': function(event, template) {
		if (isEventLiked(this.likes)) {
			Meteor.call('unlikeEvent', this._id);
		} else {
			Meteor.call('likeEvent', this._id);
		}
	}
});