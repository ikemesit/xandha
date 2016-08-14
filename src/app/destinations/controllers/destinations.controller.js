(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('DestinationsController', DestinationsController);



	function DestinationsController(localStorageService, destinationFactory){
		var vm = this;
			vm.destinations = {};
			vm.myInterval = 5000;
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
			]

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