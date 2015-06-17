var banner = new ReactiveVar();
var dates = new ReactiveArray();
var tags = new ReactiveArray();

Template.create.onRendered(function(){
	dates.clear();
	tags.clear();

	this.$('#desc_input').editable({
		inlineMode: false,
		imageUpload: false
	});

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

function showToast (message) {
	Materialize.toast(message, 5000);
}

function showToasts (nameVal, descVal, imgVal, dateLength) {
	if (!nameVal) {
		showToast('Please give your event a name');
	}
	if (!descVal) {
		showToast('Please provide a short description for your event');
	}
	if (!imgVal) {
		showToast('Please give your event a banner image');
	}
	if (!dateLength) {
		showToast('Please add at least one date to your event');
	}
}

Template.create.helpers({
	dates: function() {
		return getDates();
	},
	tags: function() {
		return getTags();
	},
	img: function() {
		return banner.get();
	}
});

Template.create.events({
	"submit form": function(event, instance) {
		event.preventDefault();
		var nameVal = event.target.name_input.value.trim();
		var descVal = instance.$('#desc_input').editable('getHTML');
		var imgVal = event.target.img_input.value.trim();

		if (nameVal && descVal && imgVal && getDates().length) {
			Meteor.call('createEvent', nameVal, descVal, imgVal, getDates(), getTags());
			Router.go('home');
		} else {
			showToasts(nameVal, descVal, imgVal, getDates().length);
		}
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

			var currentDate = new Date();
			if (fromDate < currentDate || toDate < currentDate) {
				showToast('Please enter a valid date & time');
			} else {
				if (fromDate > toDate) {
					// rotate dates if in wrong order
					var tempDate = fromDate;
					fromDate = toDate;
					toDate = tempDate;
				}
				dateRange = new EventDateRange(fromDate, toDate);
				dates.push(dateRange);

				fromDP.clear();
				toDP.clear();
			}
			
		} else {
			var message = 'Please fill the following fields: ';
			var emptyFields = [];
			if (!fromDateSelect) {
				emptyFields.push('From Date');
			}
			if (!fromTimeValue) {
				emptyFields.push('From Time');
			}
			if (!toDateSelect) {
				emptyFields.push('To Date');
			}
			if (!toTimeValue) {
				emptyFields.push('To Time');
			}
			for (var i = 0; i < emptyFields.length; i++) {
				message = message.concat(emptyFields[i]);
				if (i !== emptyFields.length - 1) {
					message = message.concat(', ');
				}
			}
			showToast(message);
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
	'keydown #tag_input': function(event, instance) {
		if (event.which === 13) {
			event.preventDefault();
			var inputVal = $('#tag_input').val();	// Grab tag from input
			inputVal = inputVal.replace(/\s/g, '');	// Remove spaces if found
			inputVal = inputVal.toLowerCase();		// To lower case
			if (inputVal && tags.indexOf(inputVal) === -1) {	//if the tag filled and not in array
				tags.push(inputVal);		// Push to end of tag array
				$('#tag_input').val(null);	// Clear input field
			}
		}
		return event.which !== 32;
	},
	'click .tag a.btn': function(event, template) {
		var idx = tags.indexOf(this.valueOf());
		if (idx > -1) {
			tags.splice(idx, 1);
		}
	},
	'keyup #img_input': function(event, template) {
		banner.set($(img_input).val());
	}
});