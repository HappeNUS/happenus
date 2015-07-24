var isDropdownAnimating;

function isDropdownShowing (dropdown) {
	return dropdown.css('display') === 'block' && dropdown.css('opacity') === '1';
}

function showDropdown (dropdown) {
	if (!isDropdownAnimating) {
		dropdown.css('display', 'block');
		dropdown.addClass('active');
		dropdown.stop(true, false).animate({'opacity': '1'}, {
			duration: 225,
			start: function(){
				isDropdownAnimating = true;
				var ddbtn = dropdown.siblings('a.dd-btn');
				ddbtn.children('i').html('expand_less');
			},
			complete: function(){isDropdownAnimating = false}
		});
	}
}

function hideDropdown (dropdown) {
	if (!isDropdownAnimating) {
		dropdown.stop(true, false).animate({'opacity': '0'}, {
			duration: 225,
			start: function() {
				isDropdownAnimating = true;
				var ddbtn = dropdown.siblings('a.dd-btn');
				ddbtn.children('i').html('more_vert');
			},
			complete: function() {
				dropdown.css('display', 'none');
				dropdown.removeClass('active');
				isDropdownAnimating = false;
			}
		});
	}
}

Template.navMenu.onRendered(function(){
	isDropdownAnimating = false;
	$('*').click(function(event){
		var dropdown = $('#dropdown-list.active');
		hideDropdown(dropdown);
	});
});

Template.navMenu.events({
	'click a#openBugModal': function(event, temp) {
		ViewModel.byId('bugWindow').openModal();
	},
	'click a#openAboutModal': function(event, temp) {
		ViewModel.byId('aboutWindow').openModal();
	},
	'click .dd-btn': function (event, template) {
		var dropdown = template.$('#dropdown-list');
		if (isDropdownShowing(dropdown)) {
			hideDropdown(dropdown);
		} else {
			showDropdown(dropdown);
		}
	}
});