(function() {
  'use strict';

  angular
    .module('xandha')
    .config(config);

  /** @ngInject */
  function config($logProvider, localStorageServiceProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 500;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;

    // Set prefix for local storage
    localStorageServiceProvider
                .setPrefix('xandha')
                .setNotify(true, true);
  

  }
})();
