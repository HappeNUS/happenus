Template.navMenu.onRendered(function(){
	$(".menu-dropdown-btn #dropdown-btn").dropdown({
		constrain_width: false,
		belowOrigin: true,
	});
	$('.modal-trigger').leanModal();
});