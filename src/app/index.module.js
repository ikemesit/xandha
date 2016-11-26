(function() {
  'use strict';

  angular
    .module('xandha', [
		
		// Feature dep
		'xandha.admin',
		'xandha.deals',
		'xandha.destinations',
		'xandha.orders',
		'xandha.login',
		'xandha.home',
		'xandha.user',

		// Core dep
		'ngAnimate',
		'ngCookies',
		'ngTouch',
		'ngSanitize',
		'ngMessages',
		'ngAria',
		'ngResource',

		// External dep
		'ui.router',
		'ui.bootstrap',
		'firebase',
		'LocalStorageModule',
		'ngMap',
		'ngImageAppear',
		'angular-spinkit',
		'mgcrea.ngStrap'
		
	]);

})();
