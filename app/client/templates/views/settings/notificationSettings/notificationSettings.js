DEFAULT_SETTNGS = {
	edited: true,
	deleted: true,
	liked: true 
};

var currentSettings;

function setOptions (template, settings) {
	var editedBox = template.$('#edited-box');
	var deletedBox = template.$('#deleted-box');
	var likeBox = template.$('#like-box');

	editedBox.prop('checked', settings.edited);
	deletedBox.prop('checked', settings.deleted);
	likeBox.prop('checked', settings.liked);
}

function enableButtons (template) {
	template.$('.submit-reset-btns button').removeClass('disabled');
}

function disableButtons (template) {
	template.$('.submit-reset-btns button').addClass('disabled');
}

function getSettings (template) {
	var editedBox = template.$('#edited-box');
	var deletedBox = template.$('#deleted-box');
	var likeBox = template.$('#like-box');
	return {
		edited: editedBox.prop('checked'),
		deleted: deletedBox.prop('checked'),
		liked: likeBox.prop('checked')
	};
}

function isSameSettings (set1, set2) {
	return (set1.edited ^ !set2.edited) && (set1.deleted ^ !set2.deleted) && (set1.liked ^ !set2.liked);
}

Template.notificationSettings.onRendered(function(){
	if (!Meteor.user().notifSettings) {
		Meteor.call('updateNotifSettings', DEFAULT_SETTNGS);
		currentSettings = DEFAULT_SETTNGS;
		setOptions(this, DEFAULT_SETTNGS);
	} else {
		currentSettings = Meteor.user().notifSettings;
		setOptions(this, currentSettings);
	}
});

Template.notificationSettings.events({
	'change input[type=checkbox]': function (event, template) {
		var settings = getSettings(template);
		if (isSameSettings(settings, currentSettings)) {
			disableButtons(template);
		} else {
			enableButtons(template);			
		}
	},
	'click .submit-reset-btns button': function(event, template) {
		disableButtons(template);
	},
	'click #save': function (event, template) {
		var settings = getSettings(template);
		currentSettings = settings;
		Meteor.call('updateNotifSettings', settings);
	},
	'click #discard': function (event, template) {
		setOptions(template, currentSettings);
	}
});