(function(){
  'use strict';

  angular
    .module('xandha')
    .controller('DealController', DealController);


  function DealController($log, $scope, $timeout, $stateParams, $modal, dataAPI){
    var vm = this;
      vm.deal = null;
      vm.selectedDeal = null;
      vm.carousel = [];
      vm.dealsRef = dataAPI.dbArrRef("deals/");
      vm.category = null;
      vm.showPurchaseModal = showPurchaseModal;

    // Carousel Options
    vm.carouselNavOptions = {
      setGallerySize: false,
      imagesLoaded: true,
      autoPlay: 0,
      wrapAround: false,
      selectedAttraction: 0.01,
      friction: 0.2,
      pageDots: false,
      contain: true,
      asNavFor: '#dealCarousel',
      percentPosition: false
    }

        // Loads deal from $stateParams on view ready
    $scope.$on('$viewContentLoaded', function () {
      getDealByKey();
    });

   
    // Opens Purchase Modal
    function showPurchaseModal(){
      // Create New isolate scope for modal
      var modalScope = $scope.$new(true);
      // Pass modal data
      modalScope.order = vm.deal;
      var newPurchaseModal = $modal(
        {
          scope: modalScope, 
          animation: 'am-slide-top',
          templateUrl: 'app/deals/templates/dealPurchaseModal.template.html',
          controller: 'PurchaseModalController',
          controllerAs: 'purchase',
          size: 'lg', 
          show: false
        });
      newPurchaseModal.$promise.then(function(){
        newPurchaseModal.show();
      });
    }

   //TODO - use REST API instead
    function getDealByKey(){
      dataAPI.dbObjRef("/deals/" + $stateParams.key)
        .$loaded()
        .then(function(snapshot){
          vm.deal = snapshot;
          vm.category = snapshot.category;
          // Populate Deal Carousel images
          snapshot.relatedImages.forEach(function(data, key){
            vm.carousel.push({
              id:key,
              image: data,
              caption: 'hello'
            });
          });
        });
    }

  }// End
})();
