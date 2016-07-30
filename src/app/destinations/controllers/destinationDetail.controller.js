(function(){
  'use strict';

  angular
    .module('xandha')
    .controller('DestinationDetailController', DestinationDetailController);


  function DestinationDetailController() {
	var vm = this;
		vm.dt = {};
		vm.images = [
			{ src: "https://images.unsplash.com/photo-1468476775582-6bede20f356f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=50c6901b794046c29f94700a8b940ad4" },
			{ src: "https://images.unsplash.com/photo-1464695110811-dcf3903dc2f4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=34cc42f969e2f39d7a8af95d16c7dcca" },
			{ src: "https://images.unsplash.com/photo-1456894332557-b03dc5cf60d5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=29a9bb29bcbf19a5954d0110b19d5b51" },
			{ src: "https://images.unsplash.com/photo-1467173572719-f14b9fb86e5f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=b734e103303c5965225682077ee72f86" }
		];
		// Map Settings
		vm.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3QUKXul7-e8AfIGGjkB92u5-PXCwfXtY";
		vm.map = { center: { latitude: 7.0151090, longitude: 27.9529442 }, zoom: 15};
		vm.options = {draggable: false, scrollwheel: false};

		// Map Marker
		vm.marker = {
			id : 1,
			coords : {"latitude": 5.0151090,"longitude": 7.9539446},
			options : {title: 'Destination', draggable: false, animation: 1}
		};


	}
})();
