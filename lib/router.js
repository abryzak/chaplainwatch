Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('interventions', {});
  },
});
Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home',
    data: function () {
      //var params = this.params;
      return {
        //customInfo: 'hey',
        //params: this.params,
        interventions: Interventions.find({}),
      }
    },
  });
  this.route('editIntervention', {
    path: '/intervention/:_id/edit',
    template: 'editIntervention',
    data: function() {
      return Interventions.findOne(this.params._id);
    }
  });
  //ORIGINAL KNOCKOUT VERSION
  this.route('oldEditIntervention', {
  	path: '/intervention/:_id',
  	template: 'oldEditIntervention',
  	data: function() {
      return Interventions.findOne(this.params._id);
    }
  });
});
