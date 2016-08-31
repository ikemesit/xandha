(function() {
  'use strict';

  angular
    .module('xandha')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(destinationFactory) {
    var vm = this;
      vm.popularDestinations = null;
      vm.carousel = [
        {
          id: 0,
          image: 'http://mybeautyboxreview.com/wp-content/uploads/2015/04/Loccitane-Pink-Box.jpg',
          text: 'Awesome stuff'
        },
        {
          id: 1,
          image: 'http://www.co-operativetravel.co.uk/assets/img/generics/dlp25hero-coop.jpg',
          text: 'Awesome stuff again'
        },
        {
          id: 2,
          image: 'http://linde-deals.com/themes/green/images/banner_1.png',
          text: 'Awesome stuff again'
        },
        {
          id: 3,
          image: 'http://2.bp.blogspot.com/-IOxjwEs7vAg/UwqUmlOFTzI/AAAAAAAAEjo/Gb3Bp39m-_8/s1600/%23Food.jpg',
          text: 'Awesome stuff again'
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
    }

    // Init
    destinationFactory.loadDest();
    getPopularDestinations();

    function getPopularDestinations(){
      // To filter by popularity
      destinationFactory.getAllDest().then(function(data){ 
        vm.popularDestinations = data; 
      });
    }

    
  }
})();
