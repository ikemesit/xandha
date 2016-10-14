(function(){
  'use strict';

  angular
    .module('xandha')
    .filter('locationFilter', locationFilter);


  function locationFilter(_){
    return function (input, filter) {
      var res = [];
      if (!_.isEmpty(filter)){
        angular.forEach(input, function (data) {
            if(filter.indexOf(data.location) !== -1)
              res.push(data);
        });
        return res;
      }else{
        return input;
      }

    }
  }
})();
