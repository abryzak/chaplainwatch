Meteor.publish('intervention', function(options) {
	//will search for a specific one in the future
	return Interventions.findOne({}, options);
});