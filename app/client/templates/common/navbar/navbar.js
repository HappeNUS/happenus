Template.navbar.onRendered(function () {
	$('.button-collapse').sideNav();

	$('#search').hide();

	$(document).mouseup(function(event){
		var target = $('#search');
		var child1 = $('.searchBar');
		var child2 = $('.searchBar input');
    if(!(target.is(event.target) || child1.is(event.target) || child2.is(event.target)) && target.is(":visible")) {
       target.slideUp(100);
    } else {
      return false;
    }
  });
});

Template.navbar.events({
	'click a': function (event, temp) {
		$('.button-collapse').sideNav('hide');
	},

	'click #toggle-search': function (event, template) {
		var search = template.$('#search');
		if (search.is(":visible")) {
			search.slideUp(100);
		} else {
			search.slideDown(100);
		}
	}
});