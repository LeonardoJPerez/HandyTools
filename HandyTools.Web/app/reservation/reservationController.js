(function () {
    "use strict";

    angular
        .module("handytoolsApp")
        .controller("reservationController", ["$route", reservationController]);

    function reservationController($route) {
        var vm = this;

        vm.refresh = function () {
            $route.reload();
        }

        vm.createReservation = function () {
            console.log("Making a reservation...");
        }
    }
}());