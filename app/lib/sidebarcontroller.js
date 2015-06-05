SidebarController = {
	selectSidebar: function (selector) {
		this.clearSidebar();
		$(selector).addClass('active');
	},
	clearSidebar: function  () {
		$('.nav-sidebar').children().removeClass('active');
	}
};