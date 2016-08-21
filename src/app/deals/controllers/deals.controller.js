(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('DealsController', DealsController);


	function DealsController(){
		var vm = this;
			vm.myInterval = 5000;
			vm.noWrapSlides = false;
			vm.active = 0;
			vm.images = [
				{
					id: 0,
					image: 'https://hd.unsplash.com/photo-1468743428993-661b9309fa2c',
					text: 'Awesome stuff'
				},
				{
					id: 1,
					image: 'https://images.unsplash.com/photo-1464695110811-dcf3903dc2f4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=34cc42f969e2f39d7a8af95d16c7dcca',
					text: 'Awesome stuff again'
				},
				{
					id: 2,
					image: 'https://images.unsplash.com/photo-1456894332557-b03dc5cf60d5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=29a9bb29bcbf19a5954d0110b19d5b51',
					text: 'Awesome stuff again'
				},
				{
					id: 3,
					image: 'https://images.unsplash.com/photo-1467173572719-f14b9fb86e5f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=b734e103303c5965225682077ee72f86',
					text: 'Awesome stuff again'
				}
			];

	}// End
})()