function extendObject (target, object) {
	for (var attrname in object) { target[attrname] = object[attrname]; }
}

Meteor.publish("allUserData", function () {
	return Meteor.users.find({}, {fields:{_id: 1, username: 1, display_name: 1, profile: 1}});
});

Meteor.publish("specificUserData", function(userId) {
	return Meteor.users.find({_id: userId}, {fields:{_id: 1, username:1, display_name: 1, profile: 1}});
});

Meteor.publish("ownUserData", function() {
	return Meteor.users.find({_id: this.userId});
});

Meteor.publish("subData", function () {
	return Subs.find({subberId: this.userId});
});

Meteor.publish("eventData", function(view, sort, limit) {
	var selector = {};
	if (view.type !== 'profile') {
		extendObject(selector, EventFilter.filterPast);
	} else {
		extendObject(selector, EventFilter.filterUser(view.userId));
	}

	if (view.type === "subscriptions") {
		extendObject(selector, EventFilter.filterSubs(this.userId));
	}

	var options = {};
	if (EventSorter[sort]) {
		extendObject(options, EventSorter[sort]);
	}
	options.limit = limit;
	return Events.find(selector, options);
});

Meteor.publish("specificEventData", function(eventId){
	return Events.find({_id: eventId});
});

Meteor.publish("eventCommentData", function(eventId){
	return Comments.find({eventId: eventId}, {sort: {date: -1}});
})