var dates = new ReactiveArray();
var tags = new ReactiveArray();

Template.create.onRendered(function(){
	dates.clear();
	tags.clear();

	var fromInput = $('#from_date_input').pickadate();
	var fromPicker = fromInput.pickadate('picker');

	var toInput = $('#to_date_input').pickadate();
	var toPicker = toInput.pickadate('picker');

	fromPicker.set('min', new Date());
	toPicker.set('min', new Date());

	$('.timepicker').lolliclock({autoclose: true});
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
	"click .add-date": function(event, instance) {
		var fromDP = $('#from_date_input').pickadate().pickadate('picker');
		var toDP = $('#to_date_input').pickadate().pickadate('picker');
		var fromDateSelect = fromDP.get('select'), toDateSelect = toDP.get('select');
		var fromTimeValue = document.getElementById('from_time_input-export').value
		var toTimeValue = document.getElementById('to_time_input-export').value

		if (fromDateSelect && toDateSelect && fromTimeValue && toTimeValue) {
			// all inputs are valid
			var fromDate = fromDateSelect.obj, toDate = toDateSelect.obj;
			var fromTime = new Date(fromTimeValue), toTime = new Date(toTimeValue);
			// Set time in date object
			fromDate.setHours(fromTime.getHours());
			fromDate.setMinutes(fromTime.getMinutes());
			toDate.setHours(toTime.getHours());
			toDate.setMinutes(toTime.getMinutes());
			// rotate dates if in wrong order
			if (fromDate > toDate) {
				var tempDate = fromDate;
				fromDate = toDate;
				toDate = tempDate;
			}
			dateRange = new EventDateRange(fromDate, toDate);
			dates.push(dateRange);

			fromDP.clear();
			toDP.clear();
		} else {
			// there are invalid inputs
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