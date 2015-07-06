Template.passwordChangeSettings.events({
	'click .complete-btn button#change-pw': function (event, template) {
		var currentPw, newPw, reNewPw;

		currentPw = template.$('#current-pw').val();
		newPw = template.$('#new-pw').val();
		reNewPw = template.$('#new-retype-pw').val();

		if (newPw !== reNewPw) {
			Materialize.toast("The new passwords don't match!", 5000);
		} else {
			Accounts.changePassword(currentPw, newPw, function(err) {
				if (err) {
					Materialize.toast("Unable to change password: " + err.reason, 5000);
				} else {
					Materialize.toast("Password changed successfully!", 5000);
					template.$('#current-pw').val('');
					template.$('#new-pw').val('');
					template.$('#new-retype-pw').val('');
				}
			});
		}
	}
});