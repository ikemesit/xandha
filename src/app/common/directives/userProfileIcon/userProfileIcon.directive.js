(function(){
	'use strict';

	angular
		.module('xandha')
		.directive('userProfileIcon', userProfileIcon);


	/** @ngImject */
	function userProfileIcon(){
		var directive = {
			restrict: 'AE',
			templateUrl: 'app/common/directives/userProfileIcon/userProfileIcon.template.html',
			controller: UserProfileIconController,
			controllerAs: 'upi'
		}

		return directive;


		function UserProfileIconController(){
			var vm = this;
				vm.loggedIn = true;
		}
	}
})