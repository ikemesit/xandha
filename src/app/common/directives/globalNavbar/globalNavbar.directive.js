(function() {
  'use strict';

  angular
    .module('xandha')
    .directive('globalNavbar', globalNavbar);

  /** @ngInject */
  function globalNavbar() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'app/common/directives/globalNavbar/globalNavbar.template.html',
      scope: {},
      controller: GlobalNavbarController,
      controllerAs: 'gnb',
      bindToController: true
    };

    return directive;

  }

  /** @ngInject */
  function GlobalNavbarController() {

  }

})();
