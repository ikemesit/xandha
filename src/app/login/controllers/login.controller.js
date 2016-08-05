(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('LoginController', LoginController);


	function LoginController(){
		var vm = this;
			vm.context = "login";
			vm.switchContext = switchContext;


		function switchContext(){
			if(vm.context == "login")
				vm.context = "registration";
			else if(vm.context == "registration")
				vm.context = "login";
		}
	}
})();