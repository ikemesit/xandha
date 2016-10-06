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

    // [
    //   {
    //     id: 0,
    //     image: 'http://assets.inhabitat.com/wp-content/blogs.dir/1/files/2015/12/Bridge-in-Ice-by-Eindhoven-University-of-Technology-1.jpg',
    //     caption: 'Awesome stuff'
    //   },
    //   {
    //     id: 1,
    //     image: 'http://www.co-operativetravel.co.uk/assets/img/generics/dlp25hero-coop.jpg',
    //     caption: 'Awesome stuff again'
    //   },
    //   {
    //     id: 2,
    //     image: 'http://linde-deals.com/themes/green/images/banner_1.png',
    //     caption: 'Awesome stuff again'
    //   },
    //   {
    //     id: 3,
    //     image: 'http://www.smalleleganthotels.com/upload/pre2_file_747_71195.jpg',
    //     caption: 'Awesome stuff again'
    //   }
    // ];
    // $scope.$on('$viewContentLoading', function() {
    //   scope.isStateLoading = true;
    // });

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
