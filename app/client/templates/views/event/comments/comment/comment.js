Template.comment.onRendered(function () {
	var margin = this.data.level * 5;
	var _id = this.data._id;
	var instance = this;
	var complete = function () {
		instance.$('li.comment#' + _id).find('input').focus();
	}
	this.$('li.comment#' + _id).css('margin-left', margin);

	this.$('li.comment#' + _id + ' .add-comment#add-' + _id).hide();
	this.$('#reply-' + _id).click(function (event) {
		var add = $(event.target).parents('li.comment').children('.add-comment');
		if (add.is(':visible')) {
			add.slideUp(100);
		} else if ($('.add-comment').is(':visible')) {
			$('.add-comment').slideUp(100, function(){
				add.slideDown(100, complete);				
			});
		} else {
			add.slideDown(100, complete);
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