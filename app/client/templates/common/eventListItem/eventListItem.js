var DATE_FORMAT = 'DD/MM/YYYY';

function formatDate(date) {
	return moment(date).format(DATE_FORMAT);
}

function formatDateRange (from, to) {
	return formatDate(from) + ' - ' + formatDate(to);
}

function isEventLiked (likes) {
	return likes.indexOf(Meteor.userId()) !== -1;
}

Template.eventListItem.onCreated(function(){
	this.subscribe("allUserData", this.userId);
});

Template.eventListItem.onRendered(function () {
	var url = 'url('.concat(this.data.img).concat(')');
	this.$('.listitem-img').css('background-image', url);
});

Template.eventListItem.helpers({
	likeCount: function(){
		return this.likeCount;
	},
	isEventLiked: function(){
		return isEventLiked(this.likes);
	},
	user: function(){
		return Meteor.users.findOne({_id: this.userId});
	},
	dateTranslation: function () {
		var dates = this.eventDates;
		var current = new Date();
		for (var i = 0; i < dates.length; i++) {
			var from = dates[i].from, to = dates[i].to;
			if (from < current && to > current) {
				return 'Ongoing: ' + formatDateRange(from, to);
			} else if (from > current) {
				return 'Upcoming: ' + formatDateRange(from, to);
			}
		}
		var last = dates[dates.length - 1];
		return 'Last event: ' + formatDateRange(last.from, last.to);
	}
});

Template.eventListItem.events({
	'click .link-event': function() {
		Router.go('event', {_id: this._id});
	},
	'click .like-btn': function(event, template) {
		if (isEventLiked(this.likes)) {
			Meteor.call('unlikeEvent', this._id);
		} else {
			Meteor.call('likeEvent', this._id);
		}
	}
});