//dup of /edit_intervention.js
Template.showIntervention.panels = function() {
  panels = allPanels;
  //console.log(this);
  context = _.extend( {panels: allPanels} , this );
  _.each(panels, setUpPanel, context);
  return panels;
};