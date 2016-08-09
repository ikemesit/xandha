(function(){
	'use strict';


	angular
		.module('xandha')
		.factory('authService', authService);

	/** @ngInject */
	function authService(toastr){
		var service = {
			createUser : createUser
		};

		return service;


		function createUser(email, password){
			firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				toastr.error(errorMessage, errorCode);
			});
		}
	}// End
})();