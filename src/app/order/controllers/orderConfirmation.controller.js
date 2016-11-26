(function(){
    'use strict';

    angular
      .module('xandha')
      .controller('OrderConfController', OrderConfController);
    
    function OrderConfController($log){
        $log.info('Confirmation');
    }
})();