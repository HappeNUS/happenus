var inputDiv, input, fadeLayer, searchInputContainer, searchContainer, searchResults;

Template.search.onRendered(function(){
	searchInputContainer = this.$('#search-input-container');
	inputDiv = this.$('#search-input-container .search-input');
	input = this.$('#search-input-container .search-input input');
	fadeLayer = this.$('.search .fade-layer');
	searchContainer = this.$('.search .search-container');
	searchResults = this.$('.search .search-container ul.search-results');

	input.focus(function(){input.select()});
})

Template.search.viewmodel('search', {
	openSearch: function (event) {
		if (event) {
			event.stopPropagation();
		}
 		inputDiv.removeClass('hide');
		searchResults.removeClass('hide');
		fadeLayer.addClass('show');
		searchInputContainer.addClass('active');
		searchContainer.addClass('active');

		input.focus();
	},
	closeSearch: function (event) {
		if (event) {
			event.stopPropagation();
		}
		inputDiv.addClass('hide');
		searchResults.addClass('hide');
		fadeLayer.removeClass('show');
		searchInputContainer.removeClass('active');
		searchContainer.removeClass('active');
	}
});