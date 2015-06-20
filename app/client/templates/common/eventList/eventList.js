PAGES = [
	'home',
	'profile'
];

ITEMS_INCREMENT = 9;
SPINNER_OFFSET = 20;

var eventSub;
var isLoading = new ReactiveVar(false);
var cascade;

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

function setCascade() {
	var elements = document.getElementsByClassName("events cascade");
	if (elements.length > 0) {
		cascade = new Cascade(elements[0], {
			autoResize: false,
			childrenSelector: '.eventCard'
		});
	}
}

Template.eventList.onCreated(function(){
	var instance = this;
	instance.subscribe("subData");

	var pageType = instance.data.page;
	if (!isValidPageRequest(pageType)) {
		console.log("Invalid page request!");
		return;
	}

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
		eventSub = instance.subscribe("eventData", view, sort, limit, function(){
			setCascade();
			isLoading.set(false)
		});
	});
});

Template.eventList.onRendered(function(){
	var instance = this;
	$(window).scroll(showMoreVisible);
	
	if (rwindow.innerWidth() > 992) {
		Session.set("display", "cards");
	} else {
		Session.set("display", "list");
	}

	this.autorun(function(){
		if (Session.get("display") === "cards") {
			window.setTimeout(setCascade, 20);
		} else if (Session.get("display") === "list") {
			instance.$('.events').css('height', '');
		}
	});

	this.autorun(function(){
		// Reactive to window width changes
		rwindow.innerWidth();
		if (cascade) {
			cascade.reflow();
		}
	})
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