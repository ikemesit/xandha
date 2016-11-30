(function(){
  'use strict';

  angular
    .module('xandha')
    .controller('PurchaseModalController', PurchaseModalController);


  function PurchaseModalController($log, $state, $scope, $timeout, localStorageService, randomString){
    var vm = this;

    // Properties
    vm.deal = null;
    vm.order = {
      dealCaption: null,
      dealId: null,
      amount: 0,
      price: 0,
      total: 0,
      orderId: null,
      orderComplete: false,
      time: {'.sv': 'timestamp'}
    };

    // Public Methods
    vm.calculateTotal = calculateTotal;
    vm.createOrder = createOrder;

    // Init
    getDealData();


    // Method Definitions

    /**
     * Populates deal model with isolate scope's data,
     * populates order model with default values
     * 
     * @Method
     * @returns void
     */
    function getDealData(){
      vm.deal = $scope.order;
      // Pass deal details to order model
      vm.order.image = vm.deal.relatedImages[0];
      vm.order.amount = 1;
      vm.order.dealCaption = vm.deal.caption;
      vm.order.dealId = vm.deal.$id;
      vm.order.price = vm.deal.discountedPrice;
      vm.order.orderId = randomString();
    }

    /**
     * Creates order object, 
     * registers order in local storage &
     * passes order to next state
     * 
     * @Method
     * @return void
     */
    function createOrder(){
      //Create order unique identifier
      var now = String(Date.now());
      vm.order.orderId = vm.order.orderId.concat(now);
      
      // Store Order session in Local storage
      // localStorageService.set("orderID:" + vm.order.orderId, vm.order);
      localStorageService.set("activeOrder", vm.order);
      $timeout(function(){
        $scope.$hide();
        $state.go('order', {order: vm.order});
      }, 300);
    }

    function calculateTotal(){
      vm.order.total = vm.order.price * vm.order.amount;
    }

  }// End
})();
