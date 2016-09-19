(function(){
	'use strict';

	angular
		.module('xandha')
		.factory('dealFactory', dealFactory);


	function dealFactory(dataAPI, toastr, lodash){
		var factory = {
			addDeal: addDeal,
			getAllDeals: getAllDeals
		}

		return factory;

		function addDeal(data){
	      dataAPI.dbArrRef("deals")
	        .$add(data)
	        .then(function(){
	          toastr.success("Deal Added!");
	          // $timeout(function(){
	          //   loadDest();
	          // }, 3);
	        });
	    }

	    function getAllDeals(){
	    	var data = [], dataKeys = [];
	    	dataAPI.dbObjRef("deals").$loaded("deals").then(function(snapshot){
	    		snapshot.forEach(function(obj){
	    			data.push(obj);
	    		});
	    	});
	    	return data;
	    }
	}
})()