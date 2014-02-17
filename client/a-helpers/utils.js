setUpField = function(field, index, list) {
  //console.log(this);
  field.documentId = this._id;
  field.value = this[field.name];
  field.isValid = isValid(field.required, field.value);
  if ( ( field.response == 'dateTimeSeparate') && ( field.value ) ) {
    var dateTime = new moment(field.value);
    field.composite = {
      date: dateTime.format('YYYY[-]MM[-]DD'),
      time: dateTime.format('HH[:]mm[:]ss'),
    };
  } else {
    field.composite = {};
  }
  if ( field.response == 'landing-button' ) {
    field.panelsNotComplete = _.where( this.panels, { isComplete: false, isAvailable: true } );
    field.allAvailablePanelsComplete = function() { return ( field.panelsNotComplete.length == 0 ) };
  }
};

setUpPanel = function(panel, index, list) {
  _.each(panel.fields, setUpField, this);
  panel.isAvailable = panel.checkIsAvailable( panel.fields, this );
  panel.fieldsNotValid = _.where( panel.fields, { isValid: false } );
  panel.isComplete = panel.checkIsComplete();
};