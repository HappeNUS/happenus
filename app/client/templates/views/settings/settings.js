var RESIZE_OPTIONS = {
	width: 150,
	height: 150,
	cropSquare: true
};

Template.profileSettings.onCreated(function(){
	Session.set("img_preview", "");
});

Template.profileSettings.helpers({
	img_preview: function(){
		return Session.get("img_preview");
	},
	profile_img_url: function(){
		return $.cloudinary.url(Meteor.user().profile.img);
	}
});

Template.profileSettings.events({
	'click .upload-btn button': function (event, template) {
		var files = template.find('.file-input input[type=file]').files;
		if (files) {
			Resizer.resize(files[0], RESIZE_OPTIONS, function (err, file) {
				if (!err) {
					C.upload_stream([file], function(res) {
						Meteor.call('profileUpload', res);
					});
				} else {
					console.log(err);
				}
			});
		}
	},
	'change .file-input input[type=file]': function (event, template) {
		var files = event.target.files;
		if (files.length === 1) {
			var file = files[0];
			var reader = new FileReader();

			reader.onload = function(e) {
				Session.set("img_preview", e.target.result)
			};

			reader.readAsDataURL(file);
		}
	}
});