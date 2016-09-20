(function(){
	'use strict';

	angular
		.module('xandha')
		.factory('dealFactory', dealFactory);


	function dealFactory(dataAPI, toastr){
		var factory = {
			addDeal: addDeal,
			getAllDeals: getAllDeals,
			uploadDealImages: uploadDealImages
		}

		return factory;

		function addDeal(data){
		  var key=[];
	      dataAPI.dbArrRef("deals")
	        .$add(data)
	        .then(function(ref){
	          key.push(ref.key);
	          toastr.success("Deal Added!");
	        });
	 
	        return key;
	    }

	    function getAllDeals(){
	    	return dataAPI.dbArrRef("deals");
	    }

	    function uploadDealImages(key, data){
	      var downloadURL = [];

	      for(var i = 0; i < data.length; i++){
	        var uploadTask = dataAPI.storage.ref('/deals/' + key + '/' + data[i].name ).put(data[i]);
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
	          firebase.database().ref("/deals/" + key).update({ relatedImages:downloadURL[0] });
	          toastr.success("Images Uploaded");
	        });
	      }
	      
	    }

	}
})()