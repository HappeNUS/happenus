var dates = new ReactiveArray();
var tags = new ReactiveArray();

Template.create.onRendered(function(){
	dates.clear();
	tags.clear();

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

var EventDateRange = function (from, to) {
	this.from = from;
	this.to = to;
}

function compareEventDates (a, b) {
	return a.from - b.from;
}

function getDates () {
	return dates.array();
}

function getTags () {
	return tags.array();
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
		from = $('#fromDateTimePicker').data("DateTimePicker").date()._d;
		to = $('#toDateTimePicker').data("DateTimePicker").date()._d;
		if (from && to) {
			var dateRange = new EventDateRange (from, to);
			dates.push(dateRange);
			$('#fromDateTimePicker').data("DateTimePicker").clear();
			$('#toDateTimePicker').data("DateTimePicker").clear();
		}
	},
	'click .rem-date-btn': function (event, instance) {
		var i = 0;
		for (i = 0; i < dates.length; i++) {
			if (+dates[i].from === +this.from && +dates[i].to === +this.to) {
				break;
			}
		}
		if (i < dates.length) {
			dates.splice(i, 1);
		}
	},
	'click .add-tag-btn': function(event, instance) {
		var inputVal = $('#inputTag').val();
		if (inputVal && inputVal !== '' && tags.indexOf(inputVal) === -1 ) {
			tags.push(inputVal);
			$('#inputTag').val(null);
		}
	},
	'keydown #inputTag': function(event, instance) {
		return event.which !== 32;
	},
	'click #remove-tag': function(event, template) {
		var idx = tags.indexOf(this.valueOf());
		if (idx > -1) {
			tags.splice(idx, 1);
		}
	}
});