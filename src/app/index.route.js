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
        url: '/destination',
        templateUrl: 'app/destinations/destination-detail.html',
        controller: 'DestinationDetailController',
        controllerAs: 'dd'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controllerAs: 'login'
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
