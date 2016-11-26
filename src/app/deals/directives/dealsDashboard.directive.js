(function(){
	'use strict';


	angular
		.module('xandha')
		.directive('dealsDashboard', dealsDashboard);

		function dealsDashboard(_, $log, $interval){
			var directive = {
				restrict : 'EA',
				scope : {},
				templateUrl: 'app/deals/templates/dealsDashboard.template.html',
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
					vm.locationFilters;
					vm.locations = null;
					vm.filter = [];


					// Public Methods
					vm.getFilterVal = getFilterVal;


					var locationDataCheck = $interval(function(){
						getLocations()}, 1000);

					function getLocations () {
						var temp = _.map(vm.data, 'location');
						// Destroy $interval once data is returned
						if(temp.length > 0){
							$interval.cancel(locationDataCheck);
							// Filter location to unique values and map to index objects for location filter checkbox model
							vm.locations = _.uniq(temp);
							vm.locationFilters = _.map(vm.locations, function (location) {
								var index = vm.locations.indexOf(location);
								var Obj = {};
								Obj[index] = location;
								return Obj;
							});
						}
					}

					function getFilterVal(val){
						// Remove value if exists in filter array and vice versa
						if (vm.filter !== [] && vm.filter.indexOf(val) !== -1){
							_.pull(vm.filter, val);
						}else{
							vm.filter.push(val);
						}
					}



			}
		}// End
})();
