(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('ActivitiesController', ActivitiesController);


	function ActivitiesController(){
		var vm = this;
			vm.deals = [
			{
				id: 0,
				caption: "Bungee Jumping off Stratham Towers, Ikoyi",
				img: "https://www.ajhackett.com/macau/assets/Uploads/_resampled/CroppedFocusedImage128072050-50-Bungy4.jpg",
				originalPrice: "10,000",
				discountPrice: "2,000",
				discount: "80%",
				category: "<i class=\"fa fa-glass\"></i> food & drink",
				state: "Abuja"
			},
			{
				id: 1,
				caption: "Fun at Jump Ninja Indoor children trampoline park",
				img: "http://www.metrokids.com/Sky%20Zone.jpg",
				originalPrice: "10,000",
				discountPrice: "2,000",
				discount: "80%",
				category: "<i class=\"fa fa-glass\"></i> food & drink",
				state: "Lagos"
			},
			{
				id: 2,
				caption: "Horseback riding at Crazymoon beach resort",
				img: "http://traveltherapytours.com/wp-content/uploads/2015/07/horse-riding-couples.jpg",
				originalPrice: "10,000",
				discountPrice: "2,000",
				discount: "80%",
				category: "<i class=\"fa fa-glass\"></i> food & drink",
				state: "Akwa Ibom"
			},
			{
				id: 3,
				caption: "Sky diving classes at NorthShore Sky club",
				img: "http://sanjoseskydivingcenter.com/images/highlight/Learn-To-Skydive.jpg",
				originalPrice: "10,000",
				discountPrice: "5,000",
				discount: "50%",
				category: "<i class=\"fa fa-glass\"></i> food & drink",
				state: "Lagos"
			}
			// {
			// 	id: 4,
			// 	caption: "Yonder Resort and Hotels: 20% off All dishes",
			// 	img: "https://static.pexels.com/photos/7782/food-plate-wood-restaurant.jpg",
			// 	originalPrice: "10,000",
			// 	discountPrice: "9,000",
			// 	discount: "10%",
			// 	category: "<i class=\"fa fa-glass\"></i> food & drink",
			// 	state: "Lagos"
			// },
			// {
			// 	id: 5,
			// 	caption: "The Pines Melaka: Up to 3D2N Stay for 2 People in Deluxe Room / Poolside Suite with Breakfast. River Cruise Available",
			// 	img: "https://img.grouponcdn.com/deal/ayRhBntMDYrgxQAmoJsk/t620x376/F5-1000x600.jpg",
			// 	originalPrice: "10,000",
			// 	discountPrice: "9,000",
			// 	discount: "10%",
			// 	category: "<i class=\"fa fa-plane\"></i> getaways",
			// 	state: "Ibadan"
			// }
			];
			vm.categoryFilters = {
				fd: false, // "food & drink"
				gt: false, // "getaways"
				act: false // "activities"
			};

	}// End
})();
