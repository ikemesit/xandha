(function(){
	'use strict';

	angular
		.module('xandha')
		.controller('UserAcctController', UserAcctController);


	function UserAcctController($log, userAuth){
		$log.info(userAuth);

	}
	
})();