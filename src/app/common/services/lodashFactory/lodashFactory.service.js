(function(){
	'use strict';

	angular
		.module('xandha')
		.factory('_', lodashFactory);

	function lodashFactory($window){
		return $window._;
	}
})();