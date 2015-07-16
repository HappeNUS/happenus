PAGES = [
	'home',
	'profile'
];

ITEMS_INCREMENT = 20;
SPINNER_OFFSET = 20;

var instance; // this template
var currentView = {type: null}, currentSort = new ReactiveVar(null), currentLimit = new ReactiveVar(null); 
var eventSub; // the subscription to eventData
var isLoading = new ReactiveVar(false);
var cascade;

function isValidPageRequest (pageType) {
	return PAGES.indexOf(pageType) !== -1;
}

function hasItemsRemaining () {
	return Events.find().count() >= currentLimit.get();
}

function showMoreEvents() {
	var threshold, target = $("#load-spinner");
	if (!target.length) return;
	threshold = $(window).scrollTop() + $(window).height() - (target.height() + SPINNER_OFFSET);

	if (target.offset().top < threshold && hasItemsRemaining()) {
		currentLimit.set(currentLimit.get() + ITEMS_INCREMENT);
		subscribeToEventData();
	}
}

function changeView (view) {
	if (currentView.type !== view.type) {
		currentView = view;
		resetEventDataSubscription();
	}
}

function changeSort (sort) {
	if (currentSort.get() !== sort) {
		currentSort.set(sort);
		resetEventDataSubscription();
	}
}

function changeBoth (view, sort) {
	if (currentView.type !== view.type || currentSort.get() !== sort) {
		currentView = view;
		currentSort.set(sort);
		resetEventDataSubscription();
	}
}

function getCurrentSort () {
	return currentSort.get();
}

function setCascade() {
	var elements = document.getElementsByClassName("events cascade");
	if (elements.length > 0) {
		cascade = new Cascade(elements[0], {
			autoResize: false,
			childrenSelector: '.eventCard'
		});
	}
}

function resetEventDataSubscription () {
	currentLimit.set(ITEMS_INCREMENT);
	subscribeToEventData();
}

function subscribeToEventData () {
	var prevSubscription = eventSub;
	isLoading.set(true);
	eventSub = instance.subscribe("eventData", currentView, currentSort.get(), currentLimit.get(), function(){
		setCascade();
		isLoading.set(false)
		if (prevSubscription) {
			prevSubscription.stop();
		}
	});
}

Template.eventList.viewmodel('eventList', {
	changeView: changeView,
	changeSort: changeSort,
	changeBoth: changeBoth,
	getCurrentSort: getCurrentSort
});

Template.eventList.onCreated(function(){
	instance = this;
	instance.subscribe("subData");

	var pageType = instance.data.page;
	if (!isValidPageRequest(pageType)) {
		console.log("Invalid page request!");
		return;
	}

	currentLimit.set(ITEMS_INCREMENT);
	if (pageType === 'home') {
		currentView.type = "featured";
		currentSort.set("popularity");
	} else if (pageType === 'profile') {
		currentView.type = "profile";
		currentView.userId = Router.current().params._id;
		currentSort.set("latest");
	}
	subscribeToEventData();
});

Template.eventList.onRendered(function(){
	var instance = this;
	$(window).scroll(showMoreEvents);
	
	if (rwindow.innerWidth() > 992) {
		Session.set("display", "cards");
	} else {
		Session.set("display", "list");
	}

	this.autorun(function(){
		Events.find().count();
		if (Session.get("display") === "cards") {
			window.setTimeout(setCascade, 20);
		} else if (Session.get("display") === "list") {
			instance.$('.events').css('height', '');
		}
	});

	this.autorun(function(){
		// Reactive to window width changes
		rwindow.innerWidth();
		// Reactive to event count changes
		Events.find().count();
		if (cascade) {
			setCascade();
		}
	});
});

Template.eventList.helpers({
	events: function() {
		// All events to be shown on the page
		return Events.find({}, EventSorter[currentSort.get()]);
	},
	isDisplayList: function() {
		return Session.get("display") === "list";
	},
	isDisplayCards: function() {
		return Session.get("display") === "cards";
	},
	showLoading: function() {
		return hasItemsRemaining () || isLoading.get();
	}
});