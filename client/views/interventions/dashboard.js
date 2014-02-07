Template.dashboard.users = function() {
  var users = Meteor.users.find().fetch();
  var self = this; 
  console.log(self);
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
        alert(error);
      } else {
        UserSession.set('editing', id);
      }
    });
  },
  'click .toggle-edit': function(e) {
    e.preventDefault;
    if ( UserSession.get('editing') == this._id ) {
      UserSession.delete('editing');
    } else {
      UserSession.set('editing', this._id);
    }
  },
  'blur .update-on-blur': function(e) {
    var updatedValue = event.currentTarget.value;
    var values = {};
    console.log(event.currentTarget);
    values[event.currentTarget.name] = updatedValue;
    //console.log('documentId', documentId);
    Meteor.call('updateIntervention', this._id, values, function(error, id) {
      if ( error ) {
        alert(error.reason);
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
        alert(error.reason);
      } else {
      }
    });
  },
});