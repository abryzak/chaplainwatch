/*
1. See if there is a geolocate IP meteorite thing
2. loading progress
3. MUST have better radio/checkboxes
4. REMEMBER this is just a static version!
4. Install fontawesome (not sure on the mrt package)
*/

if (Meteor.isClient) {
  var test = ko.observable("Testing dynamic Text");
  var viewModel = {
    "test": test,
  };
  /*
  Template.hello.greeting = function () {
    return "Welcome to chaplain-watch.";
  };


  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
  */
  Meteor.startup( function() { ko.applyBindings(viewModel); } );
  //https://github.com/steveluscher/knockout.meteor/blob/master/examples/dynamic_finders/example.js
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
