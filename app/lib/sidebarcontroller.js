SidebarController = {
	selectSidebar: function (item) {
		this.clearSidebar();
		item.addClass('active');
	},
	clearSidebar: function  () {
		$('.nav-sidebar').children().removeClass('active');
	}
};