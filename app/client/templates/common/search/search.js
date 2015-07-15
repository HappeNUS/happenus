var inputDiv, input, icon, fadeLayer, searchBtn, searchContainer, searchResults;

Template.search.onRendered(function(){
	searchBtn = this.$('#search-btn');
	inputDiv = this.$('#search-btn .search-input');
	input = this.$('#search-btn .search-input input');
	icon = this.$('#search-btn i.search-icon');
	fadeLayer = this.$('.search .fade-layer');
	searchContainer = this.$('.search .search-container');
	searchResults = this.$('.search .search-container ul.search-results');

	inputDiv.addClass('hide');
	input.focus(function(){input.select()});
	$(window).click(function(event){
		console.log('click');
		if(searchBtn.hasClass('active')) {
			closeSearch(event);
		}
	})
})

Template.search.viewmodel({
	openSearch: function () {
		inputDiv.removeClass('hide');
		searchResults.removeClass('hide');
		icon.addClass('hide');
		fadeLayer.addClass('show');
		searchBtn.addClass('active');
		searchContainer.addClass('active');

		input.focus();
	},
	closeSearch: function () {
		inputDiv.addClass('hide');
		searchResults.addClass('hide');
		icon.removeClass('hide');
		fadeLayer.removeClass('show');
		searchBtn.removeClass('active');
		searchContainer.removeClass('active');
	}
});