Template.basicDashboard.filterOptions = function() {
	return [
		{'name': 'myInProgress', label: 'My In Progress'},
		{'name': 'myCompleted', label: 'My Completed'},
		{'name': 'allInProgress', label: 'All In Progress'},
		{'name': 'all', label: 'All Recent'},
	];
};
Template.basicDashboard.sortOptions = function() {
	return [
		{'name': 'dateDesc', label: 'Newest First'},
		{'name': 'dateAsc', label: 'Oldest First'},
	];
};
Template.basicDashboard.rendered = function() {
	//sessions do not persist across reloads
	if ( UserSession.equals('selectedFilter', undefined) ) {
		UserSession.set( 'selectedFilter', Template.basicDashboard.filterOptions()[0].name );
	}
	if ( UserSession.equals('selectedSort', undefined) ) {
		UserSession.set( 'selectedSort', Template.basicDashboard.sortOptions()[0].name );
	}
};
Template.basicDashboard.events({
  'click .select-filter': function() {
    UserSession.set('selectedFilter', this.name);
  },
  'click .select-sort': function() {
    UserSession.set('selectedSort', this.name);
  },
});