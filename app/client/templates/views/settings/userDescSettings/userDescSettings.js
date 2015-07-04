function resetDescTextarea (template) {
	template.$('#user-description').val(Meteor.user().profile.description);
}

Template.userDescSettings.onRendered(function(){
	resetDescTextarea(this);
});

Template.userDescSettings.events({
	'click div.confirm-buttons #done': function(event, template) {
		Meteor.call('updateProfileDesc', template.$('#user-description').val());
		Materialize.toast('User description changed', 5000);
	},
	'click div.confirm-buttons #clear': function(event, template) {
		resetDescTextarea(template);
	}
});