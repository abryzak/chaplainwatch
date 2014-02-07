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