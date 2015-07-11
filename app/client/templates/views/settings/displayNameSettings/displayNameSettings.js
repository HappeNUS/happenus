Template.displayNameSettings.onRendered(function(){
	var input = this.$('input#display-name-input');
	input.val(Meteor.user().display_name);
});

Template.displayNameSettings.events({
	'keyup input#display-name-input':function(event, template){
		template.$('div.progress').addClass('hide');
		template.$('button#save-display-name-btn').addClass('hide');

		var checkBtn = template.$('button#check-valid-btn');
		if ($(event.target).val() !== Meteor.user().display_name) {
			checkBtn.removeClass('disabled');
		} else {
			checkBtn.addClass('disabled');
		}
	},
	'click button#check-valid-btn': function(event, template){
		if (!$(event.target).hasClass('disabled')) {
			template.$('div.progress').removeClass('hide');
			var input = template.$('input#display-name-input');
			input.prop('disabled', true);
			Meteor.call('checkDisplayName', input.val(), function(err){
				template.$('div.progress').addClass('hide');
				input.prop('disabled', false);
				if (!err) {
					template.$('button#save-display-name-btn').removeClass('hide');
				} else {
					Materialize.toast(err.reason, 5000);
				}
			});
		}
	},
	'click button#save-display-name-btn': function(event, template){
		var input = template.$('input#display-name-input');
		input.prop('disabled', true);
		template.$('div.progress').removeClass('hide');
		Meteor.call('changeDisplayName', input.val(), function(err) {
			template.$('div.progress').addClass('hide');
			input.prop('disabled', false);
			if (!err) {
				Materialize.toast("Successfully changed display name to '" + input.val() + "'.", 5000);
				$(event.target).addClass('hide');
				template.$('button#check-valid-btn').addClass('disabled');
			} else {
				Materialize.toast(err.reason, 5000);
			}
		});
	}
});