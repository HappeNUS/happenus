PAGES = [
	'home',
	'profile'
];

ITEMS_INCREMENT = 9;
SPINNER_OFFSET = 20;

var eventSub;
var isLoading = new ReactiveVar(false);

function isValidPageRequest (pageType) {
	return PAGES.indexOf(pageType) !== -1;
}

function hasItemsRemaining () {
	return Events.find().count() >= Session.get('limit');
}

function showMoreVisible() {
	var threshold, target = $("#load-spinner");
	if (!target.length) return;
	threshold = $(window).scrollTop() + $(window).height() - (target.height() + SPINNER_OFFSET);

	if (target.offset().top < threshold && hasItemsRemaining()) {
		Session.set("limit",
		Session.get("limit") + ITEMS_INCREMENT);
	}
}

Template.eventList.onCreated(function(){
	var instance = this;
	var pageType = instance.data.page;
	if (!isValidPageRequest(pageType)) {
		console.log("Invalid page request!");
		return;
	}

	instance.autorun(function(){
		if (rwindow.innerWidth() > 992) {
			Session.set("display", "cards");
		} else {
			Session.set("display", "list");
		}
	});

	Session.set("limit", ITEMS_INCREMENT);
	if (pageType === 'home') {
		Session.set("view", "featured");
		Session.set("sort", "popularity");
	} else if (pageType === 'profile') {
		Session.set("view", "profile");
		Session.set("sort", "latest");
	}

	var view = {type: Session.get('view')};
	var sort = Session.get('sort');

	if (pageType === 'profile') {
		view.userId = Router.current().params._id;
	}

	instance.autorun(function(){
		if (eventSub && (view.type !== Session.get('view') || sort !== Session.get('sort'))) {
			eventSub.stop();
			view.type = Session.get('view');
			sort = Session.get('sort');
		}
		var limit = Session.get('limit');
		isLoading.set(true);
		eventSub = instance.subscribe("eventData", view, sort, limit, function(){isLoading.set(false)});
	});
});

Template.eventList.onRendered(function(){
	$(window).scroll(showMoreVisible);
});

Template.eventList.helpers({
	events: function() {
		// All events to be shown on the page
		var sort = Session.get("sort");
		return Events.find({}, EventSorter[sort]);
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