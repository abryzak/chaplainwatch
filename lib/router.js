Router.configure({
  layoutTemplate: 'layout',
  //loadingTemplate: 'loading',
});
Router.map(function() {
  this.route('home', {
    path: '/',
    template: '',
    data: function() {
    	var customInfo = 'hey';
    	var params = this.params;
    },
  });
  this.route('interventionEdit', {
  	path: '/intervention/:_id',
  	template: 'interventionEdit',
  	data: function() { return Interventions.findOne(this.params._id); }
  });
});
