Template.subs.onCreated(function(){
	SidebarController.selectSidebar('#subs');
});

Template.subs.helpers({
	pageheaderinfo: function(){
		return {
			title: 'Subscriptions',
			currentRoute: 'subs'
		};
	}
});