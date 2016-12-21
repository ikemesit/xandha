(function(){
	'use strict';

	angular
		.module('xandha')
		.component('activitiesComponent', {
			restrict: 'E',
			templateUrl: 'app/deals/templates/activities.template.html',
			controller: ActivitiesController,
			controllerAs: '$ctrl'
		});

	ActivitiesController.$inject = ['dataAPI'];

	function ActivitiesController(dataAPI){
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
						return obj.category == "activities";
					}).forEach(function(data){
						vm.deals.push(data);
					});
				})
			}

	}// End
})();
