(function() {
  'use strict';

  angular
    .module('xandha')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/templates/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })

      .state('destinations', {
        url: '/destinations/{name}',
        templateUrl: 'app/destinations/templates/destinations.html',
        controller: 'DestinationsController',
        controllerAs: 'dest'
      })

      .state('destination-detail', {
        url: '/destination/{name}',
        templateUrl: 'app/destinations/templates/destinationDetail.html',
        controller: 'DestinationDetailController',
        controllerAs: 'dd'
      })

      .state('deals', {
        url: '/deals',
        templateUrl: 'app/deals/templates/deals.html',
        controller: 'DealsController',
        controllerAs: 'dls'
      })

      .state('deal', {
        url: '/deal/{key}',
        templateUrl: 'app/deals/templates/deal.html',
        controller: 'DealController',
        controllerAs: 'dl'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'app/login/templates/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })

      .state('user', {
        url: '/user/{uid}',
        templateUrl: 'app/user/templates/userProfile.html',
        controller: 'UserAcctController',
        controllerAs: 'user',
        resolve: {
          "currentAuth": ["authService", function(authService){
            return authService.auth().$requireSignIn();
          }]
        }
      })

      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/dashboard.html',
        controller: 'AdminController',
        controllerAs: 'admin'
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }

})();
