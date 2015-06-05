Template.date.onRendered(function(){
	var alert = this.$('.list-group-item');
	var now = new Date ();

	if (this.data.to < now) {
		alert.addClass("list-group-item-warning");
	} else if (this.data.from < now && now < this.data.to) {
		alert.addClass("list-group-item-success");
	} else {
		alert.addClass("list-group-item-info");
	}
});