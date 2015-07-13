Template.help.onRendered(function () {
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();
	    var target = this.hash;
	    var $target = $(target);
	    try {
	    	$('html, body').stop().animate({
	    		'scrollTop': $target.offset().top
	    	}, 200, 'swing');
	    } catch(err) {
	    	//Do nothing here
	    }
	});
});

Template.help.events({
	'click .side-nav a.1': function(event, template) {
		$('a').removeClass('active');
		$('a.1').addClass('active');
	},
	'click .side-nav a.2': function(event, template) {
		$('a').removeClass('active');
		$('a.2').addClass('active');
	},
	'click .side-nav a.3': function(event, template) {
		$('a').removeClass('active');
		$('a.3').addClass('active');
	},
	'click .side-nav a.4': function(event, template) {
		$('a').removeClass('active');
		$('a.4').addClass('active');
	},
	'click .side-nav a.5': function(event, template) {
		$('a').removeClass('active');
		$('a.5').addClass('active');
	},
	'click .side-nav a.6': function(event, template) {
		$('a').removeClass('active');
		$('a.6').addClass('active');
	},
	'click .side-nav a.7': function(event, template) {
		$('a').removeClass('active');
		$('a.7').addClass('active');
	},
	'click .side-nav a.8': function(event, template) {
		$('a').removeClass('active');
		$('a.8').addClass('active');
	},
	'click .side-nav a.9': function(event, template) {
		$('a').removeClass('active');
		$('a.9').addClass('active');
	},
	'click .side-nav a.10': function(event, template) {
		$('a').removeClass('active');
		$('a.10').addClass('active');
	},
})