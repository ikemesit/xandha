(function(){

  'use strict';

  angular
    .module('xandha')
    .factory('Data', Data);

    /** @ngInject */
    function Data($http, $rootScope){

      $http.defaults.headers.post["Content-Type"] = "application/json";

      var serviceBase = $rootScope.api;

      var obj = {};

      obj.get = function (q) {
          return $http.get(serviceBase + q).then(function (results) {
              return results.data;
          });
      };
      obj.post = function (q, object) {
          return $http.post(serviceBase + q, object).then(function (results) {
              return results.data;
          });
      };
      obj.put = function (q, object) {
          return $http.put(serviceBase + q, object).then(function (results) {
              return results.data;
          });
      };
      obj.delete = function (q) {
          return $http.delete(serviceBase + q).then(function (results) {
              return results.data;
          });
      };

      return obj;
    }

})();
