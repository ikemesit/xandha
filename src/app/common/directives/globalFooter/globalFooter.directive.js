(function(){
	'use strict';

	angular
		.module('xandha')
		.directive('globalFooter', globalFooter);


	function globalFooter(){

		var directive = {
			restrict: 'AE',
			templateUrl: 'app/common/directives/global-footer/global-footer.template.html',
			controller: GlobalFooterController,
			controllerAs: 'gbf'
		};

		return directive;

		/**@ngInject*/
		function GlobalFooterController(){

		}
	}
})();
