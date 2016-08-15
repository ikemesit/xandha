(function(){
  'use strict';

  angular
    .module('xandha')
    .directive('searchForm', searchForm);


  function searchForm($log, $timeout, $state, localStorageService){
    var directive = {
      name: 'searchForm',
      restrict: 'AE',
      templateUrl: 'app/common/directives/searchForm/searchForm.template.html',
      controller: SearchFormController,
      controllerAs: 'sfc',
      // transclude: true,
      link: formFunc
    }

    return directive;


    function formFunc(scope, element){

      // $log.info(scope);
      
      angular.element(".location-dropdown").on('click', function(e) {
        // lock event to current DOM selector
        e.stopPropagation();
        openBackdrop();
        angular.element(".location-list-container").css('display', 'block');
        angular.element(".location-list-data").css('display', 'block');
      });

      // Wrap in timeout to fire once DOM compilation is complete
      $timeout(function(){
        angular.element(".location-list-data").click(function(e){
          e.stopPropagation();
          var text = angular.element(this).text();
          scope.sfc.destinationFilterText = text;
          // Refresh scope on value change
          scope.$apply();
          // Rebind event listeners on destination dropdown
          bindDestInputAction();
          angular.element(".location-init").text(text);
          angular.element(".location-list-container").css('display', 'none');
          closeBackdrop();
        });     
      }, 10);

      angular.element(".destination-dropdown").click(function(e) {
        /* lock event to current DOM selector */
        e.stopPropagation();
        openBackdrop();
        angular.element("#destination-search" ).css('display', 'block').focus();
        angular.element(".destination-list-container").css('display', 'block');
        angular.element(".destination-list-data").css('display', 'block')
      });

      // Wrap in timeout to fire once DOM compilation is complete
      $timeout(function(){
        bindDestInputAction();
      }, 10);

      angular.element(".lookup-backdrop").on("click", function(e){
        e.preventDefault();
        angular.element(this).css("display", "none");
        angular.element(".destination-list-data").css("display") != "none"? angular.element(".destination-list-data").css("display", "none") : null;
        angular.element(".location-list-data").css("display") != "none"? angular.element(".location-list-data").css("display", "none") : null;
      });

      angular.element("document").on('keyup', function (e) {
        if (e.keyCode == 27) {
          closeAllDropdowns();
        }
      });

      function bindDestInputAction(){
        angular.element(".destination-list-data").on("click", function(e){
          e.stopPropagation();
          var text = angular.element(this).text();
          angular.element(".destination-init").text(text);
          angular.element("#destination-search" ).css('display', 'none');
          angular.element(".destination-list-container").css('display', 'none');
          angular.element(this).css('display', 'none');
          closeBackdrop();
        });
      }

      function closeAllDropdowns() {
        $timeout(function () {
          angular.element('.location-list-container').css('display', 'none');
          angular.element('.destination-list-container').css('display', 'none');
          angular.element('#destination-search').css('display', 'none');
          closeBackdrop();
        }, 1);
      }

      function openBackdrop() {
        angular.element('.lookup-backdrop').show();
      }
      function closeBackdrop() {
        angular.element('.lookup-backdrop').hide();
      }
    }


    function SearchFormController(){
      var vm = this;
          vm.destinations = null;
          vm.destinationFilterText;
          vm.searchText;
          vm.goToSelectedLocation = goToSelectedLocation;

      loadDestinations();
      

      function loadDestinations(){
        var data = localStorageService.get('dst-data');
        vm.destinations = data;
      }

      function goToSelectedLocation(){
        var location = angular.element('.destination-init').text()
        if(location !== "Select a Destination")
          $state.go('destinations',{ name: location});
      }


    }
  }// End
})();
