(function(){
	'use strict';

	angular
		.module('xandha')
		.component('winedineComponent', {
			restrict: 'E',
			templateUrl: 'app/deals/templates/winedine.template.html',
			controller: WineDineController,
			controllerAs: '$ctrl'
		});

	WineDineController.$inject = ['dataAPI'];

	function WineDineController(dataAPI){
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
						return obj.category == "food & drinks";
					}).forEach(function(data){
						vm.deals.push(data);
					});
				})
			}




	}// End
})();
