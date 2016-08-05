(function() {
  'use strict';

  angular
    .module('xandha')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(destinationFactory) {

    destinationFactory.loadDest();
    
  }
})();
