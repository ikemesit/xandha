(function(){
	'use strict';

	angular
		.module('xandha')
		.factory('backEndService', backEndService);


	function backEndService($firebaseObject){
		
		var database = firebase.database();

		var service = {
				getAllDestinations: getAllDestinations
		};

		return service;

		function getAllDestinations(){
			var dataRef = $firebaseObject(database.ref('destinations'));
			return dataRef;
		}


	}
})();