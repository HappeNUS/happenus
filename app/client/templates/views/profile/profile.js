/* Checks if the current user is subscribed to this user */
function isSubscribed () {
	return Subs.findOne({subbedId: Router.current().params._id});
}

Template.profile.helpers({
	isSelf: function(){ // Checks if the page is the user's own page
		return Router.current().params._id === Meteor.userId();
	},
	isSubscribed: function(){ // Checks if the current user is subscribed to this user
		return isSubscribed();
	},
	subCount: function() { // Shows the number of subscribers a user has
		return Subs.find({subbedId: Router.current().params._id}).count();
	},
	userData: function(){ // Gets the displayed user's information
		var userId = Router.current().params._id;
		return Meteor.users.findOne({_id: userId});
	},
	userEvents: function(){ // Gets the displayed user's events sorted by date in descending order
		return Events.find({}, EventSorter['latest']);
	}
});

Template.profile.events({
	'click .sub': function(event) {
		// When the subscribe button is clicked
		if (isSubscribed()) { // Run the unsubscribe method on the server
			Meteor.call('unsub', Router.current().params._id);
		} else { // Run the subscribe method on the server
			Meteor.call('sub', Router.current().params._id);
		}
	},
	'mouseenter .sub': function(event) {
		var target = $(event.target);
		if (isSubscribed()) {
			target.text('Unsubscribe');
		}
	},
	'mouseleave .sub': function(event) {
		var target = $(event.target);
		if (isSubscribed()) {
			target.text('Subscribed');
		}
	}
})