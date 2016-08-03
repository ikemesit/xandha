(function(){
  'use strict';


  angular
    .module('xandha')
    .factory('destinationFactory', destinationFactory);



  function destinationFactory($log, $timeout, toastr, dataAPI, localStorageService){
    var factory = {
      addDest : addDest,
      getAllDest : getAllDest,
      getDestByRef : getDestByRef,
      uploadDestImages : uploadDestImages,
      loadDest : loadDest,
      deleteDest : deleteDest
    }

    return factory;

   
    function addDest(data){
      dataAPI.dbArrRef("destinations")
        .$add(data)
        .then(function(){
          // Get passed ref key
          // var key = ref.key;
          // dataAPI.dbArrRef("destIndx/" + data.name ).$add(key);
          toastr.success("Destination Added!");
          $timeout(function(){
            loadDest();
          }, 3);
        });
    }

    function getAllDest(){
      return dataAPI.dbArrRef("destinations").$loaded();
    }

    function getDestKey(name){
      var key = localStorageService.get("dst-indices").filter(function(obj){
          if(name in obj)
            return obj;
      })[0];
      return key[name];
    }

    function uploadDestImages(dest, data){
      var key = getDestKey(dest);
      var downloadURL = [];

      for(var i = 0; i < data.length; i++){
        var uploadTask = dataAPI.storage.ref('/' + key + '/' + data[i].name ).put(data[i]);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $log.info('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                $log.info('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                $log.info('Upload is running');
                break;
            }
          }, function(error) {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function() {
          // Upload completed successfully, now we can get the download URL
          downloadURL.push(uploadTask.snapshot.downloadURL);
          firebase.database().ref("/destinations/" + key).update({ himage:downloadURL[0] });
          loadDest();
          toastr.success("Images Uploaded");
        });
      }
      
    }

    function getDestByRef(ref){
      var key = getDestKey(ref);
      return dataAPI.dbObjRef("/destinations/" + key);
    }

    function loadDest(){
      dataAPI.dbObjRef("destinations").$loaded().then(function(snapshot){
        var dataIndxObj = [], dataObj = [], indxTmp = {}, ind = 0;

        // Get data Keys
        var keys = Object.keys(snapshot).filter(function(data){
          return data.slice(0, 1) != "$";
        });
        snapshot.forEach(function(data){
          indxTmp[data.name] = keys[ind];
          dataObj.push(data);
          dataIndxObj.push(indxTmp);

          // Reset Containers
          // dataTmp = {};
          indxTmp = {};
          ind += 1;
          
        });
        
        localStorageService.remove("dst-indices");
        localStorageService.remove("dst-data");
        localStorageService.set('dst-indices',dataIndxObj);
        localStorageService.set('dst-data',dataObj);
      });
    }

    function deleteDest(ref){
      var key = getDestKey(ref);
      dataAPI.dbObjRef("/destinations/" + key ).$remove().then(function(){
        toastr.success("Record deleted!");
      });
    }

  }
})();
