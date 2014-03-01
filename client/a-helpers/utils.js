setUpResponse = function(response, index, list) {
  response.documentCollection = this.panel.collection;
  response.documentId = this[response.documentCollection]._id;
  response.value = this[this.panel.collection][response.name];
  response.isValid = isValid(response.required, response.value);
  if ( ( response.type == 'dateTimeSeparate') && ( response.value ) ) {
    var dateTime = new moment(response.value);
    response.composite = {
      date: dateTime.format('YYYY[-]MM[-]DD'),
      time: dateTime.format('HH[:]mm[:]ss'),
    };
  } else {
    response.composite = {};
  }
  if ( response.type == 'landing-button' ) {
    response.panelsNotComplete = _.where( this.panels, { isComplete: false, isAvailable: true } );
    response.allAvailablePanelsComplete = function() { return ( response.panelsNotComplete.length == 0 ) };
  }
  if ( response.type == 'panel-group' ) {
    var subPanels = [];
    var subDocuments = this[response.configOptions.subDocuments];
    _.each( subDocuments, function( subDocument, index, list ) {
      var data = { person: subDocument };
      var panels = getPanels( 'person', data );
      subPanels = subPanels.concat( panels );
      //console.log(subDocument, panels);
      //Issue: response.documenId and even response.value inside each panel is correct.
      // however in the view it is repeating for the first person result
    });
    response.subPanels = subPanels;
    response.subDocuments = subDocuments;
  };
};

setUpPanel = function( panel, index, list ) {
  var context = _.extend( { panel: panel } , this );
  panel.responses = _.map(panel.responses, _.clone);
  _.each(panel.responses, setUpResponse, context);
  panel.isAvailable = panel.checkIsAvailable( panel.responses, this[panel.collection] );
  panel.responsesNotValid = _.where( panel.responses, { isValid: false } );
  panel.isComplete = panel.checkIsComplete();
};

getPanels = function( collection, data ) {
  var panels = _.where( allPanels, { collection: collection } );
  panels = _.map(panels, _.clone);
  var context = _.extend( { panels: panels } , data );
  _.each(panels, setUpPanel, context);
  return panels;
};



