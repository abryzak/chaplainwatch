
var allUsers = Meteor.users.find();

if (Interventions.find().count() == 0) {
  allUsers.forEach( function (user) {
    var interventionId = Meteor.call('addIntervention');
    Meteor.call('updateIntervention', interventionId, {
      ownerId: user._id,
      startDate: '2014-01-03',
      startTime: '23:00',
      liquorAccordPrecinct: "valley",
      reference: 1928,
      type: 'first-aid',
      respondingTo: ['city-safe'],
    });
    var interventionId = Meteor.call('addIntervention');
    Meteor.call('updateIntervention', interventionId, {
      ownerId: user._id,
      startDate: '2014-01-03',
      startTime: '23:20',
      liquorAccordPrecinct: "valley",
      reference: 1929,
      type: 'diversion',
      respondingTo: ['city-safe'],
    });
    var interventionId = Meteor.call('addIntervention');
    Meteor.call('updateIntervention', interventionId, {
      ownerId: user._id,
      startDate: '2014-01-03',
      startTime: '23:25',
      liquorAccordPrecinct: "valley",
      reference: 1949,
      type: 'support',
      respondingTo: ['city-safe'],
    });
    var interventionId = Meteor.call('addIntervention');
    Meteor.call('updateIntervention', interventionId, {
      ownerId: user._id,
      startDate: '2014-01-03',
      startTime: '23:27',
      liquorAccordPrecinct: "valley",
      reference: 1950,
      type: 'advice',
      respondingTo: ['city-safe'],
    });
  });
};