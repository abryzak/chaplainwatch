Interventions = new Meteor.Collection("interventions");

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

Meteor.methods({
  addIntervention: function(options) {
    var self = this;
    var options = options || {};
    //var user = Meteor.user();
    // Future - check that the user is logged in etc
    var clientIP = getIP(self);
    var now = moment();

    var user = Meteor.user();
    userId = null;    
    if ( user ) {
      userId = user._id;
    };

    var intervention = {
      createdOn: now.format(),
      createdByIp: clientIP,
      createdById: userId,
      updatedOn: now.format(),
      updatedByIp: clientIP,
      updatedById: userId,
    };

    if ( options.setOwnerAsCurrentUser && userId) {
      intervention.ownerId = userId;
      intervention.ownerUser = Meteor.users.findOne( {_id: userId} );
    };

    if ( options.setStartAsNow ) {
      intervention.startDate = now.format('YYYY[-]MM[-]DD');
      intervention.startTime = now.format('HH[:]mm');
    }

    newInterventionId = Interventions.insert(intervention);
    return newInterventionId;
  },
  updateIntervention: function(interventionId, values, options) {
    var self = this;
    console.log(interventionId, values, options);
    //var user = Meteor.user();
    // Future - check that the user is logged in etc
    var clientIP = getIP(self);
    var now = moment();
    if ( values.ownerId ) {
      values.ownerUser = Meteor.users.findOne( {_id: values.ownerId} );
      //this will NOT be live, and is a work around until collection-helpers works
    }

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
  }
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