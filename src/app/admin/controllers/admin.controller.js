(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('AdminController', AdminController);


	function AdminController($log, backEndService, toastr){
		var vm = this;
			vm.getData = getData;


		function getData(){
			$log.info(backEndService.getAllDestinations());
		}
	}
})();