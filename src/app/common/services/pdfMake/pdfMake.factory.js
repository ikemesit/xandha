(function(){
  'use strict';

  angular
    .module('xandha')
    .factory('pdfMake', pdfMake);

  function pdfMake($window){
    return $window.pdfMake;
  }
})();
