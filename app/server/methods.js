Meteor.methods({
	'sub': function(otherUser) {
		if (this.userId !== otherUser) {
			var subscription = Subs.findOne({
				subberId: this.userId,
				subbedId: otherUser
			});
			if (!subscription) {
				Subs.insert({
					subberId: this.userId,
					subbedId: otherUser,
					date: new Date()
				});
			}
		}
	},
	'unsub': function(subbedUser) {
		Subs.remove({
			subberId: this.userId,
			subbedId: subbedUser
		});
	},
	'createEvent': function(name, desc, img, eventDates){
		Events.insert({
			_id: new Meteor.Collection.ObjectID()._str,
			userId: Meteor.userId(),
			name: name,
			desc: desc,
			img: img,
			eventDates: eventDates,
			dateCreated: new Date(),
			likeCount: 0,
			likes: []
		});
	},
	'likeEvent': function (eventId) {
		var userId = this.userId;
		if (userId) {
			Events.update({_id: eventId}, {$addToSet: {likes: userId}, $inc: {likeCount: 1}});
		}
	},
	'unlikeEvent': function(eventId) {
		var userId = this.userId;
		if (userId) {
			Events.update({_id: eventId}, {$pullAll: {likes: [userId]}, $inc: {likeCount: -1}});
		}
	}
});