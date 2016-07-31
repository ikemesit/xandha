(function(){
	'use strict';

	angular
		.module('xandha')
		.directive('adminSideBar', adminSideBar);

	/**@ngInject*/
	function adminSideBar(){
		var directive = {
			restrict: 'AE',
			templateUrl: 'app/admin/admin-sidebar.html',
			controller: AdminSidebarController,
			controllerAs: 'asdbr'
		};

		return directive;

		/**@ngInject*/
		function AdminSidebarController(){

		}
	}
})();