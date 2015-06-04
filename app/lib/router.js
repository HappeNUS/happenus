Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {
	name: 'home'
});

Router.route('/create', {
	name: 'create'
});

Router.route('/subs', {
	name: 'subs'
});

Router.route('/profile/:_id', {
	name: 'profile'
});

Router.route('/event/:_id', {
	name: 'event'
});

Router.plugin('ensureSignedIn', {
	except: []
});