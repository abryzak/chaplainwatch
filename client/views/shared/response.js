Template.response.events({
  'blur .update-on-blur' : function( event ) {
    var updatedValue = event.currentTarget.value;
    var values = {};
    values[this.name] = updatedValue;
    console.log('update-on-blur', this);
    updateDocument = 'update' + _.str.titleize( this.documentCollection );
    Meteor.call( updateDocument , this.documentId, values, function(error, id) {
      if ( error ) {
        alert(error.reason);
      } else {
      }
    });
  },
  'blur .update-composite-on-blur' : function( event ) {
    var currentCompositeElementId = event.currentTarget.getAttribute('data-composite');
    var currentCompositeValue = document.getElementById(currentCompositeElementId).value;
    var updatedPartial = event.currentTarget.value;
    var partialType = event.currentTarget.getAttribute('data-partial');
    var updatedValue = new moment( currentCompositeValue );
    if ( partialType == 'date' ) {
      var partialDate = new moment( updatedPartial, 'YYYY-MM-DD' );
      updatedValue.year( partialDate.year() ).month( partialDate.month() ).date( partialDate.date() ); 
    } else if ( partialType == 'time' )
    {
      var partialTime = new moment( updatedPartial, 'HH:mm:ss' );
      updatedValue.hour( partialTime.hour() ).minute( partialTime.minute() ).second( partialTime.second() ); 
    } else {
      console.log( 'could not match partialType' );
    }
    
    var values = {};
    updatedValue = updatedValue.toDate();
    values[this.name] = updatedValue;
    updateDocument = 'update' + _.str.titleize( this.documentCollection );
    Meteor.call( updateDocument , this.documentId, values, function(error, id) {
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
    values[this.responseName] = _.extend({},this.$parent.value);
    values[this.responseName][this.value] = updatedValue;
    updateDocument = 'update' + _.str.titleize( this.$parent.documentCollection );
    Meteor.call( updateDocument , this.$parent.documentId, values, function(error, id) {
      if ( error ) {
        alert(error.reason);
      } else {
      }
    });
  },
  'click .update-selection-on-click' : function( event ) {
    var optionToToggle = this.value;
    var updatedValue = optionToToggle;
    if ( this.$parent.type == 'multi-select' ) {
      updatedArray = toggleItemInArray(this.$parent.value, optionToToggle);
      updatedValue = updatedArray;
    }
    var values = {};
    values[this.responseName] = updatedValue;
    updateDocument = 'update' + _.str.titleize( this.$parent.documentCollection );
    Meteor.call( updateDocument , this.$parent.documentId, values, function(error, id) {
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
        updateDocument = 'update' + _.str.titleize( this.documentCollection );
        Meteor.call( updateDocument , documentId, updatedValues, function(error, id) {
          if ( error ) {
            alert(error.reason);
          } else {
          }
        });
        },
        function(error){
          updatedValues.locationCoordinates = error.message;
          updatedValues.locationError = error.message;
          updateDocument = 'update' + _.str.titleize( this.documentCollection );
          Meteor.call( updateDocument , documentId, updatedValues, function(error, id) {
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
    updateDocument = 'update' + _.str.titleize( this.documentCollection );
    Meteor.call( updateDocument , this.documentId, values, function(error, id) {
      if ( error ) {
        alert(error.reason);
      } else {
        Router.go('viewIntervention', {_id: id});
      }
    });
  },
  'click .show-all-options' : function( event ) {
    $element = $(event.srcElement);
    $element.closest('ul').children('li').removeClass('hidden')
    $element.addClass('hidden');
  },
  'click .add-document-on-click' : function( event, template ) {
    event.preventDefault();
    //this is not generic, but at the moment only used for person
    var newPersonId = Meteor.call( 'addPerson', {}, this.documentId,
      function(error, id) {
        if (error) {
          alert(error);
        }
      }
    );
  }
});
