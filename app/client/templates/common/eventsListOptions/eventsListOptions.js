Template.eventsListOptions.onRendered(function(){
	$('.dropdown-button').dropdown({
		inDuration: 300,
		outDuration: 300,
		constrain_width: true,
		hover: false,
		gutter: 0,
		belowOrigin: true
	});

	if (this.data && this.data.pinned) {
		var options = $('div.eventsListOptions#pinnable');
		var navHeight = $('div.navbar-fixed nav').height();
		var threshold = options.offset().top - navHeight;
		$(window).scroll(function(){
			if ($(this).scrollTop() > threshold) {
				options.parent().css('position', 'fixed');
				options.parent().css('top', navHeight);
			} else {
				options.parent().css('position', 'absolute');
				options.parent().css('top', 'inherit');
			}
		});
	}
});

Template.eventsListOptions.helpers({
	sortedBy: function () {
		var eventListViewModel = ViewModel.byId('eventList');
		if (eventListViewModel) {
			return eventListViewModel.getCurrentSort();
		}
		return "";
	},
	display: function() {
		var eventListViewModel = ViewModel.byId('eventList');
		if (eventListViewModel) {
			return eventListViewModel.getCurrentDisplay();
		}
		return "";
	},
	pin: function() {
		return this.pinned ? 'pinnable' : 'non-pinnable';
	}
});

function setSort(sort) {
	ViewModel.byId('eventList').changeSort(sort);
}

function setDisplay(display) {
	ViewModel.byId('eventList').changeDisplay(display);
}

Template.eventsListOptions.events({
	'click #sort-popu': function(event, temp) {setSort('popularity')},
	'click #sort-late': function(event, temp) {setSort('latest')},
	'click #sort-soon': function(event, temp) {setSort('soonest')},

	'click #disp-list': function(event, temp) {setDisplay('list')},
	'click #disp-card': function(event, temp) {setDisplay('cards')},
});