
var allUsers = Meteor.users.find();

if (Interventions.find().count() == 0) {
  //Interventions.create({reference: 20014});
  setCounter('interventionReference', 1983);
  //Set the first counter var
  [].forEach( function (user) {
    var interventionId = Meteor.call('addIntervention');
    Meteor.call('updateIntervention', interventionId, {
      ownerId: user._id,
      startDate: '2014-01-03',
      startTime: '23:00',
      liquorAccordPrecinct: "valley",
      type: 'first-aid',
      respondingTo: ['city-safe'],
    });
    var interventionId = Meteor.call('addIntervention');
    Meteor.call('updateIntervention', interventionId, {
      ownerId: user._id,
      startDate: '2014-01-03',
      startTime: '23:20',
      liquorAccordPrecinct: "valley",
      type: 'diversion',
      respondingTo: ['city-safe'],
    });
    var interventionId = Meteor.call('addIntervention');
    Meteor.call('updateIntervention', interventionId, {
      ownerId: user._id,
      startDate: '2014-01-03',
      startTime: '23:25',
      liquorAccordPrecinct: "valley",
      type: 'support',
      respondingTo: ['city-safe'],
    });
    var interventionId = Meteor.call('addIntervention');
    Meteor.call('updateIntervention', interventionId, {
      ownerId: user._id,
      startDate: '2014-01-03',
      startTime: '23:27',
      liquorAccordPrecinct: "valley",
      type: 'advice',
      respondingTo: ['city-safe'],
    });
  });
};