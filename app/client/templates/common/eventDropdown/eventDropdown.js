var isDropdownAnimating;

function isDropdownShowing (dropdown) {
	return dropdown.css('display') === 'block' && dropdown.css('opacity') === '1';
}

function showDropdown (dropdown) {
	if (!isDropdownAnimating) {
		dropdown.css('display', 'block');
		dropdown.addClass('active');
		dropdown.stop(true, false).animate({'opacity': '1'}, {
			duration: 225,
			start: function(){
				isDropdownAnimating = true;
				var ddbtn = dropdown.siblings('a.dd-btn');
				ddbtn.children('i').removeClass('mdi-navigation-more-vert');
				ddbtn.children('i').addClass('mdi-navigation-expand-less');
			},
			complete: function(){isDropdownAnimating = false}
		});
	}
}

function hideDropdown (dropdown) {
	if (!isDropdownAnimating) {
		dropdown.stop(true, false).animate({'opacity': '0'}, {
			duration: 225,
			start: function() {
				isDropdownAnimating = true;
				var ddbtn = dropdown.siblings('a.dd-btn');
				ddbtn.children('i').removeClass('mdi-navigation-expand-less');
				ddbtn.children('i').addClass('mdi-navigation-more-vert');
			},
			complete: function() {
				dropdown.css('display', 'none');
				dropdown.removeClass('active');
				isDropdownAnimating = false;
			}
		});
	}
}

function isSubscribed (userId) {
	return Subs.find({subberId: Meteor.userId(), subbedId: userId}).count() !== 0;
}

Template.eventDropdown.onRendered(function(){
	isDropdownAnimating = false;
	$('*').click(function(event){
		var dropdown = $('#eventdd.active');
		hideDropdown(dropdown);
	});
});

Template.eventDropdown.helpers({
	isOwnEvent: function() {
		return this.userId === Meteor.userId();
	},
	isSubscribed: function() {
		return isSubscribed(this.userId);
	}
});

/* Events on click of items in dropdown still yet to be completed */
Template.eventDropdown.events({
	'click .dd-btn': function (event, template) {
		var dropdown = template.$('#eventdd');
		if (isDropdownShowing(dropdown)) {
			hideDropdown(dropdown);
		} else {
			showDropdown(dropdown);
		}
	},
	'click #delete-event': function () {
		Meteor.call('deleteEvent', this._id);
	},
	'click #sub-user': function() {
		if (isSubscribed(this.userId)) {
			Meteor.call('unsub', this.userId);
		} else {
			Meteor.call('sub', this.userId);
		}
	}
});