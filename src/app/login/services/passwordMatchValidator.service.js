(function(){
	'use strict';

	angular
		.module('xandha')
		.factory('passwordMatchValidator', passwordMatchValidator);

	function passwordMatchValidator(){
		var service = {
			name : 'matches',
			validate : checkMatch
		}

		return service;

		function checkMatch(value){
			return value === ""; // TO FIX VALIDATION RULE
		}
	}//End
})();