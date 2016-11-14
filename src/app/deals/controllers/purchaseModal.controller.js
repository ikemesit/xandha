(function(){
  'use strict';

  angular
    .module('xandha')
    .controller('PurchaseModalController', PurchaseModalController);


  function PurchaseModalController($log, $state, $scope, localStorageService, dataAPI, randomString){
    var vm = this;
        vm.deal = null;
        vm.order = {
          firstName: null,
          lastName: null,
          email: null,
          phone: null,
          address: null,
          dealCaption: null,
          dealId: null,
          amount: 0,
          price: 0,
          total: 0,
          orderId: null,
          orderComplete: false,
          time: {'.sv': 'timestamp'}
        };
        vm.error = [];

        // Methods
        vm.calculateTotal = calculateTotal;
        vm.getOrderData = getOrderData;

    // Init
    getDealData();

    function getDealData(){
      vm.deal = $scope.order; //$scope.ngDialogData;
      // Pass deal details to order model
      vm.order.amount = 1;
      vm.order.dealCaption = vm.deal.caption;
      vm.order.dealId = vm.deal.$id;
      vm.order.price = vm.deal.discountedPrice;
      vm.order.orderId = randomString();
      calculateTotal();
    }

    function getOrderData(){
      $state.go('order', {order: vm.order});
      // TODO - implement proper form validation
      // vm.error = [];
      // for (var field in vm.order) {
      //   if (vm.order[field] === null) {
      //     vm.error.push("Please fill out all fields");
      //   }
      // }

      // // TODO - Improve on error detection
      // if (vm.error.length === 0 ){
      //   dataAPI.saveOrder(vm.order).then(function () {
      //     $state.go('order', {order: vm.order});
      //   }, function () {
      //     $log.info('error');
      //   });
      // }
    }

    function calculateTotal(){
      vm.order.total = vm.order.price * vm.order.amount;
    }

  }// End
})();
