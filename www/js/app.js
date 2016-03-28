// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.services', 'app.directives'])

.config(function($stateProvider, $urlRouterProvider, TOKEN_KEY) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('menu.dashboard', {
    url: '/dashboard',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
      }
    }
  })

  .state('menu.schedule', {
    url: '/schedule',
    views: {
      'side-menu21': {
        templateUrl: 'templates/schedule.html',
        controller: 'scheduleCtrl'
      }
    }
  })

  .state('menu.workoutCreation', {
    url: '/workouts/creation',
    views: {
      'side-menu21': {
        templateUrl: 'templates/workoutCreation.html',
        controller: 'workoutCreationCtrl'
      }
    }
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('menu.nutrition', {
    url: '/nutrition',
    views: {
      'side-menu21': {
        templateUrl: 'templates/nutrition.html',
        controller: 'nutritionCtrl'
      }
    }
  })

  .state('menu.visualization', {
    url: '/visualization',
    views: {
      'side-menu21': {
        templateUrl: 'templates/visualization.html',
        controller: 'visualizationCtrl'
      }
    }
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('menu.exerciseSearch', {
    url: '/workouts/creation/search',
    views: {
      'side-menu21': {
        templateUrl: 'templates/exerciseSearch.html',
        controller: 'exerciseSearchCtrl'
      }
    }
  })

  .state('menu.workouts', {
    url: '/workouts',
    views: {
      'side-menu21': {
        templateUrl: 'templates/workouts.html',
        controller: 'workoutsCtrl'
      }
    }
  })

  .state('menu.nutritionSearch', {
    url: '/nutrition/creation',
    views: {
      'side-menu21': {
        templateUrl: 'templates/nutritionSearch.html',
        controller: 'nutritionSearchCtrl'
      }
    }
  })

 .state('menu.trackableItemSearch', {
    url: '/dashboard/addItem',
    views: {
      'side-menu21': {
        templateUrl: 'templates/trackableItemSearch.html',
        controller: 'trackableItemSearchCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    // If seen intro already
    if (window.localStorage.getItem(TOKEN_KEY.name)) {
      $state.go("menu.dashboard");
    }
    else {
      $state.go("login");
    }
  });

})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.run(function ($rootScope, $state, AuthService, AUTH_EVENTS, TOKEN_KEY) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
    if (window.localStorage.getItem(TOKEN_KEY.name) && next.name === 'login') {
      console.log("You are attempting to access the login page while a token already exists");
      $state.go("menu.dashboard");
    }

    // Authorization
    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }
    // Authentication
    if (!AuthService.isAuthenticated() && next.name !== 'signup') {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
});

