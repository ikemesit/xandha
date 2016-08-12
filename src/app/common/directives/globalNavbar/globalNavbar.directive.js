(function() {
  'use strict';

  angular
    .module('xandha')
    .directive('globalNavbar', globalNavbar);

  /** @ngInject */
  function globalNavbar($state, authService) {
    var directive = {
      restrict: 'AE',
      templateUrl: 'app/common/directives/globalNavbar/globalNavbar.template.html',
      scope: {},
      controller: GlobalNavbarController,
      controllerAs: 'gnb',
      link: globalNavbarLinkFunc
      // bindToController: true
    };

    return directive;

    function globalNavbarLinkFunc(){
      angular.element("button.btn-profile").on('mouseover', function(){
        angular.element("ul[role='login-dropdown-menu']").css('display', 'block');
      });

      angular.element("body").on('click', function(){
        angular.element("ul[role='login-dropdown-menu']").css('display', 'none');
      });

      angular.element("ul[role='login-dropdown-menu']").on('mouseover', function(){
        angular.element(this).css('display', 'block');
      });

      angular.element("ul[role='login-dropdown-menu']").on('mouseout', function(){
        angular.element(this).css('display', 'none');
      });
    }

    function GlobalNavbarController() {
      var vm = this;
        vm.userDetails = {
          name : null,
          uid : null
        }
        vm.loggedIn = false;
        vm.signOut = signOut;

      authService.auth().$onAuthStateChanged(function(user){
        if(user){
          vm.loggedIn = true;
          vm.userDetails = user.uid;
        }
      });

      function signOut(){
        authService.auth().$signOut();
        vm.loggedIn = false;
      }
    }

  } // End



})();
