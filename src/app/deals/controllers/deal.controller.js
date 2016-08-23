(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('DealController', DealController);


	function DealController($uibModal, $log, $stateParams){
		var vm = this;
			vm.deal = null;
			vm.selectedDeal = null;
			vm.openModal = openModal;


		$log.info($stateParams.key);
		function openModal(){
			var modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				// backdropClass: 'custom-modal',
				windowClass: 'modal fadeInDown in',
				templateUrl: 'app/deals/templates/dealsModal.html',
				controller: 'ModalInstanceController',
				controllerAs: '$ctrl',
				size: 'lg',
				resolve: {
					deal: function () {
					  return vm.selectedDeal;
					}
				}
			});

			modalInstance.result.then(function () {
				// $ctrl.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
			



	}// End
})();