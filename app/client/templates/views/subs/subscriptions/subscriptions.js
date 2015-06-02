Template.subscriptions.onCreated(function(){
	this.subscribe("subData");
});

Template.subscriptions.helpers({
	subbed: function() {
		return Subscriptions.find();
	}
});

Template.subscriptions.events({
	'click .add-btn': function(event){
		Meteor.call('sub', Fake.word());
	},
	'click .rem-btn': function(event){
		Meteor.call('unsub', this.subbedId);
	}
});