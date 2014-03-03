responseValueOutput = function(value, responseName, as, nullResponse, responseType) {
  var responseType = responseType || _.findWhere( allResponses, { name: responseName} ).type;
  var as = as || 'name';
  nullResponse = nullResponse || ' ';
  result = nullResponse;
  if ( responseType == 'multi-select' ) {
    var options = _.filter( allOptions, function(opt) {
      return ( ( opt.responseName == responseName ) && _.contains(value, opt.value) );
    });
    var optionNames = _.pluck(options, as);
    if ( optionNames.length > 0 ) {
      result = _.str.toSentence( optionNames );
    }
  } else if ( responseType == 'single-select' ) {
    var option = _.findWhere( allOptions, { responseName: responseName, value: value });
    if (option) {
      result = option[as];
    } else {
      result = value;
    }
  } else if ( responseType == 'geolocation' ) {
    if ( value ) {
      var mapsLink = 'http://maps.google.com/?q=' + value;
      result = '<i class="fa fa-map-marker"></i> <a href="' + mapsLink + '" target="_blank"><small>' + value + '</small></a>';
    }
  } else if ( responseType == 'grid' ) {
    result = 'grid';
  } else {
    if ( value ) {
      result = value;
    }
  }
  return result;
};



getNow = function() {
	return moment().tz('Australia/Brisbane');
};

getIP = function() {
  var clientIP = null;
  if ( Meteor.isClient ) {
    clientIP = headers.getClientIP();
  } else {
    //var clientIP = headers.methodClientIP(this);
    //having issues with this on start up (i think its creating records before the connection is set up?)
  }
  return clientIP;
};

toggleItemInArray = function(array, item) {
  var newArray = [];
  if ( ! _.isArray(array) ) {
    if ( _.isString(array) ) {
      newArray.push(array)
    }
  } else {
    newArray = _.toArray(array); // clone in case there are issues
  }
  var i = newArray.indexOf(item);
  if ( i > -1 ) {
    newArray.splice(i, 1);
  } else {
    newArray.push(item);
  }
  return newArray;
};

isValid = function(required, value) {
  if ( required ) {
    if ( value == null ) { return false};
    if ( value == "" ) { return false};
    if ( value == undefined ) { return false};
    return true;
  } else {
    return true;
  }
};

escapeRegExp = function(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

replaceAll = function(find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

getCounter = function(name, defaultValue) {
  var nextCounter = incrementCounter( name );
  if ( nextCounter == 1 ) {
    console.log('counter is 1', nextCounter);
    if ( defaultValue ) {
      setCounter( name, defaultValue );
      return defaultValue;
    } 
  } 
  return nextCounter;
}

defaultFields = function( onCreate ) {
  //var user = Meteor.user();
  // Future - check that the user is logged in etc
  var onCreate = onCreate || false;
  var clientIP = new getIP();
  var now = new getNow();

  var user = Meteor.user();
  userId = null;    
  if ( user ) {
    userId = user._id;
  };
  var result = {
    updatedOn: now.toDate(),
    updatedByIp: clientIP,
    updatedById: userId,
    destroyed: false,
  };
  if ( onCreate ) {
    result.createdOn = now.toDate();
    result.createdByIp = clientIP;
    result.createdById = userId;
  }
  return result;
}

doNotClear = [
  '_id',
  'reference',
  'createdOn',
  'createdByIp',
  'createdById',
  'updatedOn',
  'updatedByIp',
  'updatedById',
]
