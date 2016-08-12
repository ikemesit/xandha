(function(){
	'use strict';


	angular
		.module('xandha')
		.factory('authService', authService);

	/** @ngInject */
	function authService($firebaseAuth){
		var service = {
      auth : auth,
			createUser : createUser,
			signInWithEmailAndPassword : signInWithEmailAndPassword
		};

		return service;

    // Return auth 
    function auth(){
      return $firebaseAuth();
    }

    // Create New User
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

    // Sign in existing user
    function signInWithEmailAndPassword(email, password){
      var errorObj = null;
      try{
        $firebaseAuth().$signInWithEmailAndPassword(email, password);
      }catch(e){
        errorObj = e;
      }
      return errorObj;
    }

	}// End
})();
