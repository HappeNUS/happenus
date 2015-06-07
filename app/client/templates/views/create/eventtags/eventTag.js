Template.eventTag.events({
	'click #remove-tag': function(event, template) {
		var tags = Session.get("tags");
		var idx = tags.indexOf(this.valueOf());
		if (idx > -1) {
			tags.splice(idx, 1);
			Session.set("tags", tags);
		}
	}
});