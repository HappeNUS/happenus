Template.profile.onCreated(function() {
	this.subscribe("allUserData");
	this.subscribe("subData");
});

Template.profile.helpers({
	isSelf: function(){
		return Router.current().params._id === Meteor.userId();
	},

	isSubscribed: function(){
		return Subscriptions.findOne({subbedId: Router.current().params._id});
	},

	userData: function(){
		var userId = Router.current().params._id;
		return Meteor.users.findOne({_id: userId});
	}
});

Template.profile.events({
	'click .sub': function(event) {
		Meteor.call('sub', Router.current().params._id);
	},

	'click .unsub': function(event) {
		Meteor.call('unsub', Router.current().params._id);
	}
})