Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
    Meteor.subscribe('interventions', {}),
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
        interventions: Interventions.find({}, {sort: {reference: -1} }).fetch(),
      }
    },
    waitOn: function() {
      return Meteor.subscribe('interventions', {});
    },
  });

  this.route('hqDashboard', {
    path: '/dashboard',
    template: 'dashboard',
    data: function () {
      return {
        interventions: Interventions.find({}, {sort: {reference: -1} }),
      }
    },
  });

  this.route('editIntervention', {
    path: '/intervention/:_id/edit',
    template: 'editIntervention',
    data: function() {
      var i = Interventions.findOne({_id: this.params._id});
      return i;
    }
  });

  this.route('showIntervention', {
    path: '/intervention/:_id',
    template: 'showIntervention',
    data: function() {
      return Interventions.findOne({_id: this.params._id});
    }
  });

  this.route('report', {
    path: '/report',
    template: 'report',
    data: function() {
      return {
        interventions: Interventions.find({}, {sort: {reference: -1} }).fetch(),
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

