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
	name: 'create'
});

Router.route('/profile/:_id', {
	name: 'profile',
	waitOn: function(){
		return [
			Meteor.subscribe("specificUserData", this.params._id),
			Meteor.subscribe("subData")
		];
	}
});

Router.route('/event/:_id', {
	name: 'event',
	waitOn: function(){
		return Meteor.subscribe("specificEventData", this.params._id);
	}
});

Router.route('/my-notifications', {
	name: 'userNotifications'
});

Router.plugin('ensureSignedIn', {
	except: []
});