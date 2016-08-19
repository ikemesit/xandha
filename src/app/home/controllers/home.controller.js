(function() {
  'use strict';

  angular
    .module('xandha')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(destinationFactory) {
    var vm = this;
      vm.popularDestinations = null;

    // Init
    destinationFactory.loadDest();
    getPopularDestinations();

    function getPopularDestinations(){
      // To filter by popularity
      destinationFactory.getAllDest().then(function(data){ 
        vm.popularDestinations = data; 
      });
    }
    
  }
})();
