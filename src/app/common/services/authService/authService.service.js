(function(){
	'use strict';


	angular
		.module('xandha')
		.factory('authService', authService);

	/** @ngInject */
	function authService($firebaseAuth){
		var service = {
      auth : auth,
			createUser : createUser
		};

		return service;

    function auth(){
      return $firebaseAuth();
    }

    function createUser(email, password){
      var errorObj = null;
      try{
        $firebaseAuth()
        .$createUserWithEmailAndPassword(email, password);
      }catch(e){
        errorObj = e;
      }
      return errorObj;
    }

	}// End
})();
