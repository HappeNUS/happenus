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