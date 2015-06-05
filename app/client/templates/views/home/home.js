Template.home.onCreated(function(){
	SidebarController.selectSidebar('#featured');
});

Template.home.helpers({
	pageheaderinfo: function(){
		return {
			title: 'Featured events',
			currentRoute: 'home'
		};
	}
});