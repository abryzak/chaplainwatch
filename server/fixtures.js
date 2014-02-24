var allUsers = Meteor.users.find();

if (Interventions.find().count() == 0) {

  var addedInterventions = [];
  var addedPeople = [];
  _.each(oneImport.interventions, function(intervention, index, list) {
    var people = intervention.people;
    intervention.people = null;
    intervention.completedOn = new moment(intervention.finishOld).format();
    var newInterventionId = Interventions.insert(intervention);
    _.each(people, function(person, index, list) {
      person = _.extend({interventionId: newInterventionId}, person);
      var newPersonId = People.insert(person);
      addedPeople.push(newPersonId);
    });
    //need to remove people & add them as a separate collection
    addedInterventions.push(newInterventionId);
  });
  console.log(addedInterventions.length, addedPeople.length);

  //OLD DATA CReaTION
  //Set the first counter var
  setCounter('interventionReference', 1983);
  [].forEach( function (user) {
    var interventionId = Meteor.call('addIntervention');
    Meteor.call('updateIntervention', interventionId, {
      ownerId: user._id,
      startDateTime: new moment('2014-01-03 23:00:00').toDate(),
      liquorAccordPrecinct: "valley",
      type: 'first-aid',
      respondingTo: ['city-safe'],
    });
    var interventionId = Meteor.call('addIntervention');
    Meteor.call('updateIntervention', interventionId, {
      ownerId: user._id,
      startDateTime: new moment('2014-01-03 23:20:00').toDate(),
      liquorAccordPrecinct: "valley",
      type: 'diversion',
      respondingTo: ['city-safe'],
    });
    var interventionId = Meteor.call('addIntervention');
    Meteor.call('updateIntervention', interventionId, {
      ownerId: user._id,
      startDateTime: new moment('2014-01-03 23:25:00').toDate(),
      liquorAccordPrecinct: "valley",
      type: 'support',
      respondingTo: ['city-safe'],
    });
    var interventionId = Meteor.call('addIntervention');
    Meteor.call('updateIntervention', interventionId, {
      ownerId: user._id,
      startDateTime: new moment('2014-01-03 23:27:00').toDate(),
      liquorAccordPrecinct: "valley",
      type: 'advice',
      respondingTo: ['city-safe'],
    });
  });
};