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
        customInfo: 'hey',
        //params: this.params,
        interventions: Interventions.find({}),
      }
    },
  });
  this.route('interventionEdit', {
  	path: '/intervention/:_id',
  	template: 'interventionEdit',
  	data: function() {
      return Interventions.findOne(this.params._id);
    }
  });
});
