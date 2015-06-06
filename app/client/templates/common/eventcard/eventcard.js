Template.eventcard.onCreated(function(){
	this.subscribe("allUserData", this.userId);
});

function isEventLiked (likes) {
	return likes.indexOf(Meteor.userId()) !== -1;
}

Template.eventcard.helpers({
	user: function(){
		return Meteor.users.findOne({_id: this.userId});
	},
	likeCount: function(){
		return this.likeCount;
	},
	isEventLiked: function(){
		return isEventLiked(this.likes);
	}
});

Template.eventcard.events({
	'click .like-btn': function(event, template) {
		if (isEventLiked(this.likes)) {
			Meteor.call('unlikeEvent', this._id);
		} else {
			Meteor.call('likeEvent', this._id);
		}
	}
});