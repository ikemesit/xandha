(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('WineDineController', WineDineController);


	function WineDineController(){
		var vm = this;
			vm.deals = [
			{
				id: 0,
				caption: "Sheraton Hotel: 20% off Western dishes",
				img: "https://static.pexels.com/photos/2139/food-summer-party-dinner.jpg",
				originalPrice: "10,000",
				discountPrice: "2,000",
				discount: "80%",
				category: "<i class=\"fa fa-glass\"></i> food & drink",
				state: "Abuja"
			},
			{
				id: 1,
				caption: "Eko Hotel: 20% off Western dishes",
				img: "https://static.pexels.com/photos/8544/food-dinner-grilled-shashlik.jpg",
				originalPrice: "10,000",
				discountPrice: "2,000",
				discount: "80%",
				category: "<i class=\"fa fa-glass\"></i> food & drink",
				state: "Lagos"
			},
			{
				id: 2,
				caption: "La Campagne Hotel: 20% off Western dishes",
				img: "https://static.pexels.com/photos/8572/food-chicken-meat-outdoors.jpg",
				originalPrice: "10,000",
				discountPrice: "2,000",
				discount: "80%",
				category: "<i class=\"fa fa-glass\"></i> food & drink",
				state: "Akwa Ibom"
			},
			{
				id: 3,
				caption: "Nixon Restaurant: 20% off All dishes",
				img: "https://static.pexels.com/photos/6863/food-plate-toast-restaurant.jpg",
				originalPrice: "10,000",
				discountPrice: "5,000",
				discount: "50%",
				category: "<i class=\"fa fa-glass\"></i> food & drink",
				state: "Lagos"
			},
			{
				id: 4,
				caption: "Yonder Resort and Hotels: 20% off All dishes",
				img: "https://static.pexels.com/photos/7782/food-plate-wood-restaurant.jpg",
				originalPrice: "10,000",
				discountPrice: "9,000",
				discount: "10%",
				category: "<i class=\"fa fa-glass\"></i> food & drink",
				state: "Lagos"
			}
			];
			vm.categoryFilters = {
				fd: false, // "food & drink"
				gt: false, // "getaways"
				act: false // "activities"
			};




	}// End
})();
