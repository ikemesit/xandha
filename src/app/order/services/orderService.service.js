(function(){
    'use strict';

    angular
      .module('xandha')
      .factory('orderService', orderService);
    
    /** @ngInject */
    function orderService($http, $sce, $log){
      var cpayUrl = "http://order.xandha.com/verify_transaction.php",
          verificationUrl = "https://staging.nibss-plc.com.ng/CentralPayPlus/merchantTransQueryJson?" //"https://staging.nibss-plc.com.ng/CentralPayPlus/merchantTransQueryJSON?";

      var service = {
        getCpayRef    : getCpayRef,
        verifyPayment : verifyPayment
      }

      return service;

      function getCpayRef(transactionId){
        return $http.post(cpayUrl, angular.toJson({'transactionId': transactionId}))
          .then(getResponse)
          .catch(returnError);
      }

      function verifyPayment(transactionId, cPayRef, merchantId, hash){
        var queryUrl = $sce.trustAsResourceUrl(verificationUrl + "transaction_id=" + transactionId + "&cpay_ref=" + cPayRef + "&merchant_id=" + merchantId + "&hash=" + hash); 
        // $log.info($sce.getTrustedResourceUrl(queryUrl));
        return $http.get($sce.getTrustedResourceUrl(queryUrl))
          .then(getResponse)
          .catch(returnError);
      }

      function getResponse(response){
        return response.data;
      }
      
      function returnError(error){
        return error;
      }

      function getJsonpResponse(response){
        
        if(response.status === 404){
          var data = {
            status : response.status,
            message : "Transaction not found!"
          }
          return data;
        }else{
          return response.data;
        }
      }
    }


})();