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
        abstract: true,
        url: '/deals',
        templateUrl: 'app/deals/templates/deals.template.html'
      })

      .state('deals.getaways', {
        url: '/getaways',
        template: '<getaways-component></getaways-component>',
        component: 'getawaysComponent'
      })

      .state('deals.winedine', {
        url: '/wine_dine',
        template: '<winedine-component></winedine-component>',
        component: 'winedineComponent'
      })

      .state('deals.activities', {
        url: '/activities',
        template: '<activities-component></activities-component>',
        component: 'activitiesComponent'
      })

      .state('deal', {
        url: '/deal/{key}',
        templateUrl: 'app/deals/templates/deal.template.html',
        controller: 'DealController',
        controllerAs: 'dl'
      })

      .state('order', {
        url: '/order',
        templateUrl: 'app/order/templates/order.html',
        controller: 'OrderController',
        controllerAs: 'order',
        params: {
          order: null
        }
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
          "userAuth": userAuth
        }
      })

      .state('admin', {
        url: '/admin',
        abstract: true,
        templateUrl: 'app/admin/templates/admin.template.html'
      })

      .state('admin.dashboard', {
        url: '/dashboard',
        template: '<admin-dashboard-component></admin-dashboard-component>',
        component: 'adminDashboardComponent'
      })

      .state('admin.destinations', {
        url: '/manage/destinations',
        templateUrl: 'app/admin/templates/destinations.template.html',
        controller: 'ManageDestinationsController',
        controllerAs: 'managedest'
      })

      .state('admin.deals', {
        url: '/manage/deals',
        template: '<manage-deals-component></manage-deals-component>',
        component: 'manageDealsComponent'
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    // UserAuth Resolver 
    userAuth.$inject = ["authService"];
    function userAuth(authService){
      return authService.auth().$requireSignIn();
    }


  }

})();
