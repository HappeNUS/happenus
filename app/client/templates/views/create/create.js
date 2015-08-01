var banner = new ReactiveVar();
var dates = new ReactiveArray();
var tags = new ReactiveArray();
var showProgress = new ReactiveVar(false);
var percentProgress = new ReactiveVar(0);
var eventToEdit;

var RESIZE_THUMBNAIL = {
	width: 75,
	height: 75,
	cropSquare: true
};

var RESIZE_CARD = {
	width: 300,
	height: 300,
	cropSquare: true
};

var quillEditor;

function setDefaultVars() {
	banner.set('');
	dates.clear();
	tags.clear();
	eventToEdit = null;
	showProgress.set(false);
	percentProgress.set(0);
}

function setEditVars (eventId, template) {
	eventToEdit = Events.findOne({_id: eventId});

	template.$('#name_input').val(eventToEdit.name);
	template.$('#name_input').focus();

	quillEditor.setHTML(eventToEdit.desc);
	banner.set($.cloudinary.url(eventToEdit.img.normal));

	for (var i = 0; i < eventToEdit.eventDates.length; i++) {dates.push(eventToEdit.eventDates[i]);}
	for (var i = 0; i < eventToEdit.tags.length; i++) {tags.push(eventToEdit.tags[i]);}
}

function setFieldOptions () {
	quillEditor = new Quill('#editor', {
		modules: {
			toolbar: {container: '#toolbar'},
			'link-tooltip': true,
			'image-tooltip': true
		},
		styles: false,
		theme: 'snow'
	});

	var fromInput = $('#from_date_input').pickadate();
	var fromPicker = fromInput.pickadate('picker');

	var toInput = $('#to_date_input').pickadate();
	var toPicker = toInput.pickadate('picker');

	fromPicker.set('min', new Date());
	toPicker.set('min', new Date());

	$('.timepicker').lolliclock({autoclose: true});
}

Template.create.onRendered(function(){
	setFieldOptions();
	setDefaultVars();
	var id = Router.current().params._id;
	if (id) {
		setEditVars(id, this);
	}
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

function createEvent (details, template) {
	var img_details = {thumbnail: '', card: '', normal: ''};
	var files = template.find('#img_input').files;
	var proceedIfComplete = function () {
		if (img_details.thumbnail && img_details.card && img_details.normal) {
			Meteor.call('createEvent', details, img_details);
			showToast('Event successfully created');
			Router.go('home');
		}
	}
	showProgress.set(true);

	Resizer.resize(files[0], RESIZE_THUMBNAIL, function (err, file) {
		if (!err) {
			C.upload_stream([file], function(res) {
				img_details.thumbnail = res.public_id;
				percentProgress.set(percentProgress.get() + 15);
				proceedIfComplete();
			});
		} else {
			console.log(err);
		}
	});
	Resizer.resize(files[0], RESIZE_CARD, function (err, file) {
		if (!err) {
			C.upload_stream([file], function(res) {
				img_details.card = res.public_id;
				percentProgress.set(percentProgress.get() + 30);
				proceedIfComplete();
			});
		} else {
			console.log(err);
		}
	});
	C.upload_stream(files, function(res) {
		img_details.normal = res.public_id;
		percentProgress.set(percentProgress.get() + 55);
		proceedIfComplete();
	});
}

function editEvent (details, template) {
	var files = template.find('#img_input').files;
	var proceed = function() {
		Meteor.call('editEvent', eventToEdit._id, details);
		showToast('Event successfully edited');
		Router.go('home');
	}
	var img_details = {thumbnail: '', card: '', normal: ''};
	var proceedIfComplete = function() {
		if (img_details.thumbnail && img_details.card && img_details.normal) {
			details.img = img_details;
			proceed(details);
		}
	}
	if (files.length) {
		Meteor.call('deleteEventImages', eventToEdit.img);
		showProgress.set(true);

		Resizer.resize(files[0], RESIZE_THUMBNAIL, function (err, file) {
			if (!err) {
				C.upload_stream([file], function(res) {
					img_details.thumbnail = res.public_id;
					percentProgress.set(percentProgress.get() + 15);
					proceedIfComplete();
				});
			} else {
				console.log(err);
			}
		});
		Resizer.resize(files[0], RESIZE_CARD, function (err, file) {
			if (!err) {
				C.upload_stream([file], function(res) {
					img_details.card = res.public_id;
					percentProgress.set(percentProgress.get() + 30);
					proceedIfComplete();
				});
			} else {
				console.log(err);
			}
		});
		C.upload_stream(files, function(res) {
			img_details.normal = res.public_id;
			percentProgress.set(percentProgress.get() + 55);
			proceedIfComplete();
		});
	} else {
		proceed();
	}
}

function showToasts (nameVal, descVal, imgVal, dateLength) {
	if (!nameVal) {
		showToast('Please enter the event name');
	}
	if (!descVal) {
		showToast('Please enter the event description');
	}
	if (!imgVal) {
		showToast('Please upload an event banner');
	}
	if (!dateLength) {
		showToast('Please include the event date(s)');
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
	},
	showProgress: function() {
		return showProgress.get();
	},
	percentProgress: function() {
		return percentProgress.get();
	}
});

Template.create.events({
	"submit form": function(event, instance) {
		event.preventDefault();
		var nameVal = event.target.name_input.value.trim();
		var descVal = quillEditor.getText().trim();
		var imgVal = banner.get();

		if (descVal.length > 200) {
			var shortDescVal = quillEditor.getText(0, 200).trim() + "...";
		} else {
			var shortDescVal = descVal;
		}

		if (nameVal && descVal && imgVal && getDates().length) {
			descVal = quillEditor.getHTML().trim();
			details = {
				name: nameVal,
				desc: descVal,
				shortDesc: shortDescVal,
				eventDates: getDates(),
				tags: getTags()
			};
			if (eventToEdit) {
				editEvent(details, instance);
			} else {
				createEvent(details, instance);				
			}
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
			showToast('Missing portion(s) of the event date');
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
	},
	'click #editor': function(event, template) {
		template.$('#editor .ql-editor').focus();
	},
	'change #img_input': function(event, template) {
		var files = event.target.files;
		if (files.length === 1) {
			var file = files[0];
			var reader = new FileReader();

			reader.onload = function(e){
				banner.set(e.target.result);
			};

			reader.readAsDataURL(file);
		} else {
			banner.set('');
		}
	}
});