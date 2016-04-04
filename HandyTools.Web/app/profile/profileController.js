(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("profileController", ["handy.api", profileController]);

    function profileController(handyApi) {
        var vm = this;

        vm.profile = {
            email: null,
            password: null,
            passwordConfirm: null,
            firstName: null,
            lastName: null,
            homePhone: null,
            workPhone: null,
            addressLine1: null,
            addressLine2: null,
            city: null,
            state: null,
            country: null,
            zipCode: null
        };

        vm.selectedState = {
            name: "Select State"
        };

        vm.states = [];

        vm.states = function () {
            handyApi.States.get(function (data) {
                vm.states = data.states;
            });
        };

        vm.createProfile = function (isValid) {
            // Validate profile
            if (isValid) {
                // save Profile
                console.log(vm.profile);
                // Redirect to Reservations menu.
            }
        }

        vm.states();
    }
}());