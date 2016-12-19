(function(){
    'use strict';

    angular
        .module('xandha.dealsPageHeaderModule', [])
        .component('pageHeader',{
            restrict        : 'E',
            bindings        : { data: "@" },
            templateUrl     : 'app/deals/templates/pageHeader.template.html',
            controller      : PageHeaderController,
            controllerAs    : 'pageHeader'
        });

        function PageHeaderController() {
            var vm = this;
        }
})();