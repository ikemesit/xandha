(function(){
  'use strict';

  angular
    .module('xandha')

    .controller('CreateDealModalController', CreateDealModalController);


  function CreateDealModalController($log, $state, toastr, $scope, $rootScope, dataAPI, ngDialog, destinationFactory, dealFactory, _, $filter){
    var vm = this;
        //vm.deal = null;
    vm.showError = null;   
    //vm.dealDataStore = null; // Firebase data store reference
    if($rootScope.dealEdit != null) {
         vm.dealEdit = $rootScope.dealEdit;
        vm.deal = vm.dealEdit;
    }
    else
    {
        vm.deal = {
            caption: null,
            price: '0.00',
            discount: '0.00',
            discountedPrice: null,
            startDate: new Date(),
            endDate: new Date(),
            category: null,
            details: null,
            company: null,
            other: null,
            relatedImages: 'Image not available'
        };
    }
    // Init
    vm.submitDealEntry = submitDealEntry;
    vm.calculateDiscountedPrice = calculateDiscountedPrice;
    vm.destEdit;
    //vm.uploadDestImages = uploadDestImages;
    // discount: '0%',
    loadAllDeals();
    function loadAllDeals(){
            vm.dealDataStore = dealFactory.getAllDeals();
        } 
    vm.dt = new Date();
    vm.format = 'dd-MMMM-yyyy';
    vm.popup1 = { opened: false};
    vm.popup2 = { opened: false };
    vm.dateOptions = {
        formatYear: 'yy',
        showWeeks: false,
        yearRows: 4,
        maxMode: 'month',
        appendToBody: true,
        startingDay: 1
    }
    vm.saveEdit = saveEdit;
    vm.uploadDealImages = uploadDealImages;
    vm.open1 = open1;
    vm.open2 = open2;
    vm.showUpper = true;
    vm.showNext = showNext;

    function showNext(){
         vm.showUpper = false;
        }
    function open1(){
            vm.popup1.opened = true;
    }

    function open2(){
        vm.popup2.opened = true;
    }

    function calculateDiscountedPrice(price, discount){
            vm.deal.discountedPrice =  Number(price) - Number(price) * Number(Number(discount)/100);
        }

    function saveEdit(){
            vm.deal.startDate = $filter('date')(vm.deal.startDate, "fullDate");
            vm.deal.endDate = $filter('date')(vm.deal.endDate, "fullDate");
            vm.dealDataStore.$save(vm.deal);
            ngDialog.closeAll();
            toastr.success("Deal Successfully Edited !");
        }

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
                var data = document.querySelector("#images_upload").files;
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
