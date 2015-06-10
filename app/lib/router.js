Router.configure({
	layoutTemplate: 'layout'
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

Router.plugin('ensureSignedIn', {
	except: []
});