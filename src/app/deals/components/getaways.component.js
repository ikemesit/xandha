(function(){
	'use strict';

	angular
		.module('xandha')
		.component('getawaysComponent',{
			restrict: 'E',
			templateUrl: 'app/deals/templates/getaways.template.html',
			controller: GetawaysController,
			controllerAs: '$ctrl'
		});


	GetawaysController.$inject = ['dataAPI'];


	function GetawaysController(dataAPI){
		var vm = this;
			vm.deals = [];
			vm.categoryFilters = {
				fd: false, // "food & drink"
				gt: false, // "getaways"
				act: false // "activities"
			};

			loadDeals();

			/**Filters data returned from
			 * Firebase $loaded() Promise
			 * and pushes to controller
			 * model for use			 * 
			 */

			function loadDeals(){
				dataAPI.dbArrRef("deals").$loaded().then(function(snapshot){
					snapshot.filter(function(obj){
						return obj.category == "getaways";
					}).forEach(function(data){
						vm.deals.push(data);
					});
				})
			}




	}// End
})();
