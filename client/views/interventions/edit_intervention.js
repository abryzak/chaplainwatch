//dup of /show_intervention.js
Template.editIntervention.panels = function() {
	panels = allPanels;
	context = _.extend( {panels: allPanels} , this );
	_.each(panels, setUpPanel, context);
	return panels;
};