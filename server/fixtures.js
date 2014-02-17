
var allUsers = Meteor.users.find();

if (Interventions.find().count() == 0) {
  //Interventions.create({reference: 20014});
  setCounter('interventionReference', 1983);
  //Set the first counter var
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