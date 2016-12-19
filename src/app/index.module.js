(function() {
  'use strict';

  angular
    .module('xandha', [
		
		// Feature dep
		'xandha.deals',
		'xandha.destinations',
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
		'angularRandomString',
		'ngImageAppear',
		'angular-spinkit',
		'mgcrea.ngStrap',
		'angular-loading-bar',
		'ngDialog',
        'ngWig',
        'toastr'
		
		
	]);

})();
