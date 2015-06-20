EventFilter = {
	filterPast: {$where: function(){
		var dates = this.eventDates;
		var now = new Date();
		for (var i = 0; i < dates.length; i++) {
			if (dates[i].to > now) {
				return true;
			}
		}
		return false;
	}},
	filterUser: function(userId) {
		return {userId: userId};
	},
	filterSubs: function(subberId) {
		var subscriptions = Subs.find({subberId: subberId}).fetch();
		var subbedIds = subscriptions.map(function(curr, idx, arr) {
			return curr.subbedId;
		});
		return {userId: {$in: subbedIds}};
	}
};