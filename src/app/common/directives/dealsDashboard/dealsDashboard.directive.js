(function(){
	'use strict';


	angular
		.module('xandha')
		.directive('dealsDashboard', dealsDashboard);

		function dealsDashboard(){
			var directive = {
				restrict : 'A',
				scope : {},
				templateUrl: 'app/common/directives/dealsDashboard/dealsDashboard.template.html',
				controller: DealsDashboardController,
				controllerAs: 'dashboard',
				bindToController: { data: "="}
				// link: linkfunc
			}

			return directive;

			// function linkfunc(scope, element, attrs){
			// 	$log.info(attrs);
			// }

			function DealsDashboardController(){
				var vm = this;
					vm.deals = vm.data;
					vm.categoryFilters = {
						fd: false, // "food & drink"
						gt: false, // "getaways"
						act: false // "activities"
					};
			}
		}// End
})();
