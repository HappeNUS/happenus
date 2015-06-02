Template.create.events({
	"submit form": function(event, instance) {
		var nameVal = event.target.inputName.value.trim();
		var descVal = event.target.inputDesc.value.trim();
		var imgVal = event.target.inputImg.value.trim();

		Events.insert({
			_id: new Meteor.Collection.ObjectID(),
			userId: Meteor.userId(),
			name: nameVal,
			desc: descVal,
			img: imgVal,
			date: new Date()
		});
	}
});