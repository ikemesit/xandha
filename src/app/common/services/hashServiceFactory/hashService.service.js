(function(){
	'use strict';

	angular
		.module('xandha')
		.factory('hashService', hashService);

	function hashService($window){
		return $window.sha256;
	}
})();