(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('AdminDashboardController', AdminDashboardController);

	/**@ngInject*/
	function AdminDashboardController(dealFactory, $scope, $timeout, destinationFactory){
		var vm = this;
		loadAllDeals();

		destinationFactory.loadDest();
		destinationFactory.getAllDest()
			.then(function(data){ vm.destOut = data;});

		function loadAllDeals(){
				vm.dealDataStore = dealFactory.getAllDeals();
			} 
		$scope.date = new Date();
		$scope.clock = "loading clock..."; // initialise the time variable
			$scope.tickInterval = 1000 //ms

			var tick = function() {
				$scope.clock = Date.now() // get the current time
				$timeout(tick, $scope.tickInterval); // reset the timer
			}

			// Start the timer
			$timeout(tick, $scope.tickInterval);
	}
})();
