(function(){
	'use strict';


	angular
		.module('xandha.dashboardModule', [])
		.component('dealsDashboard', {
			restrict : 'E',
			templateUrl: 'app/deals/templates/dealsDashboard.template.html',
			controller: DealsDashboardController,
			controllerAs: 'dashboard',
			bindings: { data: "<"}
		});

			
		DealsDashboardController.$inject = ['_', '$log', '$interval'];

		function DealsDashboardController(_, $log, $interval){

			var vm = this;
				vm.deals = vm.data;
				vm.locationFilters;
				vm.locations = null;
				vm.filter = [];


				// Public Methods
				vm.getFilterVal = getFilterVal;

				// Poll for returned data from Firebase data store
				var locationDataCheck = $interval(function(){
					getLocations()}, 1000);

				
				/**Maps unique locations from data
				 * fed into component to locationFilters
				 * model
				 */
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

				/**Filters locations from
				 * filters select input available
				 * on loaded view 
				 */
				function getFilterVal(val) {
					// Remove value if exists in filter array and vice versa
					if (vm.filter !== [] && vm.filter.indexOf(val) !== -1){
						_.pull(vm.filter, val);
					}else{
						vm.filter.push(val);
					}
				}

		}

})();
