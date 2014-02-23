Template.basicDashboard.created = function() {
  if ( UserSession.get('selectedFilter') == undefined ) {
    UserSession.set( 'selectedFilter', Template.basicDashboard.filterOptions()[0].name );
  }
  if ( UserSession.get('selectedSort') == undefined ) {
    UserSession.set( 'selectedSort', Template.basicDashboard.sortOptions()[0].name );
  }
};

Template.basicDashboard.interventionsFiltered = function() {
  var interventionsFiltered = [];
  var selectedFilter = _.findWhere(
    Template.basicDashboard.filterOptions(),
    {name: UserSession.get( 'selectedFilter' )}
    );
  _.each(this.interventions, function( intervention ) {
    if ( selectedFilter.include( intervention ) ) {
      interventionsFiltered.push( intervention );
    }
  }, this);
  return interventionsFiltered;
}

Template.basicDashboard.filterOptions = function() {
	return [
		{
      'name': 'myInProgress',
      label: 'My In Progress',
      include: function( intervention ) {
        return ( ( Meteor.user()._id == intervention.ownerId ) && ( intervention.status != 'Completed' ) );
      }
    },
		{
      'name': 'myCompleted',
      label: 'My Completed',
      include: function( intervention ) {
        return ( ( Meteor.user()._id == intervention.ownerId ) && ( intervention.status == 'Completed' ) );
      }
    },
		{
      'name': 'allInProgress',
      label: 'All In Progress',
      include: function( intervention ) {
        return ( intervention.status != 'Completed' );
      }
    },
		{
      'name': 'all',
      label: 'All Recent',
      include: function( intervention ) {
        return true;
      }
    },
	];
};
Template.basicDashboard.sortOptions = function() {
	return [
		{'name': 'dateDesc', label: 'Newest First'},
		{'name': 'dateAsc', label: 'Oldest First'},
	];
};


Template.basicDashboard.events({
  'click .select-filter': function() {
    UserSession.set('selectedFilter', this.name);
  },
  'click .select-sort': function() {
    UserSession.set('selectedSort', this.name);
  },
});