Interventions = new Meteor.Collection("interventions");

Meteor.methods({
	addIntervention: function(options) {
		//var user = Meteor.user();
		// Future - check that the user is logged in etc
		var clientIP = headers.methodClientIP(this);
		var now = moment();
		var intervention = {
			//set up vars like date / time & IP address & 
			start: now.format(),
			createdOn: now.fomat(),
			createdByIp: clientIP,
			//createdByUser: user,
		};
		newInterventionId = Interventions.insert(intervention);
		return newInterventionId;
	},
	updateIntervention: function(interventionId, values, options) {
		console.log(interventionId, values, options);
		//var user = Meteor.user();
		// Future - check that the user is logged in etc
		var clientIP = headers.methodClientIP(this);
		var now = moment();
		var intervention = _.extend({
			//set up vars like date / time & IP address
			updatedOn: now.format(),
			updatedByIp: clientIP,
			//updatedByUser: user,
		}, values);
		Interventions.update({_id: interventionId}, intervention);
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