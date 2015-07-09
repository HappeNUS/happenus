Template.comment.onRendered(function () {
	var margin = this.data.level * 5;
	var _id = this.data._id;
	var text = this.data.data;
	var commentLi = this.$('li.comment#' + _id);
	var complete = function () {
		commentLi.find('input').focus();
	}
	commentLi.css('margin-left', margin);

	var addCommentDiv = commentLi.find('.add-comment#add-' + _id);
	addCommentDiv.hide();
	this.$('div.comment-actions #reply-' + _id).click(function (event) {
		if (addCommentDiv.is(':visible')) {
			addCommentDiv.slideUp(100);
		} else if ($('.add-comment').is(':visible')) {
			$('.add-comment').slideUp(100, function(){
				addCommentDiv.slideDown(100, complete);
			});
		} else {
			addCommentDiv.slideDown(100, complete);
		}
	});

	var commentDataDiv = this.$('li.comment#' + _id + ' div.comment-data');
	var showMoreDiv = commentDataDiv.siblings('div.comment-show-more');
	if (commentDataDiv[0].scrollWidth > commentDataDiv.innerWidth()) {
		showMoreDiv.click(function(event){
			if (commentDataDiv.hasClass('hide-excess')) {
				commentDataDiv.removeClass('hide-excess');
				showMoreDiv.html('Show less');
			} else {
				commentDataDiv.addClass('hide-excess');
				showMoreDiv.html('Show more');
			}
		});
	} else {
		showMoreDiv.css('display', 'none');
	}

	this.$('div.comment-actions #delete-' + _id).click(function (event) {
		var modalOptions = {
			title: 'Delete comment',
			message: "Are you sure you want to delete the comment, '" + text + "'?",
			label: 'Warning!',
			closeLabel: 'No',
			submitLabel: 'Yes',
			callback: function(yesNo, data, event) {
				if (yesNo) {
					console.log(_id);
					Meteor.call('deleteComment', _id);
				}
			}
		};
		MaterializeModal.alert(modalOptions);
	});
});

Template.comment.helpers({
	isDeleted: function() {
		return this.deleted;
	},
	userData: function() {
		return Meteor.users.findOne({_id: this.userId});
	},
	profileImg: function() {
		if (this.deleted) {
			return $.cloudinary.url('y4l7dpwdec31u5ouzevu');
		} else {
			var user = Meteor.users.findOne({_id: this.userId});
			var profileImg = user.profile.img;
			return $.cloudinary.url(profileImg);
		}
	},
	isCommentOwner: function() {
		return this.userId === Meteor.userId();
	},
	isEventOwner: function() {
		event = Events.findOne({_id: this.eventId});
		return event.userId === this.userId;
	}
});