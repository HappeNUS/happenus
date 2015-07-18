var cascade, minWidth, elements;

function getCurrentEvent() {
	return Events.findOne({_id: Router.current().params._id});
}

function isEventLiked (likes) {
	return likes.indexOf(Meteor.userId()) !== -1;
}

function setCascade () {
	cascade = new Cascade(elements[0], {
		autoResize: false,
		childrenSelector: '.card',
		minWidth: minWidth
	});
}

Template.event.onCreated(function(){
	var userId = getCurrentEvent().userId;
	this.subscribe("specificUserData", userId);
});

Template.event.onRendered(function(){
	this.$('.materialboxed').materialbox();
	this.$('.tooltipped').tooltip({delay: 10});

	elements = document.getElementsByClassName("container cascade");
	this.autorun(function(){
		if (rwindow.innerWidth() <= 600) {
			minWidth = rwindow.innerWidth() / 1.5;
		} else if (rwindow.innerWidth() <= 1280) {
			minWidth = rwindow.innerWidth() * 0.9 / 2.5
		} 
		else if (rwindow.innerWidth() > 2560) {
			minWidth = 1920 / 2.5;
		} else {
			minWidth = rwindow.innerWidth() * 0.75 / 3.2;
		}
		setCascade();
	});

	$(elements).imagesLoaded().done(function(){
		setCascade();
	});
});

Template.event.helpers({
	currentEvent: function(){
		return getCurrentEvent();
	},
	userData: function(){
		var curr = getCurrentEvent();
		return Meteor.users.findOne({_id: curr.userId});
	},
	likeCount: function(){
		return this.likeCount;
	},
	isEventLiked: function(){
		return isEventLiked(this.likes);
	},
	eventImage: function(){
		return $.cloudinary.url(this.img.normal);
	}
});

Template.event.events({
	'click .like-btn': function(event, template) {
		if (isEventLiked(this.likes)) {
			Meteor.call('unlikeEvent', this._id);
		} else {
			Meteor.call('likeEvent', this._id);
		}
	}
});