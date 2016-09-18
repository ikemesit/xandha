(function(){
	'use strict';

	angular
		.module('xandha')
		.directive('adminSideBar', adminSideBar);

	/**@ngInject*/
	function adminSideBar(){
		var directive = {
			restrict: 'AE',
			templateUrl: 'app/admin/templates/admin-sidebar.template.html',
			controller: AdminSidebarController,
			controllerAs: 'asdbr'
		};

		return directive;

		/**@ngInject*/
		function AdminSidebarController(){

		}
	}
})();