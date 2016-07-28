(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('AdminController', AdminController);


	function AdminController($log, destinationFactory){

		var vm = this;

		// Destinations
		vm.destIn ={
			name: "name",
			address: "address",
			desc: "description",
			activities: "activities"
		};
		vm.destOut;
		vm.addDestination = addDestination;
		vm.deleteDestination = deleteDestination;

		// Init
		destinationFactory.loadDest();
		destinationFactory.getAllDest().then(function(data){ vm.destOut = data });





		/**
		 * [Adds new destination]
		 * @param {obj} data [destination object]
		 */
		function addDestination(data){
			destinationFactory.addDest(data);
		}

		/**
		 * [Adds new destination]
		 * @param {obj} data [destination object]
		 */
		function deleteDestination(data){
			destinationFactory.deleteDest(data);
		}


	}
})();
