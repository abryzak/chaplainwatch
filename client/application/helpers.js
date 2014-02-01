field = function(collection, name, label, type, required) {
	var self = this;
	self.collection = collection;
	self.name = name;
	self.label = label || name;
	self.type = type || 'text';
	self.required = required || false;
};
//there is probably something out there that will do what I need
interventionConfig = { fields: {} };
interventionConfig.fields.liquorAccordPrecinct = {'label': 'Liquor Accord Precinct'};
//above should be availalbe on client? but not in templates (pretty sure)

Handlebars.registerHelper('interventionComponent', function(field) {
	var componentField = interventionConfig.fields[field]
	data = {
		interventionId: this._id,
		value: this[field],
		label: componentField.label,
		placeholder: componentField.placeholder,
	};
  return new Handlebars.SafeString(Template.interventionComponent(data));
});