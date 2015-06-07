Template.eventcard.onCreated(function(){
	this.subscribe("allUserData", this.userId);
});

Template.eventcard.onRendered(function(){
	if (this.data.tags.length > 0) {
		var counter = 0;
		var template = this;
		var data = this.data;
		var box = template.$(".card-tag-box");
		box.text(data.tags.slice(-1)[0]);
		if (data.tags.length > 1) {
			window.setInterval(change, 5000);
		}
	}
	function change() {
			box.fadeOut(500, function() {
				box.text(data.tags[counter++]);
				box.fadeIn(500);
			});
			counter = counter % data.tags.length;
		}
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