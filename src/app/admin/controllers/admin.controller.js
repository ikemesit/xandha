(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('AdminController', AdminController);

	/**@ngInject*/
	function AdminController($log, toastr, destinationFactory){

		var vm = this;

		// Destination Models
		vm.destIn ={
			name: "name",
			address: "address",
			desc: "description",
			activities: "Enter Activities seperated by a comma - temporary",
			cordinates: "Enter Location cordinates seperated by a comma - temporary",
			himage: "Enter image full url - temporary"
		};
		vm.destOut;
		vm.destEdit;
		vm.progress = 0;

		// Destination Functions
		vm.addDestination = addDestination;
		vm.editDestination = editDestination;
		vm.saveEdit = saveEdit;
		vm.deleteDestination = deleteDestination;
		vm.uploadDestImages = uploadDestImages;

		// Show/Hide
		vm.editFormHidden = true;
		vm.addNewDest = null;
		vm.showForm = showForm;
		vm.showUpper = true;
		vm.showNext = showNext;

		// Init
		destinationFactory.loadDest();
		destinationFactory.getAllDest().then(function(data){ vm.destOut = data });





		
		function addDestination(data){
			destinationFactory.addDest(data);
			showNext();
		}

		function uploadDestImages(dest){
			var data = document.querySelector("#dest-images-upload").files;
			destinationFactory.uploadDestImages(dest, data);
			vm.showUpper = true;
		}

		function deleteDestination(data){
			destinationFactory.deleteDest(data);
			destinationFactory.loadDest();
		}

		
		function editDestination(name){
			vm.destEdit = destinationFactory.getDestByRef(name);
			$log.info(vm.destEdit);
			vm.editFormHidden = false;
		}

		function saveEdit(){
			vm.destEdit.$save().then(function(){
				toastr.success("Edit Successful!");
			});
		}

		function showNext(){
			vm.showUpper = false;
		}

		function showForm(){
			if(vm.addNewDest === null)
				vm.addNewDest = true;
		}
	}
})();
