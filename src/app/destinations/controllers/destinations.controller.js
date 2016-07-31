(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('DestinationsController', DestinationsController);



	function DestinationsController($log, localStorageService){
		var vm = this;
			vm.destinations = {};

		// Init
		loadDestinations();

		$log.info(vm.destinations);



		function loadDestinations(){
			var data = localStorageService.get('dst-data');
			vm.destinations = data;
		}
	}
})();