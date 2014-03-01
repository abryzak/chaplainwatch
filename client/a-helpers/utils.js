setUpField = function(field, index, list) {

  field.documentCollection = this.panel.collection;
  field.documentId = this[field.documentCollection]._id;
  //if ( this.person ) { console.log(this.person._id, field.documentId); }
  field.value = this[this.panel.collection][field.name];
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
  if ( field.response == 'panel-group' ) {
    var subPanels = [];
    var subDocuments = this[field.configOptions.subDocuments];
    _.each( subDocuments, function( subDocument, index, list ) {
      var data = { person: subDocument };
      var panels = getPanels( 'person', data );
      subPanels = subPanels.concat( panels );
      //console.log(subDocument, panels);
      //Issue: field.documenId and even field.value inside each panel is correct.
      // however in the view it is repeating for the first person result
    });
    field.subPanels = subPanels;
    field.subDocuments = subDocuments;
  };
};

setUpPanel = function( panel, index, list ) {
  var context = _.extend( { panel: panel } , this );
  //if ( context.person ) { console.log(context.person); }
  panel.fields = _.map(panel.fields, _.clone);
  _.each(panel.fields, setUpField, context);
  panel.isAvailable = panel.checkIsAvailable( panel.fields, this[panel.collection] );
  panel.fieldsNotValid = _.where( panel.fields, { isValid: false } );
  panel.isComplete = panel.checkIsComplete();
};

getPanels = function( collection, data ) {
  //if ( data.person ) { console.log(data.person); }
  var panels = _.where( allPanels, { collection: collection } );
  panels = _.map(panels, _.clone);
  var context = _.extend( { panels: panels } , data );
  _.each(panels, setUpPanel, context);
  return panels;
};



