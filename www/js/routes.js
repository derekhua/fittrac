angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

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

$urlRouterProvider.otherwise('/login')

  

});