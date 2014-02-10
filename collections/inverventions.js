Interventions = new Meteor.Collection("interventions", {
  virtualFields: {
    startedMoment:  function(i) {
      return moment( i.startDate + ' ' + i.startTime + ':00', "YYYY-MM-DD HH:mm:ss" );
    },
    updatedMoment: function(i) {
      return moment(i.updatedOn);
    },
    //make this automatic at some point (ie. for all fields go through & do this)
    typeName: function(i) {
      var option = _.findWhere(allOptions, { fieldName: 'type', value: i.type} );
      if (option) {
        return option.name; 
      }
      else return 'No Type';
    },
    typeHtml: function(i) {
      var option = _.findWhere(allOptions, { fieldName: 'type', value: i.type} );
      if (option) {
        return option.html; 
      }
      else return '<i class="fa fa-fw fa-question-circle"></i> New intervention';
    },
    status: function(i) {
      if ( i.completedOn ) { return 'Completed' };
      return 'In Progress';
    },
    ownerUser: function(i) {
      return Meteor.users.findOne( {_id: i.ownerId} );
    },
    ownerName: function(i) {
      var result = 'no one';
      if (_.isObject(i.ownerUser)) {
        result = i.ownerUser.profile.firstName;
      }
      return result;
    },
    statusDescription: function(i) {
      var result = 'Started by <strong>' + i.ownerName + '</strong> ';
      result += i.startedMoment.fromNow() + ', ';
      result += 'last edited ' + i.updatedMoment.fromNow() + ', ';
      if ( i.completedOn ) {
        result += ' completed ' + moment(i.completedOn).fromNow() + '.';
      } else {
        result += ' not yet completed.';  
      }
      return result;
    },
    prettyPrint: function(i) {
      return JSON.stringify(i, true, 2);
    },
  }
});

/*
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
*/

Meteor.methods({
  addIntervention: function(options) {
    var self = this;
    var options = options || {};
    //var user = Meteor.user();
    // Future - check that the user is logged in etc
    var clientIP = new getIP();
    var now = new getNow();

    var user = Meteor.user();
    userId = null;    
    if ( user ) {
      userId = user._id;
    };

    var intervention = {
      reference: incrementCounter('interventionReference'),
      createdOn: now.format(),
      createdByIp: clientIP,
      createdById: userId,
      updatedOn: now.format(),
      updatedByIp: clientIP,
      updatedById: userId,
    };

    if ( options.setOwnerAsCurrentUser && userId) {
      intervention.ownerId = userId;
      //intervention.ownerUser = Meteor.users.findOne( {_id: userId} );
    };

    if ( options.setStartAsNow ) {
      intervention.startDate = now.format('YYYY[-]MM[-]DD');
      intervention.startTime = now.format('HH[:]mm');
    };

    if ( options.setDispatchAsNow ) {
      intervention.dispatchTime = now.format('HH[:]mm');
    };

    newInterventionId = Interventions.insert(intervention);
    return newInterventionId;
  },
  updateIntervention: function(interventionId, values, options) {
    var self = this;
    console.log(interventionId, values, options);
    //var user = Meteor.user();
    // Future - check that the user is logged in etc
    var clientIP = new getIP();
    var now = new getNow();

    var user = Meteor.user();
    userId = null;    
    if ( user ) {
      userId = user._id;
    };

    var intervention = _.extend({
      updatedOn: now.format(),
      updatedByIp: clientIP,
      updatedById: userId,
    }, values );
    Interventions.update(
      { _id: interventionId },
      { $set: intervention }
      );
    return interventionId;
  },
  clearIntervention: function(interventionId, options) {
    intervention = Interventions.findOne({_id: interventionId});
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
    clearedIntervention = {};
    _.each(intervention, function(value, key, list) {
      if (doNotClear.indexOf(key) == -1 ) {
        clearedIntervention[key] = "";
      }
    });
    console.log(interventionId, options, clearedIntervention);
    Interventions.update(
      { _id: interventionId },
      { $unset: clearedIntervention }
    );
    return interventionId;
  },
  removeIntervention: function(interventionId, options) {
    Interventions.remove(interventionId);
    return true;
  },
});

/*
Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user(),
      postWithSameLink = Posts.findOne({url: postAttributes.url});
    
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "you need to log in to post new stories");

    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'please fill in a headline');
    
    // ensure the post has a url
    if (!postAttributes.url)
      throw new Meteor.Error(422, 'please fill in a url');

    // check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302, 
        'this link has already been posted',
        postWithSameLink._id);
    }

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
      title: postAttributes.title,// + (this.iSimulation ? '(client)' : '(server)'),
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
      commentsCount: 0,
      upvoters: [],
      votes: 0,
    });

    var postId = Posts.insert(post);

    return postId;
  },
  upvote: function(postId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, 'You need to login to upvote');
    Posts.update({
      _id: postId,
      upvoters: {$ne: user._id}
    }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
  }
});
*/