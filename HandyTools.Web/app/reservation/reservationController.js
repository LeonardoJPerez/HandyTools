(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("reservationController", ["$route", "handy.api", reservationController]);

    function reservationController($route, handyApi) {
        var vm = this;

        vm.refresh = function () {
            $route.reload();
        }

        vm.createReservation = function () {
            console.log("Making a reservation...");
        }
    }
}());