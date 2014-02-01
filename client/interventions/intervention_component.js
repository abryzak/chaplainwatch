Template.interventionComponent.helpers({
	label: function() { return this.label },
	placeholder: function() { return this.placeholder },
	value: function() { return this.value },
	interventionId: function() { return this.interventionId }
});

Template.interventionComponent.events({
	'blur .update-on-blur' : function(event) {
		updatedValue = event.currentTarget.value;
		values = {liquorAccordPrecinct: updatedValue};
		Meteor.call('updateIntervention', data.interventionId, values, function(error, id) {
			if (error) { alert(error.reason) } else { }
		});
	}
});