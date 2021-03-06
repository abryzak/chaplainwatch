Handlebars.registerHelper('prettyResponse', function( value, fieldName ) {
  return responseValueOutput( value, fieldName, 'html', '<small>Not Entered</small>' );
});

Handlebars.registerHelper('include', function(options) {
  var context = {},
    mergeContext = function(obj) {
        for(var k in obj)context[k]=obj[k];
    };
  mergeContext(this);
  mergeContext(options.hash);
  return options.fn(context);
});

Handlebars.registerHelper('$inList', function(item, array) {
	if ( _.isArray(array) ) {
		return ( array.indexOf( item ) > -1 );
	} else {
		return false;
	}
});

Handlebars.registerHelper('$get', function(obj, key) {
  if ( _.isObject(obj) ) {
    return ( obj[key] );
  }
});

Handlebars.registerHelper('24HourTime', function(dateTimeString) {
	return moment(dateTimeString).format('HH:mm');
});

Handlebars.registerHelper('userSessionEquals', function(key, value) {
	return UserSession.equals(key, value) || false;
});

Handlebars.registerHelper('userEmail', function(user) {
	return user.emails[0].address
});
