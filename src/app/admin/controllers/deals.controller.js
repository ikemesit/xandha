(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('ManageDealsController', ManageDealsController);


	function ManageDealsController($log, dealFactory){
		var vm = this;
		// Deal models
		vm.deal = {
			caption: null,
			price: 0.00,
			discount: '0%',
			discountedPrice: null,
			startDate: new Date(),
			endDate: new Date(),
			category: null,
			details: null,
			company: null,
			other: null
		};
		vm. dealEdit = null;


		// Deal Methods
		vm.submitDealEntry = submitDealEntry;
		vm.calculateDiscountedPrice = calculateDiscountedPrice;

		
		// Date Picker Settings
		vm.dt = new Date();
		vm.format = 'dd-MMMM-yyyy';
		vm.popup1 = {
			opened: false
		};
		vm.popup2 = {
			opened: false
		};
		vm.dateOptions = {
			formatYear: 'yy',
			showWeeks: false,
			yearRows: 4,
			maxMode: 'month',
			appendToBody: true,
			startingDay: 1
		}

		// Date Picker Methods
		vm.open1 = open1;
		vm.open2 = open2;

		// Populate editable deal model
		loadAllDeals();
		var returnedData = dealFactory.getAllDeals();
		// var testData = [];
		// returnedData.forEach(function(data){ testData.push(data); });
		$log.info(returnedData);


		function open1(){
			vm.popup1.opened = true;
		}

		function open2(){
			vm.popup2.opened = true;
		}

		function calculateDiscountedPrice(price, discount){
			vm.deal.discountedPrice =  Number(price) - Number(price) * Number(Number(discount)/100);
		}

		function submitDealEntry(){
			if(
				vm.deal.caption !== null &&
				vm.deal.price !== null &&
				vm.deal.discount !== null &&
				vm.deal.discountedPrice !== null &&
				vm.deal.startDate !== null &&
				vm.deal.endDate !== null &&
				vm.deal.category !== null &&
				vm.deal.details !== null &&
				vm.deal.company !== null &&
				vm.deal.other !== null
			){
				vm.deal.startDate = vm.deal.startDate.toDateString();
				vm.deal.endDate = vm.deal.endDate.toDateString();
				dealFactory.addDeal(vm.deal);
				// $log.info(vm.deal);
			}
		}

		function loadAllDeals(){
			vm.dealEdit = dealFactory.getAllDeals();
		}

		
	}
})();