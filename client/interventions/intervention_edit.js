Template.interventionEdit.created = function () {
  //<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></script>
  //Meteor.Loader.loadJs('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places');
}

//var Interventions = new Meteor.Collection("interventions");
Template.interventionEdit.rendered = function() {
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

//the value '5' is the second arg ('otherVal') that is passed to the validator
var myCustomObj = ko.observable().extend({ mustEqual: 5 });
  /*
  $('#intervention-place').placesSearch({
    onSelectAddress: function(result, element) {
      $(element).data(result);
    },
  });
  */
  var currentTime = new moment();
  ko.validation.configure({//Cut & paste - see what these do
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
  }
  var Option = function(category, value, name, html) {
    var self = this;
    self.value = value;
    self.text = name || value;
    self.html = ko.computed(function() {
      if (html != undefined) {
        return html;
      }
      return name;
    });
    self.category = category;
  }
  var allOptions = [
    new Option('respondingTo', 'none', 'None'),
    new Option('respondingTo', 'nightsafe', 'NightSafe'),
    new Option('respondingTo', 'city-safe', 'City Safe'),
    new Option('respondingTo', 'venue', 'Venue'),
    new Option('respondingTo', 'police', 'Police'),
    new Option('respondingTo', 'taxi', 'Taxi'),
    new Option('respondingTo', 'ambulance', 'Ambulance'),
    new Option('respondingTo', 'public', 'Public'),
    new Option('respondingTo', 'other', 'Other'),
    new Option('liquorAccordPrecinct', 'valley', 'Valley'),
    new Option('liquorAccordPrecinct', 'cbd', 'CBD'),
    new Option('liquorAccordPrecinct', 'caxton-street', 'Caxton Street'),
    new Option('liquorAccordPrecinct', 'west-end', 'West End'),
    new Option('liquorAccordPrecinct', 'other', 'Other'),
    new Option('type', 'first-aid', 'First Aid', '<i class="fa fa-medkit fa-fw"></i> First Aid'),
    new Option('type', 'diversion', 'Diversion', '<i class="fa fa-group fa-fw"></i> Diversion'),
    new Option('type', 'support', 'Support', '<i class="fa fa-smile-o fa-fw"></i> Support'),
    new Option('type', 'non-service', 'GoA/ Non-Service', '<i class="fa fa-question-circle fa-fw"></i> GoA / Non-Service'),
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
  ]
  var buildViewModel = function() {
    var self = this;

    //config
    self.options = allOptions;
    self.test = ko.observable("Testing dynamic Text");

    //launchpad fields
    self.date = ko.observable(currentTime.format('YYYY[-]MM[-]DD')).extend({
      required: true,
      date: true,
    });
    self.time = ko.observable(currentTime.format('HH[:]mm')).extend({
      required: true,
      time: true,
    });
    self.type = ko.observable().extend({
      required: true
    });
    self.respondingTo = ko.observableArray().extend({
      required: true
    });
    self.liquorAccordPrecinct = ko.observable().extend({
      required: true
    });
    self.locationDescription = ko.observable().extend({
      required: false
    });
    self.locationLatitude = ko.observable().extend({
      required: false
    });
    self.locationLongitude = ko.observable().extend({
      required: false
    });
    self.locationError = ko.observable();

    //launchpad validation
    self.launchpadIsValid = ko.computed( function() {
      result = true;
      if ( ! self.date.isValid() ) { return false; };
      if ( ! self.time.isValid() ) { return false; };
      if ( ! self.type.isValid() ) { return false; };
      if ( ! self.respondingTo.isValid() ) { return false; };
      if ( ! self.liquorAccordPrecinct.isValid() ) { return false; };
      if ( ! self.locationDescription.isValid() ) { return false; };
      if ( ! self.locationLatitude.isValid() ) { return false; };
      if ( ! self.locationLongitude.isValid() ) { return false; };
      //needs to pass all the tests...
      return result;
    });


    //landingpad fields

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
      if ( ! self.locationLatitude.isValid() ) { result.push(new fieldError('launchpad', 'locationLatitude')); };
      if ( ! self.locationLongitude.isValid() ) { result.push(new fieldError('launchpad', 'locationLongitude')); };
      return result;
    });
  };
  var currentViewModel = new buildViewModel;
  navigator.geolocation.getCurrentPosition(
    function(position) {
      currentViewModel.locationLatitude(position.coords.latitude);
      currentViewModel.locationLongitude(position.coords.longitude);
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



