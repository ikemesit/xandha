(function () {
	'use strict';

	angular
		.module('xandha')
		.controller('OrderController', OrderController);

		function OrderController ($scope, $log, $stateParams) {
			var vm = this;
			vm.data = null;

			$scope.$on('$viewContentLoaded', function (){
				vm.data = $stateParams.order;
				$log.info(vm.data);
			});
		}// End

})();
