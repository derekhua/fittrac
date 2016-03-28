angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $http, $state, $ionicPopup, AuthService, AUTH_EVENTS, EC2) {
  $scope.ec2Address = EC2.address;
  $scope.username = AuthService.username();
  $http.get($scope.ec2Address + '/api/u/' + $scope.username).then(function(result) {
    $rootScope.userInfo = result.data;
    $rootScope.gender = result.data.gender;
  });

  // Handle broadcasted messages
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, you have to login again.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
})

.controller('dashboardCtrl', function($scope) {

})
   
.controller('scheduleCtrl', function($scope) {

})
   
.controller('workoutCreationCtrl', function($scope) {

})
      
.controller('loginCtrl', function($scope, $rootScope, AuthService, $ionicPopup, $state, $http) {
  $scope.data = {};

  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('menu.dashboard', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
      $http.get($scope.ec2Address + '/api/u/' + data.username).then(function(result) {
        $rootScope.userInfo = result.data;
      });
    }).catch(function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
})
   
.controller('nutritionCtrl', function($scope) {

})
   
.controller('visualizationCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope, $state, $ionicPopup, AuthService, $ionicViewSwitcher) {
  $scope.data = {};
  $scope.signup = function(data) {
    AuthService.signup(data.username, data.email, data.password).then(function() {
      $state.go('login', {}, {reload: true});
      var alertPopup = $ionicPopup.alert({
        title: 'Success!',
        template: 'Now log in!'
      });
    }).catch(function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Sign up failed!',
        template: 'Please check your credentials!'
      });
    });
  };

  $scope.back = function() {
    $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
    $state.go('login');
  };
})
   
.controller('exerciseSearchCtrl', function($scope) {

})
   
.controller('workoutsCtrl', function($scope) {

})

.controller('nutritionCreationCtrl', function($scope) {

})

.controller('nutritionSearchCtrl', function($scope) {

})
 
.controller('trackableItemSearchCtrl', function($scope) {

})