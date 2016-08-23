(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('ModalInstanceController', ModalInstanceController);


	function ModalInstanceController(deal){
		var vm = this;
			vm.deal = deal;

	}// End
})();