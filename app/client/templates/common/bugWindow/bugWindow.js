var instance;

Template.bugWindow.onCreated(function () {
 	instance = this;
});

Template.bugWindow.viewmodel('bugWindow', {
	openModal: function() {
		instance.$('#bugModal').openModal();
	}
});