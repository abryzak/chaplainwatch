Meteor.startup(function () {
  AccountsEntry.config({
    //signupCode: 'chaplainWatch',
    homeRoute: '/',
    dashboardRoute: '/',
  });
});

var defaultUsers = [
  {firstName:"LB", lastName: "Johnston",email:"lb@doubleampersand.com.au",roles:['admin', 'hq', 'interventions']},
  {firstName:"Lance", lastName: "Mergard",email:"lance@chaplainwatch.com",roles:['admin', 'hq', 'interventions']},
  {firstName:"Daniel", lastName: "Malcom",email:"daniel@chaplainwatch.com",roles:['hq', 'interventions']},
  {firstName:"Chris", lastName: "Owens",email:"chris@chaplainwatch.com",roles:['interventions']},
 ];

 _.each(defaultUsers, function (user) {
   var id;
   //check the user exists
   userExists = Meteor.users.findOne({ emails: { $elemMatch: { address: user.email } } });

   if (! userExists) {
     id = Accounts.createUser({
       email: user.email,
       password: "apple1",
       profile: {
        firstName: user.firstName,
        lastName: user.lastName,
      }
     });

     if (user.roles.length > 0) {
       Roles.addUsersToRoles(id, user.roles);
     }
   }

 });