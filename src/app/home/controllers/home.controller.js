(function() {
  'use strict';

  angular
    .module('xandha')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($log, $document, destinationFactory) {
    var vm = this;
      vm.popularDestinations = null;
      vm.carousel = [
        {
          id: 0,
          image: 'http://cdn.sandals.com/grandpineapple/v11/site-elements/inclusions/GP-Inclusions_Hm.jpg',
          text: 'Awesome stuff'
          //http://mybeautyboxreview.com/wp-content/uploads/2015/04/Loccitane-Pink-Box.jpg
        },
        {
          id: 1,
          image: 'http://www.bavarianinn.com/files/4314/1392/4760/dinemain.jpg',
          text: 'Awesome stuff again'
          //http://www.co-operativetravel.co.uk/assets/img/generics/dlp25hero-coop.jpg
        },
        {
          id: 2,
          image: 'http://www.expo2015.org/archive/cs/Expo/1392233228176/Explora-1280X400.jpg%3Bfilename_%3DUTF-8\'\'Explora-1280X400.jpg',
          text: 'Awesome stuff again'
          //http://linde-deals.com/themes/green/images/banner_1.png
        },
        {
          id: 3,
          image: 'https://talkbox.gecu.com/wp-content/uploads/2016/06/MUTSSmashMouthHeader-1280x400.jpg',
          text: 'Awesome stuff again'
          //http://2.bp.blogspot.com/-IOxjwEs7vAg/UwqUmlOFTzI/AAAAAAAAEjo/Gb3Bp39m-_8/s1600/%23Food.jpg
        }
    ];
    vm.carouselOptions = {
      setGallerySize: false,
      imagesLoaded: true,
      autoPlay: 7000,
      wrapAround: true,
      selectedAttraction: 0.01,
      friction: 0.2,
      pageDots: true
      // watchCss: true,
      // cellSelector: 'carousel-slide'
    }

    vm.carouselInstanceId = Math.round(Math.random() * 10000);

    // const carouselElem = angular.element($document[0].getElementById('homeCarousel'));
    // const carouselInstanceId =  carouselElem[0].id;

    // angular.element($document[0]).ready(() => {
    //   FlickityService.create(carouselElem[0], carouselInstanceId, vm.carouselOptions);
    // });

    // Destroy Carousel Instance on Scope Change
    //var scope = $scope; // To make sure it is destroyed on scope $destroy
    // scope.$on('$destroy', () => {
    //   FlickityService.destroy(carouselInstanceId);
    // });

    // $log.info(vm);

    // Init
    destinationFactory.loadDest();
    getPopularDestinations();

    function getPopularDestinations(){
      // To filter by popularity
      destinationFactory.getAllDest().then( function(data){
        vm.popularDestinations = data;
      });
    }


  }
})();
