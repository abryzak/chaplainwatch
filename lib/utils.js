responseNamesFromField = function(doc, fieldName, as, nullResponse, responseType) {
  var responseType = responseType || _.findWhere( interventionFields, { name: fieldName} ).response;
  var as = as || 'name';
  nullResponse = nullResponse || ' ';
  if ( responseType == 'multi-select' ) {
    var options = _.filter( allOptions, function(opt) {
      return ( ( opt.fieldName == fieldName ) && _.contains(doc[fieldName], opt.value) );
    });
    var optionNames = _.pluck(options, as);
    if ( optionNames.length > 0 ) {
      return _.str.toSentence( optionNames );  
    }
    return nullResponse;
  } else {
    var option = _.findWhere( allOptions, { fieldName: fieldName, value: doc[fieldName] });
    if (option) {
      return option[as];
    }
    return nullResponse;
  }
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