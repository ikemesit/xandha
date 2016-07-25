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

      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controllerAs: 'login'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
