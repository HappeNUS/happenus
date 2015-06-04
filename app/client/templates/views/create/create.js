Template.create.onCreated(function(){
	var createItem = $('#create');
	SidebarController.selectSidebar(createItem);
});

Template.create.events({
	"submit form": function(event, instance) {
		var nameVal = event.target.inputName.value.trim();
		var descVal = event.target.inputDesc.value.trim();
		var imgVal = event.target.inputImg.value.trim();

		Meteor.call('createEvent', nameVal, descVal, imgVal);
	}
});