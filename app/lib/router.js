Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {
	name: 'home',
	action: function () {
		if (!this.params.query.view) {
			this.params.query.view = 'featured';
		}
		if (!this.params.query.sort_by) {
			this.params.query.sort_by = 'popularity';
		}
		this.render();
	}
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