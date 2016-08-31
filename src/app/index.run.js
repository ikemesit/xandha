(function() {
  'use strict';

  angular
    .module('xandha')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $window, $state, bsLoadingOverlayService) {

    $log.debug('runBlock end');
    var redirectScope = $rootScope;

    redirectScope.$on('$stateChangeStart', function(evt, to, params) {
       if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });


    redirectScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
      if(error === "AUTH_REQUIRED"){
        $state.go("login");
        // $log.info(toState);
      }
    });

    bsLoadingOverlayService.setGlobalConfig({
      activeClass: 'loading-icon-visible',
      templateUrl: 'app/common/templates/bsOverlayService.template.html'
    });

  }//End
})();