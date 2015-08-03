Template.deleteAccountSettings.events({
	'click button#del-account-btn': function(event, template){
		var modalOptions = {
			title: 'Delete account',
			message: "All information created by this account will be removed.",
			label: 'Are you sure you want to this account?',
			closeLabel: 'No',
			submitLabel: 'Yes',
			callback: function(yesNo, data, event) {
				if (yesNo) {
					Meteor.call('deleteAccount', function(){
						Router.go('home');
					});
				}
			}
		};
		MaterializeModal.alert(modalOptions);
	}
});