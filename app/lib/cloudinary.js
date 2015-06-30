if (Meteor.isClient) {
	$.cloudinary.config({
		cloud_name: Meteor.settings.public.cloud_name
	});

	_cloudinary.after.update(function(user,file){
		if(file.percent_uploaded === 100 && !file.uploading){
			console.log(file);
		}
});
}

if (Meteor.isServer) {
	Cloudinary.config({
		cloud_name: Meteor.settings.Cloudinary.cloud_name,
		api_key: Meteor.settings.Cloudinary.api_key,
		api_secret: Meteor.settings.Cloudinary.api_secret
	});
}