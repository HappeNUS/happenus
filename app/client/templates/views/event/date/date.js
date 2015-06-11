Template.date.onRendered(function(){
	var target = this.$('.collection-item');
	var now = new Date ();

	if (this.data.to < now) {
		target.addClass("yellow");
	} else if (this.data.from < now && now < this.data.to) {
		target.addClass("lime-green");
	} else {
		target.addClass("cyan");
	}
});