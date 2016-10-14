(function(){
  'use strict';

  angular
    .module('xandha')
    .factory('html2canvas', html2canvas);

  function html2canvas($window){
    return $window.html2canvas;
  }
})();
