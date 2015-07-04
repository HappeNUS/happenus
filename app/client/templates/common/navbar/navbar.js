Template.navbar.onRendered(function () {
	$('.button-collapse').sideNav();

	$('#search').hide();

	$(document).mouseup(function(event){
		var target1 = $(".form-control");
		var target2 = $('#search');
		var target3 =  $('#searchbar');
    if(!(target1.is(event.target) || target2.is(event.target) || target3.is(event.target)) && target1.is(":visible")) {
       target2.slideUp(100);
    } else {
      return false;
    }
  });
});

Template.navbar.events({
	'click a': function (event, temp) {
		$('.button-collapse').sideNav('hide');
	},

	'click #toggle-search': function () {
		var search = $('#search');
		if (search.is(":visible")) {
			search.slideUp(100);
		} else {
			search.slideDown(100);
		}
	}
});