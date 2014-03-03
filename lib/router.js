Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
    Meteor.subscribe('interventions', {}),
    Meteor.subscribe('people', {}),
    //Meteor.subscribe('users', {}),
    ];
  },
});
Router.map(function() {

  this.route('home', {
    path: '/',
    template: 'home',
    data: function () {
      return {
        interventions: Interventions.find({ destroyed: {$ne: true} }, {
          sort: {reference: -1},
          limit: 50
        }).fetch(),
      }
    },
    waitOn: function() {
      return [
      Meteor.subscribe('interventions', {}),
      Meteor.subscribe('people', {}),
      ];
    },
  });

  this.route('dashboard', {
    path: '/dashboard',
    template: 'dashboard',
    data: function () {
      return {
        interventions: Interventions.find({ destroyed: {$ne: true} }, {
          sort: {reference: -1},
          limit: 50
        }).fetch(),
      }
    },
  });

  this.route('editIntervention', {
    path: '/intervention/:_id/edit',
    template: 'editIntervention',
    data: function() {
      return {
        intervention: Interventions.findOne( {_id: this.params._id} ),
        people: People.find( { interventionId: this.params._id } ).fetch(),
      }
    }
  });

  this.route('viewIntervention', {
    path: '/intervention/:_id',
    template: 'viewIntervention',
    data: function() {
      return {
        intervention: Interventions.findOne( {_id: this.params._id} ),
        people: People.find( { interventionId: this.params._id } ).fetch(),
      }
    }
  });

  this.route('report', {
    path: '/report',
    template: 'report',
    data: function() {
      return {
        interventions: Interventions.find({ destroyed: { $ne: true } }, {sort: {reference: -1} }).fetch(),
      }
    }
  });

});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    this.stop();
  }
}

Router.before(requireLogin, {except: [
    'entrySignIn',
    'entrySignUp',
    'entryForgotPassword',
    'entryResetPassword',
  ]});

Router.before(function () { Alerts.removeSeen(); });

