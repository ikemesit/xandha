(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('ManageDestinationsController', ManageDestinationsController);


	function ManageDestinationsController($log, toastr, ngDialog, $rootScope, destinationFactory){
		var vm = this;

		
		vm.destOut;
		vm.destEdit;
		vm.progress = 0;
		vm.openModal = openModal;

		vm.editDestination = editDestination;
		vm.deleteDestination = deleteDestination;

		// Show/Hide
		vm.showCreateDestinationBox = false;
		vm.editFormHidden = true;

		// Init
		destinationFactory.loadDest();
		destinationFactory.getAllDest().then(function(data){ vm.destOut = data;
		 });


		function showHiddenDestinationBox () {
			vm.showCreateDestinationBox = false;
		}

		function openModal(){
			$rootScope.dest = null;
	      ngDialog.open({
	        template: 'app/admin/templates/createDestination.template.html',
	        className: 'ngdialog-theme-default',
	        appendClassName: 'ngDialog-custom',
	        width: '90%',
	        controller: 'CreateDestinationModalController',
       		 controllerAs: 'cd',
	        closeByNavigation: true
	      });
	    }
		

		function deleteDestination(data){
			destinationFactory.deleteDest(data);
			destinationFactory.loadDest();
		}

		
		function editDestination(name){
			vm.destEdit = destinationFactory.getDestByRef(name);
			$rootScope.dest = vm.destEdit;
			ngDialog.open({
	        template: 'app/admin/templates/createDestination.template.html',
	        className: 'ngdialog-theme-default',
	        appendClassName: 'ngDialog-custom',
	        width: '90%',
	        controller: 'CreateDestinationModalController',
       		controllerAs: 'cd',
       		data: vm.dealEdit,
	        closeByNavigation: true
	      });
			vm.editFormHidden = false;
		}

		function saveEdit(){
			vm.destEdit.$save().then(function(){
				toastr.success("Edit Successful!");
			});
		}
	}
})();