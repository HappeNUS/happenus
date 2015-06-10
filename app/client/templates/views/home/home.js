/*
Template.home.onCreated(function () {
	var eventSub, instance = this;
	this.autorun(function () {	
		if (eventSub) {
			eventSub.stop();
		}
		var params = Router.current().getParams();
		var view = params.query.view;
		var sort = params.query.sort_by;
		console.log("refreshed " + view + " " + sort);
		eventSub = instance.subscribe("eventData", view, sort);
	});
});*/