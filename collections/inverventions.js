Interventions = new Meteor.Collection("interventions", {
  virtualFields: {
    startDateTimeMoment:  function(i) {
      if ( i.startDate && i.startTime ) {
        var result = new moment( i.startDate + ' ' + i.startTime, 'YYYY-MM-DD HH:mm' );
        return result;
      }
      return null;
    },
    updatedMoment: function(i) {
      return new moment( i.updatedOn );
    },
    dispatchTime: function(i) {
      if ( i.dispatchDateTime ) {
        return new moment( i.dispatchDateTime ).format( 'HH:MM' );
      }
      return null;
    },
    durationTotal: function(i) {
      var totalMinutes = 0;
      totalMinutes += parseInt(i.durationHours || 0) * 60;
      totalMinutes += parseInt(i.durationMinutes || 0);
      return totalMinutes;
    },
    finishDateTimeMoment: function(i) {
      if ( i.startDateTimeMoment && i.durationTotal ) {
        return new moment(i.startDateTimeMoment).add('minutes', i.durationTotal);  
      }
      return null;
    },
    //make this automatic at some point (ie. for all fields go through & do this)
    typeName: function(i) { return responseNamesFromField(i.type, 'type', null, 'Not Selected'); },
    typeHtml: function(i) {
      return responseNamesFromField( i.type, 'type', 'html', '<i class="fa fa-fw fa-question-circle"></i> New intervention' );
    },
    respondingToName: function(i) { return responseNamesFromField(i.respondingTo, 'respondingTo'); },
    liquorAccordPrecinctName: function(i) { return responseNamesFromField(i.liquorAccordPrecinct, 'liquorAccordPrecinct'); },
    settingName: function(i) { return responseNamesFromField(i.setting, 'setting'); },
    status: function(i) {
      if ( i.completedOn ) { return 'Completed' };
      return 'In Progress';
    },
    ownerUser: function(i) {
      return Meteor.users.findOne( {_id: i.ownerId} );
    },
    ownerName: function(i) {
      var result = 'no one';
      if (_.isObject(i.ownerUser)) {
        result = i.ownerUser.profile.firstName;
      }
      return result;
    },
    statusDescription: function(i) {
      var result = 'Started by <strong>' + i.ownerName + '</strong> ';
      result += ( i.startDateTimeMoment ? i.startDateTimeMoment.fromNow() : ' net yet entered ' ) + ', ';
      result += 'last edited ' + i.updatedMoment.fromNow() + ', ';
      if ( i.completedOn ) {
        result += ' completed ' + moment(i.completedOn).fromNow() + '.';
      } else {
        result += ' not yet completed.';  
      }
      return result;
    },
    prettyPrint: function(i) {
      return JSON.stringify(i, true, 2);
    },
  }
});

Meteor.methods({
  addIntervention: function(options) {
    var self = this;
    var options = options || {};
    var intervention = _.extend( new defaultFields( true ), {
      reference: incrementCounter('interventionReference'),
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
    return newInterventionId;
  },
  updateIntervention: function(interventionId, values, options) {
    var self = this;
    console.log(interventionId, values, options);
    var intervention = _.extend( new defaultFields, values );
    Interventions.update(
      { _id: interventionId },
      { $set: intervention }
      );
    return interventionId;
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
  removeIntervention: function(interventionId, options) {
    Interventions.remove(interventionId);
    return true;
  },
});
