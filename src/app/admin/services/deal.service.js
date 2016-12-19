(function(){
	'use strict';

	angular
		.module('xandha')
		.factory('dealFactory', dealFactory);


	function dealFactory($log, dataAPI, toastr, ngDialog){
		var factory = {
			addDeal: addDeal,
			getAllDeals: getAllDeals,
			uploadDealImages: uploadDealImages
		}

		return factory;

		function addDeal(data){
			return dataAPI.dbArrRef("deals")
					.$add(data)
					.then(function(ref){
						toastr.success("Deal Added!");
						return ref.key;
					});
		}

		function getAllDeals(){
			return dataAPI.dbArrRef("deals");
		}

		function uploadDealImages(key, data){
			var downloadURLs = [];

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
							downloadURLs.push(uploadTask.snapshot.downloadURL);
							// firebase.database().ref("/deals/" + key).update({ relatedImages:downloadURLs });
							toastr.success("Images Uploaded");
							ngDialog.closeAll();
				});
            
				
			}
		}
	}// End
})();