(function() {
  'use strict';

  angular
    .module('xandha')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $window, $state) {

    $log.debug('runBlock end');
    var redirectScope = $rootScope;

    redirectScope.$on('$stateChangeStart', function(evt, to, params) {
       if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });


    // redirectScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    //   if(error === "AUTH_REQUIRED"){
    //     $state.go("admin.login");
    //     // $log.info(toState);
    //   }
    // })
  }
})();