Template.optionButtons.collection = function() {
  //to do - to make this modular
  return 'intervention';
};

Template.optionButtons.events = ({
  'click .clear-document': function( event ) {
    event.preventDefault;
    console.log('clear document');
    newInterventionId = Meteor.call(
      'clearIntervention', this._id, {}, function(error, id) {
      if (error) {
        Alerts.add( error.reason );
      } else {
        Alerts.add( 'Intervention values have been cleared.', 'warning' );
      }
    });
  },
  'click .destroy-document': function( event ) {
    event.preventDefault;
    console.log('destroy document', this._id);
    if (window.confirm('Are you sure you want to remove this Intervention?')) {
      completed = Meteor.call(
        'destroyIntervention', this._id, {}, function(error, id) {
        if (error) {
          Alerts.add( error.reason );
        } else {
          Alerts.add( 'Intervention has been removed.', 'warning' );
        }
      });
    }
  },
});
