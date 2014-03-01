Response = function(panel, name, label, type, configOptions, required) {
  this.panel = panel;
  this.name = name;
  this.label = label;
  this.type = type || 'text';
  this.required = required || false;
  this.elementId = name + 'Response';
  this.options = _.where( allOptions, { responseName: this.name } );
  this.configOptions = configOptions;
};
allResponses = [
  new Response('launch-pad', 'startDate', 'Start Date', 'date', {}, true),
  new Response('launch-pad', 'startTime', 'Start Time', 'time', {}, true),
  new Response('launch-pad', 'respondingTo', 'Responding To', 'multi-select', {}, true),
  new Response('launch-pad', 'liquorAccordPrecinct', 'Liquor Accord Precinct', 'single-select', {}, true),
  new Response('launch-pad', 'setting', 'Setting', 'single-select', {}, true),
  new Response('launch-pad', 'locationDescription', 'Location', 'textarea', {}, false),
  new Response('launch-pad', 'locationCoordinates', 'Location Coordinates', 'geolocation', {hideLabelOnForm: true}, false),
  new Response('launch-pad', 'type', 'Type', 'single-select', {}, true),
  new Response('first-aid', 'conditionType', 'Condition Type', 'multi-select', {}, true),
  new Response('first-aid', 'conditionRating', 'Condition Rating', 'single-select', {extraWide: true}, true),
  new Response('first-aid', 'transportedTo', 'Tranported To', 'single-select', {}, true),
  new Response('first-aid', 'interventionNotes', 'Intervention Notes', 'textarea', {}, false),
  new Response('diversion', 'diversionType', 'Diversion Type', 'multi-select', {}, true),
  new Response('diversion', 'interventionNotes', 'Intervention Notes', 'textarea', {}, false),
  new Response('support', 'supportGivenTo', 'Support Given To', 'multi-select', {}, true),
  new Response('support', 'interventionNotes', 'Intervention Notes', 'textarea', {}, false),
  new Response('advice', 'adviceGivenTo', 'Advice Given To', 'multi-select', {}, true),
  new Response('advice', 'interventionNotes', 'Intervention Notes', 'textarea', {}, false),
  new Response('transport', 'transportConditionType', 'Condition Type', 'multi-select', {}, true),
  new Response('transport', 'transportedTo', 'Transported To', 'single-select', {}, true),
  new Response('transport', 'interventionNotes', 'Intervention Notes', 'textarea', {}, false),
  new Response('non-service', 'nonServiceType', 'GoA / Non Service', 'single-select', {}, true),
  new Response('non-service', 'interventionNotes', 'Intervention Notes', 'textarea', {}, false),
  new Response('people-full', 'person', 'People', 'panel-group', { subDocuments: 'people' }, false),
  new Response('person', 'name', 'Name or Identifier', 'text', {}, true),
  new Response('person', 'gender', 'Gender', 'single-select', {}, true),
  new Response('person', 'ageBracket', 'Age Bracket', 'single-select', {}, true),
  new Response('person', 'culturalBackground', 'Cultural Background', 'multi-select', {}, true),
  new Response('people-compact', 'gender', 'Gender', 'grid', {}, true),
  new Response('people-compact', 'ageBracket', 'Age Bracket', 'grid', {}, true),
  new Response('people-compact', 'culturalBackground', 'Cultural Background', 'grid', {}, true),
  new Response('landing-pad', 'durationHours', 'Hrs', 'duration', {hideLabelOnForm: true}, false),
  new Response('landing-pad', 'durationMinutes', 'Mins', 'duration', {hideLabelOnForm: true}, false),
  new Response('landing-pad', 'durationTotal', 'Duration', 'show', {}, true),
  new Response('landing-pad', 'teamMemberNotes', 'Team Member Notes', 'textarea', {}, false),
  new Response('landing-pad', 'completedOn', 'Completed On', 'landing-button', {hideLabelOnForm: true}, false),
];



