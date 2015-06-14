Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {
	name: 'home'
});

Router.route('/create', {
	name: 'create'
});

Router.route('/profile/:_id', {
	name: 'profile'
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