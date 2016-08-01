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
			activities: "Enter Activities seperated by a comma - temporary",
			cordinates: "Enter Location cordinates seperated by a comma - temporary",
			himage: "Enter image full url - temporary"
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
			// $log.info(data.desc);
			// data.desc = $sce.trustAsHtml(data.desc);
			destinationFactory.addDest(data);
		}

		/**
		 * [Deletes destination]
		 * @param {obj} data [destination object]
		 */
		function deleteDestination(data){
			destinationFactory.deleteDest(data);
			destinationFactory.loadDest();
		}

		function showForm(){
			if(vm.addNewDest === null)
				vm.addNewDest = true;
		}
	}
})();
