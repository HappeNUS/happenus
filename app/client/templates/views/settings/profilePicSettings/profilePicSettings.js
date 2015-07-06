var PROFILE_RESIZE_OPTIONS = {
	width: 150,
	height: 150,
	cropSquare: true
};

Template.profilePicSettings.onCreated(function(){
	Session.set("img_preview", "");
});

Template.profilePicSettings.helpers({
	img_preview: function(){
		return Session.get("img_preview");
	},
	profile_img_url: function(){
		return $.cloudinary.url(Meteor.user().profile.img);
	}
});

Template.profilePicSettings.events({
	'click .profilePicSettings div.file-input button': function (event, template) {
		template.$('.profilePicSettings div.file-input input[type=file]').click();
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
	},
	'click .img-upload button.upload-btn': function (event, template) {
		var files = template.find('.file-input input[type=file]').files;
		if (files) {
			Resizer.resize(files[0], PROFILE_RESIZE_OPTIONS, function (err, file) {
				if (!err) {
					C.upload_stream([file], function(res) {
						Session.set("img_preview", "");
						Meteor.call('changeProfilePic', res);
						Materialize.toast('Profile picture changed', 5000);
					});
				} else {
					console.log(err);
				}
			});
		}
	}
});