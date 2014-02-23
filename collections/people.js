People = new Meteor.Collection("people", {
  virtualFields: {},
});


Meteor.methods({
  addPerson: function(options, interventionId) {
    console.log('addPerson', options, interventionId)
    var options = options || {};
    var person = _.extend( new defaultFields( true ), {
      interventionId: interventionId,
    });
    var newId = People.insert(person);
    return newId;
  },
  updatePerson: function(personId, values, options) {
    console.log(personId, values, options);
    var person = _.extend( new defaultFields, values );
    People.update(
      { _id: personId },
      { $set: person }
      );
    return personId;
  },
  removePerson: function(personId, options) {
    People.remove(personId);
    return true;
  },
});