(function () {
	'use strict';

	angular
		.module('xandha')
		.controller('OrderController', OrderController);

		function OrderController ($scope, $log, $stateParams, $http, orderService, localStorageService, configService, hashService, pdfMake, html2canvas) {
			var vm = this;
			vm.data = null;
			vm.merchantId = null;
			vm.hostUrl = null;
			vm.hash = null;
			vm.secret = null;
			vm.orderComplete = false;
			vm.cPayRef = null;
			// vm.placeOrder = placeOrder;


			// Public Methods
			vm.verifyTransaction = verifyTransaction;


			$scope.$on('$viewContentLoaded', function (){
				// vm.data = $stateParams.order;
				vm.data = localStorageService.get("activeOrder");
				// $log.info(vm.data);
				getConfigData();
				fetchCpayRef(vm.data.orderId);
			});

			
			  
			/**
			 * Fetches CPAY_REF from MYSQL db
			 * for transaction confirmation
			 * using transactionId as search
			 * parameter
			 * 
			 * @param {any} transactionId
			 */
			function fetchCpayRef(transactionId){
				orderService
					.getCpayRef(transactionId)
					.then(function(resp){
						// var data = angular.fromJson(resp);
						vm.cPayRef =  resp['cpay_ref'];
						$log.info(vm.cPayRef);
					})
					.catch(function(error){
						$log.error(angular.toJson(error.data, true));
					});
			}


			
			/**
			 * Fetches Configuration data and 
			 * computes hash using
			 * transaction parameters
			 * 
			 */
			function getConfigData(){
				configService
					.getConfig()
					.then(function(response){
						vm.merchantId = response.nibbs_merchant_id;
						vm.hostUrl = response.nibbs_host_url;
						vm.secret = response.secret_key;
						vm.hash = hashService(vm.merchantId + 
												vm.data.dealId + 
												vm.data.dealCaption + 
												vm.data.total + 
												"566" + 
												vm.data.orderId + 
												"http://order.xandha.com" +
												vm.secret);
					}).catch(function(error){
						$log.error(angular.toJson(error.data, true));
					});
			}

			
			function verifyTransaction(){
				var transactionId = vm.data.orderId,
					merchantId = vm.merchantId,
					cPayRef = vm.cPayRef,
					secret = vm.secret,
					hash = hashService(transactionId + merchantId + cPayRef + secret);
					orderService
						.verifyPayment(transactionId, cPayRef, merchantId, hash)
						.then(function(resp){
							$log.info(resp);
						})
						.catch(function(error){
							$log.error(angular.toJson(error.data, true));
						});
			}

			

		}// End

})();
