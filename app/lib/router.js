Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {
	name: 'home',
	waitOn: function(){
		return Meteor.subscribe("allUserData");
	}
});

Router.route('/create', {
	name: 'create',
	waitOn: function(){
		return Meteor.subscribe("ownUserData");
	}
});

Router.route('/edit/:_id', {
	name: 'edit',
	template: 'create',
	waitOn: function(){
		var eventId = this.params._id;
		return Meteor.subscribe("specificEventData", eventId);
	}
})

Router.route('/help', {
	name: 'help',
	waitOn: function(){
		return Meteor.subscribe("ownUserData");
	}
});

Router.route('/profile/:_id', {
	name: 'profile',
	waitOn: function(){
		return [
			Meteor.subscribe("specificUserData", this.params._id),
			Meteor.subscribe("ownUserData"),
			Meteor.subscribe("subData")
		];
	}
});

Router.route('/event/:_id', {
	name: 'event',
	waitOn: function(){
		return [
			Meteor.subscribe("specificEventData", this.params._id),
			Meteor.subscribe("eventCommentData", this.params._id),
			Meteor.subscribe("allUserData")
		];
	}
});

Router.route('/my-notifications', {
	name: 'userNotifications',
	waitOn: function(){
		return Meteor.subscribe("ownUserData");
	}
});

Router.route('/settings', {
	name: 'settings',
	waitOn: function(){
		return Meteor.subscribe("ownUserData");
	}
})

Router.plugin('ensureSignedIn', {
	except: []
});