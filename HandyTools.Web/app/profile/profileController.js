(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("profileController", ["handy.api", profileController]);

    function profileController(handyApi) {
        var vm = this;

        vm.selectedState = {
            name: "Select State"
        };

        vm.states = [];

        vm.states = function () {
            handyApi.States.get(function (data) {
                vm.states = data.states;
            });
        };

        vm.states();
    }
}());