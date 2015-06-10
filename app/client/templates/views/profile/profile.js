Template.profile.onCreated(function() {
	this.subscribe("allUserData");
	this.subscribe("subData");
	this.subscribe("userEventData", Router.current().params._id);
});

function isSubscribed () {
	return Subs.findOne({subbedId: Router.current().params._id});
}

Template.profile.helpers({
	isSelf: function(){
		return Router.current().params._id === Meteor.userId();
	},

	isSubscribed: function(){
		return isSubscribed();
	},

	userData: function(){
		var userId = Router.current().params._id;
		return Meteor.users.findOne({_id: userId});
	},

	userEvents: function(){
		return Events.find({}, EventSorter['latest']);
	}
});

Template.profile.events({
	'click .sub': function(event) {
		if (isSubscribed()) {
			Meteor.call('unsub', Router.current().params._id);
		} else {
			Meteor.call('sub', Router.current().params._id);
		}
	},
	'mouseenter .sub': function(event) {
		var target = $(event.target);
		if (isSubscribed()) {
			target.removeClass('label-success');
			target.addClass('label-danger');
			target.text('Unsubscribe');
		}
	},
	'mouseleave .sub': function(event) {
		var target = $(event.target);
		if (isSubscribed()) {
			target.removeClass('label-danger');
			target.addClass('label-success');
			target.text('Subscribed');
		}
	}
})