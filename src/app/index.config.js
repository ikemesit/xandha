(function() {
  'use strict';
  
  String.prototype.trunc = String.prototype.trunc ||
  function(n){

      // this will return a substring and 
      // if its larger than 'n' then truncate and append '...' to the string and return it.
      // if its less than 'n' then return the 'string'
      return this.length>n ? this.substr(0,n-1)+'...' : this.toString();
  };

  angular
    .module('xandha')
    .config(config);

  /** @ngInject */
  function config($logProvider, $compileProvider, $httpProvider, localStorageServiceProvider, toastrConfig) {
    // Disable Debug Data for Production
    $compileProvider.debugInfoEnabled(true);

    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 1000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;

    // Set prefix for local storage
    localStorageServiceProvider
                .setPrefix('xandha')
                .setNotify(true, true);

    // Enable Cross Domain $http Calls
    $httpProvider.defaults.useXDomain = true;

  }
})();
