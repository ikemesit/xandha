(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('ManageDealsController', ManageDealsController);


	function ManageDealsController($log, $timeout, dealFactory, dataAPI, toastr, _){
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
			other: null,
			relatedImages: 'Image not available'
		};
		vm.dealEdit = null;
		vm.dealDataStore = null; // Firebase data store reference
		vm.progress = 0;
		vm.dataEntryKey = null;
		vm.max = 100;
		vm.progress = 0;


		// Deal Methods
		vm.submitDealEntry = submitDealEntry;
		vm.calculateDiscountedPrice = calculateDiscountedPrice;
		vm.editDeal = editDeal;
		vm.saveEdit = saveEdit;
		vm.deleteDeal = deleteDeal;
		vm.uploadDealImages = uploadDealImages;

		// Show/Hide
		vm.showUpper = true;
		vm.showNext = showNext;


		
		// Date Picker Settings
		vm.dt = new Date();
		vm.format = 'dd-MMMM-yyyy';
		vm.popup1 = { opened: false};
		vm.popup2 = { opened: false };
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

		// Populate dealDataStore model
		loadAllDeals();


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
				vm.deal.startDate = vm.deal.startDate.toDateString(); // Change to date string for firebase storage
				vm.deal.endDate = vm.deal.endDate.toDateString(); // Change to date string for firebase storage
				dealFactory.addDeal(vm.deal).then(function(value){
					vm.dataEntryKey = value;
				});
				
			}
		}

		function loadAllDeals(){
			vm.dealDataStore = dealFactory.getAllDeals();
		}

		function editDeal(data){
			vm.dealEdit = data;
			vm.dealEdit.startDate = new Date(vm.dealEdit.startDate); // create date object from stored date string
			vm.dealEdit.endDate = new Date(vm.dealEdit.endDate); // create date object from stored date string
		}

		function saveEdit(){
			vm.dealEdit.startDate = vm.dealEdit.startDate.toDateString(); // Change to date string for firebase storage
			vm.dealEdit.endDate = vm.dealEdit.endDate.toDateString(); // Change to date string for firebase storage
			vm.dealDataStore.$save(vm.dealEdit);
			toastr.success("Deal Successfully Edited !");
		}

		function deleteDeal(data){
			vm.dealDataStore.$remove(data).then(function(ref){
				toastr.success(ref + ' removed!');
			});
		}

		function showNext(){
			vm.showUpper = false;
		}

		function uploadDealImages(){
			if( vm.dataEntryKey !== null){
				var data = document.querySelector("#deal-images-upload").files;
				var images = []; 
				dealFactory.uploadDealImages(vm.dataEntryKey, data);
				// grab image storage URls on upload completion
				$timeout(function(){
					for(var i = 0; i < data.length; i++){
						firebase.storage()
							.ref()
							.child("deals/" + vm.dataEntryKey + "/" + data[i].name)
							.getDownloadURL()
							.then(function(url){
								images.push(url);
							});
					}

				}, 10000);
				// Update database records once URLs are retrieved
				$timeout(function(){
					var updates = {};
					updates['/deals/' + vm.dataEntryKey + '/relatedImages'] = _.toPlainObject(images)
					firebase.database().ref().update(updates);
					vm.progress = 100;
					vm.showUpper = true;
				},20000);
			}
		}
	
	}
})();