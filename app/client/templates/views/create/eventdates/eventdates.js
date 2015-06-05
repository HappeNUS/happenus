Template.eventdates.events({
	'click .rem-date-btn': function (event, instance) {
		var dates = Session.get("dates");
		var i = 0;
		for (i = 0; i < dates.length; i++) {
			if (+dates[i].from === +this.from && +dates[i].to === +this.to) {
				break;
			}
		}
		dates.splice(i, 1);
		Session.set("dates", dates);
	}
});