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
				ddbtn.children('i').html('expand_less');
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
				ddbtn.children('i').html('more_vert');
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
	'click #delete-event': function (event, template) {
		var modalOptions = {
			title: 'Delete event',
			message: "Are you sure you want to delete the event, '" + template.data.name + "'?",
			label: 'Warning!',
			closeLabel: 'No',
			submitLabel: 'Yes',
			callback: function(yesNo, data, event) {
				if (yesNo) {
					Meteor.call('deleteEvent', this._id);
				}
			}
		};
		MaterializeModal.alert(modalOptions);
	},
	'click #sub-user': function() {
		var displayName = Meteor.users.findOne({_id: this.userId}).display_name;
		if (isSubscribed(this.userId)) {
			Meteor.call('unsub', this.userId, function(err){
				if (!err) {
					Materialize.toast('Unsubscribed from ' + displayName, 5000);					
				}
			});
		} else {
			Meteor.call('sub', this.userId, function(err){
				if (!err) {
					Materialize.toast('Subscribed to ' + displayName, 5000);									
				}
			});
		}
	}
});