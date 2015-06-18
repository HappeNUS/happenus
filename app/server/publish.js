Meteor.publish("allUserData", function () {
	return Meteor.users.find({}, {fields:{_id: 1, username:1}});
});	

Meteor.publish("specificUserData", function(userId) {
	return Meteor.users.find({_id: userId}, {fields:{_id: 1, username:1}});
});

Meteor.publish("subData", function () {
	return Subs.find({subberId: this.userId});
});

Meteor.publish("eventData", function(view, sort) {
	var selector = {$where: function(){
		var dates = this.eventDates;
		var now = new Date();
		for (var i = 0; i < dates.length; i++) {
			if (dates[i].from > now) {
				return true;
			}
		}
		return false;
	}};
	var options = {};
	if (view === "subscriptions") {
		var subscriptions = Subs.find({subberId: this.userId}).fetch();
		var subbedIds = subscriptions.map(function(curr, idx, arr) {
			return curr.subbedId;
		});
		selector.userId = {$in: subbedIds};
	}
	return Events.find(selector, EventSorter[sort]);
});

Meteor.publish("userEventData", function(userId) {
	return Events.find({userId: userId});
});

Meteor.publish("subEventData", function(){
	var subscriptions = Subs.find({subberId: this.userId}).fetch();
	var subbedIds = subscriptions.map(function(curr, idx, arr) {
		return curr.subbedId;
	});
	return Events.find({userId: {$in: subbedIds}});
});

Meteor.publish("specificEventData", function(eventId){
	return Events.find({_id: eventId});
});