(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("profileController", ["handy.authService", "handy.api", profileController]);

    function profileController(authService, handyApi) {
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
            return handyApi.States.get();
        };

        vm.back = function (isValid) {
            return authService.redirectTo("/");
        }

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