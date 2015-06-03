Template.eventcard.onCreated(function(){
	this.subscribe("allUserData", this.userId);
});

Template.eventcard.helpers({
	user: function(){
		return Meteor.users.findOne({_id: this.userId});
	}
});