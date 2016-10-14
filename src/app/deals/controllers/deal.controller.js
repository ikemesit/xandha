(function(){
  'use strict';

  angular
    .module('xandha')
    .controller('DealController', DealController);


  function DealController($log, $scope, $timeout, $stateParams, ngDialog, dataAPI){
    var vm = this;
      vm.deal = null;
      vm.selectedDeal = null;
      vm.openModal = openModal;
      vm.carousel = [];
      vm.dealsRef = dataAPI.dbArrRef("deals/");
      vm.category = null;

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
    $scope.$on('$viewContentLoaded', function () {
      getDealByKey();
    });





    function openModal(){
      ngDialog.open({
        template: 'app/deals/templates/dealPurchaseModal.template.html',
        className: 'ngdialog-theme-default',
        appendClassName: 'ngDialog-custom',
        width: '90%',
        controller: 'PurchaseModalController',
        controllerAs: 'purchase',
        data: vm.deal,
        closeByNavigation: true
      });
    }

    //TODO - use REST API instead
    function getDealByKey(){
      dataAPI.dbObjRef("/deals/" + $stateParams.key)
        .$loaded()
        .then(function(snapshot){
          vm.deal = snapshot;
          vm.category = snapshot.category;
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
