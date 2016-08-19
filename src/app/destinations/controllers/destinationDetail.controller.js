(function(){
  'use strict';

  angular
    .module('xandha')
    .controller('DestinationDetailController', DestinationDetailController);


  function DestinationDetailController($log, $stateParams, localStorageService) {
	var vm = this;
		vm.dt = {};
		vm.myInterval = 5000;
		vm.noWrapSlides = false;
		vm.active = 0;
		vm.images = [
			{
				id: 0,
				image: 'https://hd.unsplash.com/photo-1468743428993-661b9309fa2c',
				text: 'Awesome stuff'
			},
			{
				id: 1,
				image: 'https://images.unsplash.com/photo-1464695110811-dcf3903dc2f4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=34cc42f969e2f39d7a8af95d16c7dcca',
				text: 'Awesome stuff again'
			},
			{
				id: 2,
				image: 'https://images.unsplash.com/photo-1456894332557-b03dc5cf60d5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=29a9bb29bcbf19a5954d0110b19d5b51',
				text: 'Awesome stuff again'
			},
			{
				id: 3,
				image: 'https://images.unsplash.com/photo-1467173572719-f14b9fb86e5f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=b734e103303c5965225682077ee72f86',
				text: 'Awesome stuff again'
			}
		];
		// Map Settings
		vm.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3QUKXul7-e8AfIGGjkB92u5-PXCwfXtY";
		// vm.map = { center: { latitude: 7.0151090, longitude: 27.9529442 }, zoom: 15};
		// vm.options = {draggable: false, scrollwheel: false};

		// Map Marker
		// vm.marker = {
		// 	id : 1,
		// 	coords : {"latitude": 5.0151090,"longitude": 7.9539446},
		// 	options : {title: 'Destination', draggable: false, animation: 1}
		// };

		// Destination details
		vm.destinations = localStorageService.get('dst-data');

			
		//Init
		getDestinationData();

		


		function getDestinationData(){
			vm.destination = vm.destinations.filter(function(data){
				return data.name === $stateParams.name;
			})[0];
		}

		
	}
})();
