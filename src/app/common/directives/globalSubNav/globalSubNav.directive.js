(function() {
  'use strict';

  angular
    .module('xandha')
    .directive('globalSubNav', globalSubNav);

  /** @ngInject */
  function globalSubNav() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'app/common/directives/globalSubNav/globalSubNav.template.html',
      controller: globalSubNavController,
      controllerAs: 'gsn'
    };

    return directive;

    /** @ngInject */
    function globalSubNavController() {
  
    }
  }

})();
