Template.editIntervention.created = function () {
  //<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></script>
  //Meteor.Loader.loadJs('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places');
}


Template.editIntervention.rendered = function() {
  ko.extenders.label = function( target, label ) {
    target.label = ko.observable(label);
    return target;
  }
  ko.validation.rules['time'] = {
      validator: function (val) {
        result = true;
        if (val.indexOf(":") < 0) {
          result = false;
        } else {
          var timeComponents = val.split(":");
          var hour = parseInt( timeComponents[0] );
          var minute = parseInt( timeComponents[1] );
          if (hour == NaN) { 
            result = false;
          } else {
            if ( ( hour < 0 ) && ( hour > 24 ) ) {
            result = false;
            }
          };

          if (minute == NaN) { 
            result = false;
          } else {
            if ( ( minute < 0 ) && ( minute > 60 ) ) {
            result = false;
            }
          }
        }
        return result;
      },
      message: 'Please enter a proper time'
  };
  var currentTime = new moment();

  ko.validation.configure({
      registerExtenders: true,
      messagesOnModified: true,
      insertMessages: true,
      parseInputAttributes: true,
      messageTemplate: null
  });
  var fieldError = function(section, fieldName) {
    var self = this;
    self.section = section;
    self.fieldName = fieldName;
  };
  var Section = function(reference, name) {
    var self = this;
    self.reference = reference;
    if (name == null) {
      self.text = _.str.capitalize(reference.replace('-',' '));
    } else {
      self.text = name;
    }
  };
  var Option = function(category, value, name, html) {
    var self = this;
    self.category = category;
    //category must match the field name - consider renaming??
    self.value = value;
    if (name == null) {
      self.text = _.str.capitalize(value.replace('-',' '));
    } else {
      self.text = name;
    }
    self.html = html || self.text;
  };
  var allOptions = [
    new Option('respondingTo', 'none'),
    new Option('respondingTo', 'nightsafe', 'NightSafe'),
    new Option('respondingTo', 'city-safe'),
    new Option('respondingTo', 'venue'),
    new Option('respondingTo', 'police'),
    new Option('respondingTo', 'taxi'),
    new Option('respondingTo', 'ambulance'),
    new Option('respondingTo', 'public'),
    new Option('respondingTo', 'other'),
    new Option('liquorAccordPrecinct', 'valley'),
    new Option('liquorAccordPrecinct', 'cbd', 'CBD'),
    new Option('liquorAccordPrecinct', 'caxton-street'),
    new Option('liquorAccordPrecinct', 'west-end'),
    new Option('liquorAccordPrecinct', 'other'),
    new Option('setting', 'public-footpath', 'Public Space (Footpath)'),
    new Option('setting', 'public-mall', 'Public Space (Mall)'),
    new Option('setting', 'public-roadway', 'Public Space (Roadway)'),
    new Option('setting', 'public-park-common', 'Public Space (Park or Common)'),
    new Option('setting', 'venue-inside', 'Venue (Inside)'),
    new Option('setting', 'venue-outside', 'Venue (Outside)'),
    new Option('setting', 'taxi-rank', 'Taxi Rank'),
    new Option('setting', 'police-station', 'Police Station'),
    new Option('setting', 'other'),
    new Option('type', 'first-aid', 'First Aid', '<i class="fa fa-medkit fa-fw"></i> First Aid'),
    new Option('type', 'diversion', 'Diversion', '<i class="fa fa-bullhorn fa-fw"></i> Diversion'),
    new Option('type', 'support', 'Support', '<i class="fa fa-shield fa-fw"></i> Support'),
    new Option('type', 'advice', 'Advice', '<i class="fa fa-comments-o fa-fw"></i> Advice'),
    new Option('type', 'non-service', 'GoA/ Non-Service', '<i class="fa fa-times-circle fa-fw"></i> GoA / Non-Service'),
    new Option('type', 'transport', 'Transport', '<i class="fa fa-truck fa-fw"></i> Transport'),
    new Option('ageBracket', '-17'),
    new Option('ageBracket', '18-21'),
    new Option('ageBracket', '22-25'),
    new Option('ageBracket', '26-29'),
    new Option('ageBracket', '30-34'),
    new Option('ageBracket', '35-39'),
    new Option('ageBracket', '40+'),
    new Option('gender', 'male', 'Male', '<i class="fa fa-male fa-fw"></i> Male'),
    new Option('gender', 'female', 'Female', '<i class="fa fa-male fa-fw"></i> Female'),
    new Option('culturalBackground', 'resident'),
    new Option('culturalBackground', 'cultural-linquistic', 'Cultural / Linguistic'),
    new Option('culturalBackground', 'non-resident', 'Non-redisent'),
    new Option('culturalBackground', 'atsi', 'ATSI'),
    new Option('culturalBackground', 'homeless', 'Homeless'),
    new Option('conditionType', 'alchohol-intoxication-primary', 'Alchohol Intoxication - Primary'),
    new Option('conditionType', 'drugs-primary', 'Drugs - Primary'),
    new Option('conditionType', 'injury-accident', 'Injury by Accident'),
    new Option('conditionType', 'injury-assault', 'Injury by Assault'),
    new Option('conditionType', 'injury-self-harm', 'Injury by Self Harm'),
    new Option('conditionType', 'medical-condition'),
    new Option('conditionType', 'mental-health-issues'),
    new Option('conditionType', 'distress'),
    new Option('conditionType', 'unknown'),
    new Option('conditionType', 'other'),
    new Option(
      'conditionRating',
      '1-appropriate',
      '1 - Appropriate',
      '&#9312; Appropriate <small>(Basic First Aid)</small>'
      ),
    new Option(
      'conditionRating',
      '2-satisfactory',
      '2 - Satisfactory',
      '&#9313; Satisfactory <small>(First Aid plus Advised to seek early Medical Advice)</small>'
      ),
    new Option(
      'conditionRating',
      '3-stable',
      '3 - Stable',
      '&#9314; Stable <small>(Transported to Hospital/medical NightSafe)</small>'
      ),
    new Option(
      'conditionRating',
      '4-serious',
      '4 - Serious',
      '&#9315; Critical <small>(QAS called to attend and/or transport to hospital)</small>'
      ),
    new Option(
      'conditionRating',
      '5-critical',
      '5 - Critical',
      '&#9316; Critical <small>(Life Threatening - QAS to Hospital)</small>'
      ),
    new Option('transportedTo', 'none'),
    new Option('transportedTo', 'home-or-friends-place', 'Home or Friend&apos;s Place'),
    //This might be an issue in future as this category is used in two places & in the first, home is not needed
    new Option('transportedTo', 'nightsafe', 'NightSafe'),
    new Option('transportedTo', 'royal-brisbane-hospital'),
    new Option('transportedTo', 'mater-hospital'),
    new Option('transportedTo', 'princes-alexanders-hospital'),
    new Option('transportedTo', 'private-hospital'),
    new Option('transportedTo', 'other'),
    new Option('diversionType', 'assault-in-progress', 'Assault in Progress'),
    new Option('diversionType', 'conflict-intervention'),
    new Option('diversionType', 'personal-safety'),
    new Option('diversionType', 'self-harm-or-ideation', 'Self Harm or Ideation'),
    new Option('diversionType', 'other'),
    new Option('supportGivenTo', 'ambulance'),
    new Option('supportGivenTo', 'police'),
    new Option('supportGivenTo', 'taxi'),
    new Option('supportGivenTo', 'venue'),
    new Option('supportGivenTo', 'public'),
    new Option('adviceGivenTo', 'general-advice'),
    new Option('adviceGivenTo', 'personal-safety'),
    new Option('adviceGivenTo', 'safe-drinking'),
    new Option('adviceGivenTo', 'directions'),
    new Option('adviceGivenTo', 'transport'),
    new Option('adviceGivenTo', 'other'),
    new Option('transportConditionType', 'medical'),
    new Option('transportConditionType', 'intox'),
    new Option('transportConditionType', 'mental-health'),
    new Option('transportConditionType', 'distress'),
    new Option('transportConditionType', 'saftey'),
    new Option('transportConditionType', 'other'),
    new Option('nonServiceType', 'gone-on-arrival', 'Gone on Arrival'),
    new Option('nonServiceType', 'assistance-not-required', 'Assistance not Required'),
    new Option('nonServiceType', 'assistance-refused'),
    new Option('nonServiceType', 'other'),
  ]
  var buildViewModel = function() {
    var self = this;

    self.testIntervention = ko.meteor.findOne(Interventions, {});
    // TO DO
    // 1. make the testIntervention the actual intervention laoded
    // 2. when value changes it should (via an extender) run an update on the actual meteor record, if different

    //config
    self.options = allOptions;
    self.sections = ko.observableArray([
      new Section('launchPad', 'Intervention'),
      new Section('firstAid', 'First Aid'),
      new Section('diversion'),
      new Section('support'),
      new Section('advice'),
      new Section('nonService', 'GoA / Non Service'),
      new Section('transport'),
      new Section('peopleFull'),
      new Section('peopleCompact'),
      new Section('landingPad', 'Protocols'),
    ]);

    //launchpad fields
    self.date = ko.observable(currentTime.format('YYYY[-]MM[-]DD')).extend({
      required: true,
      date: true,
      label: 'Date',
    });
    self.time = ko.observable(currentTime.format('HH[:]mm')).extend({
      required: true,
      time: true,
      label: 'Time',
    });
    self.type = ko.observable().extend({
      required: true,
      label: 'Type',
    });
    self.respondingTo = ko.observableArray().extend({
      required: true,
      label: 'Responding To',
    });
    self.liquorAccordPrecinct = ko.observable().extend({
      required: true,
      label: 'Liquor Accord Precinct',
    });
    self.liquorAccordPrecinct.subscribe( function( newValue ) {
      //
      Interventions.update({_id: "erBDv62vwFcMtAdL9"}, {liquorAccordPrecinct: newValue});
      console.log('new value: ', newValue);
      return true;
      //self.liquorAccordPrecinct(newValue);
    });
    self.setting = ko.observable().extend({
      required: true,
      label: 'Intervention Setting',
    });
    self.locationDescription = ko.observable().extend({
      required: false,
      label: 'Intervention Location',
    });
    self.locationCoordinates = ko.observable().extend({
      required: false,
    });
    self.locationError = ko.observable('Finding Location...');// this could be integrated into locationCoord..

    //launchpad validation
    self.launchpadIsValid = ko.computed( function() {
      result = true;
      if ( ! self.date.isValid() ) { return false; };
      if ( ! self.time.isValid() ) { return false; };
      if ( ! self.type.isValid() ) { return false; };
      if ( ! self.respondingTo.isValid() ) { return false; };
      if ( ! self.liquorAccordPrecinct.isValid() ) { return false; };
      if ( ! self.locationDescription.isValid() ) { return false; };
      if ( ! self.locationCoordinates.isValid() ) { return false; };
      //needs to pass all the tests...
      return result;
    });

    // in all middle sections
    self.interventionNotes = ko.observable().extend({
      required: false,
      label: 'Intervention Notes',
    })
    //first aid section fields
    self.conditionType = ko.observableArray().extend({
      required: true,
      label: 'Condition Type',
    });
    self.conditionRating = ko.observable().extend({
      required: true,
      label: 'Condition Rating'
    });
    self.transportedTo = ko.observable().extend({
      required: true,
      label: 'Transported To',
    }); //Note - gets used in TWO sections!

    //diversion section fields
    self.diversionType = ko.observableArray().extend({
      required: true,
      label: 'Diversion',
    });

    //support section fields
    self.supportGivenTo = ko.observableArray().extend({
      required: true,
      label: 'Support Given To',
    });

    //advice section fields
    self.adviceGivenTo = ko.observableArray().extend({
      required: true,
      label: 'Advice Given To'
    });

    // transport section fields
    // none - as the transported to gets used in there also
    self.transportConditionType = ko.observableArray().extend({
      required: true,
      label: 'Transport Condition Type',
    });

    // nonService section fields
    self.nonServiceType = ko.observable().extend({
      required: true,
      label: 'GoA / Non-Service',
    });


    // people
    self.culturalBackground = ko.observableArray().extend({
      required: true,
      label: 'Cultural Background',
    });

    //landingpad fields
    self.teamMemberNotes = ko.observable().extend({
      required: true,
      label: 'Team Member Notes',
    });

    //functions
    self.selectOption = function($data, event) {
      var optionObservable = self[$data.category];
      var selectedValue = $data.value;
      if ($.isArray(optionObservable())) {
        if (optionObservable.indexOf(selectedValue) > -1) {
          optionObservable.remove(selectedValue);
        } else {
          optionObservable.push(selectedValue);
        }
      } else {
        optionObservable(selectedValue);
      }
    };

    self.allErrors = ko.computed( function() {
      var result = [];
      if ( ! self.date.isValid() ) { result.push(new fieldError('launchpad', 'date')); };
      if ( ! self.time.isValid() ) { result.push(new fieldError('launchpad', 'time')); };
      if ( ! self.type.isValid() ) { result.push(new fieldError('launchpad', 'type')); };
      if ( ! self.respondingTo.isValid() ) { result.push(new fieldError('launchpad', 'respondingTo')); };
      if ( ! self.liquorAccordPrecinct.isValid() ) { result.push(new fieldError('launchpad', 'liquorAccordPrecinct')); };
      if ( ! self.locationDescription.isValid() ) { result.push(new fieldError('launchpad', 'locationDescription')); };
      if ( ! self.locationCoordinates.isValid() ) { result.push(new fieldError('launchpad', 'locationLatitude')); };
      return result;
    });
  };
  var currentViewModel = new buildViewModel;
  navigator.geolocation.getCurrentPosition(
    function(position) {
      currentViewModel.locationCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      currentViewModel.locationError(null);
      //alert("Lat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
    },
    function(error){
      currentViewModel.locationError(error.message);
    },
    {
      enableHighAccuracy: true,
      timeout : 10000
    }
  );
  ko.applyBindings(currentViewModel);
  //https://github.com/steveluscher/knockout.meteor/blob/master/examples/dynamic_finders/example.js
  //also helps//https://github.com/bevanhunt/meteor-barista/blob/master/client/coffee/orders.coffee
  //console.. ko.dataFor(document.body) (gets the viewModel)
};



