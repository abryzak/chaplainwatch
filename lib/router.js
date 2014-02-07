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
        interventions: Interventions.find(),
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
      //var params = this.params;
      return {
        //customInfo: 'hey',
        //params: this.params,
        interventions: Interventions.find({}, {sort: {reference: -1} })
      }
    },
    //waitOn: function() {
    //  return [Meteor.subscribe('interventions', {}), Meteor.subscribe('users', {})];
    //},
  });
  this.route('editIntervention', {
    path: '/intervention/:_id/edit',
    template: 'editIntervention',
    data: function() {
      //return {documentId: this.params._id };
      var i = Interventions.findOne({_id: this.params._id})
      //console.log('router intervention', i);
      return i;
    }
  });
  this.route('showIntervention', {
    path: '/intervention/:_id/',
    template: 'showIntervention',
    data: function() {
      return Interventions.findOne({_id: this.params._id});
    }
  });
  //this.route('reports'), {
  //  template: 'reports',
  //}
  //ORIGINAL KNOCKOUT VERSION
  this.route('oldEditIntervention', {
  	path: '/intervention/:_id/oldEdit',
  	template: 'oldEditIntervention',
  	data: function() {
      return Interventions.findOne({_id: this.params._id});
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

