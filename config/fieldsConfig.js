Field = function(panel, name, label, response, configOptions, required) {
  this.panel = panel;
  this.name = name;
  this.label = label;
  this.response = response || 'text';
  this.required = required || false;
  this.elementId = name + 'Field';
  this.options = _.where(allOptions, { fieldName: this.name } );
  this.configOptions = configOptions;
};
interventionFields = [
  new Field('launch-pad', 'startDate', 'Start Date', 'date', {}, true),
  new Field('launch-pad', 'startTime', 'Start Time', 'time', {}, true),
  new Field('launch-pad', 'respondingTo', 'Responding To', 'multi-select', {}, true),
  new Field('launch-pad', 'liquorAccordPrecinct', 'Liquor Accord Precinct', 'single-select', {}, true),
  new Field('launch-pad', 'setting', 'Setting', 'single-select', {}, true),
  new Field('launch-pad', 'locationDescription', 'Location', 'textarea', {}, false),
  new Field('launch-pad', 'locationCoordinates', 'Location Coordinates', 'geolocation', {hideLabelOnForm: true}, false),
  new Field('launch-pad', 'type', 'Type', 'single-select', {}, true),
  new Field('first-aid', 'conditionType', 'Condition Type', 'multi-select', {}, true),
  new Field('first-aid', 'conditionRating', 'Condition Rating', 'single-select', {extraWide: true}, true),
  new Field('first-aid', 'transportedTo', 'Tranported To', 'single-select', {}, true),
  new Field('first-aid', 'interventionNotes', 'Intervention Notes', 'textarea', {}, false),
  new Field('diversion', 'diversionType', 'Diversion Type', 'multi-select', {}, true),
  new Field('diversion', 'interventionNotes', 'Intervention Notes', 'textarea', {}, false),
  new Field('support', 'supportGivenTo', 'Support Given To', 'multi-select', {}, true),
  new Field('support', 'interventionNotes', 'Intervention Notes', 'textarea', {}, false),
  new Field('advice', 'adviceGivenTo', 'Advice Given To', 'multi-select', {}, true),
  new Field('advice', 'interventionNotes', 'Intervention Notes', 'textarea', {}, false),
  new Field('transport', 'transportConditionType', 'Condition Type', 'multi-select', {}, true),
  new Field('transport', 'transportedTo', 'Transported To', 'single-select', {}, true),
  new Field('transport', 'interventionNotes', 'Intervention Notes', 'textarea', {}, false),
  new Field('non-service', 'nonServiceType', 'GoA / Non Service', 'single-select', {}, true),
  new Field('non-service', 'interventionNotes', 'Intervention Notes', 'textarea', {}, false),
  new Field('people-full', 'person', 'People', 'panel-group', { subDocuments: 'people' }, false),
  new Field('person', 'name', 'Name or Identifier', 'text', {}, true),
  new Field('person', 'gender', 'Gender', 'single-select', {}, true),
  new Field('person', 'ageBracket', 'Age Bracket', 'single-select', {}, true),
  new Field('person', 'culturalBackground', 'Cultural Background', 'multi-select', {}, true),
  new Field('people-compact', 'gender', 'Gender', 'grid', {}, true),
  new Field('people-compact', 'ageBracket', 'Age Bracket', 'grid', {}, true),
  new Field('people-compact', 'culturalBackground', 'Cultural Background', 'grid', {}, true),
  new Field('landing-pad', 'durationHours', 'Hrs', 'duration', {hideLabelOnForm: true}, false),
  new Field('landing-pad', 'durationMinutes', 'Mins', 'duration', {hideLabelOnForm: true}, false),
  new Field('landing-pad', 'durationTotal', 'Duration', 'show', {}, true),
  new Field('landing-pad', 'teamMemberNotes', 'Team Member Notes', 'textarea', {}, false),
  new Field('landing-pad', 'completedOn', 'Completed On', 'landing-button', {hideLabelOnForm: true}, false),
];



