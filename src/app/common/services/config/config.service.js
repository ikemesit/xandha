(function(){
    'use strict';

    angular
        .module('xandha')
        .service('configService', configService);
    
    function configService($http, $log){
        var vm = this;
            vm.getConfig = getConfig;

        var apiHost = 'app/resources/config.json';

        function getConfig(){
            return $http.get(apiHost)
                .then(getConfigComplete)
                .catch(getConfigFailed);
            
            function getConfigComplete(response){
                return response.data;
            }

            function getConfigFailed(error){
                $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
            }
        }

    }
})();