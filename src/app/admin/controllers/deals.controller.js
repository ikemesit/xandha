(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('ManageDealsController', ManageDealsController);


	function ManageDealsController($log){
		var vm = this;
		// Deal model
		vm.deal = {
			caption: null,
			price: 0.00,
			discount: '0%',
			discountedPrice: null,
			startDate: new Date(),
			endDate: new Date(),
			details: null,
			company: null,
			other: null
		}
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
			// dateDisabled: disabled,
			formatYear: 'yy',
			showWeeks: false,
			yearRows: 4,
			maxMode: 'month',
			// maxDate: new Date(2020, 5, 22),
			// minDate: new Date(),
			startingDay: 1
		}

		// Date Picker Methods
		vm.open1 = open1;
		vm.open2 = open2;


		function open1(){
			vm.popup1.opened = true;
		}

		function open2(){
			vm.popup2.opened = true;
		}

		function calculateDiscountedPrice(price, discount){
			vm.deal.discountedPrice =  price * (discount/100);
		}

		function submitDealEntry(){
			$log.info(vm.deal);
		}

		
	}
})();