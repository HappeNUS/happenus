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

Router.plugin('ensureSignedIn', {
	except: []
});