(function() {
  'use strict';

  angular
    .module('xandha')
    .config(config);

  /** @ngInject */
  function config($logProvider, $compileProvider, localStorageServiceProvider, toastrConfig) {
    // Disable Debug Data for Production
    $compileProvider.debugInfoEnabled(false);

    // Enable log
    $logProvider.debugEnabled(false);

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

  }
})();
