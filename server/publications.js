Meteor.publish('intervention', function(options) {
	//will search for a specific one in the future
	return Interventions.findOne({}, options);
});

Meteor.publish('interventions', function(options) {
	return Interventions.find({}, options);
});

Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
})

Houston.add_collection(Meteor.roles);