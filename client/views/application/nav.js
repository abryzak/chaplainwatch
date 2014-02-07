Template.nav.events({
	'click #new-intervention' : function(e, template) {
		e.preventDefault;
		newInterventionId = Meteor.call(
			'addIntervention',
			{
				'setOwnerAsCurrentUser': true,
				'setStartAsNow': true
			},
			function(error, id) {
			if (error) {
				alert(error);
			} else {
				Router.go('editIntervention', {_id: id});
			}
		});
	}
});