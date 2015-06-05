Template.date.onRendered(function(){
	var alert = this.$('.alert');
	var now = new Date ();

	if (this.data.to < now) {
		alert.addClass("alert-warning");
	} else if (this.data.from < now && now < this.data.to) {
		alert.addClass("alert-success");
	} else {
		alert.addClass("alert-info");
	}
});