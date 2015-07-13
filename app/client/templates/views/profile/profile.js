/* Checks if the current user is subscribed to this user */
function isSubscribed () {
	return Subs.findOne({subbedId: Router.current().params._id});
}

function getUserData () {
	var userId = Router.current().params._id;
	return Meteor.users.findOne({_id: userId})
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
		return getUserData();
	},
	userEvents: function(){ // Gets the displayed user's events sorted by date in descending order
		return Events.find({}, EventSorter['latest']);
	},
	profile_img_url: function(){
		return $.cloudinary.url(getUserData().profile.img);
	}
});

Template.profile.events({
	'click .sub': function(event) {
		// When the subscribe button is clicked
		if (isSubscribed()) { // Run the unsubscribe method on the server
			Materialize.toast('You have successfully unsubscribed to this user', 5000);
			Meteor.call('unsub', Router.current().params._id);
		} else { // Run the subscribe method on the server
			Materialize.toast('You have successfully subscribed to this user', 5000);
			Meteor.call('sub', Router.current().params._id);
		}
	},
	'mouseenter .sub': function(event) {
		var target = $(event.target);
		if (isSubscribed()) {
			target.text('Click to Unsubscribe');
		}
	},
	'mouseleave .sub': function(event) {
		var target = $(event.target);
		if (isSubscribed()) {
			target.text('Subscribed');
		}
	}
})