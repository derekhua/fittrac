angular.module('app')

.constant('EC2', {
  address: 'http://ec2-54-165-233-14.compute-1.amazonaws.com:3001'
})

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
})

.constant('TOKEN_KEY', {
  name: 'FitTracKey'
});
