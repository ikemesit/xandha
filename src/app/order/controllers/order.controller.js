(function () {
	'use strict';

	angular
		.module('xandha')
		.controller('OrderController', OrderController);

		function OrderController ($scope, $log, $stateParams, pdfMake, html2canvas) {
			var vm = this;
			vm.data = null;

			// Public Methods
			// vm.generateCoupon = generateCoupon;

			$scope.$on('$viewContentLoaded', function (){
				vm.data = $stateParams.order;
			});



		// 	function generateCoupon() {
		// 		html2canvas(document.getElementById('exportCanvas'), {
        //     onrendered: function (canvas) {
        //         // var data = canvas.toDataURL();
        //         var docDefinition = {
		// 								pageSize: 'A4',
		// 								info: {
		// 									title: 'Xandha Receipt No.' + vm.data.orderId,
		// 									author: 'Xandha.com',
		// 									subject: 'Your Xandha Receipt'
		// 								},
		// 								content: [
		// 										{
		// 											style: 'pageHeader',
		// 											table: {
		// 												headerRows: 1,
		// 												widths: ['*', '*'],
		// 												body: [
		// 													[{ text: 'Xandha.com', style: 'pageHeaderText'}, { text: 'Order Coupon', style: 'pageHeaderRightText'}]
		// 												]
		// 											},
		// 											layout: 'noBorders'
		// 										},
		// 										{ text: 'Your Receipt', style: 'subheader' },
		// 										{
		// 											style: 'table1',
		// 											table: {
		// 												headerRows: 1,
		// 												widths: ['*'],
		// 												body: [
		// 													[{ text: 'Order ID: ' + vm.data.orderId, style: 'table1Header'}]
		// 												]
		// 											},
		// 											layout: 'noBorders'
		// 										},
		// 										{
		// 												style: 'table2',
		// 												table: {
		// 														headerRows: 1,
		// 														widths: ['*', 50, 50, 50],
		// 														body: [
		// 																[{ text: 'Item', style: 'table2Header' }, { text: 'Price', style: 'table2Header'}, { text: 'Amount', style: 'table2Header' }, { text: 'Total', style: 'table2Header'}],
		// 																[ vm.data.dealCaption, String(vm.data.price), vm.data.amount, String(vm.data.total)]
		// 														]
		// 												}
		// 										},
		// 										{ text: 'Total: ' + String(vm.data.total), fontSize: 24, alignment: 'right', bold: true }
		// 									],
		// 									styles: {
		// 										header: {
		// 											fontSize: 24,
		// 											bold: true,
		// 											margin: [0, 0, 0, 30],
		// 											color: '#FF4A4A'
		// 										},
		// 										pageHeader: {
		// 											margin: [0, 0, 0, 40],
		// 											fillColor: '#FF4A4A'
		// 										},
		// 										pageHeaderText: {
		// 											fontSize: 24,
		// 											bold: true,
		// 											color: 'white',
		// 											margin: [10, 10, 10, 10]
		// 										},
		// 										pageHeaderRightText: {
		// 											fontSize: 15,
		// 											bold: true,
		// 											color: 'white',
		// 											margin: [10,10,10,10],
		// 											alignment: 'right'
		// 										},
		// 										subheader: {
		// 											fontSize: 18,
		// 											bold: true,
		// 											margin: [0, 0, 0, 5],
		// 											color: '#3f3f3f'
		// 										},
		// 										table1:{
		// 											margin: [0, 0, 0, 30],
		// 											fillColor: '#e5e5e5'
		// 										},
		// 										table1Header: {
		// 											bold: true,
		// 											fontSize: 13,
		// 											color: '#3f3f3f',
		// 											margin: [10,10,10,10],
		// 											alignment: 'left'
		// 										},
		// 										table2: {
		// 											margin: [0, 5, 0, 15],
		// 											lineColor: '#3f3f3f',
		// 											width: '100%'
		// 										},
		// 										table2Header: {
		// 											bold: true,
		// 											fontSize: 13,
		// 											color: '#3f3f3f'
		// 										}
		// 									},
		// 									defaultStyle: {
		// 										color: '#3f3f3f'
		// 									}
        //             // content: [{
        //             //     image: data,
		// 								// 		pageSize: 'A4',
		// 								// 		width: 500
		// 										// pageMargins: 40,
		// 										// width: 'auto'
        //             //}]
        //         };
        //         pdfMake.createPdf(docDefinition).open("Score_Details.pdf");
        //     }
        // });
		// 	}


		}// End

})();
