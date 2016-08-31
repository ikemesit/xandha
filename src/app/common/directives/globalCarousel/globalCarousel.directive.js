(function(){
	'use strict';

	angular
		.module('xandha')
		.directive('globalCarousel', globalCarousel);


	function globalCarousel(){

		var directive = {
			restrict: 'AE',
			templateUrl: 'app/common/directives/globalCarousel/globalCarousel.template.html',
			scope: {
				carouselContent: "="
			},
			link: carouselLinkFunc
		};

		return directive;

		/**@ngInject*/
		function carouselLinkFunc(){
			angular.element(".owl-carousel")
				.owlCarousel({
					items: 1,
					autoplay: true
				});
		}
	}
})();
