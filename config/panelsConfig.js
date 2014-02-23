Panel = function(collection, name, label, icon, availableConditions) {
	var self = this;
	self.collection = collection;
	self.name = name;
	self.label = label || _.str.capitalize(name);
	self.icon = icon || 'fa-rocket';
	self.fields = _.where( interventionFields , { panel: self.name } );
	self.elementId = name + 'Panel';
	self.checkIsAvailable = function( panelFields, parentDocument ) {
		var result = true;
		if (panelFields.length == 0) {
			result = false;
		};
		_.each( availableConditions, function(value, key, object) {
			if ( value.indexOf(parentDocument[key]) < 0 ) { result = false; }
		});
		return result;
	};
	self.checkIsComplete = function() {
		return ( self.fieldsNotValid.length == 0 )
	};
}
allPanels = [
	new Panel('intervention', 'launch-pad', 'Launch Pad', 'fa-rocket', {} ),
	new Panel('intervention', 'first-aid', 'First Aid', 'fa-medkit', {type: ['first-aid']} ),
	new Panel('intervention', 'diversion', 'Diversion', 'fa-medkit', {type: 'diversion'} ),
	new Panel('intervention', 'support', 'Support', 'fa-shield', {type: ['support']} ),
	new Panel('intervention', 'advice', 'Advice', 'fa-comments-o', {type: ['advice']} ),
	new Panel('intervention', 'transport', 'Transport', 'fa-truck', {type: ['transport']} ),
	new Panel('intervention', 'non-service', 'Advice', 'fa-times-circle', {type: ['non-service']} ),
	new Panel('intervention', 'people-full', 'People', 'fa-group', {type: ['first-aid', 'transport']} ),
	new Panel('intervention', 'people-compact', 'People', 'fa-group', {type: ['diversion', 'support', 'advice']} ),
	new Panel('intervention', 'landing-pad', 'Protocols', 'fa-power-off', {} ),
	new Panel('person', 'person', 'Person', 'fa-user', {} ),
];