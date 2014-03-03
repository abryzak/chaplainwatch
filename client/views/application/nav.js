Template.nav.events({
	'click #new-intervention' : function(event) {
		event.preventDefault;
		var newInterventionId = Meteor.call(
			'addIntervention',
			{
				'setOwnerAsCurrentUser': true,
				'setStartAsNow': true
			},
			function(error, id) {
			if (error) {
				alert(error);
			} else {
				Alerts.add('New Intervention created.', 'success');
				Router.go('editIntervention', {_id: id});
			}
		});
	}
});