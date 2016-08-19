(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('DestinationsController', DestinationsController);



	function DestinationsController($state, $log, localStorageService, destinationFactory){
		var vm = this;
			vm.destinations = [];
			vm.myInterval = 0;
			vm.noWrapSlides = false;
			vm.active = 0;
			vm.slides = [
				{
					id: 0,
					image: 'assets/images/destination_images/slide1.jpg',
					text: 'Awesome stuff'
				},
				{
					id: 1,
					image: 'assets/images/destination_images/slide2.jpg',
					text: 'Awesome stuff again'
				}
			];

			vm.params = $state.params.name;
			vm.searchResult = null;




		// Init else if local data not present, populate
		if(localStorageService.get("dst-data"))
			loadDestinations();
		else
			destinationFactory.loadDest();
			loadDestinations();

		// Add Search result to model
		getSearchResult();



		function loadDestinations(){
			var data = localStorageService.get('dst-data');
			vm.destinations = data;
		}

		function getSearchResult(){
			if(vm.destinations !== []){
				vm.searchResult = vm.destinations.filter(function(val){
					return val.name === vm.params;
				})[0];
			}
		}
	}// End
})();