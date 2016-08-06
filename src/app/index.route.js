(function() {
  'use strict';

  angular
    .module('xandha')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })

      .state('destinations', {
        url: '/destinations',
        templateUrl: 'app/destinations/destinations.html',
        controller: 'DestinationsController',
        controllerAs: 'dest'
      })

      .state('destination-detail', {
        url: '/destination/{name}',
        templateUrl: 'app/destinations/destinationDetail.html',
        controller: 'DestinationDetailController',
        controllerAs: 'dd'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })

      .state('user', {
        url: '/user',
        templateUrl: 'app/user/userProfile.html',
        controller: 'UserAcctController',
        controllerAs: 'user'
      })

      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/dashboard.html',
        controller: 'AdminController',
        controllerAs: 'admin'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
