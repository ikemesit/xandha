(function(){
	'use strict';

	angular
		.module('xandha')
		.component('adminDashboardComponent', {
			restrict: 'E',
			templateUrl: 'app/admin/templates/dashboard.template.html',
			controller: AdminDashboardController,
			controllerAs: '$ctrl'
		});

	AdminDashboardController.$inject = ['dealFactory', '$scope', '$timeout', 'destinationFactory'];

	/**@ngInject*/
	function AdminDashboardController(dealFactory, $scope, $timeout, destinationFactory){
		var vm = this;
		vm.date = new Date();
		vm.clock = "loading clock..."; // initialise the time variable
		vm.tickInterval = 1000 //ms

		var tick = function() {
			vm.clock = Date.now() // get the current time
			$timeout(tick, vm.tickInterval); // reset the timer
		}

		// Start the timer
		$timeout(tick, vm.tickInterval);

		loadAllDeals();

		destinationFactory.loadDest();
		destinationFactory.getAllDest()
			.then(function(data){ vm.destOut = data;});

		function loadAllDeals(){
			vm.dealDataStore = dealFactory.getAllDeals();
		} 
	}
})();
