Template.tag.events({
	'click .tag a#tag-btn': function (event, template) {
		ViewModel.byId('search').openSearch(event, template.data);
	}
});