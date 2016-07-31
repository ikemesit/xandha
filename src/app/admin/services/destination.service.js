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
      updateDest : updateDest,
      loadDest : loadDest,
      deleteDest : deleteDest
    }

    return factory;

    /**
     * Adds new destination and
     * updates LocalStorage
     */
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

    /**
     * Loads destinations record
     * and return promise
     *
     */
    function getAllDest(){
      return dataAPI.dbArrRef("destinations").$loaded();
    }

    /**
     * Gets destination record by index
     * supplied from localstorage
     */
    function getDestByRef(ref){
      dataAPI.dbObjRef("destinations");
    }

    /**
     *  Loads all destinations data,
     *  maps indexes to objects and
     *  saves to web storage for persistence
     */
    function loadDest(){
      dataAPI.dbObjRef("destinations").$loaded().then(function(snapshot){
        var dataIndxObj = [], dataObj = [], indxTmp = {}, dataTmp = {}, ind = 0;

        // Get data Keys
        var keys = Object.keys(snapshot).filter(function(data){
          return data.slice(0, 1) != "$";
        });
        snapshot.forEach(function(data){
          // dataTmp[data.name] = data;
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

    /**
     * Delete destnation
     */
    function deleteDest(ref){
      // Retrieve record key from localstorage for query
      var recs = localStorageService.get('destinations')[0];
      var key = recs[ref];
      // Delete record and reload data model
      dataAPI.dbObjRef("/destinations/" + key).$remove().then(function(){
        toastr.success("Record deleted!");
        loadDest();
      });
    }

    /**
     *
     */
    function updateDest(){

    }

  }
})();
