(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('LoginController', LoginController);


	function LoginController($log, authService){
		var vm = this;
			vm.newUser = {
				name: null,
				email: null,
				password: null
			};
			vm.required = true;

			// Validation
			vm.validateEntry = validateEntry;

			// Form Context
			vm.context = "login";
			vm.switchContext = switchContext;


		function switchContext(){
			if(vm.context == "login")
				vm.context = "registration";
			else if(vm.context == "registration")
				vm.context = "login";
		}

		function validateEntry(entry){
			$log.info(entry);
		}
	}
})();