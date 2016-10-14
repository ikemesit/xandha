(function () {
	'use strict';

	angular
		.module('xandha')
		.controller('OrderController', OrderController);

		function OrderController ($scope, $log, $stateParams, pdfMake, html2canvas) {
			var vm = this;
			vm.data = null;

			// Public Methods
			vm.generateCoupon = generateCoupon;

			$scope.$on('$viewContentLoaded', function (){
				vm.data = $stateParams.order;
			});

			function generateCoupon () {
				// var pdfElem = angular.element()
				html2canvas(document.getElementById('exportCanvas'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
												pageSize: 'A4',
												width: 500
												// pageMargins: 40,
												// width: 'auto'
                    }]
                };
                pdfMake.createPdf(docDefinition).open("Score_Details.pdf");
            }
        });
			}
		}// End

})();
