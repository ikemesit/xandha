(function(){
	'use strict';


	angular
		.module('xandha')
		.factory('destinationFactory', destinationFactory);



	function destinationFactory($log, $timeout, toastr, dataAPI, localStorageService){
		var factory = {
			addDest : addDest,
			getAllDest : getAllDest,
			getDestByRef : getDestByRef,
			updateDest : updateDest,
			loadDest : loadDest,
			deleteDest : deleteDest
		}

		return factory;

		/**
		 * Adds new destination and
		 * updates LocalStorage
		 */
		function addDest(data){
			dataAPI.dbArrRef("destinations")
				.$add(data)
				.then(function(ref){
					// var key = ref.key;
					// dataAPI.dbArrRef("destIndx/" + data.name ).$add(key);
					toastr.success("Destination Added!");
					$timeout(function(){
						loadDest();
					}, 3);
				});
		}

		/**
		 * Loads destinations record
		 * and return promise
		 *
		 */
		function getAllDest(){
			return dataAPI.dbArrRef("destinations").$loaded();
		}

		/**
		 * Gets destination record by index
		 * supplied from localstorage
		 */
		function getDestByRef(ref){
			dataAPI.dbObjRef("destinations");
		}

		/**
		 *  Loads all destinations data,
		 *  maps indexes to objects and
		 *  saves to web storage for persistence
		 */
		function loadDest(){
			dataAPI.dbObjRef("destinations").$loaded().then(function(snapshot){
				var dataObj = [], res = {};
				Object.keys(snapshot).filter(function(data){
					return data.slice(0, 1) != "$";
				}).map(function(data){
					res['key'] = data;
					res['record'] = snapshot[data];
					dataObj.push(res);
				});
				localStorageService.remove("destinations");
				localStorageService.set('destinations',dataObj);
				// vm.destOut = localStorageService.get('destinations');
			});
		}

		/**
		 *
		 */
		function deleteDest(ref){
			var recs = localStorageService.get('destinations');
			var key = recs.find(function(val){
						$log.info(ref, val.record.name);
						return val.record.name === ref;	
					});
			$log.info(key);
			dataAPI.dbArrRef("destinations").$remove(ref).then(function(){
				toastr.success("Record deleted!");
				loadDest();
			});
		}

		/**
		 *
		 */
		function updateDest(){

		}

	}
})();
