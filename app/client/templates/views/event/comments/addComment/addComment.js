Template.addComment.onRendered(function() {
	var main = this.$('form#form-main');
	var reply = this.$('form#form-' + this.data.reply_id);
	var reply_id = this.data.reply_id;
	var eventId = this.data.eventId;
	var target;

	if (main.length) {
		target = main;
	} else if (reply.length) {
		target = reply;
	}
	target.submit(function(event){
		event.preventDefault();
		var target = $(event.target).find('input#comment-input');
		var text = target.val().trim();
		if (text) {
			Meteor.call('createComment', eventId, Meteor.userId(), text, reply_id);
		}
		target.val(null);
	});
});