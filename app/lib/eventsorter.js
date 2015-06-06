EventSorter = {
	filterPast: {$where: function(){
		var dates = this.eventDates;
		var now = new Date();
		for (var i = 0; i < dates.length; i++) {
			if (dates[i].from > now) {
				return true;
			}
		}
		return false;
	}},
	'latest': {sort:{dateCreated:-1}},
	'soonest': {sort:{'eventDates.from': 1}},
	'popularity': {sort:{likeCount: -1}}
};