Meteor.publish('intervention', function(options) {
	//will search for a specific one in the future
	return Interventions.findOne({}, options);
});

Meteor.publish('interventions', function(options) {
	return Interventions.find({}, options);
});

Meteor.publish('people', function(options) {
  return People.find({}, options);
});

Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
})

Meteor.publish(null, function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Houston.add_collection(Meteor.roles);

