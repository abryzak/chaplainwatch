Template.responseComponent.events({
  'blur .update-on-blur' : function( event ) {
    var updatedValue = event.currentTarget.value;
    var values = {};
    values[this.name] = updatedValue;
    //console.log('documentId', documentId);
    Meteor.call('updateIntervention', this.documentId, values, function(error, id) {
      if ( error ) {
        alert(error.reason);
      } else {
      }
    });
  },
  'blur .update-grid-on-blur' : function( event ) {
    var updatedValue = parseInt(event.currentTarget.value);
    //console.log(this, event);
    var values = {};
    values[this.fieldName] = _.extend({},this.$parent.value);
    values[this.fieldName][this.value] = updatedValue;
    Meteor.call('updateIntervention', this.$parent.documentId, values, function(error, id) {
      if ( error ) {
        alert(error.reason);
      } else {
      }
    });
  },
  'click .update-selection-on-click' : function( event ) {
    var optionToToggle = this.value;
    var updatedValue = optionToToggle;
    if ( this.$parent.response == 'multi-select' ) {
      updatedArray = toggleItemInArray(this.$parent.value, optionToToggle);
      updatedValue = updatedArray;
    }
    var values = {};
    values[this.fieldName] = updatedValue;
    Meteor.call('updateIntervention', this.$parent.documentId, values, function(error, id) {
      if ( error ) {
        alert(error.reason);
      } else {
      }
    });
  },
  'click .geolocation' : function( event ) {
    var updatedValues = {};
    var documentId = this.documentId;
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        updatedValues.locationCoordinates = [latitude, longitude];
        updatedValues.locationError = null;
        Meteor.call('updateIntervention', documentId, updatedValues, function(error, id) {
          if ( error ) {
            alert(error.reason);
          } else {
          }
        });
        },
        function(error){
          updatedValues.locationCoordinates = error.message;
          updatedValues.locationError = error.message;
          Meteor.call('updateIntervention', documentId, updatedValues, function(error, id) {
            if ( error ) {
              alert(error.reason);
            } else {
            }
          });
        },
        {
          enableHighAccuracy: true,
          timeout : 10000
        }
      );
  },
  'click .landing-button' : function( event ) {
    var values = {
      completedOn: new moment().format(),
    }
    //console.log('landing button clicked');
    Meteor.call('updateIntervention', this.documentId, values, function(error, id) {
      if ( error ) {
        alert(error.reason);
      } else {
        Router.go('showIntervention', {_id: id});
      }
    });
  },
  'click .show-all-options' : function( event ) {
    $element = $(event.srcElement);
    $element.closest('ul').children('li').removeClass('hidden')
    $element.addClass('hidden');
  }
});
