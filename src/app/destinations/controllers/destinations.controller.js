(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('DestinationsController', DestinationsController);



	function DestinationsController(localStorageService, destinationFactory){
		var vm = this;
			vm.destinations = {};

		// Init else if local data not present, populate
		if(localStorageService.get("dst-data"))
			loadDestinations();
		else
			destinationFactory.loadDest();
			loadDestinations();



		function loadDestinations(){
			var data = localStorageService.get('dst-data');
			vm.destinations = data;
		}
	}
})();