angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $http, $state, $ionicPopup, AuthService, AUTH_EVENTS, EC2) {
  $scope.ec2Address = EC2.address;
  $scope.username = AuthService.username();

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

  $scope.logout = function() {
    $state.go('login');
    AuthService.logout();
  };

  $scope.refreshUser = function(callback) {
    $http.get($scope.ec2Address + '/api/u/' + $scope.username).then(function(result) {
      $rootScope.userInfo = result.data;
      $rootScope.gender = result.data.gender;
      if(callback) {
        callback(result);
      }
    }).catch(function(err) {
      console.log('Could not load user.');
      console.log(err);
    });
  };
  $scope.refreshUser();
})

.controller('dashboardCtrl', function($scope) {

})
   
.controller('scheduleCtrl', function($scope) {

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
 
.controller('workoutsCtrl', function($rootScope, $scope, $http) {  
  $scope.getWorkouts = function() {
    if ($rootScope.userInfo.workouts) {
      return $rootScope.userInfo.workouts
    } else {
      return [];
    }
  }
})
  
.controller('workoutCreationCtrl', function($rootScope, $scope, $http, $state) {  
  $scope.clear = function() {
    $rootScope.workout = {};
    $rootScope.workout.name = '';
    $rootScope.workout.description = '';
    $rootScope.workout.exercises = [];
  };
  $scope.addWorkout = function() {
    $http.post($scope.ec2Address + '/api/u/' + $rootScope.userInfo.username, {$push : {"workouts": $rootScope.workout}})
    .then(function(result) {
      console.log("Workout added");
      $scope.clear();
      $scope.refreshUser(function() {
        $state.go('menu.workouts');  
      });      
    }).catch(function(err) {
      console.log("Workout adding failed");
    });
  };
  $scope.clear();
})
   
.controller('exerciseSearchCtrl', function($rootScope, $scope, $http, $state) {
  $scope.exerciseSearchResults = [];
  $scope.searchExercises = function(query) {
    if (query.trim()) {
      $http.get($scope.ec2Address + '/api/search/exercise/', {params: {"q": query.trim()}})
      .then(function(response) {
        $scope.exerciseSearchResults = response.data;
      })
      .catch(function(err) {
        console.log('exercise search failed');
        console.log(err);       
      });
    } else {
      $scope.exerciseSearchResults = [];
    }
  };

  $scope.addExercise = function(exercise) {
    exercise.description = exercise.description.replace(/<\/?[^>]+(>|$)/g, "");
    $rootScope.workout.exercises.push(exercise);
    $state.go('menu.workoutCreation');
  };
})

.controller('nutritionCtrl', function($scope, $rootScope) {
  $scope.getNutrition = function() {
    if ($rootScope.userInfo.nutrition) {
      return $rootScope.userInfo.nutrition;
    } else {
      return [];
    }
  };
})
  
.controller('nutritionSearchCtrl', function($rootScope, $scope, $http, $state) {
  $scope.nutritionSearchResults = [];
  $scope.searchNutrition = function(query) {
    if (query.trim()) {
      $http.get($scope.ec2Address + '/api/search/nutrition/', {params: {"q": query.trim()}})
      .then(function(response) {
        $scope.nutritionSearchResults = response.data;
      })
      .catch(function(err) {
        console.log('exercise search failed');
        console.log(err);       
      });
    } else {
      $scope.nutritionSearchResults = [];
    }
  };

  $scope.addNutrition = function(nutrition) {
    $http.post($scope.ec2Address + '/api/u/' + $rootScope.userInfo.username, {$push : {"nutrition": nutrition}})
    .then(function(result) {
      console.log("Nutrition added");
      $scope.refreshUser(function() {
        $state.go('menu.nutrition');  
      });      
    }).catch(function(err) {
      console.log("Nutrition adding failed");
    });
  };
})
 
.controller('trackableItemSearchCtrl', function($scope) {

})
