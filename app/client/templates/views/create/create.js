Template.create.onRendered(function(){
	$('#fromDateTimePicker').datetimepicker({
		format: 'DD/MM/YYYY h:mm A',
		sideBySide: true
	});
	$('#toDateTimePicker').datetimepicker({
		format: 'DD/MM/YYYY h:mm A',
		sideBySide: true
	});
	$('#fromDateTimePicker').data("DateTimePicker").minDate(new Date());
	$('#toDateTimePicker').data("DateTimePicker").minDate(new Date());
	$('#fromDateTimePicker').on("dp.change", function (e) {
		if (e.date) {
		    $('#toDateTimePicker').data("DateTimePicker").minDate(e.date);
		} else {
			$('#toDateTimePicker').data("DateTimePicker").minDate(new Date());
		}
	});
	$('#toDateTimePicker').on("dp.change", function (e) {
		if (e.date) {
	    	$('#fromDateTimePicker').data("DateTimePicker").maxDate(e.date);
    	} else {
    		$('#fromDateTimePicker').data("DateTimePicker").maxDate(false);
    	}
	});
});

Template.create.onCreated(function(){
	SidebarController.selectSidebar('#create');

	Session.set("dates", []);
	Session.set("tags", []);
});

var EventDateRange = function (from, to) {
	this.from = from;
	this.to = to;
}

function compareEventDates (a, b) {
	return a.from - b.from;
}

function getDates () {
	return Session.get("dates");
}

function setDates (dates) {
	dates.sort(compareEventDates);
	return Session.set("dates", dates);
}

function getTags () {
	return Session.get("tags");
}

function setTags (tags) {
	return Session.set("tags", tags);
}

Template.create.helpers({
	dates: function() {
		return getDates();
	},
	tags: function() {
		return getTags();
	}
});

Template.create.events({
	"submit form": function(event, instance) {
		var nameVal = event.target.inputName.value.trim();
		var descVal = event.target.inputDesc.value.trim();
		var imgVal = event.target.inputImg.value.trim();

		Meteor.call('createEvent', nameVal, descVal, imgVal, getDates(), getTags());
	},
	"click .add-date-btn": function(event, instance) {
		dates = getDates();
		from = $('#fromDateTimePicker').data("DateTimePicker").date()._d;
		to = $('#toDateTimePicker').data("DateTimePicker").date()._d;
		if (from && to) {
			var dateRange = new EventDateRange (from, to);
			dates.push(dateRange);
			setDates(dates);

			$('#fromDateTimePicker').data("DateTimePicker").clear();
			$('#toDateTimePicker').data("DateTimePicker").clear();
		}
	},
	'click .add-tag-btn': function(event, instance) {
		var inputVal = $('#inputTag').val();
		var tags = getTags();
		if (inputVal && inputVal !== '' && tags.indexOf(inputVal) === -1 ) {
			tags.push(inputVal);
			setTags(tags);
			$('#inputTag').val(null);
		}
	},
	'keydown #inputTag': function(event, instance) {
		return event.which !== 32;
	}
});