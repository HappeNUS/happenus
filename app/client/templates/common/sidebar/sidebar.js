Template.sidebar.events({
	"click li": function(event, template) {
		$(event.target).parent().siblings().removeClass("active");
		$(event.target).parent().addClass("active");
	}
});