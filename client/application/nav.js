Template.nav.events({
	'click #new-intervention' : function(e, template) {
		e.preventDefault;
		newInterventionId = Meteor.call('addIntervention', {}, function(error, id) {
			if (error) {
				alert(error);
			} else {
				Router.go('editIntervention', {_id: id});
			}
		});
	}
});