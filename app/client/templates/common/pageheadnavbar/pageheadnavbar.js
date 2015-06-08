Template.pageheadnavbar.helpers({
	sorted_by: function () {
		return Router.current().getParams().query.sort_by;
	}
});