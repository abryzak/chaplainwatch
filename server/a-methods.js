Meteor.methods({
  addIntervention: function(options) {
    var self = this;
    var options = options || {};
    var intervention = _.extend( new defaultFields( true ), {
      reference: getCounter( 'interventionReference', 3005 ),
    });
    var now = moment( intervention.updatedOn );
    if ( options.setOwnerAsCurrentUser && userId) {
      intervention.ownerId = userId;
    };

    if ( options.setStartAsNow ) {
      intervention.startDate = now.format('YYYY[-]MM[-]DD');
      intervention.startTime = now.format('HH[:]mm');
    };

    if ( options.setDispatchAsNow ) {
      intervention.dispatchDateTime = now.toDate();
    };

    newInterventionId = Interventions.insert(intervention);
    console.log('new intervention created', newInterventionId, options);
    return newInterventionId;
  },
  clearIntervention: function(interventionId, options) {
    intervention = Interventions.findOne({_id: interventionId});
    clearedIntervention = {};
    _.each(intervention, function(value, key, list) {
      if (doNotClear.indexOf(key) == -1 ) {
        clearedIntervention[key] = "";
      }
    });
    console.log(interventionId, options, clearedIntervention);
    Interventions.update(
      { _id: interventionId },
      { $unset: clearedIntervention }
    );
    return interventionId;
  },
  destroyIntervention: function(interventionId, options) {
    console.log('destroyIntervention method called;', interventionId, options);
    Interventions.update(
      { _id: interventionId},
      { $set: { destroyed: true } }
    );
    return interventionId;
  },
});
