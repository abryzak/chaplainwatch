/*
1. See if there is a geolocate IP meteorite thing
2. loading progress
3. MUST have better radio/checkboxes
4. REMEMBER this is just a static version!
4. Install fontawesome (not sure on the mrt package)
*/

if (Meteor.isClient) {
  var Option = function(category, value, name, html) {
    var self = this;
    self.value = value;
    self.text = name;
    self.html = function() {
      if (html != undefined) {
        return html;
      }
      return name;
    };
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
  ]
  var buildViewModel = function() {
    var self = this;

    //config
    self.options = allOptions;
    self.test = ko.observable("Testing dynamic Text");

    //launchpad fields
    self.respondingTo = ko.observableArray().extend({required: true});
    self.liquorAccordPrecinct = ko.observable().extend({required: true});
    self.locationLatitude = ko.observable();
    self.locationLongitude = ko.observable();
    self.locationError = ko.observable();


    //landingpad fields

    //functions
    self.selectOption = function($data, event) {
      var optionObservable = self[$data.category];
      var selectedValue = $data.value;
      //console.log('isArray', $.isArray(optionObservable()))
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
  Meteor.startup( function() { ko.applyBindings(currentViewModel); } );
  //https://github.com/steveluscher/knockout.meteor/blob/master/examples/dynamic_finders/example.js
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
