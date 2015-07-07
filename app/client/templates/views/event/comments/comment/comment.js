Template.comment.onRendered(function () {
	var margin = this.data.level * 5;
	this.$('li.comment#' + this.data._id).css('margin-left', margin);

	this.$('li.comment#' + this.data._id + ' .add-comment#add-' + this.data._id).hide();
	this.$('#reply-' + this.data._id).click(function (event) {
		var add = $(event.target).parents('li.comment').children('.add-comment');
		if (add.is(':visible')) {
			add.slideUp(100);
		} else if ($('.add-comment').is(':visible')) {
			$('.add-comment').slideUp(100, function(){
				add.slideDown(100);				
			});
		} else {
			add.slideDown(100);
		}
	});
});

Template.comment.helpers({
	userData: function() {
		return Meteor.users.findOne({_id: this.userId});
	},
	profileImg: function() {
		var user = Meteor.users.findOne({_id: this.userId});
		var profileImg = user.profile.img;
		return $.cloudinary.url(profileImg);
	}
});