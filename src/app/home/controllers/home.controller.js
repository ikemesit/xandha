(function() {
  'use strict';

  angular
    .module('xandha')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(destinationFactory) {

    destinationFactory.loadDest();
    //$rootScope, $scope, $log, $http, $state, $timeout, webDevTec, toastr, Data
    // var vm = this;

    // $http.defaults.headers.post["Content-Type"] = "application/json";

    // vm.findDestination = function(destination)
    //  {
    //   if (destination.$valid)
    //       {
    //           var destinationData = angular.toJSON({name: destination.name});
    //           $log.info(destinationData);
    //           $state.go('destination');

    //       }
    //  }

    //  Data.get('destinations')
    //  .then(function(data)
    //    {
    //       $rootScope.viewDestinations = data;
    //       $log.info(data);
    //     }
    //    , function(error)
    //    {
    //       $log.error(error);
    //    });

    //  vm.viewDestination = function(id)
    //  {
    //   $rootScope.id = id;
    //   $state.go('destination-profile', $rootScope.id);
    //  }

  }
})();
