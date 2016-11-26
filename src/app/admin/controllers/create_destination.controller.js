(function(){
  'use strict';

  angular
    .module('xandha')

    .controller('CreateDestinationModalController', CreateDestinationModalController);


  function CreateDestinationModalController($log, $state, toastr, $scope, ngDialog, $rootScope, dataAPI, destinationFactory, returnFile){
    var vm = this;
        //vm.deal = null;
     vm.DimageSrc = "";    
     vm.showError = null;   
    // Init
    vm.addDestination = addDestination;
    if($rootScope.dest != null) {
         vm.dealEditMode = $rootScope.dest;
         vm.destIn = vm.dealEditMode;
    }
    else
    {
       vm.destIn = null;
    }
    vm.saveEdit = saveEdit;
    vm.destEdit;
    vm.uploadDestImages = uploadDestImages;
     $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
            console.log(args.file);
        });
    });

    function addDestination(data){
        if(
            data !== null && data !== undefined
        ){
          console.log(data);
            destinationFactory.addDest(data);
              vm.showUpper = true;
              showNext();
        }
        else {
            //alert("Please Fill all fields");
            vm.showError = "Please fill all fields !!!";
        }
      
    }
    //$scope.files = [];

    function uploadDestImages(dest){
     var data_i = document.getElementById("images_upload").files;
      destinationFactory.uploadDestImages(dest, data_i);
      vm.showUpper = true;
     // ngDialog.closeAll();

    }
    function saveEdit(){
            vm.destIn.$save().then(function(){
                ngDialog.closeAll();
                toastr.success("Edit Successful!");
            });
        }
    function showNext(){
      vm.showUpper = false;
    }

  }// End
})();



angular
    .module('xandha').directive("ngFileSelect", function(returnFile, $timeout, $rootScope) {
    return {
      scope: {
        ngModel: '='
      },
      link: function($scope, el) {
        function getFile(file) {
          $rootScope.realMusic = file;
          returnFile.readAsDataUrl(file, $scope)
            .then(function(result) {
              $timeout(function() {
                $scope.ngModel = result;

                $scope.ngModel = $rootScope.realMusic;
              });
            });
        }

        el.bind("change", function(e) {
          var file = (e.srcElement || e.target).files[0];
          getFile(file);
        });
      }
    };
  });



angular
    .module('xandha').factory("returnFile", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});
