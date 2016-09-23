(function(){
  'use strict';

  angular
    .module('xandha')
    .directive('loadingIndicator', loadingIndicator);

    function loadingIndicator($rootScope, $timeout){
      var directive = {
        restrict: 'A',
        templateUrl: 'app/common/directives/stateLoadingIndicator/stateLoadingIndicator.template.html',
        link: linkFunc
      }

      return directive;

      function linkFunc(scope){

        var rootScope = $rootScope;

        scope.isStateLoading = false;

        rootScope.$on('$stateChangeStart', function() {
          scope.isStateLoading = true;
        });
        
        rootScope.$on('$stateChangeSuccess', function() {
          $timeout(function(){
            scope.isStateLoading = false;
          }, 1500);  
        });
      }
    }// End
})();
