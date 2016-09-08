(function(){
  'use strict';

  angular
    .module('xandha')
    .directive('loadingIndicator', loadingIndicator);

    function loadingIndicator($rootScope, $log){
      var directive = {
        restrict: 'A',
        templateUrl: 'app/common/directives/stateLoadingIndicator/stateLoadingIndicator.template.html',
        link: linkFunc,
        replace: true
      }

      return directive;

      function linkFunc(scope, elem, attr){
        scope.isStateLoading = false;

        $rootScope.$on('$stateChangeStart', function() {
          scope.isStateLoading = true;
          $log.info(scope.isStateLoading);
        });
        $rootScope.$on('$stateChangeSuccess', function() {
          scope.isStateLoading = false;
          $log.info(scope.isStateLoading);
        });

        // showLoader();
        // hideLoader();

        // $log.info(scope.isStateLoading);
      }
    }// End
})();
