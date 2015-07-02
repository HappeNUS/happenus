Template.settingsMenu.onRendered(function(){
	$("#settings-dropdown-btn").dropdown({
		constrain_width: false,
		belowOrigin: true,
	});
	$('.modal-trigger').leanModal();
});