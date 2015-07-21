var instance;

Template.aboutWindow.onCreated(function(){
	instance = this;
});

Template.aboutWindow.viewmodel('aboutWindow', {
	openModal: function () {
		instance.$('#aboutModal').openModal();
	}
})