(function(){
	'use strict';

	angular
		.module('xandha')
		.factory('dealsDataService', dealsDataService);

		function dealsDataService(dataAPI){
			var factory = {
				loadDeals: loadDeals
			};

			return factory;

			function loadDeals(category){
				var deals = [];
				dataAPI.dbArrRef(category).$loaded().then(function(snapshot){
					snapshot.filter(function(obj){
						return obj.category == category;
					}).forEach(function(data){
						deals.push(data);
					});
				});
				return deals;
			}
		}// End
})();