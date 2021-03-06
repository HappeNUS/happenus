AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([{
	_id: "username",
	type: "text",
	displayName: "username",
	required: true,
	minLength: 5
}, pwd]);

if (Meteor.isClient) {
	Meteor.users.deny({
		update: function() {
			return true;
		}
	});
}