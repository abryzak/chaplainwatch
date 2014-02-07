Handlebars.registerHelper('interventionExtend', function(intervention) {
	//need to move this to somwhere client & server can access
	var i = _.extend({}, intervention);
	//prbably best to go through all fields and to this automatically
	i.type_ = function() {
		var option = _.findWhere(allOptions, { fieldName: 'type', value: i.type} );
		if (option) {
			return option.html;	
		}
		else return '<i class="fa fa-fw fa-question-circle"></i> New intervention';
	};
	i.status = function() {
		if ( i.completedOn ) {
			return 'Completed'
		} else {
			return 'In Progress'
		}
	};
	i.started = moment(
		i.startDate + ' ' + i.startTime + ':00',
		"YYYY-MM-DD HH:mm:ss"
		);
	i.updated = moment(i.updatedOn);
	i.ownerName = function() {
		var result = 'no one';
		if (_.isObject(i.ownerUser)) {
			result = i.ownerUser.profile.firstName;
		}
		return result;
	};
	i.statusDescription = function() {
		var result = 'Started by <strong>' + i.ownerName() + '</strong> ';
		result += i.started.fromNow() + ', ';
		result += 'last edited ' + i.updated.fromNow() + ', ';
		if ( i.completedOn ) {
			result += ' completed ' + moment(i.completedOn).fromNow() + '.';
		}
		result += ' not yet completed.';
		return result;
	};
	i.prettyPrint = JSON.stringify(i, true, 2);
	return i;
});

Handlebars.registerHelper('interventionComponentOld', function(fieldName) {
	var field = _.findWhere(interventionFields, {name: fieldName});
	var value = this[fieldName];
	var data = _.extend({
		interventionId: this._id,
		value: value,
		isValid: isValid(field.required, value),
	}, field);
  return new Handlebars.SafeString(Template.interventionComponent(data));
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


Handlebars.registerHelper('userSessionEquals', function(key, value) {
	return UserSession.equals(key, value);
})