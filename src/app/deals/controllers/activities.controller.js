(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('ActivitiesController', ActivitiesController);


	function ActivitiesController(dataAPI){
		var vm = this;
			vm.deals = [
			// {
			// 	id: 0,
			// 	caption: "Bungee Jumping off Stratham Towers, Ikoyi",
			// 	img: "https://www.ajhackett.com/macau/assets/Uploads/_resampled/CroppedFocusedImage128072050-50-Bungy4.jpg",
			// 	originalPrice: "10,000",
			// 	discountPrice: "2,000",
			// 	discount: "80%",
			// 	category: "<i class=\"fa fa-glass\"></i> food & drink",
			// 	state: "Abuja"
			// },
			// {
			// 	id: 1,
			// 	caption: "Fun at Jump Ninja Indoor children trampoline park",
			// 	img: "http://www.metrokids.com/Sky%20Zone.jpg",
			// 	originalPrice: "10,000",
			// 	discountPrice: "2,000",
			// 	discount: "80%",
			// 	category: "<i class=\"fa fa-glass\"></i> food & drink",
			// 	state: "Lagos"
			// },
			// {
			// 	id: 2,
			// 	caption: "Horseback riding at Crazymoon beach resort",
			// 	img: "http://traveltherapytours.com/wp-content/uploads/2015/07/horse-riding-couples.jpg",
			// 	originalPrice: "10,000",
			// 	discountPrice: "2,000",
			// 	discount: "80%",
			// 	category: "<i class=\"fa fa-glass\"></i> food & drink",
			// 	state: "Akwa Ibom"
			// },
			// {
			// 	id: 3,
			// 	caption: "Sky diving classes at NorthShore Sky club",
			// 	img: "http://sanjoseskydivingcenter.com/images/highlight/Learn-To-Skydive.jpg",
			// 	originalPrice: "10,000",
			// 	discountPrice: "5,000",
			// 	discount: "50%",
			// 	category: "<i class=\"fa fa-glass\"></i> food & drink",
			// 	state: "Lagos"
			// }
			];
			vm.categoryFilters = {
				fd: false, // "food & drink"
				gt: false, // "getaways"
				act: false // "activities"
			};

			loadDeals();

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
