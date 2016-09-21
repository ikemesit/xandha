(function(){

	'use strict';


	angular
		.module('xandha')
		.directive('dealCarousel', dealCarousel);
	

	function dealCarousel($document, $timeout, FlickityService){
		var directive = {
			restrict: 'A',
			scope: {},
			controller: DealCarouselController,
			controllerAs: 'dlcarousel',
			bindToController: { data: "=" },
			link: linkFunc,
			template: "<div id='dealCarousel' class='deal-carousel-container'>" +
					"<div data-ng-repeat='data in dlcarousel.slides track by $index'>" +
					"<img data-ng-src='{{ data.image }}' alt='{{ data.caption }}' />" +
					"</div></div>"+
					"<div id='dealCarouselNav' class='deal-carousel-nav-container'>"+
					"<div class='carousel-nav-slide' data-ng-repeat='data in dlcarousel.slides track by $index'>"+
					"<img data-ng-src='{{ data.image }}' alt='{{ data.caption }}' style='height: 100px; margin-right: 10px;' />"+
					"</div>"
		}

		return directive;


		function DealCarouselController(){
			var vm = this;
				vm.slides = vm.data;
				
		}

		function linkFunc(scope){
			var carouselElem = angular.element($document[0].getElementById('dealCarousel'));
			var carouselNavElem = angular.element($document[0].getElementById('dealCarouselNav'));
			var carouselInstanceId = Math.round(Math.random() * 1000); //carouselElem[0].id;
			var carouselNavInstanceId = Math.round(Math.random() * 1000); //carouselElem[0].id;
			var carouselOptions = {
				// setGallerySize: false,
				imagesLoaded: true,
				autoPlay: 0, //7000,
				wrapAround: false,
				selectedAttraction: 0.01,
				friction: 0.2,
				pageDots: true,
				prevNextButtons: false,
				contain: true
			}
			var carouselNavOptions = {
				// setGallerySize: false,
				imagesLoaded: true,
				autoPlay: 0,
				wrapAround: false,
				selectedAttraction: 0.01,
				friction: 0.2,
				pageDots: false,
				contain: true,
				asNavFor: '#dealCarousel',
				percentPosition: false,
				prevNextButtons: false
			}

			// Initialize Flickity Carousel on document ready
			// angular.element($document[0]).ready(function(){
			// 	FlickityService.create(carouselElem[0], carouselInstanceId);
			// });

			$timeout(function(){
				FlickityService.create(carouselElem[0], carouselInstanceId, carouselOptions);
				FlickityService.create(carouselNavElem[0], carouselNavInstanceId, carouselNavOptions);
			}, 100);

			// Destroy carousel Instance on scope change
			scope.$on('destroy', function(){
				FlickityService.destroy(carouselInstanceId);
				FlickityService.destroy(carouselNavInstanceId);
			});
		}//End
	}
})();