(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('GetawaysController', GetawaysController);


	function GetawaysController(){
		var vm = this;
			vm.deals = [
			{
				id: 5,
				caption: "The Pines Melaka: Up to 3D2N Stay for 2 People in Deluxe Room / Poolside Suite with Breakfast. River Cruise Available",
				img: "https://img.grouponcdn.com/deal/ayRhBntMDYrgxQAmoJsk/t620x376/F5-1000x600.jpg",
				originalPrice: "10,000",
				discountPrice: "9,000",
				discount: "10%",
				category: "<i class=\"fa fa-plane\"></i> getaways",
				state: "Ibadan"
			}
			];
			vm.categoryFilters = {
				fd: false, // "food & drink"
				gt: false, // "getaways"
				act: false // "activities"
			};




	}// End
})();
