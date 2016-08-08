(function() {
  'use strict';

  angular
    .module('xandha')
    .directive('globalNavbar', globalNavbar);

  /** @ngInject */
  function globalNavbar($log) {
    var directive = {
      restrict: 'AE',
      templateUrl: 'app/common/directives/globalNavbar/globalNavbar.template.html',
      // scope: {},
      controller: GlobalNavbarController,
      controllerAs: 'gnb',
      link: globalNavbarLinkFunc
      // bindToController: true
    };

    return directive;

    function globalNavbarLinkFunc(){
      
    }

    function GlobalNavbarController() {
      var vm = this;
        vm.loggedIn = true;
    }

  } // End

  

})();
