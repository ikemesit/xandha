(function(){
	'use strict';

	angular
		.module('xandha')
		.factory('dataAPI', dataAPI);


	function dataAPI($http, $sce, $firebaseObject, $firebaseArray){

		var database = firebase.database();
		var storage = firebase.storage();

		var service = {
			//Angularfire wrapped methods
			dbObjRef: dbObjRef,
			dbArrRef: dbArrRef,
			storage: storage,
	
			// REST API methods
			getDealByKey: getDealByKey,
			saveOrder: saveOrder
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

		function getDealByKey (key) {
			if (key && angular.isDefined(key)) {
				var url = "https://corded-pivot-126105.firebaseio.com/deals/" + key + ".json";
				return $http.get(url).then(function (response) {
					return response.data;
				}, function (error) {
					return error;
				});
			}
		}

		function saveOrder (order) {
			var data = angular.toJson(order);
			var url = "https://corded-pivot-126105.firebaseio.com/orders.json";
			return $http.post(url, data).then(function (response) {
				return response;
			}, function (error) {
				return error;
			});
		}



	}
})();
