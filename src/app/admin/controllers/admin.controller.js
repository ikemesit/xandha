(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('AdminController', AdminController);

	/**@ngInject*/
	function AdminController($log, destinationFactory){

		var vm = this;

		// Destinations
		vm.destIn ={
			name: "name",
			address: "address",
			desc: "description",
			activities: "activities",
			cordinates: "cordinates",
			himage: "himage"
		};
		vm.destOut;
		vm.addDestination = addDestination;
		vm.deleteDestination = deleteDestination;

		// Show/Hide Add Destination
		vm.addNewDest = null;
		vm.showForm = showForm;

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

		function showForm(){
			if(vm.addNewDest === null)
				vm.addNewDest = true;
		}
	}
})();
