(function(){
  'use strict';

  angular
    .module('xandha')
    .controller('DealController', DealController);


  function DealController($uibModal, $log, $document, $stateParams){
    var vm = this;
      vm.deal = null;
      vm.selectedDeal = null;
      vm.openModal = openModal;
      vm.carousel = [
      {
        id: 0,
        image: 'http://assets.inhabitat.com/wp-content/blogs.dir/1/files/2015/12/Bridge-in-Ice-by-Eindhoven-University-of-Technology-1.jpg',
        caption: 'Awesome stuff'
      },
      {
        id: 1,
        image: 'http://www.co-operativetravel.co.uk/assets/img/generics/dlp25hero-coop.jpg',
        caption: 'Awesome stuff again'
      },
      {
        id: 2,
        image: 'http://linde-deals.com/themes/green/images/banner_1.png',
        caption: 'Awesome stuff again'
      },
      {
        id: 3,
        image: 'http://www.smalleleganthotels.com/upload/pre2_file_747_71195.jpg',
        caption: 'Awesome stuff again'
      }
    ];
    
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

    // vm.carouselInstanceId = Math.round(Math.random() * 1000);

    // vm.carouselElem = angular.element($document[0].getElementById('dealCarousel'));
    // vm.carouselInstanceId = Math.round(Math.random() * 1000); //carouselElem[0].id;

    // // Initialize Flickity Carousel on document ready
    // angular.element($document[0]).ready(function(){
    //   FlickityService.create(vm.carouselElem[0], vm.carouselInstanceId, vm.carouselOptions);
    // });

    // // Destroy carousel Instance on scope change
    // var scope = $scope; // To make sure it is destroyed on scope $destroy
    // scope.$on('destroy', function(){
    //   FlickityService.destroy(vm.carouselInstanceId);
    // });


    // $log.info($stateParams.key);
    // $log.info(vm.carouselElem[0]);
    // $log.info(vm);
    function openModal(){
      var modalInstance = $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        // backdropClass: 'custom-modal',
        windowClass: 'modal fadeInDown in',
        templateUrl: 'app/deals/templates/dealsModal.html',
        controller: 'ModalInstanceController',
        controllerAs: '$ctrl',
        size: 'lg',
        resolve: {
          deal: function () {
            return vm.selectedDeal;
          }
        }
      });

      modalInstance.result.then(function () {
        // $ctrl.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }




  }// End
})();
