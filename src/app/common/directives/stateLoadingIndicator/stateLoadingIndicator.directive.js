(function(){
  'use strict';

  angular
    .module('xandha')
    .directive('loadingIndicator', loadingIndicator);

    function loadingIndicator($rootScope){
      var directive = {
        restrict: 'A',
        templateUrl: 'app/common/directives/stateLoadingIndicator/stateLoadingIndicator.template.html',
        link: linkFunc,
        replace: true
      }

      return directive;

      function linkFunc(scope){

        var rootScope = $rootScope;

        scope.isStateLoading = false;

        rootScope.$on('$stateChangeStart', function() {
          scope.isStateLoading = true;
        });
        
        rootScope.$on('$stateChangeSuccess', function() {
          scope.isStateLoading = false;
        });
      }
    }// End
})();
