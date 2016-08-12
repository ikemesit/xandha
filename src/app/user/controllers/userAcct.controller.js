(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('UserAcctController', UserAcctController);


	function UserAcctController($log, currentAuth){
		$log.info(currentAuth);

	}
	
})();