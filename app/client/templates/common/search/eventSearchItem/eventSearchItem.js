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

Template.eventSearchItem.onRendered(function () {
	var url = 'url('.concat($.cloudinary.url(this.data.img.thumbnail)).concat(')');
	this.$('.search-item-img').css('background-image', url);
});

Template.eventSearchItem.helpers({
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

Template.eventSearchItem.events({
	'click .link-event': function(event) {
		ViewModel.byId('search').closeSearch(event);
		Router.go('event', {_id: this._id});
	}
});