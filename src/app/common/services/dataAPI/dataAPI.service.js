(function(){
	'use strict';

	angular
		.module('xandha')
		.factory('dataAPI', dataAPI);


	function dataAPI($firebaseObject, $firebaseArray){
		
		var database = firebase.database();
		var storage = firebase.storage();

		var service = {
			dbObjRef: dbObjRef,
			dbArrRef: dbArrRef,
			storage: storage
		};

		return service;

		function dbObjRef(addr){
			if(addr)
				return $firebaseObject(database.ref(addr));
			else
				return $firebaseObject(database.ref());
		}

		function dbArrRef(addr){
			if(addr)
				return $firebaseArray(database.ref(addr));
			else
				return $firebaseArray(database.ref());
		}

	}
})();