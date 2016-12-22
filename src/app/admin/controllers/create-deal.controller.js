(function(){
  'use strict';

  angular
    .module('xandha')

    .controller('CreateDealModalController', CreateDealModalController);

  /**@ngInject */
  function CreateDealModalController($log, $state, $document, toastr, $scope, $timeout, dataAPI, $uibModalInstance, destinationFactory, dealFactory, _, $filter){
    var vm = this;
    vm.showError = null;   
    vm.deal = {
                caption: null,
                oldPrice: '0.00',
                newPrice: '0.00',
                discount: null,
                startDate: new Date(),
                endDate: new Date(),
                category: null,
                details: null,
                company: null,
                relatedImages: 'Image not available'
            };
    vm.dt = new Date();
    vm.format = 'dd-MMMM-yyyy';
    vm.dateOptions = {
        formatYear: 'yy',
        showWeeks: false,
        yearRows: 4,
        maxMode: 'month',
        appendToBody: true,
        startingDay: 1
    };
    vm.dataEntryKey = null;
    vm.uploadDealImages = uploadDealImages;
    vm.submitDealEntry = submitDealEntry;
    vm.calculateDiscount = calculateDiscount;
    // Dropzone Methods & Config
    vm.dzAddedFile = dzAddedFile;
    vm.dzError = dzError;
    vm.dropzoneConfig = {
        parallelUploads: 3,
        maxFileSize: 30,
        autoProcessQueue: false
    };
    // vm.dropzone = new Dropzone();



    $log.info($document[0].querySelector('.dropzone'));

    function dzAddedFile(file) {
        $log.log(file);
    }

    function dzError(file, errorMessage) {
        $log.log(errorMessage);
    }
    // Calculates discount percentage from old price and new price
    function calculateDiscount(oldPrice, newPrice){
        vm.deal.discount =  100 - Math.floor((Number(newPrice)/Number(oldPrice)) * 100);
    }

    // function saveEdit(){
    //         vm.deal.startDate = $filter('date')(vm.deal.startDate, "fullDate");
    //         vm.deal.endDate = $filter('date')(vm.deal.endDate, "fullDate");
    //         vm.dealDataStore.$save(vm.deal);
    //         ngDialog.closeAll();
    //         toastr.success("Deal Successfully Edited !");
    //     }

    function submitDealEntry(){
        if(
            vm.deal.caption !== null &&
            vm.deal.price !== null &&
            vm.deal.discount !== null &&
            vm.deal.discountedPrice !== null &&
            vm.deal.startDate !== null &&
            vm.deal.endDate !== null &&
            vm.deal.category !== null &&
            vm.deal.details !== null &&
            vm.deal.company !== null &&
            vm.deal.other !== null
        ){
            vm.deal.startDate = $filter('date')(vm.deal.startDate, "fullDate");
            vm.deal.endDate = $filter('date')(vm.deal.endDate, "fullDate");

            dealFactory.addDeal(vm.deal).then(function(value){
                vm.dataEntryKey = value;
            });

        }
        else {
             vm.showError = "Please fill all fields !!!";
        }
    }
    function uploadDealImages(){
            if( vm.dataEntryKey !== null){
                var data = $document[0].querySelector("#images_upload").files;
                var images = [];
                dealFactory.uploadDealImages(vm.dataEntryKey, data);
                // grab image storage URls on upload completion
                $timeout(function(){
                    for(var i = 0; i < data.length; i++){
                        firebase.storage()
                            .ref()
                            .child("deals/" + vm.dataEntryKey + "/" + data[i].name)
                            .getDownloadURL()
                            .then(function(url){
                                images.push(url);
                            });
                    }

                }, 10000);
                // Update database records once URLs are retrieved
                $timeout(function(){
                    var updates = {};
                    updates['/deals/' + vm.dataEntryKey + '/relatedImages'] = _.toPlainObject(images)
                    firebase.database().ref().update(updates);
                    vm.progress = 100;
                    vm.showUpper = true;
                },20000);
            }
        }

  }// End
})();
