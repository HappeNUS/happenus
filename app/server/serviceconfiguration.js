ServiceConfiguration.configurations.upsert(
	{ service: "google" },
	{
		$set: {
			clientId: Meteor.settings.Google.clientId,
			loginStyle: "popup",
			secret: Meteor.settings.Google.secret
		}
	}
);

ServiceConfiguration.configurations.upsert(
	{ service: "facebook" },
	{
		$set: {
			appId: Meteor.settings.Facebook.app_id,
			loginStyle: "popup",
			secret: Meteor.settings.Facebook.secret
		}
	}
);