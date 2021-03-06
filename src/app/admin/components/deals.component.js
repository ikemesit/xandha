(function(){
	'use strict';

	angular
		.module('xandha')
		.component('manageDealsComponent', {
			restrict: 'E',
			templateUrl: 'app/admin/templates/deals.template.html',
			controller: ManageDealsController,
			controllerAs: '$ctrl'
		});

	ManageDealsController.$inject = ['$log', '$timeout', '$rootScope', '$uibModal', 'dealFactory', 'dataAPI', 'toastr', '_'];

	function ManageDealsController($log, $timeout, $rootScope, $uibModal, dealFactory, dataAPI, toastr, _){
		var vm = this;
		// Deal models
		vm.dealEdit = null;
		vm.dealDataStore = null; // Firebase data store reference
		vm.progress = 0;
		vm.dataEntryKey = null;
		vm.max = 100;
		vm.progress = 0;
		vm.createDeal = createDeal;
		vm.editModal = editModal;		
		vm.editDeal = editDeal;
		//vm.saveEdit = saveEdit;
		vm.deleteDeal = deleteDeal;
		
		// Populate dealDataStore model
		loadAllDeals();

		function createDeal(){
		  var modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				backdrop: 'static',
				templateUrl: 'app/admin/templates/create-deal.template.html',
				controller: 'CreateDealModalController',
				controllerAs: '$ctrl',
				size: 'lg'
			});

			modalInstance.result.then(function () {
				$log.info('Modal opened at: ' + new Date());
				}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
	    }

	    function editModal(data){
	    	$rootScope.dealEdit = data;
	    	vm.dealEdit = data;
			vm.dealEdit.startDate = new Date(vm.dealEdit.startDate); // create date object from stored date string
			vm.dealEdit.endDate = new Date(vm.dealEdit.endDate); // create date object from stored date string
	      ngDialog.open({
	        template: 'app/admin/templates/createDeal.template.html',
	        className: 'ngdialog-theme-default',
	        appendClassName: 'ngDialog-custom',
	        width: '90%',
	        controller: 'CreateDealModalController',
       		controllerAs: 'cd',
       		data: vm.dealEdit,
	        closeByNavigation: true
	      });
	    }

		function loadAllDeals(){
			vm.dealDataStore = dealFactory.getAllDeals();
		}

		function editDeal(data){
			vm.dealEdit = data;
			vm.dealEdit.startDate = new Date(vm.dealEdit.startDate); // create date object from stored date string
			vm.dealEdit.endDate = new Date(vm.dealEdit.endDate); // create date object from stored date string
		}


		function deleteDeal(data){
			var imageUrls = data.relatedImages;
			$log.info(data);
			var images = [];
			var temp;
			// Retrieve Image names from firebase storage reference url
			if(angular.isArray(imageUrls)){
				images = imageUrls.map(function(url){
					var image = url.split('%2F');
					image = image[image.length - 1].split('?');
					return image;
				});
			}else{
				temp = imageUrls.split('%2F');
				temp = temp[temp.length - 1].split('?');
				images.push(temp[0]);
			}


			vm.dealDataStore.$remove(data).then(function(ref){
				toastr.success('deal data deleted successfully!');
				var key = ref.key;
				images.forEach(function(image){
					var url = key + "/" + image;
					var storageRef = dataAPI.storage.ref('deals');
					var imageRef = storageRef.child(url);
					imageRef.delete().then(function(){
						toastr.success('deal image deleted successfully');
					}).catch(function(error){
						toastr.error(error);
					});
				})


			});
		}

	}
})();
