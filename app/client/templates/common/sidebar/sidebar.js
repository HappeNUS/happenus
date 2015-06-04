Template.sidebar.events({
	"click li": function(event, template) {
		SidebarController.selectSidebar(event.target);
	}
});