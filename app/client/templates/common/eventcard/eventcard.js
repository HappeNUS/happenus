Template.eventcard.onRendered(function(){
	var url = 'url('.concat(this.data.img).concat(')');
	this.$('.card-image').css('background-image', url);
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
	},
	hasTags: function() {
		return this.tags.length !== 0;
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