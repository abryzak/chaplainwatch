Template.dashboard.users = function() {
  var users = Meteor.users.find().fetch();
  var self = this; 
  //console.log(self);
  _.each(users, function(user, index, list) {
    user.email = user.emails[0].address;
    user.selectedIfOwner = function() {
      if(_.isObject(self.ownerUser)) {
        if(self.ownerUser.emails[0].address == user.email) {
          return 'selected'
        }
      } 
        return '';
    };
    user.fullName = user.profile.firstName + ' ' + user.profile.lastName;
  });
  return users;
};

Template.dashboard.rendered = function() {
  $('#accordion').on('hide.bs.collapse', function ( event ) {
    $parentElement = $(event.target.parentElement);
    $parentElement.removeClass('panel-info');
    $parentElement.addClass('panel-default');
  });
  $('#accordion').on('show.bs.collapse', function ( event ) {
    $parentElement = $(event.target.parentElement);
    $parentElement.removeClass('panel-default');
    $parentElement.addClass('panel-info');
  });
}

Template.dashboard.events({
  'click #add-intervention': function(e) {
    e.preventDefault;
    newInterventionId = Meteor.call(
      'addIntervention',
      {
        'setDispatchAsNow': true,
      },
      function(error, id) {
      if (error) {
        Alerts.add(error.reason);
      } else {
        Alerts.add('New Intervention created.', 'success');
      }
    });
  },
  'blur .update-on-blur': function(e) {
    var updatedValue = event.currentTarget.value;
    var values = {};
    //console.log(event.currentTarget);
    var fieldName = event.currentTarget.name;
    if ( fieldName == 'dispatchTime' ) {
      var currentValue = new moment( event.currentTarget.getAttribute('data-full-value') );
      currentValue.hour( parseInt(updatedValue.split(":")[0]) ).minute( parseInt(updatedValue.split(":")[1]) );
      //does not solve issue of moving from 12pm to 1am!
      values['dispatchDateTime'] = currentValue.toDate();
    } else {
      values[fieldName] = updatedValue;
    }
    //console.log('documentId', documentId);
    Meteor.call('updateIntervention', this._id, values, function(error, id) {
      if ( error ) {
        Alerts.add(error.reason);
      } else {
      }
    });
  },
  'change .update-on-change': function(e) {
    var updatedValue = event.currentTarget.value;
    //console.log('update the user via email');
    var values = {};
    if ( event.currentTarget.name == 'ownerEmail' ) {
      var ownerId = Meteor.users.findOne({ emails: { $elemMatch: { address: updatedValue } } })._id;
      values.ownerId = ownerId;
    } else {
      values[event.currentTarget.name] = updatedValue;
    }
    Meteor.call('updateIntervention', this._id, values, function(error, id) {
      if ( error ) {
        Alerts.add(error.reason);
      } else {
      }
    });
  },
});