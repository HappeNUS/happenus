Template.eventCard.onRendered(function(){
	var url = 'url('.concat($.cloudinary.url(this.data.img.card)).concat(')');
	this.$('.card-image').css('background-image', url);
	var card = this.$('.card');
	card.imagesLoaded().done(function(){
		card.find('.card-image.invisible').removeClass('invisible');
	});
});

function isEventLiked (likes) {
	return likes.indexOf(Meteor.userId()) !== -1;
}

Template.eventCard.helpers({
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

Template.eventCard.events({
	'click .link-event': function() {
		Router.go('event', {_id: this._id});
	},
	'click .like-btn': function(event, template) {
		if (isEventLiked(this.likes)) {
			Meteor.call('unlikeEvent', this._id);
		} else {
			Meteor.call('likeEvent', this._id);
		}
	},
	'click .activator': function(event, template) {
		$('.trigger').trigger('click');
	}
});