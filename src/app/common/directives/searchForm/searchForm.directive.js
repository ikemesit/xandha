(function(){
  'use strict';

  angular
    .module('xandha')
    .directive('searchForm', searchForm);


  function searchForm($log, $timeout, localStorageService){
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
      // var listDropDowns
      angular.element(".location-dropdown").on('click', function(e) {
        // listDropDowns = document.querySelectorAll(".location-list-data");
        // $log.info(listDropDowns);
        /* lock event to current DOM selector */
        e.stopPropagation();
        openBackdrop();
        angular.element(".location-list-container").css('display', 'block');
        angular.element(".location-list-data").css('display', 'block');
      });

      angular.element(".location-list-data").click(function(e){
        e.stopPropagation();
        // $log.info(this);
        var text = angular.element(this).text();
        angular.element(".location-init").text(text);
        angular.element(".location-list-container").css('display', 'none');
        closeBackdrop();
      });

      angular.element(".destination-dropdown").click(function(e) {
        /* lock event to current DOM selector */
        e.stopPropagation();
        openBackdrop();
        angular.element("#destination-search" ).css('display', 'block').focus();
        angular.element(".destination-list-container").css('display', 'block');
        angular.element(".destination-list-data").css('display', 'block')
      });

      angular.element(".destination-list-data").on("click", function(e){
        e.stopPropagation();
        var text = angular.element(this).text();
        angular.element(".destination-init").text(text);
        angular.element("#destination-search" ).css('display', 'none');
        angular.element(".destination-list-container").css('display', 'none');
        angular.element(this).css('display', 'none');
        closeBackdrop();
      });

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

      loadDestinations();

      function loadDestinations(){
        var data = localStorageService.get('dst-data');
        vm.destinations = data;
      }


    }
  }
})();
